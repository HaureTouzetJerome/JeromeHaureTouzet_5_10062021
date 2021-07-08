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

// Récupérer toutes les données du formulaire






