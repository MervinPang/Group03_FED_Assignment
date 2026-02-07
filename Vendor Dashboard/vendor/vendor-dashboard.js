const firebaseConfig = {
  apiKey: "AIzaSyAxVXYDE_RW3uEkT2dDtlUIcBIDp8a_NHg",
  authDomain: "dummy-data-fed-dashboard.firebaseapp.com",
  databaseURL:
    "https://dummy-data-fed-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dummy-data-fed-dashboard",
  storageBucket: "dummy-data-fed-dashboard.firebasestorage.app",
  messagingSenderId: "1054998085997",
  appId: "1:1054998085997:web:9ede1811e32116ee375a64",
  measurementId: "G-WQPPKPZRYJ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialise Firestore database
const db = getFirestore(app);
// Vendor Dashboard Init
document.addEventListener("DOMContentLoaded", function () {
  console.log("Vendor Dashboard loading...");

  // Load data from Firebase first, then render
  loadVendorDataFromFirebase();
});
// Fallback data if Firebase fails
function loadFallbackData() {
  console.log("Loading fallback data...");

  vendorDashboardData = {
    stall: {
      name: "Jian Bo Shui Kueh",
      stallId: "02-18",
      owner: "Mr. Lim",
    },
    stats: {
      todaysOrders: 0,
      todaysRevenue: 0.0,
      activeOrders: 0,
      avgRating: 5.0,
    },
    recentActivity: [
      {
        id: "HK41752284",
        customer: "Rayne Tok",
        status: "ready",
        timestamp: "9:22 AM",
      },
      {
        id: "HK41063894",
        customer: "Rayne Tok",
        status: "ready",
        timestamp: "9:11 AM",
      },
      {
        id: "HK80873979",
        customer: "lou lou",
        status: "cancelled",
        timestamp: "8:54 AM",
      },
      {
        id: "HK80826728",
        customer: "lou lou",
        status: "ready",
        timestamp: "8:42 AM",
      },
      {
        id: "HK86762210",
        customer: "Rayne Tok",
        status: "ready",
        timestamp: "8:15 AM",
      },
    ],
    topItems: [
      { rank: 1, name: "Shui Kueh (5 pcs)", likes: 456, price: 2.0 },
      { rank: 2, name: "Oyster Omelette", likes: 234, price: 3.5 },
      { rank: 3, name: "Popiah", likes: 189, price: 2.5 },
    ],
    activeOrders: [],
    menuItems: [
      {
        name: "Shui Kueh (5 pcs)",
        cuisine: "Signature",
        description: "Traditional steamed rice cake with turnip",
        price: 2.0,
        available: true,
      },
      {
        name: "Oyster Omelette",
        cuisine: "Seafood",
        description: "Crispy omelette with fresh oysters",
        price: 3.5,
        available: true,
      },
      {
        name: "Popiah",
        cuisine: "Snack",
        description: "Fresh spring rolls with peanut sauce",
        price: 2.5,
        available: true,
      },
    ],
    reviews: [
      {
        customer: "Rayne Tok",
        rating: 5,
        comment: "Amazing shui kueh! Highly recommend.",
        date: "Jan 20, 2026",
      },
      {
        customer: "Ali Mohamed",
        rating: 4,
        comment: "Good taste but a bit slow service.",
        date: "Jan 19, 2026",
      },
      {
        customer: "Sarah Lim",
        rating: 5,
        comment: "Fresh and delicious. Great value for money!",
        date: "Jan 18, 2026",
      },
    ],
    orderHistory: [
      {
        id: "HK41752284",
        customer: "Rayne Tok",
        date: "Jan 17, 2026 9:22 AM",
        status: "ready",
        amount: 2.0,
        items: 1,
      },
      {
        id: "HK41063894",
        customer: "Rayne Tok",
        date: "Jan 17, 2026 9:11 AM",
        status: "ready",
        amount: 2.0,
        items: 1,
      },
      {
        id: "HK80873979",
        customer: "lou lou",
        date: "Jan 14, 2026 8:54 AM",
        status: "cancelled",
        amount: 2.0,
        items: 1,
      },
      {
        id: "HK80826728",
        customer: "lou lou",
        date: "Jan 14, 2026 8:42 AM",
        status: "ready",
        amount: 2.0,
        items: 1,
      },
      {
        id: "HK86762210",
        customer: "Rayne Tok",
        date: "Jan 13, 2026 8:15 AM",
        status: "ready",
        amount: 6.5,
        items: 3,
      },
    ],
    rentalAgreements: [
      {
        period: "Jan 1, 2024 - Dec 31, 2024",
        status: "Active",
        monthlyRent: 1200.0,
        renewalDue: "Dec 2024",
      },
      {
        period: "Jan 1, 2023 - Dec 31, 2023",
        status: "Expired",
        monthlyRent: 1200.0,
        renewalDue: "Renewed",
      },
    ],
  };

  renderVendorDashboard();
  initializeVendorTabs();
  initializeEventListeners();
}

function renderVendorDashboard() {
  console.log("Rendering vendor dashboard...");
  var data = vendorDashboardData;
  //update header
  var stallNameEl = document.getElementById("vendor-stall-name");
  var stallIdEl = document.getElementById("vendor-stall-id");
  if (stallNameEl) stallNameEl.textContent = data.stall.name;
  if (stallIdEl) stallIdEl.textContent = data.stall.stallId;

  //update stats
  var ordersEl = document.getElementById("vendor-orders-today");
  var revenueEl = document.getElementById("vendor-revenue-today");
  var activeEl = document.getElementById("vendor-active-orders");
  var ratingEl = document.getElementById("vendor-avg-rating");

  if (ordersEl) ordersEl.textContent = data.stats.todaysOrders;
  if (revenueEl)
    revenueEl.textContent = "$" + data.stats.todaysRevenue.toFixed(2);
  if (activeEl) activeEl.textContent = data.stats.activeOrders;
  if (ratingEl) ratingEl.textContent = data.stats.avgRating;

  console.log("Dashboard rendered successfully");
}
//Tab navigation
function initializeVendorTabs() {
  console.log("Initializing tabs...");
  var tabBtns = document.querySelectorAll(".vendor-tab-btn");
  var tabPanes = document.querySelectorAll(".vendor-tab-pane");
  console.log(
    "Found " +
      tabBtns.length +
      " tab buttons and " +
      tabPanes.length +
      " tab panes",
  );
  if (tabBtns.length === 0 || tabPanes.length === 0) {
    console.error("Tab elements not found!");
    return;
  }
  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var tabName = btn.getAttribute("data-vendor-tab");
      console.log("Switching to tab: " + tabName);
      // Remove active class from all buttons and panes
      tabBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      tabPanes.forEach(function (p) {
        p.classList.remove("active");
      });
      // Add active class to clicked button and corresponding pane
      btn.classList.add("active");
      var tabPaneId = "vendor-" + tabName + "-tab";
      var tabPane = document.getElementById(tabPaneId);

      if (tabPane) {
        tabPane.classList.add("active");
        console.log("Activated tab pane: " + tabPaneId);

        // Render content for this tab
        renderVendorTabContent(tabName);
      } else {
        console.error("Tab pane not found: " + tabPaneId);
      }
    });
  });
  // Render initial tab
  console.log("Rendering initial overview tab...");
  renderVendorTabContent("overview");
}
//Render tab content
function renderVendorTabContent(tabName) {
  console.log("Rendering content for tab: " + tabName);
  var data = vendorDashboardData;
  if (tabName === "overview") {
    renderVendorOverviewTab(data);
  } else if (tabName === "orders") {
    renderVendorOrdersTab(data);
  } else if (tabName === "menu") {
    renderVendorMenuTab(data);
  } else if (tabName === "reviews") {
    renderVendorReviewsTab(data);
  } else if (tabName === "history") {
    renderVendorHistoryTab(data);
  } else if (tabName === "rental") {
    renderVendorRentalTab(data);
  } else {
    console.warn("Unknown tab: " + tabName);
  }
}
//Overview Tab
function renderVendorOverviewTab(data) {
  console.log("Rendering Overview tab...");

  var recentActivityDiv = document.getElementById("vendor-recent-activity");
  var topItemsDiv = document.getElementById("vendor-top-items");

  if (!recentActivityDiv || !topItemsDiv) {
    console.error("Required elements not found for overview tab");
    return;
  }

  // Recent Activity
  var recentHTML = "";
  if (data.recentActivity.length === 0) {
    recentHTML = `
      <div class="vendor-empty-state">
        <div class="vendor-empty-state-icon">📋</div>
        <p class="vendor-empty-state-title">No Recent Activity</p>
        <p class="vendor-empty-state-text">Recent orders will appear here</p>
      </div>`;
  } else {
    for (var i = 0; i < data.recentActivity.length; i++) {
      var order = data.recentActivity[i];
      recentHTML += `
        <div class="vendor-order-item">
          <div class="vendor-order-info">
            <h4>Order #${order.id}</h4>
            <p>${order.customer}</p>
            <p style="font-size: 0.85rem; color: #999;">${order.timestamp}</p>
          </div>
          <span class="vendor-order-status vendor-status-${order.status}">
            ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>`;
    }
  }
  recentActivityDiv.innerHTML = recentHTML;

  // Top Items
  var topHTML = "";
  if (data.topItems.length === 0) {
    topHTML = `
      <div class="vendor-empty-state">
        <div class="vendor-empty-state-icon">🍜</div>
        <p class="vendor-empty-state-title">No Top Items</p>
        <p class="vendor-empty-state-text">Popular items will appear here</p>
      </div>`;
  } else {
    for (var j = 0; j < data.topItems.length; j++) {
      var item = data.topItems[j];
      topHTML += `
        <div class="vendor-menu-item">
          <div class="vendor-menu-info">
            <h4>#${item.rank}. ${item.name}</h4>
            <p>${item.likes} 👍 likes</p>
          </div>
          <div style="text-align: right;">
            <p style="font-weight: 700; color: #10B981;">$${item.price.toFixed(2)}</p>
          </div>
        </div>`;
    }
  }
  topItemsDiv.innerHTML = topHTML;

  console.log("Overview tab rendered successfully");
}
//Order Tab
function renderVendorOrdersTab(data) {
  console.log("Rendering Orders tab...");

  var activeOrdersList = document.getElementById("vendor-active-orders-list");

  if (!activeOrdersList) {
    console.error("Active orders list element not found");
    return;
  }

  if (data.activeOrders.length === 0) {
    activeOrdersList.innerHTML = `
      <div class="vendor-empty-state">
        <div class="vendor-empty-state-icon">⏱️</div>
        <p class="vendor-empty-state-title">No Active Orders</p>
        <p class="vendor-empty-state-text">New orders will appear here automatically</p>
      </div>`;
  } else {
    var ordersHTML = "";
    for (var i = 0; i < data.activeOrders.length; i++) {
      var order = data.activeOrders[i];
      ordersHTML += `
        <div class="vendor-order-item" data-order-id="${order.id}">
          <div class="vendor-order-info">
            <h4>Order #${order.id}</h4>
            <p>${order.customer}</p>
            <p>${order.items || "Items"}</p>
            <p style="font-size: 0.85rem; color: #999;">${order.timestamp || ""}</p>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
            <span class="vendor-order-status vendor-status-${order.status}">
              ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            <div class="vendor-order-actions">
              <button class="btn btn-small btn-primary" onclick="markOrderReady('${order.id}')">✓ Ready</button>
              <button class="btn btn-small btn-secondary" onclick="cancelOrder('${order.id}')">✗ Cancel</button>
            </div>
          </div>
        </div>`;
    }
    activeOrdersList.innerHTML = ordersHTML;
  }

  console.log("Orders tab rendered successfully");
}
//Edit Orders - ready
async function markOrderReady(orderId) {
  console.log("Marking order as ready: " + orderId);
  try {
    await updateOrderStatusInFirebase(orderId, "ready");

    var orderIndex = vendorDashboardData.activeOrders.findIndex(function (o) {
      return o.id === orderId;
    });

    if (orderIndex !== -1) {
      var order = vendorDashboardData.activeOrders[orderIndex];
      order.status = "ready";
      vendorDashboardData.orderHistory.unshift(order);
      vendorDashboardData.activeOrders.splice(orderIndex, 1);
      vendorDashboardData.stats.activeOrders =
        vendorDashboardData.activeOrders.length;

      renderVendorOrdersTab(vendorDashboardData);
      renderVendorDashboard();

      showSuccessMessage("✅ Order #" + orderId + " marked as ready!");
    }
  } catch (error) {
    console.error("Error marking order as ready:", error);
    showErrorMessage("❌ Failed to update order status");
  }
}
//Edit orders - cancel
async function cancelOrder(orderId) {
  console.log("Cancelling order: " + orderId);
  if (!confirm("Are you sure you want to cancel order #" + orderId + "?")) {
    return;
  }
  try {
    await updateOrderStatusInFirebase(orderId, "cancelled");

    var orderIndex = vendorDashboardData.activeOrders.findIndex(function (o) {
      return o.id === orderId;
    });

    if (orderIndex !== -1) {
      var order = vendorDashboardData.activeOrders[orderIndex];
      order.status = "cancelled";
      vendorDashboardData.orderHistory.unshift(order);
      vendorDashboardData.activeOrders.splice(orderIndex, 1);
      vendorDashboardData.stats.activeOrders =
        vendorDashboardData.activeOrders.length;

      renderVendorOrdersTab(vendorDashboardData);
      renderVendorDashboard();

      showSuccessMessage("🚫 Order #" + orderId + " has been cancelled");
    }
  } catch (error) {
    console.error("Error cancelling order:", error);
    showErrorMessage("❌ Failed to cancel order");
  }
}
//Menu Tab
function renderVendorMenuTab(data) {
  console.log("Rendering Menu tab...");
  var menuList = document.getElementById("vendor-menu-items-list");

  if (!menuList) {
    console.error("Menu items list element not found");
    return;
  }

  displayMenuItems(data.menuItems);
}

