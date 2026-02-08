# Group03_FED_Assignment

Frontend Development group project for a hawker centre ordering system using HTML, CSS, and JavaScript. (Louis, Mervin, &amp; Rayne)

S10268761B - Louis Ng Bo Lin

1. Home page (index.html)
   Purpose: Main landing page where users can browse the stalls and navigate to other pages

Files

- index.html
- index.css
- index.js

Features

- Navigation to: Home/Order/Profile
- Display stall information
- Uses JS to load stall data
- Filter between cuisines
- Users can search for the stalls they want

2. Sign In Page (sign-in.html)
   Purpose: Allows users to log into HawkerHubSG

Files

- sign-in.html
- sign-up-in.css
- sign-up-in.js

Features

- Email and password login using firebase authentication
- Error message will be shown if login fails
- Guest button will redirect user to (index.html)
- After login, page will redirect users based on role
  - Customer to profile.html
  - NEA to nea-dashboard.html
  - Vendor to vendor-dashboard.html

3. Sign Up Page (sign-up.html)
   Purpose: Allows user to create account

Files

- sign-up.html
- sign-up-in.css
- sign-up-in.js

Features

- Collects username, email, password, and role
- Creates account using firebase authentication
- Saves user profile into firebse
- When user type is customer, user will be redirected to (profile.html)
- When user type is NEA/vendor, user will be redirected to verify.html to verify thier account

4. Profile Page (profile.html)
   Purpose: Shows user profile info and settings

Files

- profile.html
- profile.css
- profile.js

Features

- User must be logged in to access this page
- Load user details using firebase
- Display user stats
- Sign out button logs user out and reuturns to index.html
- Users can switch between English, Malay, Tamil, and Chinese
- Users can see thier order history as well by clicking the button
- On and off notifications and save changes

5. Verify Page (verify.html)
   Purpose: Verify NEA and vendor accounts

Files

- verify.html
- verify.css
- verify.js

Features

- Must be logged in to access this page
- Loads user role from firebase
- When user is verified, user can press continue button and go to (success.html)

6. Verification Success Page (success.html)
   Purpose: Shows confirmation that verification is done

Files

- success.html
- verify.css
- success.js

Features

- Display success page
- After pressing continue button, page will redirect users based on role
  - NEA to nea-dashboard.html
  - Vendor to vendor-dashboard.html

7. Review Page (review.html)
   Purpose: Display all reviews for a stall

Files

- review.html
- review.css
- review.js

Features

- Loads review from firebase
- Allow users to write a review when they click write a review button which will redirect them to (review-write.html)

8. Write Review Page (review-write.html)
   Purpose: Lets user submit a new review

Files

- review-write.html
- review-write.css
- review-write.js

Features

- Uses star icons for users to rate the stall
- Users can write comments in their review
- When user submits their review, they will be redirected to (review-success.html)

9. Review Success Page (review-success.html)
   Purpose: Shows the user that thier review has been sent successfully

Features

- Continue button will go back to (review.html)

Technologies Used

- HTML
- CSS
- Javascript
- Firebase Authentication
- Firebase Firestore

**Hawker Hub** is a web-based platform designed for managing hawker centre operations in Singapore. The platform features a **Vendor Dashboard** for hawker stall owners to manage their menu, orders, and reviews, as well as an **NEA Inspection Dashboard** for NEA officers to conduct hygiene inspections, track stall grades, and manage complaints efficiently.

This repository contains the source code for the Hawker Hub platform. It is designed to demonstrate web development concepts such as **Firebase Firestore integration, real-time data updates, and responsive UI design**.

🎨 This project is built using:

- **HTML, CSS, JavaScript** for the frontend
- **Firebase Firestore** for the database
- **Firebase Authentication** for user management

This documentation explains the functionality, structure, and technology used in the project.

---

# 📝 Project Breakdown & Implementation

## 1. Vendor Dashboard (vendor-dashboard.html)

**Contributor/Author**: Rayne Tok

