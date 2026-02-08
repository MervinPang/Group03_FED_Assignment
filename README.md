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

# **Hawker Hub - NEA Inspection Dashboard**

**Hawker Hub** is a comprehensive web-based platform designed for managing hawker centre operations in Singapore. The NEA (National Environment Agency) Inspection Dashboard is a key component that allows NEA officers to conduct hygiene inspections, track stall grades, and manage complaints efficiently.

This repository contains the source code for the Hawker Hub platform, including the Vendor Dashboard and NEA Inspection Dashboard. It is designed to demonstrate web development concepts such as **Firebase integration, real-time data updates, and responsive UI design**.

🎨 This project is built using:

- **HTML, CSS, JavaScript** for the frontend
- **Firebase Firestore** for the database
- **Firebase Authentication** for user management

This documentation explains the functionality, structure, and technology used in the project.

---

# 📝 Project Breakdown & Implementation

## 1. NEA Inspection Dashboard (nea-inspection-dashboard.html)

**Contributor/Author**: Rayne Tok

The **NEA Inspection Dashboard** serves as the main interface for NEA officers to monitor and manage food stall hygiene across hawker centres. This dashboard provides a comprehensive overview of all registered stalls, their hygiene grades, inspection history, and pending complaints.

### Dashboard Header

The header displays a welcome message with the officer's name and provides quick navigation back to the home page.

```html
<header class="nea-dashboard-header">
  <hgroup class="nea-header-col">
    <figure class="nea-header-icon">
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="#fff"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 1v6m6.708-2.708l-4.242 4.242M21 12h-6m2.708 6.708l-4.242-4.242M12 23v-6m-6.708 2.708l4.242-4.242M3 12h6M5.292 5.292l4.242 4.242"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </figure>
    <article class="nea-header-text">
      <h1>NEA Inspection Dashboard</h1>
      <p>Welcome, <span id="nea-officer-name">Rayne Tok</span></p>
    </article>
  </hgroup>
  <button class="nea-btn-home" onclick="navigateHome()">
    <span class="nea-btn-icon">🏠</span>
    <span class="nea-btn-text">Home</span>
  </button>
</header>
```

### Stats Cards Section

The dashboard displays key statistics in visually appealing cards:

- **Total Stalls**: Number of registered food stalls
- **This Month**: Inspections conducted this month
- **Pending Complaints**: Unresolved complaints requiring attention
- **Grade A Stalls**: Number of stalls with excellent hygiene ratings

```html
<ul class="nea-stats-row">
  <li class="nea-stat-card">
    <figure class="nea-stat-icon blue">📊</figure>
    <article class="nea-stat-content">
      <p class="nea-stat-label">Total Stalls</p>
      <h2 id="nea-total-stalls">8</h2>
    </article>
  </li>
  <!-- Additional stat cards... -->
</ul>
```

### Hygiene Grade Distribution

A visual representation of stall grades using color-coded circles:

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

## 2. Firebase Integration (firebase-nea-dashboard.js)

**Contributor/Author**: Rayne Tok

The dashboard uses **Firebase Firestore** as the backend database to store and retrieve all inspection data. Firebase provides real-time synchronization, ensuring that any changes made by one officer are immediately visible to others.

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
```

### Loading Data from Firebase

The `loadNEADataFromFirebase()` function fetches all necessary data using `Promise.all()` for efficient parallel loading:

```javascript
async function loadNEADataFromFirebase() {
  console.log("Fetching NEA data from Firebase...");
  showLoadingState();

  try {
    const neaRef = db.collection("neaDashboard");

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
      neaRef.collection("stalls").get(),
      neaRef.collection("inspections").get(),
      neaRef.collection("complaints").get(),
    ]);

    // Process stalls
    const stalls = [];
    stallsSnapshot.forEach((doc) => stalls.push({ id: doc.id, ...doc.data() }));

    // Process inspections
    const inspections = [];
    inspectionsSnapshot.forEach((doc) =>
      inspections.push({ id: doc.id, ...doc.data() }),
    );

    // Process complaints
    const complaints = [];
    complaintsSnapshot.forEach((doc) =>
      complaints.push({ id: doc.id, ...doc.data() }),
    );

    // Build data object
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

    console.log("NEA Data loaded:", neaDashboardData);
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

