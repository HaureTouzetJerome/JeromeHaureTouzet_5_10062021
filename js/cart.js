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

const btnSendOrder = document.querySelector(".btn-order");
btnSendOrder.addEventListener("click", (e)=>{
    e.preventDefault();

    const orderForm = {
        firstName:document.querySelector("#firstName").value,
        lastName:document.querySelector("#lastName").value,
        address:document.querySelector("#address").value,
        city:document.querySelector("#city").value,
        email:document.querySelector("#email").value
    }

    removeALLMessagesValidation();

    if(name_validation(orderForm.firstName) && name_validation(orderForm.lastName) &&
       name_validation(orderForm.city) && address_validation(orderForm.address) && email_validation(orderForm.email)){
        localStorage.setItem("orderForm", JSON.stringify(orderForm));
        
        if(productsCart.length != 0){

            const products = getArrayIdProducts(productsCart);

            let contact = new Contact(orderForm.firstName, orderForm.lastName, orderForm.address,
                                        orderForm.city, orderForm.email);
            const orderTeddies = {
                contact,
                products
            }
            post('http://localhost:3000/api/teddies/order', orderTeddies);
        }
    }
    else{
        if(!name_validation(orderForm.firstName)){
            addMessageValidation("firstName");
        }
        if(!name_validation(orderForm.lastName)){
            addMessageValidation("lastName");
        }
        if(!address_validation(orderForm.address)){
            addMessageValidation("address");
        }
        if(!name_validation(orderForm.city)){
            addMessageValidation("city");
        }
        if(!email_validation(orderForm.email)){
            addMessageValidation("email");
        }
    }
})


const order = JSON.parse(localStorage.getItem("orderForm"));
if(order != null){
    setValueOrderForm(order);
}

function addOrderFormToHTML(){
    const orderForm = document.querySelector("#orderForm");
    orderForm.innerHTML = ` <h2>Formulaire de commande à remplir</h2>
                            <form action="#">
                            <div id="description">Les champs marqué par <em>*</em> sont <em>obligatoires</em></div>
                            <fieldset>
                                <legend>Contact</legend>
                                <div id="validationFirstName">
                                    <label for="firstName">Prénom <em>*</em></label>
                                    <input id="firstName" placeholder=" Votre prénom" autofocus="" required><br>
                                </div>
                                <div id="validationLastName"> 
                                    <label for="lastName">Nom <em>*</em></label>
                                    <input id="lastName" placeholder=" Votre nom" required><br>
                                </div>
                                <div id="validationAddress"> 
                                    <label for="address">Adresse <em>*</em></label>
                                    <input id="address" placeholder=" Votre adresse" required><br>
                                </div>
                                <div id="validationCity"> 
                                    <label for="city">Ville <em>*</em></label>
                                    <input id="city" placeholder=" Votre ville" required><br>
                                </div>
                                <div id="validationEmail">                
                                    <label for="email">Email <em>*</em></label>
                                    <input id="email" type="email" placeholder=" prenomnom@gmail.com" required><br>
                                </div>
                            </fieldset>
                            <input class="btn-order" type="submit" value="Passer ma commande">
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

function name_validation(field){
    let field_isValid = false;
    if(/^[A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ' -]{2,50}$/.test(field)){
        field_isValid = true;
    }
    return field_isValid
}

function address_validation(field){
    let field_isValid = false;
    if(/^[A-Za-z0-9àáâãäåçèéêëìíîïðòóôõöùúûüýÿ' -]{2,50}$/.test(field)){
        field_isValid = true;
    }
    return field_isValid
}

function email_validation(field){
    let field_isValid = false;
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(field)){
        field_isValid = true;
    }
    return field_isValid
}

function addMessageValidation(valueof_OrderForm){
    switch (valueof_OrderForm) {
        case 'firstName':
            addMessageValidationToHTML("#validationFirstName", "firstName", "prénom");
          break;
        case 'lastName':
            addMessageValidationToHTML("#validationLastName", "lastName", "nom");
          break;
        case 'address':
            addMessageValidationToHTML("#validationAddress", "address", "adresse");
          break;
        case 'city':
            addMessageValidationToHTML("#validationCity", "city", "ville");
          break;
        case 'email':
            addMessageValidationToHTML("#validationEmail", "email", "email");
          break;
    }
}

function addMessageValidationToHTML(idValidation, nameField, fieldFr){
    const validationEmail = document.querySelector(idValidation);
    validationEmail.setAttribute("class","form-group has-validation-error");
    const inputEmail = document.querySelector(`#${nameField}`);
    inputEmail.setAttribute("class","form-control invalid");
    
    if(!document.querySelector(`${idValidation} .validation-error`)){
        const messageValidation = document.createElement("div");
        messageValidation.setAttribute("id", `${nameField}-validation-error`);
        messageValidation.setAttribute("class", "validation-error");
        messageValidation.textContent = `${fieldFr} invalide`;
        validationEmail.appendChild(messageValidation);
    }
}

function removeALLMessagesValidation(){
    removeMessageValidationToHTML("#validationFirstName", "firstName");
    removeMessageValidationToHTML("#validationLastName", "lastName");
    removeMessageValidationToHTML("#validationAddress", "address");
    removeMessageValidationToHTML("#validationCity", "city");
    removeMessageValidationToHTML("#validationEmail", "email");
}

function removeMessageValidationToHTML(idValidation, nameField){
    const validationField = document.querySelector(idValidation);
    validationField.removeAttribute("class");
    const inputField = document.querySelector(`#${nameField}`);
    inputField.removeAttribute("class");
    
    const messageValidation = document.querySelector(`#${nameField}-validation-error`);
    if(messageValidation != null){
        validationField.removeChild(messageValidation);
    }
}

// Requête POST à l'API
function post(url, orderTeddies) {

    var init = { method: 'POST',
                 body: JSON.stringify(orderTeddies),
                 headers:{
                    "Content-Type":"application/json"}
               };

    fetch(url, init).then(function(res) {
        if (res.ok) {
            return res.json();
        }
    }).then(function(value) {
        const responseOrder = value;
        console.log(responseOrder);
    }).catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });
}

function Contact(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName  = lastName;
    this.address   = address;
    this.city      = city;
    this.email     = email;
}

function getArrayIdProducts(productsCart){
    const productsId = productsCart.map(function(element){
        return element.id;
    });
    return productsId;
}