The **Vendor Dashboard** serves as the main interface for hawker stall owners to manage their daily operations. This dashboard provides a comprehensive overview of the stall's performance including today's orders, revenue, active orders, and average rating.

### Dashboard Header

The header displays the stall name, stall ID, and provides quick navigation back to the home page.

```html
<header class="vendor-dashboard-header">
  <hgroup class="vendor-header-col">
    <article class="vendor-header-text">
      <h1 class="vendor-stall-name">Jian Bo Shui Kueh</h1>
      <p>Stall <span id="vendor-stall-id">#02-18</span></p>
    </article>
  </hgroup>
  <button class="vendor-btn-home" onclick="navigateHome()">
    <span class="vendor-btn-icon">🏠</span>
    <span class="vendor-btn-text">Home</span>
  </button>
</header>
```

### Stats Cards Section

The dashboard displays key statistics in visually appealing cards:

- **Today's Orders**: Number of orders received today
- **Today's Revenue**: Total revenue earned today
- **Active Orders**: Currently active orders being processed
- **Avg Rating**: Average customer rating for the stall

```html
<ul class="vendor-stats-row">
  <li class="vendor-stat-card">
    <figure class="vendor-stat-icon blue">📦</figure>
    <article class="vendor-stat-content">
      <p class="vendor-stat-label">Today's Orders</p>
      <h2 id="vendor-orders-today">0</h2>
    </article>
  </li>
  <!-- Additional stat cards... -->
</ul>
```

---

## 2. Vendor Dashboard Firebase Integration (vendor-dashboard2.js)

**Contributor/Author**: Mervin Pang

The vendor dashboard uses **Firebase Firestore** as the backend database to store and retrieve all vendor data. Firebase provides real-time synchronisation, ensuring that any changes made are immediately visible.

### Firebase Configuration

```javascript
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
// initialising firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
```

### Seeding Data to Firestore

To populate the Firestore database with initial vendor data, seed functions are used. Each function writes a specific document or collection to Firestore using the `set()` method.

```javascript
// stall document
function writeStallData() {
  const docData = {
    name: "Jian Bo Shui Kueh",
    stallId: "02-18",
    owner: "Mr. Lim",
  };
  db.collection("vendorDashboard").doc("stall").set(docData);
  console.log("✅ Stall data written");
}
```

In the above code:

- `db.collection("vendorDashboard")` accesses the `vendorDashboard` collection in Firestore.
- `.doc("stall")` references the specific document named `stall`.
- `.set(docData)` writes the data to that document, creating it if it doesn't exist or overwriting if it does.

### Menu Items Seed Example

```javascript
// menu items collection
function writeMenuItem1() {
  const docData = {
    name: "Shui Kueh (5 pcs)",
    category: "Signature",
    description: "Traditional steamed rice cake with turnip",
    price: 2.0,
    available: true,
  };
  db.collection("vendorDashboard")
    .doc("menuItems")
    .collection("items")
    .doc("menuItem1")
    .set(docData);
  console.log("✅ Menu item 1 written");
}
```

In the above code:

- The menu item is stored as a subcollection under the `menuItems` document.
- `.collection("items")` creates a subcollection named `items` inside the `menuItems` document.
- `.doc("menuItem1")` gives the document a specific ID for easy reference.

### Loading Data from Firebase

The `loadVendorDataFromFirebase()` function fetches all necessary data using `Promise.all()` for efficient parallel loading:

