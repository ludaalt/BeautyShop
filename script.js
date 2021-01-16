function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

const productButton = document.getElementById('product-button');
productButton.addEventListener('click', () => {

    readTextFile("product.json", function(text){
        var data = JSON.parse(text);
        
        const jsonContainer = document.getElementById('json-container');
        for (let i = 0; i < data.product.length; i += 1) {
            const card = document.createElement('div');
            card.classList.add('product-card', 'flex', 'content-center');

            const cardTitle = document.createElement('h3');
            cardTitle.classList.add('product-card__title');
            cardTitle.innerHTML = data.product[i].name;
            card.appendChild(cardTitle);
            
            const cardPrice = document.createElement('p');
            cardPrice.classList.add('product-card__price');
            cardPrice.innerHTML = data.product[i].price;
            card.appendChild(cardPrice);

            const cardButton = document.createElement('button');
            cardButton.classList.add('button', 'button-buy');
            cardButton.innerHTML = 'Купить';
            card.appendChild(cardButton);

            const imageWrap = document.createElement('p');
            imageWrap.classList.add('order-less');
            card.appendChild(imageWrap);

            const image = document.createElement('img');
            image.setAttribute('src', data.product[i].img);
            image.setAttribute('alt', 'Product item');
            image.setAttribute('width', '125');
            image.setAttribute('height', '166');
            imageWrap.appendChild(image);

            const productContainer = document.getElementById('product-container');
            productContainer.appendChild(card);
        }
    });
});


const modal = document.querySelector("#modal"),
	  modalOverlay = document.querySelector("#modal-overlay"),
      closeButton = document.querySelector("#close-button"),
      cardTitles = document.querySelectorAll('.product-card__title'),
      openButtons = document.querySelectorAll('.button-buy');

closeButton.addEventListener("click", () => {
	modal.classList.toggle("closed");
	modalOverlay.classList.toggle("closed");
});

openButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let i = index;
        console.log(i);
        modal.classList.toggle("closed");
        modalOverlay.classList.toggle("closed");
        
        const cardTitle = document.querySelector('#request-item');
        cardTitle.value = cardTitles[i].innerHTML;
    })    
});