
// Pour récupéer le localstorage
let productLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productLocalStorage);
for (let productInStorage of productLocalStorage) {

    let product = productInStorage;
    console.log(product);



    // Récupération des articles l'API
    fetch("http://localhost:3000/api/products/" + product.idProduct)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        }).then(function (productData) {

            console.log(productData);

            quantityTotal(product.quantity);

            priceProduct(product * product.quantity);

            /*
                        // Création de l'article
                        const productArticle = document.createElement('article');
                        // Affectation de la classe "cart__item"
                        productArticle.classList.add('cart__item');
                        productArticle.setAttribute("data-id", productLocalStorage[panier].idProduit)
                        productArticle.setAttribute("data-color", productLocalStorage[panier].color)
            
                        const imageDiv = document.createElement('div');
                        // Affectation de la valeur dans la classe
                        imageDiv.classList.add('cart__item__img');
                        productArticle.appendChild(imageDiv)
            
                        // Création de l'image
                        const productImg = document.createElement('img');
                        productImg.setAttribute('src', product.imageUrl);
                        productImg.setAttribute('alt', product.altTxt);
                        // Affecter l'enfant au parent dans la classe
                        imageDiv.appendChild(productImg);

                        
                        // Création de la div "content"
                        const contentDiv = document.createElement('div');
                        // Affectation de la valeur dans la classe
                        contentDiv.classList.add('cart__item__content');
            
                        // Création de la div "description"
                        const descriptionDiv = document.createElement("div");
                        descriptionDiv.classList.add('cart__item__content__description');
                        contentDiv.appendChild(descriptionDiv);
            
                        // Création du titre h2 description
                        const titleProduct = document.createElement('h2');
                        titleProduct.textContent = product.name;
                        
                        // Création du p couleur
                        const colorsProduct = document.createElement('p');
                        colorsProduct.textContent = product.colors;

                        // Création du p prix
                        const priceProduct = document.createElement('p');
                        priceProduct.textContent = product.price + "€";

                        Affectation des enfants aux parents de la div 'desciption'
                        descriptionDiv.appendChild(titleProduct);
                        descriptionDiv.appendChild(colorsProduct);
                        descriptionDiv.appendChild(priceProduct);

                        // Création de la div settings
                        const productSetting = document.createElement("div");
                        productSetting.classList.add('cart__item__content__settings');                        
            
                        // Création de la div settings quality
                        const settingsQuality = document.createElement("div");
                        settingsQuality.classList.add('cart__item__content__settings__quantity');
                        productSetting.appendChild(settingsQuality);
            
                        // Création du p quantité
                        const qteProduct = document.createElement('p');
                        qteProduct.innerHTML = 'Qté :';
            
                        // Création de l'input
                        const qteInput = document.createElement('input');

                        
                        qteInput.setAttribute("type", number);
                        qteInput.setAttribute("name", "itemQuantity");
                        qteInput.setAttribute("min", 1);
                        qteInput.setAttribute("max", 100);
                        qteInput.setAttribute("value", 42);

                        settingsQuality.appendChild(qteProduct);
                        settingsQuality.appendChild(qteInput);
            
                        // Création de la div settings delete
                        const settingsDelete = document.createElement("div");
                        settingsDelete.classList.add('cart__item__content__settings__delete');
            
                        // Création du p suprression
                        const deleteProduct = document.createElement('p');
                        deleteProduct.classList.add('deleteItem');
                        deleteProduct.innerHTML = "Supprimer";
                        settingsDelete.appendChild(deleteProduct);

                        productSetting.appendChild(settingsDelete);
                        productArticle.appendChild(productSetting);

            */
        }



        );
}

function quantityTotal(newQuantity) {

    // Affichage de la quantité
    const productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = parseInt(productTotalQuantity.innerHTML) + newQuantity;
}

function priceProduct(newPrice) {

    // Affichage du prix
    const productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = parseInt(productTotalPrice.innerHTML) + newPrice;
}