```javascript
async function loadVendorDataFromFirebase() {
  console.log("Fetching data from Firebase...");
  showLoadingState();

  try {
    const vendorRef = db.collection("vendorDashboard");

    const [
      stallDoc,
      statsDoc,
      menuSnapshot,
      reviewsSnapshot,
      ordersSnapshot,
      rentalSnapshot,
      activitySnapshot,
      topItemsSnapshot,
    ] = await Promise.all([
      vendorRef.doc("stall").get(),
      vendorRef.doc("stats").get(),
      vendorRef.doc("menuItems").collection("items").get(),
      vendorRef.doc("reviews").collection("items").get(),
      vendorRef.doc("orderHistory").collection("items").get(),
      vendorRef.doc("rentalAgreements").collection("items").get(),
      vendorRef.doc("recentActivity").collection("items").get(),
      vendorRef.doc("topItems").collection("items").get(),
    ]);

    // process menu items
    const menuItems = [];
    menuSnapshot.forEach(function (doc) {
      menuItems.push({ id: doc.id, ...doc.data() });
    });

    // build data object
    vendorDashboardData = {
      stall: stallDoc.exists ? stallDoc.data() : { name: "Stall Name" },
      stats: statsDoc.exists ? statsDoc.data() : { todaysOrders: 0 },
      menuItems: menuItems,
      // ... other data
    };

    console.log("✅ Data loaded from Firebase:", vendorDashboardData);
    hideLoadingState();
    renderVendorDashboard();
    initializeVendorTabs();
    initializeEventListeners();
    setupRealtimeListeners();
  } catch (error) {
    console.error("❌ Error loading data:", error);
    hideLoadingState();
    loadFallbackData();
  }
}
```

In the above code:

- We use `Promise.all()` to fetch multiple documents and collections simultaneously for better performance.
- Each snapshot is processed by iterating through the documents and pushing them into arrays.
- If Firebase fails, the `loadFallbackData()` function provides offline data to keep the dashboard functional.

### Real-Time Listeners

Firebase's `onSnapshot()` method enables real-time updates whenever data changes:

```javascript
function setupRealtimeListeners() {
  console.log("Setting up real-time listeners...");
  const vendorRef = db.collection("vendorDashboard");

  // listener for menu items
  vendorRef
    .doc("menuItems")
    .collection("items")
    .onSnapshot(function (snapshot) {
      console.log("🔄 Menu items updated!");
      const menuItems = [];
      snapshot.forEach(function (doc) {
        menuItems.push({ id: doc.id, ...doc.data() });
      });
      vendorDashboardData.menuItems = menuItems;

      const menuTab = document.getElementById("vendor-menu-tab");
      if (menuTab && !menuTab.hasAttribute("hidden")) {
        renderVendorMenuTab(vendorDashboardData);
      }
    });

  // listener for reviews
  vendorRef
    .doc("reviews")
    .collection("items")
    .onSnapshot(function (snapshot) {
      console.log("🔄 Reviews updated!");
      const reviews = [];
      snapshot.forEach(function (doc) {
        reviews.push({ id: doc.id, ...doc.data() });
      });
      vendorDashboardData.reviews = reviews;
    });

  console.log("✅ Real-time listeners set up");
}
```

In the above code:

- `onSnapshot()` listens for real-time changes in the Firestore collection.
- When data changes, the callback function is triggered, updating the local data and re-rendering the UI.

### Fallback Data

In case Firebase fails to load, fallback data ensures the dashboard remains functional:

```javascript
function loadFallbackData() {
  console.log("Loading fallback data...");

  vendorDashboardData = {
    stall: { name: "Jian Bo Shui Kueh", stallId: "02-18", owner: "Mr. Lim" },
    stats: {
      todaysOrders: 0,
      todaysRevenue: 0.0,
      activeOrders: 0,
      avgRating: 5.0,
    },
    menuItems: [
      {
        name: "Shui Kueh (5 pcs)",
        category: "Signature",
        price: 2.0,
        available: true,
      },
      {
        name: "Oyster Omelette",
        category: "Seafood",
        price: 3.5,
        available: true,
      },
      { name: "Popiah", category: "Snack", price: 2.5, available: true },
    ],
    reviews: [
      { customer: "Rayne Tok", rating: 5, comment: "Amazing shui kueh!" },
      {
        customer: "Ali Mohamed",
        rating: 4,
        comment: "Good taste but slow service.",
      },
    ],
    // ... other fallback data
  };

  showToast("⚠️ Could not connect to database. Using offline data.", "error");
  renderVendorDashboard();
  initializeVendorTabs();
  initializeEventListeners();
}
```

