// Key name used to store cart data in localStorage
var CART_KEY = "cart";

// All "Add" buttons for menu items
var addButtons = document.querySelectorAll(".add-button");

// Cart bar section at the bottom of the page
var cartBar = document.querySelector(".cart-bar");

// Text that displays number of items in cart
var cartItemsText = document.querySelector(".cart-items");

// Retrieve cart data from localStorage
// If no cart exists, return an empty array
function getCart() {
    var cartString = localStorage.getItem(CART_KEY);

    if (cartString === null) {
        return [];
    }

    // Convert JSON string back into JavaScript object
    // If parsing fails, return an empty cart
    try {
        return JSON.parse(cartString);
    } catch (e) {
        return [];
    }
}

// Save the cart array into localStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Calculate total quantity of all items in the cart
function getTotalItemCount(cart) {
    var total = 0;

    // Loop through each shop in the cart
    for (var i = 0; i < cart.length; i++) {
        var shop = cart[i];

        // Loop through each item in the shop
        for (var j = 0; j < shop.items.length; j++) {
            total += shop.items[j].qty;
        }
    }

    return total;
}

// Show or hide cart bar and update item count text
function updateCartBar() {
    var cart = getCart();
    var itemCount = getTotalItemCount(cart);

    if (itemCount > 0) {
        // Show cart bar when items exist
        cartBar.hidden = false;
        // Display correct singular or plural text
        cartItemsText.textContent = itemCount + (itemCount === 1 ? " item" : " items");
    } else {
        // Hide cart bar if cart is empty
        cartBar.hidden = true;
        cartItemsText.textContent = "0 items";
    }
}

// Add a selected menu item into the cart
function addItemToCart(shopId, shopName, itemId, itemName, price, img) {
    var cart = getCart();

    // Check if shop already exists in cart
    var shopIndex = -1;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].shopId === shopId) {
            shopIndex = i;
            break;
        }
    }

    // If shop does not exist, create a new shop entry
    if (shopIndex === -1) {
        cart.push({
            shopId: shopId,
            shopName: shopName,
            packaging: "dinein", // Default packaging option
            items: []
        });
        shopIndex = cart.length - 1;
    }

    // Check if item already exists in this shop
    var itemIndex = -1;
    for (var j = 0; j < cart[shopIndex].items.length; j++) {
        if (cart[shopIndex].items[j].id === itemId) {
            itemIndex = j;
            break;
        }
    }

    // If item does not exist, add it with quantity 1
    if (itemIndex === -1) {
        cart[shopIndex].items.push({
            id: itemId,
            name: itemName,
            price: price,
            qty: 1,
            img: img
        });
    } else {
        // If item exists, increase quantity
        cart[shopIndex].items[itemIndex].qty += 1;
    }

    // Save updated cart and refresh cart bar display
    saveCart(cart);
    updateCartBar();
}

// Attach click events to all Add buttons
function setupAddButtons() {
    for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", function () {

            // Retrieve data from button attributes
            var shopId = this.dataset.shopId;
            var shopName = this.dataset.shopName;
            var itemId = this.dataset.itemId;
            var itemName = this.dataset.itemName;
            var price = parseFloat(this.dataset.price);
            var img = this.dataset.img;

            // Feedback for user
            var button = this;
            var originalText = button.textContent;

            button.textContent = "Added!";
            button.disabled = true;

            setTimeout(function () {
                button.textContent = originalText;
                button.disabled = false;
            }, 500);

            // Add selected item to cart
            addItemToCart(shopId, shopName, itemId, itemName, price, img);
        });
    }
}

// Set up button click events
setupAddButtons();

// Update cart bar on page load
updateCartBar();