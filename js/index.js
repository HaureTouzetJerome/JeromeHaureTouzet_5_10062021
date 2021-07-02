// - A - Boucler sur la liste des articles
function add(arrayItems){
    let item;
    for (let i=0; i<arrayItems.length; i++){
        item = arrayItems[i];
        addToHTML(item, i);
    }
}

// - B - Ajouter un article au HTML dans une balise <li>
function addToHTML(item, i){
    if (!document.querySelector("#main-item ul")){
        const mainItem = document.querySelector("#main-item");
        const ul = document.createElement("ul");
        ul.setAttribute("id","list-items");
        mainItem.appendChild(ul);
    }

    const ul = document.querySelector("#main-item ul");
    const li = document.createElement("li");
    li.setAttribute("id",`cardI${i+1}`);
    li.innerHTML = `<article class="item-card">
                        <a href="product.html?id=${item._id}">
                            <div  class="imgContainer">
                                <img src="${item.imageUrl}" alt="Ours en peluche fait à la main">
                            </div>
                            <div class="cardContent">
                                <div class="flexContainer">
                                    <h3>${item.name}</h3>
                                    <span>Prix: ${item.price/100} €</span>
                                </div>
                          </div>
                        </a> 
                    </article>`;

    ul.appendChild(li);
}

// - C - Requête get à l'API
function get(url) {
    fetch(url).then(function(res) {
        if (res.ok) {
            return res.json();
        }
    }).then(function(value) {
        const products = value;
        add(products);
    }).catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });
}

get('http://localhost:3000/api/teddies/');