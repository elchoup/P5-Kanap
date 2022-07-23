// On recupère l'element section ayant pour id 'items'
let items = document.getElementById ('items');

// Création du <a href ="./product.html?id='idcanap'"></a>
function createLien(canap){
    const lienCanap = document.createElement('a');
    lienCanap.setAttribute('href', './product.html?id=' + canap._id);
    return lienCanap;
};

// Création de <article></article>
function createArticle(){
    const artcl = document.createElement('article');
    return artcl;
};

// Création de <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
function createImg(canap){
    const imgCanap = document.createElement('img');
    imgCanap.setAttribute('src', canap.imageUrl);
    imgCanap.setAttribute('alt', canap.altTxt);
    console.log(imgCanap);
    return imgCanap;
    
};

// Création de <h3 class="productName">Kanap name1</h3>
function createName(canap){
    const nameCanap = document.createElement('h3');
    nameCanap.classList.add('productName');
    nameCanap.textContent = canap.name;
    return nameCanap;
};

// Création de <p class="productDescription">Dis enim malesuada risus....</p>
function createDescription(canap){
    const descCanap = document.createElement('p');
    descCanap.classList.add('productDescription');
    descCanap.textContent = canap.description;
    return descCanap;

};

// Récupération de la liste des canapé via l'API
fetch('http://localhost:3000/api/products')
    .then (function (res){
    if (res.ok){
        return res.json();
    }})

    .then (function (canapList){
        // Récupération de chaque canapé et création des variables 
        //qui exécutent les fonctions pour chaque canapé
        for (canap of canapList){
            let lien = createLien(canap);
            let article = createArticle();
            let image = createImg(canap);
            let nom = createName(canap);
            let description = createDescription(canap);
        
            //Remplir le html via des appendChild en partant de l'élément section récupéré plus tôt
            items.appendChild(lien);
            lien.appendChild(article);
            article.appendChild(image);
            article.appendChild(nom);
            article.appendChild(description);
         
        }
    
    })

    .catch (function(err){
        //Une erreur est survenue
    });










    
















