const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Vendor ID - Change based on logged in vendor
const VENDOR_ID = "02-18";
// global variables
let vendorDashboardData = null;
// initialisation
document.addEventListener("DOMContentLoaded", function () {
  console.log("Vendor Dashboard initializing...");
  loadVendorDataFromFirebase();
});
// firebase data loading
async function loadVendorDataFromFirebase() {
  console.log("Fetching data from Firebase...");
  showLoadingState();

  try {
    const vendorRef = db.collection("Vendors").doc(VENDOR_ID);

    // Fetch all data concurrently for better performance
    const [
      stallDoc,
      statsDoc,
      menuSnapshot,
      reviewsSnapshot,
      ordersSnapshot,
      rentalSnapshot,
      activitySnapshot,
      topItemsDoc,
      activeOrdersSnapshot,
    ] = await Promise.all([
      vendorRef.collection("stall").doc("info").get(),
      vendorRef.collection("stats").doc("current").get(),
      vendorRef.collection("menuItems").get(),
      vendorRef.collection("reviews").get(),
      vendorRef.collection("orderHistory").get(),
      vendorRef.collection("rentalAgreements").get(),
      vendorRef.collection("recentActivity").get(),
      vendorRef.collection("topItems").doc("list").get(),
      vendorRef.collection("activeOrders").get(),
    ]);

    // Process menu items
    const menuItems = [];
    menuSnapshot.forEach(function (doc) {
      menuItems.push({ id: doc.id, ...doc.data() });
    });

    // Process reviews
    const reviews = [];
    reviewsSnapshot.forEach(function (doc) {
      reviews.push({ id: doc.id, ...doc.data() });
    });

    // Process order history
    const orderHistory = [];
    ordersSnapshot.forEach(function (doc) {
      orderHistory.push({ id: doc.id, ...doc.data() });
    });

    // Process rental agreements
    const rentalAgreements = [];
    rentalSnapshot.forEach(function (doc) {
      rentalAgreements.push({ id: doc.id, ...doc.data() });
    });

    // Process recent activity
    const recentActivity = [];
    activitySnapshot.forEach(function (doc) {
      recentActivity.push({ id: doc.id, ...doc.data() });
    });

    // Process active orders
    const activeOrders = [];
    activeOrdersSnapshot.forEach(function (doc) {
      activeOrders.push({ id: doc.id, ...doc.data() });
    });

    // Build data object
    vendorDashboardData = {
      stall: stallDoc.exists
        ? stallDoc.data()
        : {
            name: "Jian Bo Shui Kueh",
            stallId: "02-18",
            owner: "Mr. Lim",
          },
      stats: statsDoc.exists
        ? statsDoc.data()
        : {
            todaysOrders: 0,
            todaysRevenue: 0,
            activeOrders: 0,
            avgRating: 5.0,
          },
      menuItems: menuItems,
      reviews: reviews,
      orderHistory: orderHistory,
      rentalAgreements: rentalAgreements,
      recentActivity: recentActivity,
      topItems: topItemsDoc.exists ? topItemsDoc.data().items || [] : [],
      activeOrders: activeOrders,
    };

    console.log("✅ Data loaded from Firebase:", vendorDashboardData);

    hideLoadingState();
    renderVendorDashboard();
    initializeVendorTabs();
    initializeEventListeners();
    setupRealtimeListeners();
  } catch (error) {
    console.error("❌ Error loading data from Firebase:", error);
    hideLoadingState();
    loadFallbackData();
  }
}
// Loading State
function showLoadingState() {
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "vendor-loading-overlay";
  loadingDiv.setAttribute("role", "alert");
  loadingDiv.setAttribute("aria-busy", "true");
  loadingDiv.setAttribute("aria-label", "Loading dashboard data");
  loadingDiv.innerHTML = `
    <div class="loading-content">
      <div class="vendor-loading-spinner" aria-hidden="true"></div>
      <p>Loading dashboard...</p>
    </div>
  `;
  loadingDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;
  document.body.appendChild(loadingDiv);
}

