let productsCart = getProductsCart();

const mainContainer = document.querySelector("#main-item");
const titleCart = document.createElement("h2");

if (productsCart.length != 0){
    titleCart.innerHTML = "Voici le contenu de votre panier";

    const productCart = document.createElement("div");
    productCart.setAttribute("id","container-productCart");
    productCart.setAttribute("class","grid-cart");

    for(i = 0; i < productsCart.length; i++){
        const infoProduct = document.createElement("div");
        infoProduct.setAttribute("id",`product_${i+1}`);
        infoProduct.setAttribute("class","container-infoProduct");

        infoProduct.innerHTML = `<div>${productsCart[i].nameProduct}</div>
                                 <div>${productsCart[i].color}</div>
                                 <div>Quantité: ${productsCart[i].quantity}</div>
                                 <div>${productsCart[i].price} €</div>
                                 <button class="btn-deleteProduct"> Supprimer l'article </button>`;
        productCart.appendChild(infoProduct);
    }


    const amountTotal = document.createElement("div");
    amountTotal.setAttribute("class","container-AmountTotal");
    amountTotal.innerHTML = `<button class="btn-deleteCart"> Vider le panier </button>`;
    
    productCart.appendChild(amountTotal);
    
    mainContainer.appendChild(titleCart);
    mainContainer.appendChild(productCart);
}
else{
    mainContainer.appendChild(titleCart);
    titleCart.innerHTML = "Votre panier est vide";
}

let listButtons = document.querySelectorAll(".btn-deleteProduct");

for(let i = 0; i < listButtons.length; i++){
    listButtons[i].addEventListener("click", (event)=>{
        event.preventDefault();

        let idProductToDelete = productsCart[i].id;
        index = productsCart.findIndex(element => element.id === idProductToDelete);
        productsCart.splice(index, 1);
        localStorage.setItem("productsCart", JSON.stringify(productsCart));
        document.location.reload();
    })
}

if(document.querySelector(".btn-deleteCart")){
    let btnDeleteCart = document.querySelector(".btn-deleteCart");
    btnDeleteCart.addEventListener("click", (e)=>{
        e.preventDefault();
        localStorage.removeItem("productsCart");
        document.location.reload();
    })
}

let lstPricesCart = [];

for(i=0; i < productsCart.length; i++){
    let priceProduct = productsCart[i].price;
    lstPricesCart.push(priceProduct);
}

if(lstPricesCart.length > 0){
    const amountTotal = lstPricesCart.reduce(function(a,b){
        return a + b;
    });

    const addPriceToHTML = `<div>Montant total: ${amountTotal} €</div>`;
    let containerAmountTotal = document.querySelector(".container-AmountTotal");
    containerAmountTotal.insertAdjacentHTML("afterbegin", addPriceToHTML);
}

addQuantityToHTML();
addOrderFormToHTML();

const btnSendOrder = document.querySelector("#btnOrderSend");
btnSendOrder.addEventListener("click", (e)=>{

     e.preventDefault();

    const orderForm = {
        firstName:document.querySelector("#firstName").value,
        lastName:document.querySelector("#lastName").value,
        address:document.querySelector("#address").value,
        city:document.querySelector("#city").value,
        email:document.querySelector("#email").value
    }

    localStorage.setItem("orderForm", JSON.stringify(orderForm));

    const orderToSend = {
        productsCart,
        orderForm
    }
})

const order = JSON.parse(localStorage.getItem("orderForm"));
setValueOrderForm(order);


function addOrderFormToHTML(){
    const orderForm = document.querySelector("#orderForm");
    orderForm.innerHTML = ` <h2>Formulaire de commande à remplir</h2>
                            <form action="#">
                            <div id="description">Les champs marqué par <em>*</em> sont <em>obligatoires</em></div>
                            <fieldset>
                                <legend>Contact</legend>
                                <label for="firstName">Prénom <em>*</em></label>
                                <input id="firstName" placeholder=" Votre prénom" autofocus="" required><br>
                                <label for="lastName">Nom <em>*</em></label>
                                <input id="lastName" placeholder=" Votre nom" required><br>
                                <label for="address">Adresse <em>*</em></label>
                                <input id="address" placeholder=" Votre adresse" required><br>
                                <label for="city">Ville <em>*</em></label>
                                <input id="city" placeholder=" Votre ville" required><br>
                                <label for="email">Email <em>*</em></label>
                                <input id="email" type="email" placeholder=" prenomnom@gmail.com" required pattern="[a-zA-Z]*.[a-zA-Z]*@gmail.com"><br>
                            </fieldset>
                            <input id="btnOrderSend" class="btn-cmd" type="submit" value="Passer ma commande">
                            </form>
                          `
}

function setValueOrderForm(order){
    document.querySelector("#firstName").value = order.lastName;
    document.querySelector("#lastName").value = order.firstName;
    document.querySelector("#address").value = order.address;
    document.querySelector("#city").value = order.city;
    document.querySelector("#email").value = order.email;
}






