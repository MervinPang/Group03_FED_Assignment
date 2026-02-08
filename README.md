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




