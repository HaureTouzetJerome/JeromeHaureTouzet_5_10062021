const productsLocalStorage = localStorage.getItem("productsCart");
let productsCart = [];

if(productsLocalStorage){
    productsCart = JSON.parse(productsLocalStorage);
}

const mainContainer = document.querySelector("#main-item");
const titleCart = document.createElement("h2");

if (productsLocalStorage){
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
                                 <div>Supprimer l'article</div>`;
        productCart.appendChild(infoProduct);
    }


    const amountTotal = document.createElement("div");
    amountTotal.setAttribute("class","container-AmountTotal");
    amountTotal.innerHTML = `<div>Montant total: 59 €</div>
                             <div>Vider le panier</div>`;
    
    productCart.appendChild(amountTotal);
    
    mainContainer.appendChild(titleCart);
    mainContainer.appendChild(productCart);
}
else{
    mainContainer.appendChild(titleCart);
    titleCart.innerHTML = "Votre panier est vide";
}