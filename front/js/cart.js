let cartItems = document.getElementById('cart__items');

function createArticle(canap) {
    const article = document.createElement('article');
    article.classList.add('cart__item');
    article.setAttribute('data-id', canap.idCanap);
    article.setAttribute('data-color', canap.colorChoice);
    return article;
}

function createDivImg() {
    const divImg = document.createElement('div');
    divImg.classList.add('cart__item__img');
    return divImg;

}

function createImg(canap) {
    const imgCanap = document.createElement('img');
    imgCanap.setAttribute('src', canap.imageUrl);
    imgCanap.setAttribute('alt', canap.altTxt);
    return imgCanap;

}

function createDivContent() {
    const divContent = document.createElement('div');
    divContent.classList.add('cart__item__content');
    return divContent;
}

function createDivDescription() {
    const divDescription = document.createElement('div');
    divDescription.classList.add('cart__item__content__description');
    return divDescription;
}

function createName(canap) {
    const nameCanap = document.createElement('h2');
    nameCanap.textContent = canap.name;
    return nameCanap;
}

function createColor(canap) {
    const colorCanap = document.createElement('p');
    colorCanap.textContent = canap.colorChoice;
    return colorCanap;
}

function createPrice(canap) {
    const priceCanap = document.createElement('p');
    priceCanap.textContent = (canap.price) + '€';
    return priceCanap;
}

function createDivSettings() {
    const divSettings = document.createElement('div');
    divSettings.classList.add('cart__item__content__settings');
    return divSettings;
}

function createDivQty() {
    const divQty = document.createElement('div');
    divQty.classList.add('cart__item__content__settings__quantity');
    return divQty;
}

function createQty() {
    const qty = document.createElement('p');
    qty.textContent = 'Qté : ';
    return qty;
}

function createInputQty(canap) {
    const inputQty = document.createElement('input');
    inputQty.setAttribute('type', 'number');
    inputQty.classList.add('itemQuantity');
    inputQty.setAttribute('name', 'itemQuantity');
    inputQty.setAttribute('min', '1');
    inputQty.setAttribute('max', '100');
    inputQty.setAttribute('value', canap.quantitySelect);
    return inputQty;
}

function createDivDelete() {
    const divDelete = document.createElement('div');
    divDelete.classList.add('cart__item__content__settings__delete');
    return divDelete;
}

function createDeleteItem() {
    const deleteItem = document.createElement('p');
    deleteItem.classList.add('deleteItem');
    deleteItem.textContent = 'supprimer';
    return deleteItem;
}

let totalPrix = [];
let totalQty = [];

if (localStorage.getItem('stock') != null) {
    let stockCanapLinea = localStorage.getItem('stock');
    stockCanapJson = JSON.parse(stockCanapLinea);
}