---

## 3. Vendor Dashboard Tab Navigation

**Contributor/Author**: Mervin Pang

The vendor dashboard features a tab-based navigation system with six main sections:

- **Overview**: Recent activity and top selling items
- **Orders**: Active orders with mark ready and cancel actions
- **Menu**: Menu items with add, edit, delete, and toggle availability
- **Reviews**: Customer reviews with star ratings
- **History**: Order history with search and filter
- **Rental**: Rental agreement information

### Tab Initialisation

```javascript
function initializeVendorTabs() {
  console.log("Initializing tabs...");
  const tabBtns = document.querySelectorAll(".vendor-tab-btn");
  const tabPanes = document.querySelectorAll(".vendor-tab-pane");

  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      switchTab(btn, tabBtns, tabPanes);
    });
  });

  renderVendorTabContent("overview");
}
```

In the above code:

- `querySelectorAll()` selects all tab buttons and tab panes.
- Each button gets a click event listener that triggers the `switchTab()` function.
- The initial tab rendered is the overview tab.

### Menu Item CRUD Operations

The menu tab allows vendors to create, read, update, and delete menu items:

```javascript
// save menu item to firebase
async function saveMenuItemToFirebase(item) {
  try {
    const docRef = await db
      .collection("vendorDashboard")
      .doc("menuItems")
      .collection("items")
      .add(item);
    console.log("✅ Menu item saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error saving menu item:", error);
    return null;
  }
}

// update menu item in firebase
async function updateMenuItemInFirebase(itemId, updatedData) {
  try {
    await db
      .collection("vendorDashboard")
      .doc("menuItems")
      .collection("items")
      .doc(itemId)
      .update(updatedData);
    console.log("✅ Menu item updated");
    return true;
  } catch (error) {
    console.error("❌ Error updating menu item:", error);
    return false;
  }
}

// delete menu item from firebase
async function deleteMenuItemFromFirebase(itemId) {
  try {
    await db
      .collection("vendorDashboard")
      .doc("menuItems")
      .collection("items")
      .doc(itemId)
      .delete();
    console.log("✅ Menu item deleted");
    return true;
  } catch (error) {
    console.error("❌ Error deleting menu item:", error);
    return false;
  }
}
```

In the above code:

- `.add(item)` creates a new document with an auto-generated ID (POST equivalent).
- `.update(updatedData)` modifies specific fields of an existing document (PATCH equivalent).
- `.delete()` removes a document from the collection (DELETE equivalent).

### Toggle Menu Item Availability

The toggle switch allows vendors to enable or disable menu items:

```javascript
async function toggleAvailability(index) {
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
```

---

## 4. NEA Inspection Dashboard (nea-dashboard.html)

**Contributor/Author**: Rayne Tok

The **NEA Inspection Dashboard** serves as the main interface for NEA officers to monitor and manage food stall hygiene across hawker centres. This dashboard provides a comprehensive overview of all registered stalls, their hygiene grades, inspection history, and pending complaints.

### Stats Cards Section

The dashboard displays key statistics:

- **Total Stalls**: Number of registered food stalls
- **This Month**: Inspections conducted this month
- **Pending Complaints**: Unresolved complaints requiring attention
- **Grade A Stalls**: Number of stalls with excellent hygiene ratings

### Hygiene Grade Distribution

A visual representation of stall grades using colour-coded circles:

- **Grade A** (Green): Excellent hygiene (90-100%)
- **Grade B** (Lime): Good hygiene (75-89%)
- **Grade C** (Orange): Average hygiene (60-74%)
- **Grade D** (Red): Poor hygiene (below 60%)

