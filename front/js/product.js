const { json } = require("body-parser");
const { get } = require("http");

// Récupération de la chaine de requette dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

// Récupération de l'id du produit
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

// Récupération du numéro id
const idProduct = urlSearchParams.get("id");
console.log(idProduct);


//Récupération des articles l'API
fetch("http://localhost:3000/api/products/" + idProduct)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    }).then(function (product) {

        const imageProduct = document.createElement('img');

        // Déclaration de la classe à l'image
        const itemImg = document.querySelector(".item__img");
        itemImg.appendChild(imageProduct);
        imageProduct.setAttribute('src', product.imageUrl);
        imageProduct.setAttribute('alt', product.altTxt);

        // Affichage du nom
        const nameProduct = product.name;
        const title = document.getElementById('title');
        title.innerHTML = nameProduct;

        // Affichage du prix
        const priceProduct = product.price;
        const price = document.getElementById('price');
        price.innerHTML = priceProduct;

        // Affichage de description du produit
        const descriptionProduct = product.description;
        const description = document.getElementById('description');
        description.innerHTML = descriptionProduct;

        // Récupération des couleurs
        const select = document.getElementById('colors');

        for (color of product.colors) { // Création d'une boucle pour afficher les couleurs

            // on déclare la variable
            const optionProduct = document.createElement('option');
            // On définit la valeur à la variable
            optionProduct.setAttribute('value', color);
            optionProduct.innerHTML = color;
            // Ajoute l'enfant au parent "select"
            select.appendChild(optionProduct);
        }
    })
    .catch(function (err) {
        // Une erreur est survenue
    });


names.push({ colors, })

let choixProduit = document.getElementById(Produit);


// Récupération des valeurs pour les mettre dans le localstorage
// localStorage.setItem("")



array
json.
    string

getElementById(title)

let monPanier = [];
names[0] = Prompt("New member name?");
localStorage.setItem("names", JSON.stringify(names));

//...
var storedNames = JSON.parse(localStorage.getItem("names"));