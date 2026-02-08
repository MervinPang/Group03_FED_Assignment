// --------------------
// Module-level variables (so other functions can use them)
// --------------------
var activeTab, pastTab;
var activeOrdersSection, pastOrdersSection;
var activeOrderList, pastOrderList;
var activeEmptyMessage, pastEmptyMessage;
var activeCount, pastCount;

// Only allow guests to view order history if cookies are enabled (localStorage)

function initOrderHistory() {
  // Get DOM elements
  activeTab = document.getElementById("activeTab");
  pastTab = document.getElementById("pastTab");

  activeOrdersSection = document.getElementById("activeOrdersSection");
  pastOrdersSection = document.getElementById("pastOrdersSection");

  activeOrderList = document.getElementById("activeOrderList");
  pastOrderList = document.getElementById("pastOrderList");

  activeEmptyMessage = document.getElementById("activeEmptyMessage");
  pastEmptyMessage = document.getElementById("pastEmptyMessage");

  activeCount = document.getElementById("activeCount");
  pastCount = document.getElementById("pastCount");

  // Tab event handlers (must be set AFTER elements exist)
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

  // Default tab + initial render
  setTab(true);
  renderOrders();

  // Optional: expose for debugging
  window.renderOrdersFromData = renderOrdersFromData;
}

// Read orders from localStorage
function getOrdersFromStorage() {
  var raw = localStorage.getItem("guestOrders");
  if (!raw) return [];

  try {
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function clearList(container) {
  if (container) container.innerHTML = "";
}

// Switch between Active and Past tabs
function setTab(isActiveTab) {
  if (activeOrdersSection) activeOrdersSection.hidden = !isActiveTab;
  if (pastOrdersSection) pastOrdersSection.hidden = isActiveTab;

  if (activeTab) activeTab.classList.toggle("active", isActiveTab);
  if (pastTab) pastTab.classList.toggle("active", !isActiveTab);
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return dateStr;
}

// Create order card
function createOrderCard(order) {
  var card = document.createElement("a");
  card.className = "order-card";
  card.href = "order-details.html";

  var statusText = order.status ? String(order.status) : "Active";
  var statusLower = statusText.toLowerCase();

  var statusClass = "active";
  if (statusLower === "completed" || statusLower === "past") {
    statusClass = "completed";
  }

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

  var info = document.createElement("div");
  info.className = "order-info";

  var dateEl = document.createElement("p");
  dateEl.textContent = "Date: " + formatDate(order.date);

  var itemsEl = document.createElement("p");
  itemsEl.textContent = "Items: " + (order.itemsCount !== undefined ? order.itemsCount : "-");

  info.appendChild(dateEl);
  info.appendChild(itemsEl);

  var totalRow = document.createElement("div");
  totalRow.className = "order-total";

  var totalLabel = document.createElement("p");
  totalLabel.textContent = "Total";

  var amount = document.createElement("p");
  amount.className = "amount";
  amount.textContent = order.total !== undefined ? ("$" + Number(order.total).toFixed(2)) : "-";

  totalRow.appendChild(totalLabel);
  totalRow.appendChild(amount);

  card.appendChild(top);
  card.appendChild(info);
  card.appendChild(totalRow);

  card.addEventListener("click", function () {
    localStorage.setItem("selectedOrder", JSON.stringify(order));
  });

  return card;
}

// Render active and past orders
function renderOrdersFromData(orders) {
  var activeOrders = [];
  var pastOrders = [];

  for (var i = 0; i < orders.length; i++) {
    var status = orders[i].status ? String(orders[i].status).toLowerCase() : "active";
    if (status === "completed" || status === "past") pastOrders.push(orders[i]);
    else activeOrders.push(orders[i]);
  }

  if (activeCount) activeCount.textContent = activeOrders.length;
  if (pastCount) pastCount.textContent = pastOrders.length;

  clearList(activeOrderList);
  clearList(pastOrderList);

  if (activeOrders.length === 0) {
    if (activeEmptyMessage) activeEmptyMessage.hidden = false;
  } else {
    if (activeEmptyMessage) activeEmptyMessage.hidden = true;
    for (var a = 0; a < activeOrders.length; a++) {
      activeOrderList.appendChild(createOrderCard(activeOrders[a]));
    }
  }

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

// Run init at the right time
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initOrderHistory);
} else {
  initOrderHistory();
}
