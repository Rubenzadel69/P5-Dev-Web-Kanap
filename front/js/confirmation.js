
function recoveryOrder() {

    // Récupération de la chaine de requette dans l'url
    const urlOrder = window.location.search;

    // Récupération de l'id du produit
    const urlSearchParamsOrder = new URLSearchParams(urlOrder);
    const orderId = urlSearchParamsOrder.get("orderId");

    // Récupération de l'emplacement et affectation de l'id
    document.getElementById("orderId").textContent = `${orderId}`;
    localStorage.clear();
}
recoveryOrder();