function hideLoadingState() {
  const loadingOverlay = document.getElementById("vendor-loading-overlay");
  if (loadingOverlay) {
    loadingOverlay.remove();
  }
}
// FallBack data
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
        category: "Signature",
        description: "Traditional steamed rice cake with turnip",
        price: 2.0,
        available: true,
      },
      {
        name: "Oyster Omelette",
        category: "Seafood",
        description: "Crispy omelette with fresh oysters",
        price: 3.5,
        available: true,
      },
      {
        name: "Popiah",
        category: "Snack",
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

  showToast("⚠️ Could not connect to database. Using offline data.", "error");

  renderVendorDashboard();
  initializeVendorTabs();
  initializeEventListeners();
}
// firebase save functions
async function saveMenuItemToFirebase(item) {
  try {
    const vendorRef = db.collection("Vendors").doc(VENDOR_ID);
    const docRef = await vendorRef.collection("menuItems").add(item);
    console.log("✅ Menu item saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error saving menu item:", error);
    return null;
  }
}

async function updateMenuItemInFirebase(itemId, updatedData) {
  try {
    const vendorRef = db.collection("Vendors").doc(VENDOR_ID);
    await vendorRef.collection("menuItems").doc(itemId).update(updatedData);
    console.log("✅ Menu item updated");
    return true;
  } catch (error) {
    console.error("❌ Error updating menu item:", error);
    return false;
  }
}

async function deleteMenuItemFromFirebase(itemId) {
  try {
    const vendorRef = db.collection("Vendors").doc(VENDOR_ID);
    await vendorRef.collection("menuItems").doc(itemId).delete();
    console.log("✅ Menu item deleted");
    return true;
  } catch (error) {
    console.error("❌ Error deleting menu item:", error);
    return false;
  }
}

async function updateOrderStatusInFirebase(orderId, status) {
  try {
    const vendorRef = db.collection("Vendors").doc(VENDOR_ID);
    await vendorRef
      .collection("orderHistory")
      .doc(orderId)
      .update({ status: status });
    console.log("✅ Order status updated");
    return true;
  } catch (error) {
    console.error("❌ Error updating order status:", error);
    return false;
  }
}
// real-time listeners
function setupRealtimeListeners() {
  console.log("Setting up real-time listeners...");

  const vendorRef = db.collection("Vendors").doc(VENDOR_ID);

  // Listen for active orders
  vendorRef.collection("activeOrders").onSnapshot(function (snapshot) {
    console.log("🔄 Active orders updated!");

    const activeOrders = [];
    snapshot.forEach(function (doc) {
      activeOrders.push({ id: doc.id, ...doc.data() });
    });

    vendorDashboardData.activeOrders = activeOrders;

    // Update stats display
    const activeOrdersEl = document.getElementById("vendor-active-orders");
    if (activeOrdersEl) {
      activeOrdersEl.textContent = activeOrders.length;
      activeOrdersEl.setAttribute("value", activeOrders.length);
    }

    // Re-render if on orders tab
    const ordersTab = document.getElementById("vendor-orders-tab");
    if (ordersTab && !ordersTab.hasAttribute("hidden")) {
      renderVendorOrdersTab(vendorDashboardData);
    }
  });

  // Listen for reviews
  vendorRef.collection("reviews").onSnapshot(function (snapshot) {
    console.log("🔄 Reviews updated!");

    const reviews = [];
    snapshot.forEach(function (doc) {
      reviews.push({ id: doc.id, ...doc.data() });
    });

    vendorDashboardData.reviews = reviews;

    // Update average rating
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(function (sum, review) {
        return sum + review.rating;
      }, 0);
      vendorDashboardData.stats.avgRating = (
        totalRating / reviews.length
      ).toFixed(1);

      const ratingEl = document.getElementById("vendor-avg-rating");
      if (ratingEl) {
        ratingEl.textContent = vendorDashboardData.stats.avgRating;
        ratingEl.setAttribute("value", vendorDashboardData.stats.avgRating);
      }
    }
  });

  // Listen for menu items
  vendorRef.collection("menuItems").onSnapshot(function (snapshot) {
    console.log("🔄 Menu items updated!");

    const menuItems = [];
    snapshot.forEach(function (doc) {
      menuItems.push({ id: doc.id, ...doc.data() });
    });

    vendorDashboardData.menuItems = menuItems;

    // Re-render if on menu tab
    const menuTab = document.getElementById("vendor-menu-tab");
    if (menuTab && !menuTab.hasAttribute("hidden")) {
      renderVendorMenuTab(vendorDashboardData);
    }
  });

  console.log("✅ Real-time listeners set up");
}
// render dashboard
function renderVendorDashboard() {
  console.log("Rendering vendor dashboard...");
  const data = vendorDashboardData;

  // Update header
  const stallNameEl = document.querySelector(".vendor-stall-name");
  const stallIdEl = document.getElementById("vendor-stall-id");

  if (stallNameEl) stallNameEl.textContent = data.stall.name;
  if (stallIdEl) stallIdEl.textContent = `Stall #${data.stall.stallId}`;

  // Update stats with data attributes for accessibility
  updateStatElement("vendor-orders-today", data.stats.todaysOrders);
  updateStatElement(
    "vendor-total-orders",
    `$${data.stats.todaysRevenue.toFixed(2)}`,
    data.stats.todaysRevenue,
  );
  updateStatElement("vendor-active-orders", data.stats.activeOrders);
  updateStatElement("vendor-avg-rating", data.stats.avgRating);

  console.log("Dashboard rendered successfully");
}

