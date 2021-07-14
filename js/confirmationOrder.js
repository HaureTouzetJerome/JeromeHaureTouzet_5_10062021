const orderId= localStorage.getItem("orderId");
const amountToto= localStorage.getItem("amountTotalCart");

const mainConfirm = document.querySelector("#main-orderConfirm");
const div = document.createElement("div");
div.setAttribute("class","confirmOrder");
div.innerHTML = `<h2>Confirmation de votre commande</h2><br>
                 <p> Numéro de commande: ${orderId} </p>
                 <p> D'un montant total de: ${amountToto} €</p> <br>
                 <p>Nous vous remerciant de vos achats sur Orinoco, au plaisir de vous revoir.</p>`;

mainConfirm.appendChild(div);

localStorage.removeItem("amountTotalCart");
localStorage.removeItem("orderId");
localStorage.removeItem("productsCart");
localStorage.removeItem("quantityCart");