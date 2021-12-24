// Récupération des articles l'API
fetch("http://localhost:3000/api/products/" + idProduct)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    }).then(function (product) {

        // Création de l'article
        const article = document.createElement('article');

        // Création de la classe "cart__item"
        cart__item.classList.add('cart__item');





        // Déclaration de la classe à l'image
        //const itemImg = document.querySelector(".item__img");
        //itemImg.appendChild(imageProduct);

        // Création de la div
        const divImage = document.createElement('div');
        // Création de classe
        itemImage.classList.add('cart__item__img');
        // Affecter l'enfant au parent dans la classe
        article.appendChild(cart__item__img);

        // Création de l'image
        const img = document.createElement('img');
        img.setAttribute('src', product.imageUrl);
        // Affectation du texte alternatif à l'image
        img.setAttribute('alt', product.altTxt);
    }

    );