- We use `Promise.all()` to fetch multiple documents and collections simultaneously for better performance.
- The data is processed and stored in a global `neaDashboardData` object.
- If Firebase fails, fallback data is loaded to ensure the dashboard remains functional.

### Real-Time Listeners

Firebase's `onSnapshot()` method enables real-time updates whenever data changes:

```javascript
function setupRealtimeListeners() {
  console.log("Setting up real-time listeners...");
  const neaRef = db.collection("neaDashboard");

  // Listener for stalls collection
  neaRef.collection("stalls").onSnapshot((snapshot) => {
    console.log("Stalls updated!");
    const stalls = [];
    snapshot.forEach((doc) => stalls.push({ id: doc.id, ...doc.data() }));
    neaDashboardData.stalls = stalls;
    updateGradeDistributionFromStalls();

    const stallsTab = document.getElementById("nea-stalls-tab");
    if (stallsTab && stallsTab.classList.contains("active")) {
      renderNEAStallsTab(neaDashboardData);
    }
  });

  // Listener for inspections collection
  neaRef.collection("inspections").onSnapshot((snapshot) => {
    console.log("Inspections updated!");
    const inspections = [];
    snapshot.forEach((doc) => inspections.push({ id: doc.id, ...doc.data() }));
    neaDashboardData.inspections = inspections;

    const inspectionsTab = document.getElementById("nea-inspections-tab");
    if (inspectionsTab && inspectionsTab.classList.contains("active")) {
      renderNEAInspectionsTab(neaDashboardData);
    }
  });

  // Listener for complaints collection
  neaRef.collection("complaints").onSnapshot((snapshot) => {
    console.log("Complaints updated!");
    const complaints = [];
    snapshot.forEach((doc) => complaints.push({ id: doc.id, ...doc.data() }));
    neaDashboardData.complaints = complaints;

    const pendingCount = complaints.filter(
      (c) => c.status === "Pending",
    ).length;
    const pendingEl = document.getElementById("nea-pending-count");
    if (pendingEl) pendingEl.textContent = pendingCount;
  });

  console.log("Real-time listeners set up.");
}
```

---

## 3. Tab Navigation System

**Contributor/Author**: Rayne Tok

The dashboard features a tab-based navigation system with three main sections:

- **Stalls**: View all registered food stalls with search functionality
- **Inspections**: View inspection history and results
- **Complaints**: Manage pending complaints

### Tab Initialization

```javascript
function initializeNEATabs() {
  console.log("Initializing NEA Dashboard tabs...");
  const tabBtns = document.querySelectorAll(".nea-tab-btn");
  const tabPanes = document.querySelectorAll(".nea-tab-pane");

  if (tabBtns.length === 0 || tabPanes.length === 0) {
    console.error("Tab elements not found!");
    return;
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const tabName = btn.getAttribute("data-nea-tab");

      // Update buttons
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update panes
      tabPanes.forEach((p) => p.classList.remove("active"));
      const tabPane = document.getElementById(`nea-${tabName}-tab`);
      if (tabPane) {
        tabPane.classList.add("active");
        renderNEATabContent(tabName);
      }
    });
  });

  // Render initial tab
  renderNEATabContent("stalls");
}
```

---

## 4. Stalls Tab with Search Functionality

**Contributor/Author**: Rayne Tok

The Stalls tab displays all registered food stalls with their hygiene grades and provides a search feature to quickly find specific stalls.

### Rendering Stalls

