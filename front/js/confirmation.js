
function recoveryOrder() {

    // Récupération de la chaine de requette dans l'url
    const urlOrder = window.location.search;

    // Récupération de l'id du produit
    const urlSearchParamsOrder = new URLSearchParams(urlOrder);
    const orderId = urlSearchParamsOrder.get("orderId");

    document.getElementById("orderId").textContent = `${orderId}`;

}
recoveryOrder();