# Gym Management System

## Overview
The Gym Management System is built to streamline key gym operations. It enables admins to manage members, billing, notifications, and more, with the help of **Firebase** for authentication and data storage. The system provides two main dashboards:

- **Admin Dashboard**: Admins can manage members, generate bills, assign fee packages, send notifications, and more.
- **Member Dashboard**: Members can view their receipts, bills, notifications, and personal details, with access granted only after admin approval.

---

## Technologies Used

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Authentication**: Firebase Authentication
- **Hosting**: Firebase Hosting

---

## Project Structure

### Admin Dashboard
- Approve or reject member sign-ups.
- Add, update, and delete member records.
- Create and assign fee packages to members.
- Manage notifications and generate reports.
- View and manage gym equipment.
- Generate and manage member bills.

### Member Dashboard
- View bill receipts and notifications.
- Update personal details (e.g., change password).
- Access to the dashboard is granted only after admin approval.

---

## Features & Modules

### Admin Features:
- **Manage Member Requests**: Approve/reject member sign-ups.
- **CRUD Operations**: Add, update, delete, and view member data.
- **Billing System**: Create bills and assign fee packages to members.
- **Reports Generation**: Generate and export reports.
- **Send Notifications**: Send month-wise notifications to members.
- **Gym Equipment Management**: View and manage gym equipment.

### Member Features:
- **Admin Approval**: Access the dashboard after admin approval of sign-up.
- **Billing and Notifications**: View and manage receipts and notifications.
- **Personal Information**: Edit personal details such as changing the password.

---

## Database

**Firebase** serves as the backend for the following:

- **User Authentication**: Secure sign-in process via Firebase Authentication for both admins and members.
- **Member Data**: Managed using Firestore/Realtime Database.
- **Billing Data**: Bills are assigned and stored in Firebase.
- **Notifications**: Used to engage members and maintain record-keeping.

---

## Logging

All actions in the system are logged for transparency and auditing purposes. Logs track key actions performed by admins and members and are useful for debugging and auditing. The system utilizes **JavaScript logging** to capture important events.

---

## Deployment

- This app is primarily deployed using **Firebase Hosting**.
- Firebase Hosting is optimized for scalability and can handle both small and large data volumes efficiently.

### Deployment Steps:

1. Install Firebase CLI:
    ```bash
    npm install -g firebase-tools
    ```

2. Login to Firebase:
    ```bash
    firebase login
    ```

3. Initialize Firebase in your project:
    ```bash
    firebase init
    ```

4. Deploy the project:
    ```bash
    firebase deploy
    ```

---

## Optimization

The Gym Management System has undergone various optimizations to ensure performance and a seamless user experience:

- **Frontend Optimization**: Efficient state management in React to minimize unnecessary re-renders.
- **Backend Optimization**: Optimized Firebase queries for enhanced performance.
- **UI/UX**: Responsive design ensuring a user-friendly experience on different devices.

---

## How to Run the Project Locally

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Prathameshk11/gym-management-system.git
    ```

2. **Navigate to the Project Directory**:
    ```bash
    cd gym-management-system
    ```

3. **Install Dependencies**:
    ```bash
    npm install
    ```

4. **Run the Development Server**:
    ```bash
    npm start
    ```

5. **Access the App**:
   Open `http://localhost:3000` in your browser to see the application in action.

---

## Live Link

The live version of the project is available at:

- [Gym Management System - Live](https://gym-management-system-a714b.web.app/)

---

## Sample Login Details for Testing

- **Member Login (Test)**:
    - **Email**: `member@gmail.com`
    - **Password**: `member`
    - Please note: Admin approval is required before the member can access the dashboard.

- **Admin Login**: Admin login credentials should be set up in Firebase.

---

## License

This project is open-source and distributed under the MIT License.
