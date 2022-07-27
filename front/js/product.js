// Recupération de l'id dans l'URL de la page
let params = new URL(window.location.href).searchParams;
let id = params.get('id');

const itemImg = document.getElementsByClassName('item__img');

// Création de <img src='imageUrl' alt='altTxt'>
function createImg(canap) {
    const imgCanap = document.createElement('img');
    imgCanap.setAttribute('src', canap.imageUrl);
    imgCanap.setAttribute('alt', canap.altTxt);
    return imgCanap;

};

// Creation de <option value='couleur'>couleur</option>
function createColor(clr) {
    const colorCanap = document.createElement('option');
    colorCanap.setAttribute('value', clr);
    colorCanap.textContent = clr;
    return colorCanap;
};

// Récupération d'un seul canapé via l'API en utilisant l'id dans l'URL
fetch('http://localhost:3000/api/products/' + id)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function (infoCanap) {
        console.log(infoCanap);
        let image = createImg(infoCanap);
        itemImg[0].appendChild(image);

        let nom = document.getElementById('title');
        nom.textContent = infoCanap.name;

        let prix = document.getElementById('price');
        prix.textContent = infoCanap.price;

        let description = document.getElementById('description');
        description.textContent = infoCanap.description;

        let colors = infoCanap.colors;

        // Creation de la variable du select ayant pour id colors
        let colorSelect = document.getElementById('colors');

        // On récupére un couleur dans le tableau des couleurs et on appelle notre fonction qui s'execute en fonction de la couleur.
        for (color of colors) {
            let couleur = createColor(color);
            colorSelect.appendChild(couleur);

        };

        //Création de la variable addToCart qui correspond au bouton addtocart
        let addToCart = document.getElementById('addToCart');

        //Création de la variable quantity qui correspond à l'input ayant pour id quantity
        let quantity = document.getElementById('quantity');
        

        
        // Action du click 'ajouter au panier'
        addToCart.onclick = (event) => {

            // Variable pour récuperer la valeur de colorSelect
            let colorSelectvalue = colorSelect.options[colorSelect.selectedIndex].value;
            if (colorSelectvalue != ""){
                 
            
            event.preventDefault();
            
            let valid = document.querySelector('form');
            if (!valid.checkValidity()){
                valid.reportValidity();
                quantity.value = 0;
            }

            // Recuperation des données du localstorage. 
            // On recupère stockCanapSJson('tableau') avec la variable stockCanapLinea et on cree stockCanapJson('tableau') qui parse stockCanapLinea
            let stockCanapJson = [];

            if ( localStorage.getItem('stock') != null ) {
                let stockCanapLinea = localStorage.getItem('stock');
                stockCanapJson = JSON.parse(stockCanapLinea);
            }

            let newCanap = {
                idCanap : id,
                colorChoice : colorSelectvalue,
                quantitySelect : parseInt(quantity.value)
            };

            let saveIndex = -1;
            
            // Création d'un for avec le i (représentant l'index d'une ligne du tableau).
            for (let i = 0; i < stockCanapJson.length; i++) {
                if (stockCanapJson[i].idCanap === id && stockCanapJson[i].colorChoice === colorSelectvalue){
                    saveIndex = i;
                    break;
                }
            }

            if (saveIndex != -1){
                // cas ou le canap est présent
                // On ajoute la quantité de canapé nouvellement selectionné à l'ancienne.
                stockCanapJson[saveIndex].quantitySelect += parseInt(quantity.value); 
            }else{
                // cas ou le canap est absent.
                // Création d'une nouvelle ligne dans le tableau
                stockCanapJson.push(newCanap);
            }  
            
            // fonction pour trier les canapé par id
            stockCanapJson.sort((a,b) => {
                if (a.idCanap<b.idCanap){
                    return -1;
                }
                if(a.idCanap>b.idCanap){
                    return 1;
                }
                else{
                    return 0;
                }
            
            });

            // On enregistre les données dans le localstorage
            let stockLinea = JSON.stringify(stockCanapJson);
            localStorage.setItem('stock', stockLinea);
        }else{
            alert('choisissez une couleur')
        }

    }

    })
    

    .catch(function (err) {
        // Une erreur est survenue
    });