function updateStatElement(elementId, displayValue, dataValue = null) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = displayValue;
    element.setAttribute(
      "value",
      dataValue !== null ? dataValue : displayValue,
    );
  }
}
// tab navigation
function initializeVendorTabs() {
  console.log("Initializing tabs...");

  const tabBtns = document.querySelectorAll(".vendor-tab-btn");
  const tabPanes = document.querySelectorAll(".vendor-tab-pane");

  console.log(
    `Found ${tabBtns.length} tab buttons and ${tabPanes.length} tab panes`,
  );

  if (tabBtns.length === 0 || tabPanes.length === 0) {
    console.error("Tab elements not found!");
    return;
  }

  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      switchTab(btn, tabBtns, tabPanes);
    });

    // Keyboard navigation for tabs
    btn.addEventListener("keydown", function (event) {
      handleTabKeyNavigation(event, btn, tabBtns);
    });
  });

  // Render initial tab (overview)
  console.log("Rendering initial overview tab...");
  renderVendorTabContent("overview");
}

function switchTab(selectedBtn, allBtns, allPanes) {
  const tabName = selectedBtn.getAttribute("data-vendor-tab");
  console.log(`Switching to tab: ${tabName}`);

  // Update button states
  allBtns.forEach(function (btn) {
    btn.classList.remove("active");
    btn.setAttribute("aria-selected", "false");
    btn.setAttribute("tabindex", "-1");
  });

  selectedBtn.classList.add("active");
  selectedBtn.setAttribute("aria-selected", "true");
  selectedBtn.setAttribute("tabindex", "0");
  selectedBtn.focus();

  // Update pane visibility
  allPanes.forEach(function (pane) {
    pane.classList.remove("active");
    pane.setAttribute("hidden", "");
  });

  const tabPaneId = `vendor-${tabName}-tab`;
  const tabPane = document.getElementById(tabPaneId);

  if (tabPane) {
    tabPane.classList.add("active");
    tabPane.removeAttribute("hidden");
    console.log(`Activated tab pane: ${tabPaneId}`);
    renderVendorTabContent(tabName);
  } else {
    console.error(`Tab pane not found: ${tabPaneId}`);
  }
}

function handleTabKeyNavigation(event, currentBtn, allBtns) {
  const btnsArray = Array.from(allBtns);
  const currentIndex = btnsArray.indexOf(currentBtn);
  let newIndex;

  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
      event.preventDefault();
      newIndex = (currentIndex + 1) % btnsArray.length;
      btnsArray[newIndex].click();
      break;
    case "ArrowLeft":
    case "ArrowUp":
      event.preventDefault();
      newIndex = (currentIndex - 1 + btnsArray.length) % btnsArray.length;
      btnsArray[newIndex].click();
      break;
    case "Home":
      event.preventDefault();
      btnsArray[0].click();
      break;
    case "End":
      event.preventDefault();
      btnsArray[btnsArray.length - 1].click();
      break;
  }
}

