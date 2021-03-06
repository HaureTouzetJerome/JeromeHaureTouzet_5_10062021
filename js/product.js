const URLQueryString = window.location.search;
const URLSearchParam = new URLSearchParams(URLQueryString);
const idProduct = URLSearchParam.get("id");

function get(url) {
    fetch(url).then(function(res) {
        if (res.ok) {
            return res.json();
        }
    }).then(function(value) {
        const product = value;
        addToHTML(product);
        addToCart(product);
        addQuantityToHTML();
    }).catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });
}

function addToHTML(item){
    const mainProduct = document.querySelector("#main-product");
    mainProduct.innerHTML = `   <h2>Description du produit</h2><br>
                                <article class="item-card">
                                    <div>${item.description}</div><br>
                                    <div  class="imgContainer">
                                        <img src="${item.imageUrl}" width=500 alt="Ours en peluche fait à la main"><br>
                                    </div>
                                    <div class="cardContent">
                                        <div class="flexContainer">
                                            <h3>${item.name}</h3>
                                            <span>Prix: ${item.price/100} €</span>
                                        </div><br>
                                    </div>
                                    <form id="product">
                                        <label>Nos choix de couleurs disponibles: </label>
                                        <select id="colors">
                                        </select>
                                        <label>Quantité: </label>
                                        <select id="quantityProduct">
                                        </select>
                                    </form>
                                </article>`;
    
    const colors = document.querySelector("#colors");
    for (let i = 0; i < item.colors.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("id",`color_${i+1}`);
        option.setAttribute("value",`${item.colors[i]}`);
        option.textContent = item.colors[i];
        colors.appendChild(option);
    }

    const quantity = document.querySelector("#quantityProduct");
    for (let i = 0; i < 3; i++) {
        const option = document.createElement("option");
        option.setAttribute("id",`quantity_${i+1}`);
        option.setAttribute("value",`${i+1}`);
        option.textContent = i+1;
        quantity.appendChild(option);
    }

    const form = document.querySelector("#product");
    form.innerHTML += `<button id="btnAddToCart" type="submit" name="btnAddToCart">Ajouter au panier</button>`;
}

function addToCart(product){
    const btnAddToCart = document.querySelector("#btnAddToCart");

    btnAddToCart.addEventListener("click", (event)=>{
        event.preventDefault(); // ne réactualise pas la page

        const optionColors = document.querySelector("#colors");
        const idColor = optionColors.value;

        const quantity = document.querySelector("#quantityProduct");
        const selectQuantity = parseInt(quantity.value);

        const selectProduct = {
            id:product._id,
            nameProduct:product.name,
            color:idColor,
            quantity:selectQuantity,
            price:product.price * selectQuantity / 100
        }

        const productsLocalStorage = localStorage.getItem("productsCart");
        let productsCart = [];

        if(productsLocalStorage){
            productsCart = JSON.parse(productsLocalStorage);
            const resultMap = productsCart.map(function(element){
                if( element.id === selectProduct.id &&
                    element.color === selectProduct.color){
                    element.quantity += selectProduct.quantity;
                }
                return element;
            });

            const idIdentic = (element) => element.id === selectProduct.id;
            const colorIdentic = (element) => element.color === selectProduct.color;
            if (productsCart.some(idIdentic) && productsCart.some(colorIdentic)){
                localStorage.setItem("productsCart", JSON.stringify(resultMap));
            }
            else{
                productsCart.push(selectProduct);
                localStorage.setItem("productsCart", JSON.stringify(productsCart));
            }
        }
        else{
            productsCart.push(selectProduct);
            localStorage.setItem("productsCart", JSON.stringify(productsCart));
        }
        document.location.reload();
    });
}

get(`http://localhost:3000/api/teddies/${idProduct}`);

