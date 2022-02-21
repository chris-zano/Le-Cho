if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready()
}

function ready() {
    const cartContent = document.querySelector('.content-section');

    arrayOnLoad()

    function getFromStorage() {
        let storageArray;
        const arrayLS = localStorage.getItem('array')
        if(arrayLS === null) {
            storageArray = [];
        }
        else {
            storageArray = arrayLS;
        }
        return storageArray;
    }

    function arrayOnLoad() {
        let newArr = getFromStorage();
        var myArr = JSON.parse(newArr)
        var total = 0
        for(var i = 0; i < myArr.length-1; i++) {
            var img = myArr[i].imgSrc;
            var title = myArr[i].title;
            var price = myArr[i].price;
            var qty = parseInt(myArr[i].qty);
            price = parseFloat(price.replace('Ghc',''))
            total = total +(qty*price);
            total = Math.round(total*100)/100
            
            var cartRow = document.createElement('div');
            cartRow.classList.add('cart-items')
            cartRow.innerHTML = `
            <div class="image-title cart-column">
            <img src="${img}" width="100" height="100" class="cart-item-image">
            <span class="cart-item">${title}</span>
            </div>
            <span class="cart-price cart-column">Ghc ${price}</span>
            <div class="cart-quantity cart-column">
                <input type="number" value=${qty} class="cart-quantity-input" min="1">
            </div>
        `;
        var cartTotal = document.createElement('div');
        cartTotal.classList.add('cart-total')
        cartTotal.innerHTML = `
        <span class="cart-total-price" > GHC ${total}</span>
        `
           
            cartContent.append(cartRow);
        }
        
       
        cartContent.append(cartTotal)
    }
    function clearCart() {
        localStorage.setItem('array',null)
    }

    document.querySelector('form').addEventListener('submit',clearCart)
}