```html
<section class="nea-grade-distribution">
  <h2>Hygiene Grade Distribution</h2>
  <ul class="nea-grade-circles-container">
    <li class="nea-grade-circle-item">
      <span class="nea-grade-circle grade-a">A</span>
      <p class="nea-circle-count" id="nea-count-a">0</p>
      <p class="nea-circle-label">stalls</p>
    </li>
    <!-- Additional grade circles... -->
  </ul>
</section>
```

---

## 5. NEA Dashboard Firebase Integration (firebase-nea-dashboard.js)

**Contributor/Author**: Rayne Tok

### Seeding NEA Data to Firestore

Similar to the vendor dashboard, the NEA dashboard uses seed functions to populate Firestore:

```javascript
// stalls collection
function writeStall1() {
  const docData = {
    name: "Tian Tian Hainanese Chicken Rice",
    stallId: "#01-45",
    grade: "D",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("stalls")
    .doc("S1")
    .set(docData);
  console.log("✅ Stall 1 written");
}
```

In the above code:

- The stall data is stored under `neaDashboard/data/stalls/S1` in Firestore.
- `doc("data")` acts as a parent document that holds all subcollections.
- Each stall has a name, stall ID, and hygiene grade.

### Loading NEA Data from Firebase

```javascript
async function loadNEADataFromFirebase() {
  console.log("Fetching NEA data from Firebase...");
  showLoadingState();

  try {
    const neaRef = db.collection("neaDashboard");
    const dataRef = neaRef.doc("data");

    const [
      officerDoc,
      statsDoc,
      gradeDistDoc,
      stallsSnapshot,
      inspectionsSnapshot,
      complaintsSnapshot,
    ] = await Promise.all([
      neaRef.doc("officer").get(),
      neaRef.doc("stats").get(),
      neaRef.doc("gradeDistribution").get(),
      dataRef.collection("stalls").get(),
      dataRef.collection("inspections").get(),
      dataRef.collection("complaints").get(),
    ]);

    // process stalls
    const stalls = [];
    stallsSnapshot.forEach((doc) => stalls.push({ id: doc.id, ...doc.data() }));

    // build data object
    neaDashboardData = {
      officer: officerDoc.exists ? officerDoc.data() : { name: "NEA Officer" },
      stats: statsDoc.exists ? statsDoc.data() : { totalStalls: 0 },
      gradeDistribution: gradeDistDoc.exists
        ? gradeDistDoc.data()
        : { A: 0, B: 0, C: 0, D: 0 },
      stalls: stalls,
      inspections: inspections,
      complaints: complaints,
    };

    hideLoadingState();
    renderNEADashboard();
    initializeNEATabs();
    initializeEventListeners();
    setupRealtimeListeners();
  } catch (error) {
    console.error("Error loading NEA data:", error);
    hideLoadingState();
    loadFallbackData();
  }
}
```

In the above code:

- Documents like `officer`, `stats`, and `gradeDistribution` are fetched directly from the `neaDashboard` collection.
- Subcollections like `stalls`, `inspections`, and `complaints` are fetched from under the `data` document.
- `Promise.all()` ensures all data is fetched in parallel for performance.

---

## 6. NEA Inspection Modal & Form Submission

**Contributor/Author**: Rayne Tok

The inspection modal allows NEA officers to conduct and record hygiene inspections for each stall.

### Opening the Inspection Modal

```javascript
function openInspectionModal(stallId, stallName, stallUnitId) {
  const modal = document.getElementById("nea-inspection-modal");
  if (modal) {
    document.getElementById("inspection-stall-id").value = stallId;
    document.getElementById("inspection-stall-name").value = stallName;
    document.getElementById("inspection-stall-unit-id").value = stallUnitId;
    document.getElementById("inspection-stall-display").textContent = stallName;
    document.getElementById("inspection-stall-unit-display").textContent =
      stallUnitId;
    // reset form fields
    document.getElementById("inspection-cleanliness").value = "";
    document.getElementById("inspection-food-handling").value = "";
    document.getElementById("inspection-equipment").value = "";
    document.getElementById("inspection-notes").value = "";
    modal.classList.add("active");
  }
}
```

