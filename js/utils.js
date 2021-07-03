function addQuantityToHTML(){

    let productsCart = getProductsCart();

    let lstQuantityCart = [];

    for(i=0; i < productsCart.length; i++){
        let quantityProduct = productsCart[i].quantity;
        lstQuantityCart.push(parseInt(quantityProduct));
    }
    
    if(lstQuantityCart.length > 0){
        const quantityTotal = lstQuantityCart.reduce(function(a,b){
            return a + b;
        });
        localStorage.setItem("quantityCart", quantityTotal);
        //const quantityLocalStorage = localStorage.getItem("quantityCart");
        const addQuantityToHTML = `<span>: ${quantityTotal} </span>`;
        let containerAmountTotal = document.querySelector("#cart");
        containerAmountTotal.insertAdjacentHTML("beforeend", addQuantityToHTML);
    }
}

function getProductsCart(){
    const productsLocalStorage = localStorage.getItem("productsCart");
    let productsCart = [];

    if(productsLocalStorage){
        productsCart = JSON.parse(productsLocalStorage);
    }

    return productsCart;
}