function displayMenuItems(items) {
  var menuList = document.getElementById("vendor-menu-items-list");

  if (!menuList) return;

  if (items.length === 0) {
    menuList.innerHTML = `
      <div class="vendor-empty-state">
        <div class="vendor-empty-state-icon">🍜</div>
        <p class="vendor-empty-state-title">No Menu Items</p>
        <p class="vendor-empty-state-text">Click "+ Add Item" to add your first menu item</p>
      </div>`;
    return;
  }

  var menuHTML = "";
  for (var idx = 0; idx < items.length; idx++) {
    var item = items[idx];
    menuHTML += `
      <div class="vendor-menu-item" data-item-id="${item.id || idx}">
        <div class="vendor-menu-item-details">
          <div class="vendor-menu-item-image">🍜</div>
          <div class="vendor-menu-item-info">
            <h4>${item.name}</h4>
            <p class="vendor-cuisine">${item.cuisine}</p>
            <p>${item.description}</p>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.75rem;">
          <p style="font-weight: 700; font-size: 1.1rem; color: #10B981;">$${item.price.toFixed(2)}</p>
          <div class="vendor-menu-item-actions">
            <button onclick="editMenuItem(${idx})">✏️ Edit</button>
            <button onclick="deleteMenuItem(${idx})">🗑️ Delete</button>
          </div>
          <div class="vendor-availability-toggle">
            <span>${item.available ? "Available" : "Unavailable"}</span>
            <div class="vendor-toggle-switch ${item.available ? "active" : ""}" onclick="toggleAvailability(${idx})"></div>
          </div>
        </div>
      </div>`;
  }
  menuList.innerHTML = menuHTML;
}
// Reviews Tab
function renderVendorReviewsTab(data) {
  console.log("Rendering Reviews tab...");
  var reviewsList = document.getElementById("vendor-reviews-list");
  if (!reviewsList) {
    console.error("Reviews list element not found");
    return;
  }
  if (data.reviews.length === 0) {
    reviewsList.innerHTML = `
      <div class="vendor-empty-state">
        <div class="vendor-empty-state-icon">⭐</div>
        <p class="vendor-empty-state-title">No Reviews Yet</p>
        <p class="vendor-empty-state-text">Customer reviews will appear here</p>
      </div>`;
  } else {
    var reviewsHTML = "";
    for (var i = 0; i < data.reviews.length; i++) {
      var review = data.reviews[i];
      var stars = "";
      for (var s = 0; s < review.rating; s++) {
        stars += "⭐";
      }
      reviewsHTML += `
        <div class="vendor-review-item">
          <h4>${review.customer}</h4>
          <div class="vendor-review-rating">${stars}</div>
          <p class="vendor-review-comment">"${review.comment}"</p>
          <p class="vendor-review-date">${review.date}</p>
        </div>`;
    }
    reviewsList.innerHTML = reviewsHTML;
  }

  console.log("Reviews tab rendered successfully");
}
// History Tab
function renderVendorHistoryTab(data) {
  console.log("Rendering History tab...");
  var historyList = document.getElementById("vendor-order-history-list");
  var searchInput = document.getElementById("vendor-history-search-input");
  var statusFilter = document.getElementById("vendor-status-filter");
  var timeFilter = document.getElementById("vendor-time-filter");
  if (!historyList) {
    console.error("History list element not found");
    return;
  }
  function applyFilters() {
    var filteredOrders = data.orderHistory.slice();
    //Search Filter
    if (searchInput && searchInput.value) {
      var query = searchInput.value.toLowerCase();
      filteredOrders = filteredOrders.filter(function (order) {
        return (
          order.id.toLowerCase().indexOf(query) !== -1 ||
          order.customer.toLowerCase().indexOf(query) !== -1
        );
      });
    }
    //Status Filter
    if (statusFilter && statusFilter.value && statusFilter.value !== "all") {
      filteredOrders = filteredOrders.filter(function (order) {
        return order.status === statusFilter.value;
      });
    }
    //Time Filter
    if (timeFilter && timeFilter.value) {
      var today = new Date();
      var dateThreshold = new Date();

      if (timeFilter.value === "today") {
        dateThreshold.setHours(0, 0, 0, 0);
      } else if (timeFilter.value === "week") {
        dateThreshold.setDate(today.getDate() - 7);
      } else if (timeFilter.value === "month") {
        dateThreshold.setMonth(today.getMonth() - 1);
      }

      filteredOrders = filteredOrders.filter(function (order) {
        var orderDate = parseOrderDate(order.date);
        return orderDate >= dateThreshold;
      });
    }

    displayOrderHistory(filteredOrders);
  }
  function displayOrderHistory(orders) {
    if (orders.length === 0) {
      historyList.innerHTML = createEmptyState(
        "📋",
        "No Orders Found",
        "Try adjusting your filters",
      );
    } else {
      let historyHTML = "";
      orders.forEach(function (order) {
        historyHTML += `
          <article class="vendor-order-item" role="listitem">
            <div class="vendor-order-info">
              <h4>#${order.id}</h4>
              <p>${order.customer}</p>
              <p><time datetime="${order.date}">${order.date}</time></p>
            </div>
            <div class="vendor-order-summary">
              <span class="vendor-order-status vendor-status-${order.status}" role="status">
                ${capitalizeFirst(order.status)}
              </span>
              <data class="vendor-order-amount" value="${order.amount}">$${order.amount.toFixed(2)}</data>
              <p class="vendor-order-items">${order.items} item${order.items !== 1 ? "s" : ""}</p>
            </div>
          </article>`;
      });
      historyList.innerHTML = historyHTML;
    }
  }
  //Initial display
  applyFilters();
  //Event Listeners for filters
  if (searchInput) {
    searchInput.removeEventListener("input", applyFilters);
    searchInput.addEventListener("input", applyFilters);
  }
  if (statusFilter) {
    statusFilter.removeEventListener("change", applyFilters);
    statusFilter.addEventListener("change", applyFilters);
  }
  if (timeFilter) {
    timeFilter.removeEventListener("change", applyFilters);
    timeFilter.addEventListener("change", applyFilters);
  }
  console.log("History tab rendered successfully");
  function parseOrderDate(dateStr) {
    const datePart = dateStr.substring(0, dateStr.lastIndexOf(" "));
    return new Date(datePart);
  }
}
//Rental Tab
function renderVendorRentalTab(data) {
  console.log("Rendering Rental tab...");

  const rentalList = document.getElementById("vendor-rental-info");

  if (!rentalList) {
    console.error("Rental info element not found");
    return;
  }

  if (data.rentalAgreements.length === 0) {
    rentalList.innerHTML = createEmptyState(
      "📄",
      "No Rental Agreements",
      "Rental agreements will appear here",
    );
  } else {
    let rentalHTML = "";
    data.rentalAgreements.forEach(function (rental) {
      const isActive = rental.status === "Active";
      rentalHTML += `
        <article class="vendor-rental-item" role="listitem">
          <header>
            <h4>Rental Agreement</h4>
          </header>
          <dl class="vendor-rental-details">
            <div class="vendor-rental-detail">
              <dt>Period</dt>
              <dd>${rental.period}</dd>
            </div>
            <div class="vendor-rental-detail">
              <dt>Status</dt>
              <dd class="${isActive ? "status-active" : "status-expired"}">${rental.status}</dd>
            </div>
            <div class="vendor-rental-detail">
              <dt>Monthly Rent</dt>
              <dd><data value="${rental.monthlyRent}">$${rental.monthlyRent.toFixed(2)}</data></dd>
            </div>
            <div class="vendor-rental-detail">
              <dt>Renewal Due</dt>
              <dd>${rental.renewalDue}</dd>
            </div>
          </dl>
        </article>`;
    });
    rentalList.innerHTML = rentalHTML;
  }

  console.log("Rental tab rendered successfully");
}