```javascript
function renderNEAStallsTab(data) {
  console.log("Rendering NEA Stalls tab...");
  const stallsList = document.getElementById("nea-stalls-list");
  if (!stallsList) {
    console.error("Stalls list element not found!");
    return;
  }

  // Get search value
  const searchInput = document.getElementById("nea-stalls-search");
  let filteredStalls = [...data.stalls];

  if (searchInput && searchInput.value) {
    const query = searchInput.value.toLowerCase();
    filteredStalls = filteredStalls.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.stallId.toLowerCase().includes(query),
    );
  }

  if (filteredStalls.length === 0) {
    stallsList.innerHTML = `<p class="nea-no-results">No stalls found.</p>`;
    return;
  }

  let html = "";
  filteredStalls.forEach((stall) => {
    const grade = stall.grade || "D";
    html += `
      <article class="nea-stall-row">
        <div class="nea-stall-badge-container">
          ${createGradeBadge(grade)}
        </div>
        <div class="nea-stall-info">
          <p class="nea-stall-name">${stall.name}</p>
          <p class="nea-stall-id">${stall.stallId}</p>
        </div>
        <div class="nea-stall-actions">
          <button class="nea-inspect-btn" onclick="openInspectionModal('${stall.id}', '${stall.name}', '${stall.stallId}')">
            Inspect
          </button>
        </div>
      </article>`;
  });

  stallsList.innerHTML = html;
}
```

### Grade Badge Creation

The grade badge displays a color-coded circle based on the stall's hygiene grade:

```javascript
function createGradeBadge(grade) {
  const gradeUpper = (grade || "D").toUpperCase();
  const colors = {
    A: "#10b981",
    B: "#84cc16",
    C: "#f59e0b",
    D: "#ef4444",
  };
  const bgColor = colors[gradeUpper] || "#ef4444";

  return `
    <div class="hygiene-grade-badge">
      <div class="nea-grade-circle grade-${gradeUpper.toLowerCase()}" style="background: ${bgColor};">${gradeUpper}</div>
    </div>`;
}
```

---