async function fetchCanap() {

    for (let i = 0; i < stockCanapJson.length; i++) {

        await fetch('http://localhost:3000/api/products/' + stockCanapJson[i].idCanap)

            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })


            .then(function (infoCanap) {

                let artcl = createArticle(stockCanapJson[i]);
                let imgDiv = createDivImg();
                let Img = createImg(infoCanap);
                let contentDiv = createDivContent();
                let descriptionDiv = createDivDescription();
                let name = createName(infoCanap);
                let color = createColor(stockCanapJson[i]);
                let price = createPrice(infoCanap);
                let settingsDiv = createDivSettings();
                let qtyDiv = createDivQty();
                let quantity = createQty();
                let qtyInput = createInputQty(stockCanapJson[i]);
                let deleteDiv = createDivDelete();
                let itemDelete = createDeleteItem();

                cartItems.appendChild(artcl);
                artcl.appendChild(imgDiv);
                imgDiv.appendChild(Img);
                cartItems.appendChild(contentDiv);
                contentDiv.appendChild(descriptionDiv);
                descriptionDiv.appendChild(name);
                descriptionDiv.appendChild(color);
                descriptionDiv.appendChild(price);
                contentDiv.appendChild(settingsDiv);
                settingsDiv.appendChild(qtyDiv);
                qtyDiv.appendChild(quantity);
                qtyDiv.appendChild(qtyInput);
                settingsDiv.appendChild(deleteDiv);
                deleteDiv.appendChild(itemDelete);

                itemDelete.onclick = (event) => {

                    let lol = itemDelete.closest('article');
                    event.target.value = lol.remove();

                }

                // Calcul du total du prix  de la quantité
                // Retrouver les différents prix et  quantités selectionnées dans le panier
                let calculPrix = infoCanap.price * stockCanapJson[i].quantitySelect;
                let qtyInPanier = stockCanapJson[i].quantitySelect;

                // Mettre les différentes quantité dans le tableau totalQty
                totalPrix.push(calculPrix);
                totalQty.push(qtyInPanier);

                //Calcul de la somme des prix et quantités.
                let sumPrice = totalPrix.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                let sumQty = totalQty.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

                // Ajout des resultats au html
                let total$ = document.getElementById('totalPrice');
                total$.innerHTML = sumPrice;
                let totalQUantity = document.getElementById('totalQuantity');
                totalQUantity.innerHTML = sumQty;

            })
    }
}

fetchCanap();

let firstName = document.getElementById('firstName');
let firstNameError = document.getElementById('firstNameErrorMsg');
let lastName = document.getElementById('lastName');
let lastNameError = document.getElementById('lastNameErrorMsg');
let address = document.getElementById('address');
let addressError = document.getElementById('addressErrorMsg');
let city = document.getElementById('city');
let cityError = document.getElementById('cityErrorMsg');
let email = document.getElementById('email');
let emailError = document.getElementById('emailErrorMsg');
let order = document.getElementById('order');

firstName.addEventListener('input', (event) => {
    if (event.target.value.match(/^[A-Za-z]+[ \-']?[A-Za-z]+$/)) {
        firstNameError.innerHTML = '';

    } else {
        firstNameError.innerHTML = 'Veuillez saisir lettres espace \' et - uniquement';
    }
});


lastName.addEventListener('input', (event) => {
    if (event.target.value.match(/^[A-Z]+[ \-']?[A-Z]+$/)) {
        lastNameError.innerHTML = '';
    } else {
        lastNameError.innerHTML = 'Veuillez saisir des lettres en MAJUSCULE espace \' et - uniquement';

    }
});

address.addEventListener('input', (event) => {
    if (event.target.value.match(/^[0-9]+?[A-Za-z,\. ]+[A-Za-z]+$/)) {
        addressError.innerHTML = '';
    } else {
        addressError.innerHTML = "Veuillez entrer le numéro et le nom de la rue"
    }
});

city.addEventListener('input', (event) => {
    if (event.target.value.match(/^[0-9]{5}[A-Za-z,-\. ]+[A-Za-z]+$/)) {
        cityError.innerHTML = '';
    } else {
        cityError.innerHTML = 'Veuillez entrer le code postal suivi de la ville'
    }

});

email.addEventListener('input', (event) => {
    if (event.target.value.match(/^[0-9A-Za-z,\-_\. ]+[@][A-Za-z]+[\.]([com]{3}|[fr]{2})$/)) {
        emailError.innerHTML = '';
    } else {
        emailError.innerHTML = 'Veuillez entrer une adresse mail valide'
    }
});

order.onclick = (event) => {
    if (firstNameError.innerHTML != '') {
        event.preventDefault();
        alert('Erreur saisie du prenom')
    }

    if (lastNameError.innerHTML != '') {
        event.preventDefault();
        alert('Erreur saisie du NOM')
    }

    if (addressError.innerHTML != '') {
        event.preventDefault();
        alert('Erreur saisie de l\'adresse')
    }

    if (cityError.innerHTML != '') {
        event.preventDefault();
        alert('Erreur de saisie de la ville')
    }

};