In the above code:

- The modal is populated with the selected stall's information.
- Form fields are reset to ensure a clean form for each new inspection.
- `modal.classList.add("active")` makes the modal visible.

### Submitting Inspection Form

```javascript
async function submitInspectionForm() {
  const cleanliness = parseInt(
    document.getElementById("inspection-cleanliness").value,
  );
  const foodHandling = parseInt(
    document.getElementById("inspection-food-handling").value,
  );
  const equipment = parseInt(
    document.getElementById("inspection-equipment").value,
  );

  // validation
  if (isNaN(cleanliness) || cleanliness < 0 || cleanliness > 100) {
    showToast("Cleanliness score must be 0-100", "error");
    return;
  }

  // calculate overall score
  const overall = Math.round((cleanliness + foodHandling + equipment) / 3);
  const grade = getGradeFromScore(overall);

  const inspection = {
    stall: stallName,
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    officer: neaDashboardData.officer.name,
    cleanliness: cleanliness,
    foodHandling: foodHandling,
    equipment: equipment,
    overall: overall,
    grade: grade,
  };

  const docId = await saveInspectionToFirebase(inspection);
  if (docId) {
    await updateStallGradeInFirebase(stallId, grade);
    updateGradeDistributionFromStalls();
    closeInspectionModal();
    showToast(`✅ Inspection submitted! Grade: ${grade}`, "success");
  }
}
```

In the above code:

- Scores are validated to ensure they are between 0-100.
- The overall score is calculated as the average of cleanliness, food handling, and equipment scores.
- The grade is automatically determined using the `getGradeFromScore()` function.
- The inspection is saved to Firebase and the stall grade is updated.

### Grade Calculation

```javascript
function getGradeFromScore(score) {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  return "D";
}
```

---

## 7. Complaints Management

**Contributor/Author**: Rayne Tok

The complaints tab displays pending complaints with the ability to resolve them:

```javascript
async function resolveComplaint(complaintId) {
  if (!confirm("Mark this complaint as resolved?")) {
    return;
  }
  try {
    await updateComplaintStatusInFirebase(complaintId, "Resolved");
    const index = neaDashboardData.complaints.findIndex(
      (c) => c.id === complaintId,
    );
    if (index !== -1) {
      neaDashboardData.complaints[index].status = "Resolved";
      renderNEAComplaintsTab(neaDashboardData);
      renderNEADashboard();
      showToast("✅ Complaint marked as resolved", "success");
    }
  } catch (error) {
    console.error("Error resolving complaint:", error);
    showToast("❌ Failed to mark complaint as resolved", "error");
  }
}
```

In the above code:

- A confirmation dialog is shown before resolving.
- The complaint status is updated in Firebase using `updateComplaintStatusInFirebase()`.
- The local data is updated and the UI is re-rendered to reflect the change.

---

## 8. Order History (order-history.js)

**Contributor/Author**: Louis

The **Order History** page allows both guest and member users to view their order history. Guest orders are stored in `localStorage`, while member orders are fetched from Firebase.

### Guest vs Member Detection

```javascript
function isGuest() {
  if (localStorage.getItem("guestMode") === "true") return true;
  if (localStorage.getItem("isGuest") === "true") return true;
  if (localStorage.getItem("memberMode") === "true") return false;
  if (localStorage.getItem("isMember") === "true") return false;
  if (localStorage.getItem("isLoggedIn") === "true") return false;
  if (getCurrentUser()) return false;
  return true;
}
```

In the above code:

- Multiple localStorage keys are checked to determine whether the user is a guest or member.
- If any member-related flag is set, the user is treated as a member.
- If no user data is found, the user defaults to guest mode.

### Fetching Member Orders from Firebase