function renderVendorTabContent(tabName) {
  console.log(`Rendering content for tab: ${tabName}`);

  const data = vendorDashboardData;

  switch (tabName) {
    case "overview":
      renderVendorOverviewTab(data);
      break;
    case "orders":
      renderVendorOrdersTab(data);
      break;
    case "menu":
      renderVendorMenuTab(data);
      break;
    case "reviews":
      renderVendorReviewsTab(data);
      break;
    case "history":
      renderVendorHistoryTab(data);
      break;
    case "rental":
      renderVendorRentalTab(data);
      break;
    default:
      console.warn(`Unknown tab: ${tabName}`);
  }
}

// overview tab
function renderVendorOverviewTab(data) {
  console.log("Rendering Overview tab...");

  const recentActivityDiv = document.getElementById("vendor-recent-activity");
  const topItemsDiv = document.getElementById("vendor-top-items");

  if (!recentActivityDiv || !topItemsDiv) {
    console.error("Required elements not found for overview tab");
    return;
  }

  // Recent Activity
  if (data.recentActivity.length === 0) {
    recentActivityDiv.innerHTML = createEmptyState(
      "📋",
      "No Recent Activity",
      "Recent orders will appear here",
    );
  } else {
    let recentHTML = "";
    data.recentActivity.forEach(function (order) {
      recentHTML += `
        <article class="vendor-order-item" role="listitem">
          <div class="vendor-order-info">
            <h4>Order #${order.id}</h4>
            <p>${order.customer}</p>
            <p><time datetime="${order.timestamp}">${order.timestamp}</time></p>
          </div>
          <span class="vendor-order-status vendor-status-${order.status}" role="status">
            ${capitalizeFirst(order.status)}
          </span>
        </article>`;
    });
    recentActivityDiv.innerHTML = recentHTML;
  }

  // Top Items
  if (data.topItems.length === 0) {
    topItemsDiv.innerHTML = createEmptyState(
      "🍜",
      "No Top Items",
      "Popular items will appear here",
    );
  } else {
    let topHTML = "";
    data.topItems.forEach(function (item) {
      topHTML += `
        <article class="vendor-menu-item" role="listitem">
          <div class="vendor-menu-info">
            <h4>#${item.rank}. ${item.name}</h4>
            <p>${item.likes} <span aria-label="likes">👍</span> likes</p>
          </div>
          <div>
            <data class="vendor-menu-item-price" value="${item.price}">$${item.price.toFixed(2)}</data>
          </div>
        </article>`;
    });
    topItemsDiv.innerHTML = topHTML;
  }

  console.log("Overview tab rendered successfully");
}
//orders tab
function renderVendorOrdersTab(data) {
  console.log("Rendering Orders tab...");

  const activeOrdersList = document.getElementById("vendor-active-orders-list");

  if (!activeOrdersList) {
    console.error("Active orders list element not found");
    return;
  }

  if (data.activeOrders.length === 0) {
    activeOrdersList.innerHTML = createEmptyState(
      "⏱️",
      "No Active Orders",
      "New orders will appear here automatically",
    );
  } else {
    let ordersHTML = "";
    data.activeOrders.forEach(function (order) {
      ordersHTML += `
        <article class="vendor-order-item" data-order-id="${order.id}" role="listitem">
          <div class="vendor-order-info">
            <h4>Order #${order.id}</h4>
            <p>${order.customer}</p>
            <p>${order.items || "Items"}</p>
            <p><time datetime="${order.timestamp}">${order.timestamp || ""}</time></p>
          </div>
          <div class="vendor-order-actions-container">
            <span class="vendor-order-status vendor-status-${order.status}" role="status">
              ${capitalizeFirst(order.status)}
            </span>
            <div class="vendor-order-actions" role="group" aria-label="Order actions">
              <button 
                type="button" 
                class="btn btn-small btn-primary" 
                onclick="markOrderReady('${order.id}')"
                aria-label="Mark order ${order.id} as ready"
              >✓ Ready</button>
              <button 
                type="button" 
                class="btn btn-small btn-secondary" 
                onclick="cancelOrder('${order.id}')"
                aria-label="Cancel order ${order.id}"
              >✗ Cancel</button>
            </div>
          </div>
        </article>`;
    });
    activeOrdersList.innerHTML = ordersHTML;
  }

  console.log("Orders tab rendered successfully");
}

