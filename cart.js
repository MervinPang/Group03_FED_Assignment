// Handles cart display, quantity changes
// Order type selection, and totals calculation

// LocalStorage key for saving cart data
var CART_KEY = "cart";

// Fixed takeaway fee per shop (if takeaway selected)
var TAKEAWAY_FEE = 0.50;

// Main container where cart content will be rendered
var cartContainer = document.getElementById("cart-container");

// Retrieve cart data from localStorage
function getCart() {
    var data = localStorage.getItem(CART_KEY);
    if (data === null) return [];
    // Parse JSON data
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

// Save cart data back to localStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Format number to 2 decimal places for money
function formatMoney(amount) {
    return amount.toFixed(2);
}

// Remove all child elements from a container
function clearContainer(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

// Return image based on item ID
function getItemImage(itemId) {
    if (itemId === "tt01") return "images/Roasted Chicken Rice.jpg";
    if (itemId === "tt02") return "images/Steamed Chicken Rice.jpg";
    return "images/Roasted Chicken Rice.jpg";
}

// Create UI Components (DOM)

// Shop title heading
function createShopTitle(shopName) {
    var h3 = document.createElement("h3");
    h3.className = "shop";
    h3.textContent = shopName;
    return h3;
}

// Create list container for cart items
function createCartList() {
    var ul = document.createElement("ul");
    ul.className = "cart-list";
    return ul;
}

// Create individual cart item row
function createCartItem(shopId, item) {
    var li = document.createElement("li");
    li.className = "item";

    // Image
    var img = document.createElement("img");
    img.src = getItemImage(item.id);
    img.alt = item.name;
    img.className = "item-img";

    // Item name and price
    var text = document.createElement("p");
    text.className = "text";

    var strong = document.createElement("strong");
    strong.textContent = item.name;

    var br = document.createElement("br");
    var priceNode = document.createTextNode("$" + formatMoney(item.price));

    text.appendChild(strong);
    text.appendChild(br);
    text.appendChild(priceNode);

    // Quantity controls (+, -, remove)
    var qtyControls = createQtyControls(shopId, item.id, item.qty);

    li.appendChild(img);
    li.appendChild(text);
    li.appendChild(qtyControls);

    return li;
}

// Create quantity control buttons
function createQtyControls(shopId, itemId, qty) {
    var div = document.createElement("div");
    div.className = "qty";

    // Minus button
    var minusBtn = document.createElement("button");
    minusBtn.type = "button";
    minusBtn.textContent = "-";
    minusBtn.dataset.shopId = shopId;
    minusBtn.dataset.itemId = itemId;
    minusBtn.addEventListener("click", function () {
        updateQty(this.dataset.shopId, this.dataset.itemId, -1);
    });

    // Quantity display
    var qtySpan = document.createElement("span");
    qtySpan.textContent = qty;

    // Plus button
    var plusBtn = document.createElement("button");
    plusBtn.type = "button";
    plusBtn.textContent = "+";
    plusBtn.dataset.shopId = shopId;
    plusBtn.dataset.itemId = itemId;
    plusBtn.addEventListener("click", function () {
        updateQty(this.dataset.shopId, this.dataset.itemId, 1);
    });

    // Remove button
    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove";
    removeBtn.dataset.shopId = shopId;
    removeBtn.dataset.itemId = itemId;
    removeBtn.addEventListener("click", function () {
        removeItem(this.dataset.shopId, this.dataset.itemId);
    });

    var binImg = document.createElement("img");
    binImg.src = "images/Bin Icon.svg";
    binImg.alt = "Bin Icon";
    removeBtn.appendChild(binImg);

    div.appendChild(minusBtn);
    div.appendChild(qtySpan);
    div.appendChild(plusBtn);
    div.appendChild(removeBtn);

    return div;
}

function createDivider() {
    var hr = document.createElement("hr");
    hr.style.margin = "18px 0";
    return hr;
}

// Order type (Dine In / Takeaway)
function createOrderTypeBox(shop) {
    var box = document.createElement("div");
    box.className = "order-box";

    var title = document.createElement("h2");
    title.className = "order-title";
    title.textContent = "Order Type";

    var row = document.createElement("div");
    row.className = "order-row";

    // Dine-In button
    var dineBtn = document.createElement("button");
    dineBtn.type = "button";
    dineBtn.className = "order-button";
    if (shop.packaging !== "takeaway") dineBtn.classList.add("active");

    // Black icon (default)
    var dineIconBlack = document.createElement("img");
    dineIconBlack.className = "order-icon icon-black";
    dineIconBlack.src = "images/Restaurant Black Icon.svg";
    dineIconBlack.alt = "Dine In Icon";

    // White icon (active)
    var dineIconWhite = document.createElement("img");
    dineIconWhite.className = "order-icon icon-white";
    dineIconWhite.src = "images/Restaurant White Icon.svg";
    dineIconWhite.alt = "Dine In Icon";

    var dineText = document.createElement("span");
    dineText.textContent = "Dine-In";

    dineBtn.appendChild(dineIconBlack);
    dineBtn.appendChild(dineIconWhite);
    dineBtn.appendChild(dineText);

    dineBtn.dataset.shopId = shop.shopId;
    dineBtn.addEventListener("click", function () {
        setPackaging(this.dataset.shopId, "dinein");
    });

    // Takeaway button
    var takeBtn = document.createElement("button");
    takeBtn.type = "button";
    takeBtn.className = "order-button";
    if (shop.packaging === "takeaway") takeBtn.classList.add("active");

    // Black icon (default)
    var takeIconBlack = document.createElement("img");
    takeIconBlack.className = "order-icon icon-black";
    takeIconBlack.src = "images/Takeaway Black Icon.svg";
    takeIconBlack.alt = "Takeaway Icon";

    // White icon (active)
    var takeIconWhite = document.createElement("img");
    takeIconWhite.className = "order-icon icon-white";
    takeIconWhite.src = "images/Takeaway White Icon.svg";
    takeIconWhite.alt = "Takeaway Icon";

    var takeText = document.createElement("span");
    takeText.textContent = "Takeaway";

    takeBtn.appendChild(takeIconBlack);
    takeBtn.appendChild(takeIconWhite);
    takeBtn.appendChild(takeText);

    takeBtn.dataset.shopId = shop.shopId;
    takeBtn.addEventListener("click", function () {
        setPackaging(this.dataset.shopId, "takeaway");
    });

    row.appendChild(dineBtn);
    row.appendChild(takeBtn);

    box.appendChild(title);
    box.appendChild(row);

    return box;
}

// Create summary section
function createSummary(cart) {
    var totals = calculateTotals(cart);

    var summary = document.createElement("div");
    summary.className = "summary";

    summary.appendChild(createSummaryRow("Subtotal", totals.subtotal));
    summary.appendChild(createDivider());
    summary.appendChild(createSummaryRow("Takeaway Fee", totals.takeawayFee));
    summary.appendChild(createDivider());
    summary.appendChild(createSummaryRow("Total", totals.total, true));

    return summary;
}

// Create a single summary row
function createSummaryRow(label, value, isTotal) {
    var row = document.createElement("div");
    row.className = "summary-row";
    if (isTotal) row.classList.add("total");

    var left = document.createElement("span");
    left.textContent = label;

    var right = document.createElement("span");
    right.textContent = "$" + formatMoney(value);

    row.appendChild(left);
    row.appendChild(right);

    return row;
}

// Checkout button
function createCheckoutButton() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "checkout-button";
    btn.textContent = "Proceed to Checkout";

    btn.addEventListener("click", function () {
        window.location.href = "checkout.html";
    });

    return btn;
}

// Empty cart state
function createEmptyState() {
    var p = document.createElement("p");
    p.textContent = "Your cart is empty.";
    p.style.color = "#6B7280";
    p.style.margin = "18px 0";

    var a = document.createElement("a");
    a.href = "order.html";
    a.textContent = "Back to Menu";
    a.className = "cart-button";

    var emptyStateContainer = document.createElement("div");
    emptyStateContainer.className = "empty-state";

    emptyStateContainer.appendChild(p);
    emptyStateContainer.appendChild(a);

    cartContainer.appendChild(emptyStateContainer);
}

// Calculate subtotal, takeaway fee, and total
function calculateTotals(cart) {
    var subtotal = 0;
    var takeawayFee = 0;

    for (var i = 0; i < cart.length; i++) {
        var shop = cart[i];

        for (var j = 0; j < shop.items.length; j++) {
            subtotal += shop.items[j].price * shop.items[j].qty;
        }

        if (shop.packaging === "takeaway") {
            takeawayFee += TAKEAWAY_FEE;
        }
    }

    return {
        subtotal: subtotal,
        takeawayFee: takeawayFee,
        total: subtotal + takeawayFee
    };
}

// Update item quantity
function updateQty(shopId, itemId, change) {
    var cart = getCart();

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].shopId === shopId) {
            var shop = cart[i];

            for (var j = 0; j < shop.items.length; j++) {
                if (shop.items[j].id === itemId) {
                    shop.items[j].qty += change;

                    if (shop.items[j].qty <= 0) {
                        shop.items.splice(j, 1);
                    }
                    break;
                }
            }

            if (shop.items.length === 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }

    saveCart(cart);
    renderPage();
}

// Remove item completely
function removeItem(shopId, itemId) {
    updateQty(shopId, itemId, -999);
}

// Set dine-in or takeaway
function setPackaging(shopId, packagingType) {
    var cart = getCart();

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].shopId === shopId) {
            cart[i].packaging = packagingType;
            break;
        }
    }

    saveCart(cart);
    renderPage();
}

// Render page
function renderPage() {
    clearContainer(cartContainer);

    var cart = getCart();
    if (cart.length === 0) {
        createEmptyState();
        return;
    }

    for (var i = 0; i < cart.length; i++) {
        var shop = cart[i];

        cartContainer.appendChild(createShopTitle(shop.shopName));

        var ul = createCartList();

        for (var j = 0; j < shop.items.length; j++) {
            ul.appendChild(createCartItem(shop.shopId, shop.items[j]));
        }

        cartContainer.appendChild(ul);
        cartContainer.appendChild(createDivider());
        cartContainer.appendChild(createOrderTypeBox(shop));
        cartContainer.appendChild(createDivider());
    }

    cartContainer.appendChild(createSummary(cart));
    cartContainer.appendChild(createCheckoutButton());
}

// Initialise page
renderPage();