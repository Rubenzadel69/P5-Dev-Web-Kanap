// Pour récupéer le localstorage
let productLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productLocalStorage);
for (let productInStorage of productLocalStorage) {

    let product = productInStorage;
    console.log(product);
    //console.log(product.idProduct);


    // Récupération des articles l'API
    fetch("http://localhost:3000/api/products/" + product.idProduct)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        }).then(function (productData) {

            console.log(productData);

            quantityTotal(product.quantity);

            priceProductTotal(productData.price * product.quantity);


            // Création de l'article
            const productArticle = document.createElement('article');
            // Affectation de la classe "cart__item"
            productArticle.classList.add('cart__item');
            productArticle.setAttribute("data-id", product.idProduct);
            productArticle.setAttribute("data-color", product.color);

            const imageDiv = document.createElement('div');
            // Affectation de la valeur dans la classe
            imageDiv.classList.add('cart__item__img');
            productArticle.appendChild(imageDiv)

            // Création de l'image
            const productImg = document.createElement('img');
            productImg.setAttribute('src', productData.imageUrl);
            productImg.setAttribute('alt', productData.altTxt);
            // Affecter l'enfant au parent dans la classe
            imageDiv.appendChild(productImg);

            // Création de la div "content"
            const contentDiv = document.createElement('div');
            // Affectation de la valeur dans la classe
            contentDiv.classList.add('cart__item__content');
            productArticle.appendChild(contentDiv);

            // Création de la div "description"
            const descriptionDiv = document.createElement("div");
            descriptionDiv.classList.add('cart__item__content__description');
            contentDiv.appendChild(descriptionDiv);

            // Création du titre h2 description
            const titleProduct = document.createElement('h2');
            titleProduct.textContent = productData.name;

            // Création du p couleur
            const colorsProduct = document.createElement('p');
            colorsProduct.textContent = product.color;

            // Création du p prix
            const priceProduct = document.createElement('p');
            priceProduct.textContent = productData.price + "€";

            // Affectation des enfants aux parents de la div 'desciption'
            descriptionDiv.appendChild(titleProduct);
            descriptionDiv.appendChild(colorsProduct);
            descriptionDiv.appendChild(priceProduct);

            // Création de la div settings
            const productSetting = document.createElement("div");
            productSetting.classList.add('cart__item__content__settings');

            // Création de la div settings quantity
            const settingsQuantity = document.createElement("div");
            settingsQuantity.classList.add('cart__item__content__settings__quantity');
            productSetting.appendChild(settingsQuantity);

            // Création du p quantité
            const qteProduct = document.createElement('p');
            qteProduct.innerHTML = 'Qté :';



            // Création de l'input
            const qteInput = document.createElement('input');
            qteInput.value = product.quantity;
            qteInput.setAttribute("type", "number");
            qteInput.setAttribute("name", "itemQuantity");
            qteInput.setAttribute("min", 1);
            qteInput.setAttribute("max", 100);
            qteInput.setAttribute("value", 42);

            qteInput.addEventListener("change", (event) => {
                event.preventDefault();
                // Cible des différents éléments que l'on veut modifier
                const itemQuantityModify = event.target.closest(".cart__item");
                modifyQuantity(itemQuantityModify.dataset.id, itemQuantityModify.dataset.color, event.target.value);

            })

            settingsQuantity.appendChild(qteProduct);
            settingsQuantity.appendChild(qteInput);

            // Création de la div settings delete
            const settingsDelete = document.createElement("div");
            settingsDelete.classList.add('cart__item__content__settings__delete');

            // Création du p suprression
            const deleteProduct = document.createElement('p');
            deleteProduct.classList.add('deleteItem');
            deleteProduct.innerHTML = "Supprimer";
            deleteProduct.addEventListener("click", (event) => {
                event.preventDefault();
                const itemDelete = event.target.closest(".cart__item");
                deleteProductItem(itemDelete.dataset.id, itemDelete.dataset.color);
                console.log(itemDelete);
            })

            settingsDelete.appendChild(deleteProduct);

            productSetting.appendChild(settingsDelete);
            productArticle.appendChild(productSetting);

            document.getElementById("cart__items").appendChild(productArticle);

        }

        );
}

function quantityTotal(newQuantity) {

    // Affichage de la quantité
    const productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = parseInt(productTotalQuantity.innerHTML) + newQuantity;
}

function priceProductTotal(newPrice) {

    // Affichage du prix
    const productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = parseInt(productTotalPrice.innerHTML) + newPrice;
}