```javascript
async function renderMemberOrders() {
  try {
    const allOrders = [];

    const historySnapshot = await db
      .collection("vendorDashboard")
      .doc("data")
      .collection("orderHistory")
      .get();

    historySnapshot.forEach((doc) => {
      const data = doc.data();
      allOrders.push({ id: doc.id, ...data });
    });

    const activeSnapshot = await db
      .collection("vendorDashboard")
      .doc("data")
      .collection("activeOrders")
      .get();

    activeSnapshot.forEach((doc) => {
      const data = doc.data();
      allOrders.push({ id: doc.id, status: "Active", ...data });
    });

    renderOrdersFromData(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}
```

In the above code:

- Orders are fetched from both `orderHistory` and `activeOrders` collections.
- The orders are combined into a single array and rendered on the page.

### Order Card Creation

```javascript
function createOrderCard(order) {
  var card = document.createElement("a");
  card.className = "order-card";
  card.href = "order-details.html";

  var statusText = order.status ? String(order.status) : "Active";

  card.innerHTML = `
    <div class="order-top">
      <p class="order-id">Order #${order.orderId || order.id || "-"}</p>
      <span class="order-status ${statusClass}">${statusText}</span>
    </div>
    <div class="order-info">
      <p>Date: ${formatDate(order.date)}</p>
      <p>Items: ${order.items || "-"}</p>
    </div>
    <div class="order-total">
      <p>Total</p>
      <p class="amount">$${Number(order.total || order.amount || 0).toFixed(2)}</p>
    </div>
  `;

  card.addEventListener("click", function () {
    localStorage.setItem("selectedOrder", JSON.stringify(order));
  });

  return card;
}
```

In the above code:

- A clickable card is created for each order.
- The card stores the selected order in localStorage when clicked for the order details page.

---

## 9. Toast Notifications

**Contributor/Author**: Rayne Tok

Toast notifications provide user feedback for actions like successful submissions or errors:

```javascript
function showToast(message, type = "success") {
  const existing = document.querySelector(".nea-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `nea-toast nea-toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
```

In the above code:

- Any existing toast is removed before showing a new one.
- The toast element is created dynamically and appended to the body.
- After 3 seconds, the toast fades out and is removed from the DOM.

---

## 10. Global Function Exports

**Contributor/Author**: Rayne Tok, Mervin Pang

Functions used in HTML `onclick` attributes must be exported to the global `window` object:

```javascript
// vendor dashboard
window.openAddItemModal = openAddItemModal;
window.closeAddItemModal = closeAddItemModal;
window.submitNewItem = submitNewItem;
window.editMenuItem = editMenuItem;
window.deleteMenuItem = deleteMenuItem;
window.toggleAvailability = toggleAvailability;
window.markOrderReady = markOrderReady;
window.cancelOrder = cancelOrder;
window.navigateHome = navigateHome;

// NEA dashboard
window.openInspectionModal = openInspectionModal;
window.closeInspectionModal = closeInspectionModal;
window.submitInspectionForm = submitInspectionForm;
window.resolveComplaint = resolveComplaint;
window.navigateHome = navigateHome;
```

---

# 📁 File Structure

```
hawker-hub/
├── index.html                          # Home page
├── vendor-dashboard.html               # Vendor Dashboard HTML
├── nea-dashboard.html                  # NEA Dashboard HTML
├── order-history.html                  # Order History HTML
├── order-details.html                  # Order Details HTML
├── css/
│   ├── vendor-dashboard.css            # Vendor Dashboard styles
│   ├── nea-dashboard.css               # NEA Dashboard styles
│   └── order-history.css               # Order History styles
├── js/
│   ├── vendor-dashboard2.js            # Vendor Dashboard JavaScript
│   ├── firebase-nea-dashboard.js       # NEA Dashboard JavaScript
│   └── order-history.js                # Order History JavaScript
└── README.md                           # This file
```

---

# 🗄️ Firestore Database Structure

```
vendorDashboard/
├── stall (document)
│   ├── name: "Jian Bo Shui Kueh"
│   ├── stallId: "02-18"
│   └── owner: "Mr. Lim"
├── stats (document)
│   ├── todaysOrders: 0
│   ├── todaysRevenue: 0.00
│   ├── activeOrders: 0
│   └── avgRating: 5.0
├── menuItems/items/ (subcollection)
│   ├── menuItem1
│   ├── menuItem2
│   └── menuItem3
├── reviews/items/ (subcollection)
│   ├── review1, review2, review3
├── orderHistory/items/ (subcollection)
│   ├── order1, order2, order3
├── rentalAgreements/items/ (subcollection)
│   ├── rental1, rental2
├── recentActivity/items/ (subcollection)
│   ├── activity1, activity2, activity3
└── topItems/items/ (subcollection)
    ├── item1, item2, item3

