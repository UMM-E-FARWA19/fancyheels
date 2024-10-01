// NAV 
function toggleMenu(x) {
    x.classList.toggle("change");

    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.toggle("active");
}
// ADD TO CART

let cartVisible = false;
let cartItems = [];
let totalPrice = 0;

// Function to toggle the visibility of the cart
function toggleCart() {
    const cart = document.getElementById('cart');
    cartVisible = !cartVisible;
    cart.style.display = cartVisible ? 'block' : 'none';
}

// Function to add items to the cart and change icon
function addToCart(product, price, iconElement = null) {
    // Check if item already exists in the cart
    const existingItem = cartItems.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity++;
        totalPrice += price;
    } else {
        cartItems.push({ product, price, quantity: 1 });
        totalPrice += price;
    }

    // Update quantity
    document.querySelector('.quantity').innerText = cartItems.length;

    // Display items in the cart
    updateCartUI();

    // If the iconElement is provided (the button was clicked), animate the arrow change
    if (iconElement) {
        changeIcon(iconElement);
    }
}

// Function to change the icon
function changeIcon(iconElement) {
    // Add a scaling effect before changing the icon
    iconElement.classList.add('scale-up');

    // After 300ms, fade out the current arrow icon
    setTimeout(() => {
        iconElement.classList.remove('scale-up');
        iconElement.classList.add('fade-out');
    }, 300);

    // After 600ms, change the icon to a check mark and fade it in
    setTimeout(() => {
        iconElement.classList.remove('fade-out');
        iconElement.classList.remove('fas', 'fa-arrow-up-right-from-square'); // Remove arrow icon classes
        iconElement.classList.add('fas', 'fa-check', 'check');  // Add check mark icon classes
    }, 600);
}

// Function to update the cart UI
function updateCartUI() {
    const listCard = document.querySelector('.listCard');
    listCard.innerHTML = ''; // Clear current items

    cartItems.forEach((item, index) => {
        const li = document.createElement('li');

        // Create and style "+" button
        const addButton = document.createElement('button');
        addButton.innerText = '+';
        addButton.onclick = () => incrementQuantity(index);
        addButton.style.backgroundColor = '#28a745';
        addButton.style.color = 'white';
        addButton.style.border = 'none';
        addButton.style.padding = '5px 10px';
        addButton.style.margin = '0 5px';
        addButton.style.borderRadius = '4px';
        addButton.style.cursor = 'pointer';
        addButton.style.fontSize = '16px';
        addButton.style.transition = 'background-color 0.3s ease';
        addButton.onmouseover = () => addButton.style.backgroundColor = '#218838';
        addButton.onmouseout = () => addButton.style.backgroundColor = '#28a745';

        // Create and style "-" button
        const subtractButton = document.createElement('button');
        subtractButton.innerText = '-';
        subtractButton.onclick = () => decrementQuantity(index);
        subtractButton.style.backgroundColor = '#dc3545';
        subtractButton.style.color = 'white';
        subtractButton.style.border = 'none';
        subtractButton.style.padding = '5px 10px';
        subtractButton.style.margin = '0 5px';
        subtractButton.style.borderRadius = '4px';
        subtractButton.style.cursor = 'pointer';
        subtractButton.style.fontSize = '16px';
        subtractButton.style.transition = 'background-color 0.3s ease';
        subtractButton.onmouseover = () => subtractButton.style.backgroundColor = '#c82333';
        subtractButton.onmouseout = () => subtractButton.style.backgroundColor = '#dc3545';

        li.innerHTML = `${item.product} - Rs. ${item.price} x ${item.quantity} `;
        li.appendChild(addButton);
        li.appendChild(subtractButton);

        listCard.appendChild(li);
    });

    // Update total price in the cart
    document.querySelector('.total').innerText = `Total: Rs. ${totalPrice}`;
}

// Function to increment the quantity of an item
function incrementQuantity(index) {
    const item = cartItems[index];
    item.quantity++;
    totalPrice += item.price;
    updateCartUI();
}

// Function to decrement the quantity of an item
function decrementQuantity(index) {
    const item = cartItems[index];
    if (item.quantity > 1) {
        item.quantity--;
        totalPrice -= item.price;
    } else {
        cartItems.splice(index, 1); // Remove item if quantity is 0
    }
    document.querySelector('.quantity').innerText = cartItems.length;
    updateCartUI();
}


// search
const searchFunction = () => {
    const searchBox = document.getElementById('myInput').value.toUpperCase();
    const productsContainer = document.getElementById('products-container');
    const product = document.querySelectorAll('.card');
    const pname = productsContainer.getElementsByTagName('h3');

    for (let i = 0; i < pname.length; i++) {
        let match = product[i].getElementsByTagName('h3')[0];

        if (match) {
            let textValue = match.textContent || match.innerHTML;
            if (textValue.toUpperCase().indexOf(searchBox) > -1) {
                product[i].style.display = "";
            } else {
                product[i].style.display = "none";
            }
        }
    }
}