function deleteProductItem(id, color) {
    console.log(id, color);
    // Récupération du localStorage
    let productLocalStorage = JSON.parse(localStorage.getItem("panier"));

    // L'élement va chercher dnas le localstorage
    let index = productLocalStorage.findIndex(product => {
        if (product.idProduct == id && product.color == color) {
            return product;
        }
    });
    console.log(index);
    // Index strictement supérieur
    if (index > -1) {
        // Utilise la méthode pour retirer
        productLocalStorage.splice(index, 1);
        // Mettre le produit dans le localStorage
        localStorage.setItem("panier", JSON.stringify(productLocalStorage));
    }
    location.reload();
}


function modifyQuantity(id, color, quantity) {

    let productLocalStorage = JSON.parse(localStorage.getItem("panier"));

    productLocalStorage.filter(product => {
        if (product.idProduct == id && product.color == color) {
            product.quantity = parseInt(quantity);
        }
    });

    // Mettre le produit dans le localStorage
    localStorage.setItem("panier", JSON.stringify(productLocalStorage));


    let productTotalQuantity = document.getElementById('totalQuantity');

    // Définir un total pour rajouter et calculer
    let total = 0;

    // On va modifier chaque quantité de chaque produit
    productLocalStorage.forEach(product => {
        total += product.quantity; // Calcule la somme puis affecte le résultat à la variable
        console.log(productLocalStorage);
    });

    productTotalQuantity.innerHTML = total;
    console.log(productTotalQuantity);

    // Va recharger la page et permettre au prix de se calculer à nouveau
    location.reload();
}



function getForm() {

    const regExEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    const regExFirstLastNameCity = new RegExp("^[A-Za-z-\s]+$");
    const regExAdress = new RegExp("^[0-9]{1,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$");

    // Récupération des informations du formulaire
    const recoveryFirstname = document.getElementById('firstName');
    const recoveryLastname = document.getElementById('lastName');
    const recoveryAdress = document.getElementById('address');
    const recoveryCity = document.getElementById('city');
    const recoveryEmail = document.getElementById('email');

    let formOk = true;

    // Vérification de la case prénom
    const validatorFirstName = document.getElementById("firstNameErrorMsg");
    if (regExFirstLastNameCity.test(recoveryFirstname.value)) {
        validatorFirstName.innerHTML = "OK";
    }
    else {
        validatorFirstName.innerHTML = "Chiffres et symboles ne sont pas autorisés";
        formOk = false;
    }

    // Vérification formulaire nom
    const validatorLastName = document.getElementById("lastNameErrorMsg");
    if (regExFirstLastNameCity.test(recoveryLastname.value)) {
        validatorLastName.innerHTML = "OK";
    }
    else {
        validatorLastName.innerHTML = "Chiffres et symboles ne sont pas autorisés";
        formOk = false;
    }

    // Vérification formulaire adresse
    const validatorAdress = document.getElementById("addressErrorMsg");
    if (regExAdress.test(recoveryAdress.value)) {
        validatorAdress.innerHTML = "OK";
    }
    else {
        validatorAdress.innerHTML = "Veuillez indiquer un numéro et une rue";
        formOk = false;
    }

    // Vérification formulaire ville
    const validatorCity = document.getElementById("cityErrorMsg");
    if (regExFirstLastNameCity.test(recoveryCity.value)) {
        validatorCity.innerHTML = "OK";
    }
    else {
        validatorCity.innerHTML = "Chiffres et symboles ne sont pas autorisés";
        formOk = false;
    }

    // Vérification formulaire email
    const validatorEmail = document.getElementById("emailErrorMsg");
    if (regExEmail.test(recoveryEmail.value)) {
        validatorEmail.innerHTML = "OK";
    }
    else {
        validatorEmail.innerHTML = "L'email n'est pas valide";
        formOk = false;
    }

    return formOk;
}


const btn_command = document.getElementById('order');

// Envoie des informations du formulaire grâce à l'event
btn_command.addEventListener('click', (event) => {
    event.preventDefault();

    let formOk = getForm();

    if (formOk) {
        postForm()
    }

})

function postForm() {

    // Récupération des informations du formulaire
    const recoveryFirstname = document.getElementById('firstName');
    const recoveryLastname = document.getElementById('lastName');
    const recoveryAdress = document.getElementById('address');
    const recoveryCity = document.getElementById('city');
    const recoveryEmail = document.getElementById('email');

    // Construction d'un tableau pour les informations du formulaire
    let idProducts = [];
    for (let f = 0; f < productLocalStorage.length; f++) {
        idProducts.push(productLocalStorage[f].idProduit);
        console.log(idProducts);
    }


    let contact = {
        firstName: recoveryFirstname.value,
        lastName: recoveryLastname.value,
        city: recoveryAdress.value,
        adress: recoveryCity.value,
        mail: recoveryEmail.value,
    };

    let product = productInStorage
    console.log(product.idProduct);







    // Méthode Post pour envoyer et récupérer des données
    fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    },
    )
        .then(function (res) {
            if (res.ok) {
                return res.json();
                document.location.href = "confirmation.html";
            }
        })
}