function deleteProduct() {
    // Suppression d'un produit 
    let btn_delete = document.querySelectorAll("deleteItem");

    for (let d = 0; d < btn_delete.length; d++) {
        btn_delete[d].addEventListener("click", (event) => {
            // Pour éviter qu'au clic, la page se recharge
            event.preventDefault();

            // Sélection du produit qui va être supprimé au clic
            let idProductDelete = productLocalStorage[d].idProduct;
            let colorProductDelete = productLocalStorage[d].color;

            // Méthode filter - suppréssion de l'élément cliqué et garde les autres éléments -> on utilise la fonction inversée avec '!'
            productLocalStorage = productLocalStorage.filter(el => el.idProduct !== idProductDelete);
            productLocalStorage = productLocalStorage.filter(el => el.color !== colorProductDelete);

            // Envoie dans le localstorage
            localStorage.setItem("panier", JSON.stringify(panier));

            // Alerte pour avertir que le produit a été suppimé
            alert("Ce produit a été supprimé du panier");
            // Permet de recharger la ressource depuis l'URL actuelle
            location.reload();
        })
    }
}
deleteProduct();





/*
function getForm() {

    let form = document.querySelector('cart__order__form');

    // On crée les expressions regEx
    const regExFirstLastNameCity = (value) => {
        return /^[A-Za-z,.'-\s]{3,20}$/.test(value);
    }

    const regExEmail = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }

    const regExAdress = (value) => {
        return /^[A-Za-z0-9\s]{5,60}$/.test(value);
    }

    // Donne la possibilité de modifier le prénom
    form.firstName.addEventListener('change', function () {
        validatorFirstName(this);
    })

    form.lastName.addEventListener('change', function () {
        validatorLastName(this);
    })

    form.city.addEventListener('change', function () {
        validatorCity(this);
    })

    form.email.addEventListener('change', function () {
        validatorEmail(this);
    })

    form.adress.addEventListener('change', function () {
        validatorAdress(this);
    })

    class formulaire {
        // On crée la classe avec les éléments qui la composent
        constructor() {
            this.firstName = document.querySelector("firstName").value;
            this.lastName = document.querySelector("lastName").value;
            this.address = document.querySelector("address").value;
            this.city = document.querySelector("city").value;
            this.email = document.querySelector("email").value;
        }
    }

    function firstNameControl() {
        // Vérification formulaire prénom
        const validatorFirstName = formulaireValues.firstName;
        if (regExFirstLastNameCity(validatorFirstName)) {
            validatorFirstName.innerHTML = "OK";
        }
        else {
            validatorFirstName.innerHTML = "Chiffres et symboles ne sont pas autorisés";
        }
    }

    function lastNameControl() {
        // Vérification formulaire nom
        const validatorLastName = formulaireValues.lastName;
        if (regExFirstLastNameCity(validatorLastName)) {
            validatorLastName.innerHTML = "OK";
        }
        else {
            validatorLastName.innerHTML = "Chiffres et symboles ne sont pas autorisés";
        }
    }

    function cityControl() {
        // Vérification formulaire ville
        const validatorCity = formulaireValues.cityControl;
        if (regExFirstLastNameCity(validatorCity)) {
            validatorCity.innerHTML = "OK";
        }
        else {
            validatorCity.innerHTML = "Chiffres et symboles ne sont pas autorisés";
        }
    }

    function emailControl() {
        // Vérification formulaire email
        const validatorEmail = formulaireValues.email;
        if (regExEmail(validatorEmail)) {
            validatorEmail.innerHTML = "OK";
        }
        else {
            validatorEmail.innerHTML = "L'email n'est pas valide";
        }
    }

    function adressControl() {
        // Vérification formulaire adresse
        const validatorAdress = formulaireValues.adressControl;
        if (regExAdress(validatorAdress)) {
            validatorAdress.innerHTML = "OK";
        }
        else {
            validatorAdress.innerHTML = "Chiffres et lettres sont autorisés sans ponctuation";
        }
    }

}
// On appelle la fonction
getForm();*/




// Envoie du fichier si tous les chams sont ok
/*(firstNameControl() && lastNameControl() && cityControl() && emailControl() && adresseControl()) {
// Du formulaire -> dans le localstorage
  localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
} else {
  alert("Veuillez bien remplir le formulaire");
}*/


// Récupération des valeurs du formulaire


function formSent() {
    // Envoie des informations du formulaire grâce à l'event
    const btn_command = document.getElementById('order');
    btn_command.addEventListener('click', () => {

        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            city: city.value,
            adress: adress.value,
            mail: mail.value,
        };

        let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));
        if (productInLocalStorage) {

        }
        else {
            productInLocalStorage = [];
            productInLocalStorage.push(contact);
            localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
        }
    })

}






// Méthode Post
/*fetch("http://localhost:3000/api/products/order", {
    method: 'POST',
)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })


// Pour sauvegarder
localStorage.setItem("panier", JSON.stringify(panier));*/