## 5. Inspection Modal & Form Submission

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

    // Reset form fields
    document.getElementById("inspection-cleanliness").value = "";
    document.getElementById("inspection-food-handling").value = "";
    document.getElementById("inspection-equipment").value = "";
    document.getElementById("inspection-notes").value = "";

    modal.classList.add("active");
  }
}
```

### Submitting Inspection Form

```javascript
async function submitInspectionForm() {
  const stallId = document.getElementById("inspection-stall-id").value;
  const stallName = document.getElementById("inspection-stall-name").value;
  const stallUnitId = document.getElementById("inspection-stall-unit-id").value;
  const cleanliness = parseInt(
    document.getElementById("inspection-cleanliness").value,
  );
  const foodHandling = parseInt(
    document.getElementById("inspection-food-handling").value,
  );
  const equipment = parseInt(
    document.getElementById("inspection-equipment").value,
  );
  const notes = document.getElementById("inspection-notes").value;

  // Validation
  if (isNaN(cleanliness) || cleanliness < 0 || cleanliness > 100) {
    showToast("Cleanliness score must be 0-100", "error");
    return;
  }
  if (isNaN(foodHandling) || foodHandling < 0 || foodHandling > 100) {
    showToast("Food handling score must be 0-100", "error");
    return;
  }
  if (isNaN(equipment) || equipment < 0 || equipment > 100) {
    showToast("Equipment score must be 0-100", "error");
    return;
  }

  // Calculate overall score and grade
  const overall = Math.round((cleanliness + foodHandling + equipment) / 3);
  const grade = getGradeFromScore(overall);

  const inspection = {
    stallId: stallUnitId,
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
    notes: notes,
    createdAt: new Date().toISOString(),
  };

  try {
    const docId = await saveInspectionToFirebase(inspection);
    if (docId) {
      inspection.id = docId;
      neaDashboardData.inspections.unshift(inspection);

      // Update stall grade
      await updateStallGradeInFirebase(stallId, grade);

      updateGradeDistributionFromStalls();
      closeInspectionModal();
      renderNEADashboard();
      showToast(`✅ Inspection submitted! Grade: ${grade}`, "success");
    } else {
      showToast("❌ Failed to save inspection", "error");
    }
  } catch (error) {
    console.error("Error submitting inspection:", error);
    showToast("❌ An error occurred", "error");
  }
}
```

### Grade Calculation

The grade is automatically calculated based on the overall score:

```javascript
function getGradeFromScore(score) {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  return "D";
}
```

---

## 6. Firebase CRUD Operations

**Contributor/Author**: Rayne Tok

### Saving Inspection to Firebase

```javascript
async function saveInspectionToFirebase(inspection) {
  try {
    const neaRef = db.collection("neaDashboard");
    const docRef = await neaRef.collection("inspections").add(inspection);
    console.log("Inspection saved:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving inspection:", error);
    return null;
  }
}
```

### Updating Stall Grade

```javascript
async function updateStallGradeInFirebase(stallId, grade) {
  try {
    const neaRef = db.collection("neaDashboard");
    await neaRef.collection("stalls").doc(stallId).update({ grade: grade });
    console.log("Stall grade updated");
    return true;
  } catch (error) {
    console.error("Error updating stall grade:", error);
    return false;
  }
}
```

### Resolving Complaints

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

---

## 7. Toast Notifications

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

---

## 8. Fallback Data

**Contributor/Author**: Rayne Tok

In case Firebase fails to load, fallback data ensures the dashboard remains functional:

```javascript
function loadFallbackData() {
  console.log("Loading fallback data...");

  neaDashboardData = {
    officer: { name: "Rayne Tok" },
    stats: {
      totalStalls: 8,
      thisMonth: 4,
      pendingComplaints: 0,
      gradeAStalls: 1,
    },
    gradeDistribution: { A: 1, B: 2, C: 1, D: 4 },
    stalls: [
      {
        id: "S1",
        name: "Tian Tian Hainanese Chicken Rice",
        stallId: "#01-45",
        grade: "D",
      },
      { id: "S2", name: "Zhen Zhen Porridge", stallId: "#01-52", grade: "B" },
      {
        id: "S3",
        name: "Ah Heng Curry Chicken Bee Hoon",
        stallId: "#02-18",
        grade: "A",
      },
      { id: "S4", name: "Happy Duck Rice", stallId: "#01-11", grade: "C" },
      {
        id: "S5",
        name: "Chong Pang Nasi Lemak",
        stallId: "#02-34",
        grade: "B",
      },
      { id: "S6", name: "Lau Pa Sat Satay", stallId: "#01-29", grade: "D" },
      { id: "S7", name: "Fishball Story Soup", stallId: "#02-07", grade: "D" },
      { id: "S8", name: "Nameless Rice Stall", stallId: "#01-19", grade: "D" },
    ],
    inspections: [
      {
        id: "I1",
        stall: "Tian Tian Hainanese Chicken Rice",
        stallId: "#01-45",
        date: "Jan 13, 2026",
        officer: "Rayne Tok",
        cleanliness: 92,
        foodHandling: 87,
        equipment: 95,
        overall: 91,
        grade: "A",
      },
      {
        id: "I2",
        stall: "Zhen Zhen Porridge",
        stallId: "#01-52",
        date: "Jan 12, 2026",
        officer: "Rayne Tok",
        cleanliness: 80,
        foodHandling: 82,
        equipment: 79,
        overall: 80,
        grade: "B",
      },
    ],
    complaints: [],
  };

  showToast("⚠️ Using offline data", "error");
  renderNEADashboard();
  initializeNEATabs();
  initializeEventListeners();
}
```

---

## 9. CSS Styling Highlights

**Contributor/Author**: Rayne Tok

### Root Variables

```css
:root {
  --primary-blue: #1e40af;
  --accent-blue: #2563eb;
  --light-blue: #dbeafe;
  --green-a: #10b981;
  --green-b: #84cc16;
  --orange-c: #f59e0b;
  --red-d: #ef4444;
  --light-bg: #f7f9fb;
  --white: #ffffff;
  --text-dark: #1f2937;
  --text-light: #6b7280;
  --border-light: #e5e7eb;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 12px rgba(30, 64, 175, 0.12);
}
```

### Grade Circle Colors

```css
.nea-grade-circle.grade-a {
  background: var(--green-a); /* #10b981 */
}

