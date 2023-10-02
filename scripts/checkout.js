if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready()
}

function ready() {
    const cartContent = document.querySelector('.content-section');
    document.querySelector('form').addEventListener('submit',submitOrder);
    var orderDetails ={
        contact: {},
        paymentMethod: "",
        cart : []
    };
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
    function submitOrder(e) {
        e.preventDefault()
        const name = document.querySelector('#name').value;
        const phoneNo = document.querySelector('#number').value;
        const useroLcation = document.querySelector('#location').value;
        orderDetails.contact.name = name;
        orderDetails.contact['Phone Number'] = phoneNo;
        orderDetails.contact.location = useroLcation;
        loadSummary(orderDetails);
    }

    function loadSummary(detail) {
        const info = document.createElement('div');
        info.classList.add('purchase-info');
        info.classList.add('purchase-grid')
        info.innerHTML = `
        <div class="info-contact">
            <p>Name: ${detail.contact.name}</p>
            <p>Tel: ${detail.contact['Phone Number']}</p>
            <p>Location: ${detail.contact.location}</p>
            <p>Payment Mode: Cash On delivery </p>
            <p id="par-total">Total: total</p>
        </div>
        <div class="info-cart" id="info-cart">
            
        </div>
        <div class="row" id="loaders">
            <img id="spinner" src="../Images/spinner.gif" width="150">
        </div>
        <div class="info-submit">
            <button id="confirm-btn">SUBMIT</button>
        </div>
        `;
        document.querySelector('body').append(info);
        const confirmBtn = document.getElementById('confirm-btn');
        confirmBtn.addEventListener('click',loadSpinners);
        appendItems()
    }    

    function appendItems() {
        const localArray = JSON.parse(localStorage.getItem('array'))

        for(var i=0; i<localArray.length-1; i++) {
            const itemTitle = localArray[i].title
            const itemQty = localArray[i].qty
            const infoItems = document.createElement('li')
            infoItems.innerHTML = `
                <li>${itemTitle} - ${itemQty} </li>
           `;
           document.getElementById('info-cart').append(infoItems)
        }
        const total = localArray[localArray.length-1];
        document.getElementById('par-total').textContent = total
    }

    function loadSpinners() {
        // show the spinner
        const spinner = document.querySelector('#spinner');
        spinner.style.display = 'block';

        // Show the image
        const sendEmailImg = document.createElement('img');
        sendEmailImg.src = '../Images/mail.gif';
        sendEmailImg.style.display = 'block';

        // Hide Spinner then show the send Email image
        setTimeout(function() {
            // Hide the spinner
            spinner.style.display = 'none';

            // Show the image
            document.querySelector('#loaders').appendChild( sendEmailImg );

            // After 5 seconds, hide the image 
            setTimeout(function() {
                sendEmailImg.remove();
                setTimeout(function() {
                    sendMessage();
                    setTimeout(function() {
                        localStorage.setItem('array',null)
                    },10000)
                },1000)
            }, 5000);
        }, 3000 );
    } 


    function sendMessage() {
        const sendmessage = document.createElement('div');
        sendmessage.classList.add('message-info');
        sendmessage.innerHTML = `
        <p>Your order has been received pending cofirmation.<br>
        You will be contacted to comfirm your order..stay put</p>
        `
        document.querySelector('body').append(sendmessage);
    }
}