neaDashboard/
├── officer (document)
│   └── name: "Rayne Tok"
├── stats (document)
│   ├── totalStalls: 8
│   ├── thisMonth: 4
│   ├── pendingComplaints: 0
│   └── gradeAStalls: 1
├── gradeDistribution (document)
│   ├── A: 1, B: 2, C: 1, D: 4
└── data (document)
    ├── stalls/ (subcollection)
    │   ├── S1 - S8
    ├── inspections/ (subcollection)
    │   ├── I1, I2, I3
    └── complaints/ (subcollection)
        └── C1
```

---

# 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/MervinPang/Group03_FED_Assignment.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd Group03_FED_Assignment
   ```

3. **Seed the database** (run once)
   - Open `vendor-dashboard2.js` and uncomment the seed function call
   - Open `firebase-nea-dashboard.js` and uncomment the seed function call
   - Refresh the page to populate Firestore
   - Comment out the seed function calls again

4. **Open in browser**
   - Open `index.html` in a web browser
   - Navigate to the Vendor Dashboard or NEA Dashboard

---

# 🔧 Technologies Used

| Technology            | Purpose                                            |
| --------------------- | -------------------------------------------------- |
| HTML5                 | Page structure and semantic markup                 |
| CSS3                  | Styling, animations, and responsive design         |
| JavaScript (ES6+)     | Interactive functionality and Firebase integration |
| Firebase Firestore    | Real-time database for storing data                |
| Firebase SDK (Compat) | Browser-compatible Firebase library                |

---

# ✨ Features

### Vendor Dashboard

- ✅ Real-time data synchronisation with Firebase
- ✅ Menu item CRUD operations (Create, Read, Update, Delete)
- ✅ Toggle menu item availability
- ✅ Active order management (mark ready / cancel)
- ✅ Customer reviews display with star ratings
- ✅ Order history with search and filter
- ✅ Rental agreement management
- ✅ Tab-based navigation system
- ✅ Toast notifications for user feedback
- ✅ Responsive design for mobile and desktop
- ✅ Fallback data for offline functionality

### NEA Inspection Dashboard

- ✅ Hygiene grade distribution chart
- ✅ Stall search functionality
- ✅ Inspection form with score validation
- ✅ Automatic grade calculation
- ✅ Complaint management with resolve action
- ✅ Real-time updates with Firebase listeners
- ✅ Colour-coded grade badges (A/B/C/D)

### Order History

- ✅ Guest and member order views
- ✅ Active and past order tabs
- ✅ Firebase integration for member orders
- ✅ localStorage for guest orders
- ✅ Order card with status badges

---

# 👥 Contributors

| Name   | Role      | Contributions                                                    |
| ------ | --------- | ---------------------------------------------------------------- |
| Louis  | Developer | Home page, Order History, Navigation                             |
| Mervin | Developer | Order Checkout, Order Status, Payment Method                     |
| Rayne  | Developer | Vendor Dashboard, NEA Inspection Dashboard, Firebase Integration |

---

# 📄 License

This project is developed for educational purposes as part of the Frontend Development module at Ngee Ann Polytechnic.

---

# 🙏 Acknowledgments

- Ngee Ann Polytechnic — Frontend Development Module
- Firebase Documentation
- MDN Web Docs for HTML, CSS, and JavaScript references