async function markOrderReady(orderId) {
  console.log(`Marking order as ready: ${orderId}`);

  try {
    await updateOrderStatusInFirebase(orderId, "ready");

    const orderIndex = vendorDashboardData.activeOrders.findIndex(
      function (order) {
        return order.id === orderId;
      },
    );

    if (orderIndex !== -1) {
      const order = vendorDashboardData.activeOrders[orderIndex];
      order.status = "ready";
      vendorDashboardData.orderHistory.unshift(order);
      vendorDashboardData.activeOrders.splice(orderIndex, 1);
      vendorDashboardData.stats.activeOrders =
        vendorDashboardData.activeOrders.length;

      renderVendorOrdersTab(vendorDashboardData);
      renderVendorDashboard();

      showToast(`✅ Order #${orderId} marked as ready!`, "success");
    }
  } catch (error) {
    console.error("Error marking order as ready:", error);
    showToast("❌ Failed to update order status", "error");
  }
}

async function cancelOrder(orderId) {
  console.log(`Cancelling order: ${orderId}`);

  if (!confirm(`Are you sure you want to cancel order #${orderId}?`)) {
    return;
  }

  try {
    await updateOrderStatusInFirebase(orderId, "cancelled");

    const orderIndex = vendorDashboardData.activeOrders.findIndex(
      function (order) {
        return order.id === orderId;
      },
    );

    if (orderIndex !== -1) {
      const order = vendorDashboardData.activeOrders[orderIndex];
      order.status = "cancelled";
      vendorDashboardData.orderHistory.unshift(order);
      vendorDashboardData.activeOrders.splice(orderIndex, 1);
      vendorDashboardData.stats.activeOrders =
        vendorDashboardData.activeOrders.length;

      renderVendorOrdersTab(vendorDashboardData);
      renderVendorDashboard();

      showToast(`🚫 Order #${orderId} has been cancelled`, "success");
    }
  } catch (error) {
    console.error("Error cancelling order:", error);
    showToast("❌ Failed to cancel order", "error");
  }
}
// menu tab
function renderVendorMenuTab(data) {
  console.log("Rendering Menu tab...");

  const menuList = document.getElementById("vendor-menu-items-list");

  if (!menuList) {
    console.error("Menu items list element not found");
    return;
  }

  displayMenuItems(data.menuItems);
}

