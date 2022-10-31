import { menuArray } from '/data.js'

const menuSection = document.getElementById('menu-section')
const checkoutSection = document.getElementById('checkout-section')
const checkoutSectionList = document.getElementById('checkout-section-list')
const checkoutTotalPrice = document.getElementById('checkout-total-price')
const orderedItems = []

function getMenuItems() {
    let menuHtml = ``
    menuArray.forEach(function(item){
    menuHtml += `
    <div class="item" id="item">
        <img src="${item.image}" class="item-img">
                    <div>
                        <p class="item-title">${item.name}</p>
                        <p class="item-description">${item.ingredients}</p>
                        <p class="item-price">${item.price}$</p>
                    </div>
        <button class="item-btn" data-add="${item.id}">+</button>
    </div>
    `
    menuSection.innerHTML = menuHtml
})


}

getMenuItems()

function getDataFromId(id) {
    return    menuArray.find(function(item){
        return item.id === id
    })
}




document.addEventListener('click', function(e){
    
    if (e.target.dataset.add) {
        checkoutSection.style.display = 'block'
        const data = getDataFromId(e.target.dataset.add)
        orderedItems.push(data)
        renderOrderList()
    }
    else if (e.target.dataset.remove) {
        const data = getDataFromId(e.target.dataset.remove)
        const index = orderedItems.indexOf(data)
        if (index > -1) {
            orderedItems.splice(index, 1)
            if (orderedItems.length < 1) {
                checkoutSection.style.display = 'none'
                document.getElementById('card-details').style.display = 'none'
                document.getElementById('main').style.background = 'white'
            }
        }

        renderOrderList()
        
    }
    else if (e.target.id === 'purchase-btn') {
        document.getElementById('card-details').style.display = 'flex'
        document.getElementById('main').style.background = 'linear-gradient(lightgrey, white'
    }
    else if (e.target.id === 'pay-btn') {
        if (cardInputName.value && cardInputNumber.value && cardInputCvv.value) {
            document.getElementById('pay-btn').removeAttribute('disabled')
            }
        document.getElementById('card-details').style.display = 'none'
        checkoutSection.style.display= 'none'
        const cardInputName = document.getElementById('card-input-name')
        const cardInputNumber = document.getElementById('card-input-number')
        const cardInputCvv = document.getElementById('card-input-cvv')
        document.getElementById('payment-successful').innerHTML = `<p class="payment-successful-text">Thanks, ${cardInputName.value}! Your order is on its way!</p>`
        document.getElementById('payment-successful').style.display = 'block'
        document.getElementById('main').style.background = 'white'
        
    }
    
})




function renderOrderList() {
    
    let checkoutHtml = ``
    orderedItems.forEach(function(item){
        checkoutHtml += `
        <div class="checkout-section-item">
            <div class="checkout-title-remove-btn">
            <p class="item-title">${item.name}</p>
            <button class="remove-btn" data-remove="${item.id}">remove</button>
            </div>
            <p class="item-price">${item.price}$</p>
            
        </div>
        `
    })
    checkoutSectionList.innerHTML = checkoutHtml
    let totalPrice = 0
    orderedItems.forEach(function(item){
        totalPrice += parseInt(item.price)
    })
    checkoutTotalPrice.innerHTML = `${totalPrice}$`
}



