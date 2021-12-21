
//Récupération des articles l'API
fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (arrayProducts) {
        console.log(arrayProducts);
        for (product of arrayProducts) { //Création d'une boucle pour afficher les éléments

            const a = document.createElement('a'); //Création d'un nouveau élément 
            a.setAttribute('href', './product.html?id=' + product._id); //Récupération de l'attribut

            // Création de l'article
            const article = document.createElement('article');

            // Création de l'image
            const img = document.createElement('img');
            img.setAttribute('src', product.imageUrl);
            // Affectation du texte alternatif à l'image
            img.setAttribute('alt', product.altTxt);

            // Création du titre
            const productName = document.createElement('h3');

            // Création de classe
            productName.classList.add('productName');
            // Affectation de la valeur dans la classe
            productName.textContent = product.name;

            // Création du p
            const productDescription = document.createElement('p');
            productDescription.classList.add('productDescription');
            productDescription.textContent = product.description;

            // Affecter l'enfant au parent dans la classe
            article.appendChild(img);
            article.appendChild(productName);
            article.appendChild(productDescription);

            a.appendChild(article);

            // On va chercher l'élément
            const items = document.getElementById('items');
            // On affecte l'enfant "a" dans le parent "items"
            items.appendChild(a);
        }

    })
    .catch(function (err) {
        // Une erreur est survenue
        return error;
    });

