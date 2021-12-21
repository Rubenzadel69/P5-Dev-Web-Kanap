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

        // 1er élément du tableaux d'éléments qui ont la classe "item__img"
        const itemImg = document.getElementsByClassName("item__img")[0];
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

        const colorProduct = product.colors;

        for (color of product) { //Création d'une boucle pour afficher les couleurs
            const colorProduct = document.createElement('options');
        }
    })
    .catch(function (err) {
        // Une erreur est survenue
    });





// let monPanier = localStorage;
