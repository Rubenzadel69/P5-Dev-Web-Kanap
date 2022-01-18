
function getId() {
    // Récupération de la chaine de requette dans l'url
    const queryString_url_id = window.location.search;
    console.log(queryString_url_id);

    // Récupération de l'id du produit
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    console.log(urlSearchParams);
    return urlSearchParams.get("id");
}


// Récupération du numéro id
const idProduct = getId();
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
        console.log("Une erreur est survenue");
    });

function controlQuantity(qte) {
    // La fonction parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée
    let theQuantity = parseInt(qte);
    let isvalid = true;
    if (theQuantity < 1 || theQuantity > 100) {
        isvalid = false;
        alert("Veuillez choisir une quantité comprise entre 1 et 100");
    }
    else {
        return isvalid;
    }
}


// Déclaration de la variable relié à l'id du bouton du html
const btn_ajouterauPanier = document.querySelector('#addToCart');
// Création d'un événement pour envoyer les données
btn_ajouterauPanier.addEventListener("click", () => {



    /*const validatorQuatity = controlQuantity(document.getElementById('quantity').value);
    if (validatorQuatity) {
        panier = JSON.parse(panierLocalStorage);
    }
    else {
        alert("Indiquez une bonne quantité");
    }*/

    const colorSelect = document.getElementById('colors');
    const choiceColor = colorSelect.value;

    const itemQuantity = document.getElementById('quantity');
    const choiceQuantite = itemQuantity.value;

    var panierLocalStorage = localStorage.getItem('panier');
    let panier = [];
    if (panierLocalStorage) {
        panier = JSON.parse(panierLocalStorage);
        let findObject = false;
        for (index in panier) {
            console.log(panier[index]);
            if (panier[index].idProduct == getId() && panier[index].color == choiceColor) {
                panier[index].quantity = parseInt(panier[index].quantity) + parseInt(choiceQuantite);
                findObject = true;
            }
        }
        // Le "!" avant la variable fait l'inverse
        if (!findObject) {
            panier.push({
                'idProduct': getId(),
                'color': choiceColor,
                'quantity': parseInt(choiceQuantite)
            })
        }
    } else { // Renvoie au tableau initial 
        // Création du tableau d'objet
        panier = [
            {
                'idProduct': getId(),
                'color': choiceColor,
                'quantity': parseInt(choiceQuantite),
            }
        ]
    }

    // Mettre l'objet "panier" dans le localstorage
    localStorage.setItem("panier", JSON.stringify(panier));
    alert('Produit(s) ajouté(s)');

}

)

