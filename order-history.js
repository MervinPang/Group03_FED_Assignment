// Only allow guests to view order history if cookies are enabled (localStorage)
// Read orders from localStorage (guest)
// Split orders into Active and Past
// Render order cards into the correct tab
// Handle tab switching
// Store selected order and redirect to order-details page

function initOrderHistory() {
    // Retrieve cookie consent status from localStorage
    var cookiesEnabled = localStorage.getItem("cookiesEnabled");

    // If cookies are not enabled, redirect user back to access page
    if (cookiesEnabled !== "true") {
        window.location.href = "order.html";
        return;
    }

    // Tab buttons
    var activeTab = document.getElementById("activeTab");
    var pastTab = document.getElementById("pastTab");

    // Order sections
    var activeOrdersSection = document.getElementById("activeOrdersSection");
    var pastOrdersSection = document.getElementById("pastOrdersSection");

    // Order list containers
    var activeOrderList = document.getElementById("activeOrderList");
    var pastOrderList = document.getElementById("pastOrderList");

    // Empty state messages
    var activeEmptyMessage = document.getElementById("activeEmptyMessage");
    var pastEmptyMessage = document.getElementById("pastEmptyMessage");

    // Order count displays
    var activeCount = document.getElementById("activeCount");
    var pastCount = document.getElementById("pastCount");
}


// Read orders from localStorage
function getOrdersFromStorage() {

    // Get data from localStorage
    var raw = localStorage.getItem("guestOrders");

    // If no orders exist, return empty array
    if (!raw) {
        return [];
    }

    // Parse JSON
    try {
        var parsed = JSON.parse(raw);

        // Ensure parsed data is an array
        if (Array.isArray(parsed)) {
            return parsed;
        }
        return [];
    } catch (e) {

        // Return empty array if JSON parsing fails
        return [];
    }
}

// Clear all order cards inside a container
function clearList(container) {
    if (container) {
        container.innerHTML = "";
    }
}

// Switch between Active and Past tabs
function setTab(isActiveTab) {
    // Show or hide sections
    if (activeOrdersSection) activeOrdersSection.hidden = !isActiveTab;
    if (pastOrdersSection) pastOrdersSection.hidden = isActiveTab;

    // Toggle active class on tabs
    if (activeTab) activeTab.classList.toggle("active", isActiveTab);
    if (pastTab) pastTab.classList.toggle("active", !isActiveTab);
}

// Format order date
function formatDate(dateStr) {
    if (!dateStr) return "-";

    return dateStr;
}

// Create order card
function createOrderCard(order) {

    // Create clickable order card
    var card = document.createElement("a");
    card.className = "order-card";
    card.href = "order-details.html";

    // Determine order status text and style
    var statusText = order.status ? String(order.status) : "Active";
    var statusLower = statusText.toLowerCase();

    var statusClass = "active";
    if (statusLower === "completed" || statusLower === "past") {
        statusClass = "completed";
    }

    // Top row (Order Number and Status)
    var top = document.createElement("div");
    top.className = "order-top";

    var idEl = document.createElement("p");
    idEl.className = "order-id";
    idEl.textContent = "Order #" + (order.orderId !== undefined ? order.orderId : "-");

    var statusEl = document.createElement("span");
    statusEl.className = "order-status " + statusClass;
    statusEl.textContent = statusText;

    top.appendChild(idEl);
    top.appendChild(statusEl);

    // Order info (date and quantity)
    var info = document.createElement("div");
    info.className = "order-info";

    var dateEl = document.createElement("p");
    dateEl.textContent = "Date: " + formatDate(order.date);

    var itemsEl = document.createElement("p");
    itemsEl.textContent = "Items: " + (order.itemsCount !== undefined ? order.itemsCount : "-");

    info.appendChild(dateEl);
    info.appendChild(itemsEl);

    // Order total row
    var totalRow = document.createElement("div");
    totalRow.className = "order-total";

    var totalLabel = document.createElement("p");
    totalLabel.textContent = "Total";

    var amount = document.createElement("p");
    amount.className = "amount";
    amount.textContent = order.total !== undefined ? ("$" + Number(order.total).toFixed(2)) : "-";

    totalRow.appendChild(totalLabel);
    totalRow.appendChild(amount);

    // Order card
    card.appendChild(top);
    card.appendChild(info);
    card.appendChild(totalRow);

    // Store selected order before redirecting
    card.addEventListener("click", function () {
        localStorage.setItem("selectedOrder", JSON.stringify(order));
    });

    return card;
}

// Render active and past orders
function renderOrdersFromData(orders) {

    var activeOrders = [];
    var pastOrders = [];

    // Separate orders by status
    for (var i = 0; i < orders.length; i++) {
        var status = orders[i].status ? String(orders[i].status).toLowerCase() : "active";

        if (status === "completed" || status === "past") {
            pastOrders.push(orders[i]);
        } else {
            activeOrders.push(orders[i]);
        }
    }

    // Update tab count
    if (activeCount) activeCount.textContent = activeOrders.length;
    if (pastCount) pastCount.textContent = pastOrders.length;

    // Clear existing order cards
    clearList(activeOrderList);
    clearList(pastOrderList);

    // Render active orders
    if (activeOrders.length === 0) {
        if (activeEmptyMessage) activeEmptyMessage.hidden = false;
    } else {
        if (activeEmptyMessage) activeEmptyMessage.hidden = true;

        for (var a = 0; a < activeOrders.length; a++) {
            activeOrderList.appendChild(createOrderCard(activeOrders[a]));
        }
    }

    // Render Past orders
    if (pastOrders.length === 0) {
        if (pastEmptyMessage) pastEmptyMessage.hidden = false;
    } else {
        if (pastEmptyMessage) pastEmptyMessage.hidden = true;

        for (var p = 0; p < pastOrders.length; p++) {
            pastOrderList.appendChild(createOrderCard(pastOrders[p]));
        }
    }
}

function renderOrders() {
    var orders = getOrdersFromStorage();
    renderOrdersFromData(orders);
}

// Tab event handler
if (activeTab) {
    activeTab.addEventListener("click", function () {
        setTab(true);
    });
}

if (pastTab) {
    pastTab.addEventListener("click", function () {
        setTab(false);
    });
}

// Default to Active tab on load
setTab(true);

// Render orders when page loads
renderOrders();

window.renderOrdersFromData = renderOrdersFromData;

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initOrderHistory);
} else {
    initOrderHistory(); // runs even if imported after page load
}