function displayMenuItems(items) {
  const menuList = document.getElementById("vendor-menu-items-list");

  if (!menuList) return;

  if (items.length === 0) {
    menuList.innerHTML = createEmptyState(
      "🍜",
      "No Menu Items",
      'Click "+ Add Item" to add your first menu item',
    );
    return;
  }

  let menuHTML = "";
  items.forEach(function (item, index) {
    const itemId = item.id || index;
    const category = item.category || item.cuisine || "Main";
    const isAvailable = item.available !== false;

    menuHTML += `
      <article class="vendor-menu-item" data-item-id="${itemId}" role="listitem">
        <div class="vendor-menu-item-details">
          <figure class="vendor-menu-item-image" aria-hidden="true">
            ${item.image ? `<img src="${item.image}" alt="${item.name}">` : "🍜"}
          </figure>
          <div class="vendor-menu-item-info">
            <h4>
              ${item.name}
              <span class="vendor-category-tag">${category}</span>
            </h4>
            <p class="vendor-item-desc">${item.description || ""}</p>
          </div>
        </div>
        <div class="vendor-menu-item-actions">
          <data class="vendor-menu-item-price" value="${item.price}">$${item.price.toFixed(2)}</data>
          <button 
            type="button"
            class="vendor-toggle-switch ${isAvailable ? "active" : ""}" 
            onclick="toggleAvailability(${index})"
            role="switch"
            aria-checked="${isAvailable}"
            aria-label="Toggle availability for ${item.name}"
          ></button>
          <button 
            type="button"
            class="vendor-edit-btn" 
            onclick="editMenuItem(${index})"
            aria-label="Edit ${item.name}"
          >✏️</button>
        </div>
      </article>`;
  });

  menuList.innerHTML = menuHTML;
}
// reviews tab
function renderVendorReviewsTab(data) {
  console.log("Rendering Reviews tab...");

  const reviewsList = document.getElementById("vendor-reviews-list");

  if (!reviewsList) {
    console.error("Reviews list element not found");
    return;
  }

  if (data.reviews.length === 0) {
    reviewsList.innerHTML = createEmptyState(
      "⭐",
      "No Reviews Yet",
      "Customer reviews will appear here",
    );
  } else {
    let reviewsHTML = "";
    data.reviews.forEach(function (review) {
      const stars = "⭐".repeat(review.rating);
      reviewsHTML += `
        <article class="vendor-review-item" role="listitem">
          <header>
            <h4>${review.customer}</h4>
          </header>
          <div class="vendor-review-rating" role="img" aria-label="${review.rating} out of 5 stars">
            ${stars}
          </div>
          <blockquote class="vendor-review-comment">
            <p>"${review.comment}"</p>
          </blockquote>
          <footer>
            <time class="vendor-review-date" datetime="${review.date}">${review.date}</time>
          </footer>
        </article>`;
    });
    reviewsList.innerHTML = reviewsHTML;
  }

  console.log("Reviews tab rendered successfully");
}
// history tab
function renderVendorHistoryTab(data) {
  console.log("Rendering History tab...");

  const historyList = document.getElementById("vendor-history-list");
  const searchInput = document.getElementById("vendor-order-search");
  const statusFilter = document.getElementById("vendor-status-filter");
  const timeFilter = document.getElementById("vendor-time-filter");

  if (!historyList) {
    console.error("History list element not found");
    return;
  }

  function applyFilters() {
    let filteredOrders = [...data.orderHistory];

    // Search filter
    if (searchInput && searchInput.value) {
      const query = searchInput.value.toLowerCase();
      filteredOrders = filteredOrders.filter(function (order) {
        return (
          order.id.toLowerCase().includes(query) ||
          order.customer.toLowerCase().includes(query)
        );
      });
    }

    // Status filter
    if (statusFilter && statusFilter.value) {
      filteredOrders = filteredOrders.filter(function (order) {
        return order.status === statusFilter.value;
      });
    }

    // Time filter
    if (timeFilter && timeFilter.value) {
      const today = new Date();
      let dateThreshold = new Date();

      switch (timeFilter.value) {
        case "today":
          dateThreshold.setHours(0, 0, 0, 0);
          break;
        case "week":
          dateThreshold.setDate(today.getDate() - 7);
          break;
        case "month":
          dateThreshold.setMonth(today.getMonth() - 1);
          break;
      }

      filteredOrders = filteredOrders.filter(function (order) {
        const orderDate = parseOrderDate(order.date);
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

  // Initial display
  applyFilters();

  // Event listeners for filters
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
}

function parseOrderDate(dateStr) {
  const datePart = dateStr.substring(0, dateStr.lastIndexOf(" "));
  return new Date(datePart);
}
// rental tab
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
// add item modal
function openAddItemModal() {
  console.log("Opening add item modal...");

  const modal = document.getElementById("add-item-modal");
  if (modal) {
    const form = document.getElementById("add-item-form");
    if (form) form.reset();

    modal.classList.add("active");
    modal.setAttribute("open", "");

    // Focus on first input for accessibility
    setTimeout(function () {
      const firstInput = document.getElementById("item-name");
      if (firstInput) firstInput.focus();
    }, 100);

    // Trap focus inside modal
    trapFocus(modal);
  }
}

function closeAddItemModal() {
  console.log("Closing add item modal...");

  const modal = document.getElementById("add-item-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.removeAttribute("open");

    // Return focus to add button
    const addBtn = document.getElementById("vendor-add-item-btn");
    if (addBtn) addBtn.focus();
  }
}

function openEditItemModal(index) {
  console.log(`Opening edit item modal for index: ${index}`);

  const item = vendorDashboardData.menuItems[index];
  if (!item) {
    console.error(`Item not found at index: ${index}`);
    return;
  }

  const modal = document.getElementById("edit-item-modal");
  if (modal) {
    // Fill form with current values
    document.getElementById("edit-item-index").value = index;
    document.getElementById("edit-item-id").value = item.id || "";
    document.getElementById("edit-item-name").value = item.name;
    document.getElementById("edit-item-price").value = item.price;
    document.getElementById("edit-item-category").value =
      item.category || item.cuisine || "";
    document.getElementById("edit-item-description").value =
      item.description || "";

    modal.classList.add("active");
    modal.setAttribute("open", "");

    // Focus on first input
    setTimeout(function () {
      const firstInput = document.getElementById("edit-item-name");
      if (firstInput) firstInput.focus();
    }, 100);

    // Trap focus inside modal
    trapFocus(modal);
  }
}

function closeEditItemModal() {
  console.log("Closing edit item modal...");

  const modal = document.getElementById("edit-item-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.removeAttribute("open");
  }
}
// form submissions
async function submitNewItem() {
  console.log("Submitting new item...");

  const name = document.getElementById("item-name").value.trim();
  const price = parseFloat(document.getElementById("item-price").value);
  const category = document.getElementById("item-category").value;
  const description = document.getElementById("item-description").value.trim();

  // Validation
  if (!name) {
    showToast("⚠️ Please enter item name!", "error");
    document.getElementById("item-name").focus();
    return;
  }

  if (isNaN(price) || price < 0) {
    showToast("⚠️ Please enter a valid price!", "error");
    document.getElementById("item-price").focus();
    return;
  }

  const newItem = {
    name: name,
    price: price,
    category: category || "Main",
    description: description,
    available: true,
    createdAt: new Date().toISOString(),
  };

  const submitBtn = document.querySelector("#add-item-modal .btn-save");
  setButtonLoading(submitBtn, true, "Saving...");

  try {
    const docId = await saveMenuItemToFirebase(newItem);

    if (docId) {
      newItem.id = docId;
      vendorDashboardData.menuItems.push(newItem);
      renderVendorMenuTab(vendorDashboardData);
      closeAddItemModal();
      showToast(`✅ ${name} has been added!`, "success");
    } else {
      showToast("❌ Failed to save item.", "error");
    }
  } catch (error) {
    console.error("Error adding item:", error);
    showToast("❌ An error occurred.", "error");
  } finally {
    setButtonLoading(submitBtn, false, "Save");
  }
}

async function submitEditItem() {
  console.log("Submitting edited item...");

  const index = parseInt(document.getElementById("edit-item-index").value);
  const itemId = document.getElementById("edit-item-id").value;
  const name = document.getElementById("edit-item-name").value.trim();
  const price = parseFloat(document.getElementById("edit-item-price").value);
  const category = document.getElementById("edit-item-category").value;
  const description = document
    .getElementById("edit-item-description")
    .value.trim();

  // Validation
  if (!name) {
    showToast("⚠️ Please enter item name!", "error");
    document.getElementById("edit-item-name").focus();
    return;
  }

  if (isNaN(price) || price < 0) {
    showToast("⚠️ Please enter a valid price!", "error");
    document.getElementById("edit-item-price").focus();
    return;
  }

  const updatedItem = {
    name: name,
    price: price,
    category: category || "Main",
    description: description,
    updatedAt: new Date().toISOString(),
  };

  const submitBtn = document.querySelector("#edit-item-modal .btn-save");
  setButtonLoading(submitBtn, true, "Saving...");

  try {
    if (itemId) {
      const success = await updateMenuItemInFirebase(itemId, updatedItem);
      if (!success) {
        showToast("❌ Failed to update item.", "error");
        return;
      }
    }

    vendorDashboardData.menuItems[index] = {
      ...vendorDashboardData.menuItems[index],
      ...updatedItem,
    };

    renderVendorMenuTab(vendorDashboardData);
    closeEditItemModal();
    showToast(`✅ ${name} has been updated!`, "success");
  } catch (error) {
    console.error("Error updating item:", error);
    showToast("❌ An error occurred.", "error");
  } finally {
    setButtonLoading(submitBtn, false, "Save");
  }
}
// menu item actions
function editMenuItem(index) {
  openEditItemModal(index);
}

async function deleteMenuItem(index) {
  console.log(`Delete menu item at index: ${index}`);

  const item = vendorDashboardData.menuItems[index];
  if (!item) {
    console.error(`Item not found at index: ${index}`);
    return;
  }

  if (
    !confirm(
      `Are you sure you want to delete "${item.name}"?\n\nThis action cannot be undone.`,
    )
  ) {
    return;
  }

  try {
    if (item.id) {
      const success = await deleteMenuItemFromFirebase(item.id);
      if (!success) {
        showToast("❌ Failed to delete from database.", "error");
        return;
      }
    }

    vendorDashboardData.menuItems.splice(index, 1);
    renderVendorMenuTab(vendorDashboardData);
    showToast(`🗑️ ${item.name} has been deleted!`, "success");
  } catch (error) {
    console.error("Error deleting item:", error);
    showToast("❌ An error occurred.", "error");
  }
}

async function toggleAvailability(index) {
  console.log(`Toggle availability for item at index: ${index}`);

  const item = vendorDashboardData.menuItems[index];
  if (!item) return;

  const newAvailability = !item.available;
  vendorDashboardData.menuItems[index].available = newAvailability;

  if (item.id) {
    try {
      await updateMenuItemInFirebase(item.id, { available: newAvailability });
      showToast(
        `${item.name} is now ${newAvailability ? "available" : "unavailable"}`,
        "success",
      );
    } catch (error) {
      console.error("Error updating availability:", error);
      vendorDashboardData.menuItems[index].available = !newAvailability;
    }
  }

  renderVendorMenuTab(vendorDashboardData);
}
// utility functions
function createEmptyState(icon, title, text) {
  return `
    <div class="vendor-empty-state" role="status">
      <div class="vendor-empty-state-icon" aria-hidden="true">${icon}</div>
      <p class="vendor-empty-state-title">${title}</p>
      <p class="vendor-empty-state-text">${text}</p>
    </div>`;
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function setButtonLoading(button, isLoading, text) {
  if (!button) return;

  if (isLoading) {
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    button.innerHTML = `<span class="vendor-loading" aria-hidden="true"></span> ${text}`;
  } else {
    button.disabled = false;
    button.removeAttribute("aria-busy");
    button.textContent = text;
  }
}

function filterMenuItems(searchTerm) {
  if (!searchTerm || searchTerm.trim() === "") {
    return vendorDashboardData.menuItems;
  }

  const lowerSearchTerm = searchTerm.toLowerCase();
  return vendorDashboardData.menuItems.filter(function (item) {
    return (
      item.name.toLowerCase().includes(lowerSearchTerm) ||
      (item.category &&
        item.category.toLowerCase().includes(lowerSearchTerm)) ||
      (item.description &&
        item.description.toLowerCase().includes(lowerSearchTerm))
    );
  });
}
// accessibility - trap focus in modals
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          event.preventDefault();
        }
      }
    }

    if (event.key === "Escape") {
      closeAddItemModal();
      closeEditItemModal();
    }
  });
}
// toast notifications
function showToast(message, type = "success") {
  // Remove existing toast
  const existingToast = document.querySelector(".vendor-toast");
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast
  const toast = document.createElement("div");
  toast.className = `vendor-toast vendor-toast-${type}`;
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "polite");
  toast.textContent = message;

  document.body.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(function () {
    toast.classList.add("fade-out");
    setTimeout(function () {
      toast.remove();
    }, 300);
  }, 3000);
}
// EVENT LISTENERS
function initializeEventListeners() {
  console.log("Initializing event listeners...");

  // Add Item Button
  const addItemBtn = document.getElementById("vendor-add-item-btn");
  if (addItemBtn) {
    addItemBtn.addEventListener("click", openAddItemModal);
  }

  // Close modals when clicking outside
  document.addEventListener("click", function (event) {
    const addModal = document.getElementById("add-item-modal");
    const editModal = document.getElementById("edit-item-modal");

    if (event.target === addModal) closeAddItemModal();
    if (event.target === editModal) closeEditItemModal();
  });

  // Close modals with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAddItemModal();
      closeEditItemModal();
    }
  });

  console.log("Event listeners initialized");
}

// Navigate to home
function navigateHome() {
  console.log("Navigating to home");
  window.location.href = "index.html";
}
// global function exports
window.openAddItemModal = openAddItemModal;
window.closeAddItemModal = closeAddItemModal;
window.submitNewItem = submitNewItem;
window.openEditItemModal = openEditItemModal;
window.closeEditItemModal = closeEditItemModal;
window.submitEditItem = submitEditItem;
window.editMenuItem = editMenuItem;
window.deleteMenuItem = deleteMenuItem;
window.toggleAvailability = toggleAvailability;
window.markOrderReady = markOrderReady;
window.cancelOrder = cancelOrder;
window.navigateHome = navigateHome;
