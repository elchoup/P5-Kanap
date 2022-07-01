let items = document.getElementById ('items');

function createLien(canap){
    const lienCanap = document.createElement('a');
    lienCanap.setAttribute('href', './product.html?id=' + canap._id);
    return lienCanap;
};

function createArticle(){
    const artcl = document.createElement('article');
    return artcl;
};

function createImg(canap){
    const imgCanap = document.createElement('img');
    imgCanap.setAttribute('src', canap.imageUrl);
    imgCanap.setAttribute('alt', canap.altTxt);
    console.log(imgCanap);
    return imgCanap;
    
};

function createName(canap){
    const nameCanap = document.createElement('h3');
    nameCanap.classList.add('productName');
    nameCanap.textContent = canap.name;
    return nameCanap;
};

function createDescription(canap){
    const descCanap = document.createElement('p');
    descCanap.classList.add('productDescription');
    descCanap.textContent = canap.description;
    return descCanap;

};


fetch('http://localhost:3000/api/products')
    .then (function (res){
    if (res.ok){
        return res.json();
    }})

    .then (function (canapList){
        console.log(canapList);
        for (canap of canapList){
            let lien = createLien(canap);
            let article = createArticle();
            let image = createImg(canap);
            let nom = createName(canap);
            let description = createDescription(canap);

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










    
















