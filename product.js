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
                                    </form>
                                </article>`;
    
    const colors = document.querySelector("#colors");
    for (var i = 0; i < item.colors.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("id",`color_${i+1}`);
        option.setAttribute("value",`color_${i+1}`);
        option.textContent = item.colors[i];
        colors.appendChild(option);
    }

    const form = document.querySelector("#product");
    form.innerHTML += `<button id="btnAddToCart" type="submit" name="btnAddToCart">Ajouter au panier</button>`;
}

function addToCart(product){
    const btnAddToCart = document.querySelector("#btnAddToCart");

    btnAddToCart.addEventListener("click", (event)=>{
        event.preventDefault();

        const optionColors = document.querySelector("#colors");
        const idColor = optionColors.value;

        const selectProduct = {
            id:product._id,
            nameProduct:product.name,
            color:idColor,
            quantity:1,
            price:product.price / 100
        }
        
        localStorage.setItem("selectProduct", selectProduct);
        console.log(selectProduct);
    });

}

get(`http://localhost:3000/api/teddies/${idProduct}`);

