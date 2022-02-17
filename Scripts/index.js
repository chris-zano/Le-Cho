if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else {
    ready()
}

function ready() { 
    const card = document.querySelector('.container'),
          cartContent = document.querySelector('.content-section');

    card.addEventListener('click', addToCart);
    cartContent.addEventListener('click', removefromCart);

    function addToCart(e) {
        e.preventDefault();
        if(e.target.classList.contains('addToCart')) {
            const cardDetails = e.target.parentElement.parentElement;
            getCardInfo(cardDetails);
        }
    }
    function getCardInfo(cardDetails) {
        const cardInfo = {
            image: cardDetails.querySelector('img').src,
            title: cardDetails.querySelector('h4').textContent,
            price: cardDetails.querySelector('.item-price').textContent
        }
        //add to cart 
        addIntoCart(cardInfo);
    }

    function addIntoCart(card) {
        var cartRow =document.createElement('div');
        cartRow.classList.add('cart-items')
        cartRow.innerHTML = `
            <div class="image-title cart-column">
            <img src="${card.image}" width="100" height="100" class="cart-item-image">
            <span class="cart-item">${card.title}</span>
            </div>
            <span class="cart-price cart-column">${card.price}</span>
            <div class="cart-quantity cart-column">
                <input type="number" value="1" class="cart-quantity-input">
                <button class="btn btn-danger" type="button">X</button>
            </div>
        
        
        `;
        cartContent.append(cartRow);
        updateTotal()
    }

    function removefromCart(e) {
        if(e.target.classList.contains('btn-danger')) {
            e.target.parentElement.parentElement.remove();
        }
        updateTotal()
    }

    function updateTotal() {
        var cartContainer = document.getElementsByClassName('content-section')[0];
        var cartItems = cartContainer.getElementsByClassName('cart-items');
        var total = 0;
        for(var i =0; i < cartItems.length; i++) {
            var cartItem = cartItems[i];
            var priceElement = cartItem.getElementsByClassName('cart-price')[0];
            var qtyElement = cartItem.getElementsByClassName('cart-quantity-input')[0];

            //get the text from the elements
            var price = parseFloat(priceElement.innerText.replace('GHC',''));
            var quantity = Number(qtyElement.value);

            total = total + (price*quantity);
        }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('cart-total-price')[0].innerText = 'GHC '+ total;

    }

 }