.nea-grade-circle.grade-b {
  background: var(--green-b); /* #84cc16 */
}

.nea-grade-circle.grade-c {
  background: var(--orange-c); /* #f59e0b */
}

.nea-grade-circle.grade-d {
  background: var(--red-d); /* #ef4444 */
}
```

### Modal Styles

```css
.nea-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.nea-modal.active {
  display: flex;
}

.nea-modal-content {
  background: var(--white);
  border-radius: 14px;
  width: 90%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Toast Notifications

```css
.nea-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  color: white;
  font-weight: 500;
  z-index: 9999;
  animation: slideIn 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nea-toast-success {
  background: linear-gradient(135deg, var(--green-a) 0%, #059669 100%);
}

.nea-toast-error {
  background: linear-gradient(135deg, var(--red-d) 0%, #dc2626 100%);
}
```

### Responsive Design

```css
@media (max-width: 768px) {
  .nea-dashboard-container {
    padding: 1rem;
    margin: 1rem;
  }

  .nea-stats-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .nea-stall-row {
    flex-wrap: wrap;
    padding: 1rem;
  }

  .nea-inspect-btn {
    width: 100%;
    text-align: center;
  }

  .nea-grade-circles-container {
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .nea-grade-circle {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .nea-header-text h1 {
    font-size: 1.2rem;
  }
}
```

---

## 10. Global Functions Export

**Contributor/Author**: Rayne Tok

Functions used in HTML `onclick` attributes must be exported to the global `window` object:

```javascript
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
├── NEA Dashboard/
│   ├── nea-inspection-dashboard.html    # NEA Dashboard HTML
│   ├── nea-dashboard.css                # NEA Dashboard styles
│   └── firebase-nea-dashboard.js        # NEA Dashboard JavaScript
├── Vendor Dashboard/
│   ├── vendor-dashboard.html            # Vendor Dashboard HTML
│   ├── vendor-dashboard.css             # Vendor Dashboard styles
│   └── vendor-dashboard.js              # Vendor Dashboard JavaScript
├── index.html                           # Home page
└── README.md                            # This file
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

3. **Update Firebase configuration** (if using your own Firebase project)
   - Open `firebase-nea-dashboard.js`
   - Replace the `firebaseConfig` object with your project credentials

4. **Open in browser**
   - Open `index.html` in a web browser
   - Navigate to the NEA Dashboard or Vendor Dashboard

---

# 🔧 Technologies Used

| Technology              | Purpose                                            |
| ----------------------- | -------------------------------------------------- |
| HTML5                   | Page structure and semantic markup                 |
| CSS3                    | Styling, animations, and responsive design         |
| JavaScript (ES6+)       | Interactive functionality and Firebase integration |
| Firebase Firestore      | Real-time database for storing inspection data     |
| Firebase Authentication | User authentication (future implementation)        |

---

# ✨ Features

- ✅ Real-time data synchronization with Firebase
- ✅ Interactive hygiene grade distribution chart
- ✅ Search functionality for stalls
- ✅ Tab-based navigation system
- ✅ Modal-based inspection form
- ✅ Toast notifications for user feedback
- ✅ Responsive design for mobile and desktop
- ✅ Fallback data for offline functionality
- ✅ Grade calculation and automatic updates

---

# 👥 Contributors

| Name   | Role      | Contributions                                                    |
| ------ | --------- | ---------------------------------------------------------------- |
| Louis  | Developer | Home page, Navigation                                            |
| Mervin | Developer | Ordering Checkout, Queue system                                  |
| Rayne  | Developer | Vendor Dashboard, NEA Inspection Dashboard, Firebase Integration |

---

# 📄 License

This project is developed for educational purposes as part of the Frontend Development module at Ngee Ann Polytechnic.

---

# 🙏 Acknowledgments

- Ngee Ann Polytechnic - Frontend Development Module
- Firebase Documentation
- MDN Web Docs for HTML, CSS, and JavaScript references
