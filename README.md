# ⚡ EvoCharge — EV Charging Station Locator & Management System

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Android](https://img.shields.io/badge/Android-Kotlin-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

**EvoCharge** is a full-stack Electric Vehicle (EV) charging solution designed to simplify finding, navigation, and reservation of EV charging stations. It features a feature-packed Android mobile application and a scalable Node.js Express REST API backed by MongoDB.

---

## 📱 System Architecture

```
Evcharger/
├── 📁 evcharger-app/       # Android Mobile Application (Kotlin, Jetpack, MVVM)
└── 📁 express-backend/     # Node.js + Express REST API (MongoDB, Mongoose, Bcrypt)
```

---

## ✨ Features

- 🔐 **User Authentication**: Secure Sign-Up and Login with Bcrypt password hashing (11 salt rounds).
- 📍 **Charging Station Finder**: Locate nearby EV charging hubs with real-time location mapping.
- ⚡ **Station Status & Details**: View connector types, operating hours, available charging slots, and pricing.
- 👤 **Vehicle & User Profile**: Manage user details, registered EV brand, and vehicle model updates.
- 🛠️ **REST API Backend**: High-performance Express.js server providing structured JSON endpoints.

---

## 🛠️ Technology Stack

### **Backend (`express-backend`)**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: Bcrypt.js password encryption, CORS enabled
- **Environment Management**: Dotenv configuration

### **Mobile App (`evcharger-app`)**
- **Language**: Kotlin
- **Platform**: Android SDK (Gradle Build System)
- **Architecture**: MVVM (Model-View-ViewModel)
- **Components**: Android Jetpack Navigation, ViewModels, Material Design Components

---

## 📡 API Reference

### 🔑 Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/auth/signUp` | Register a new user | `{ firstName, lastName, email, password }` |
| `POST` | `/api/auth/signIn` | User login verification | `{ email, password }` |

### 👤 User Endpoints (`/api/users`)

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `GET`  | `/api/users/greeting` | Health check & greeting | N/A |
| `POST` | `/api/users/user` | Create user document | `{ firstName, lastName, email, brand, model }` |
| `PUT`  | `/api/users/user/:id` | Update EV brand & model | `{ brand, model }` |

### 🔌 Charging Station Endpoints (`/api/chargingStation`)

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/chargingStation/post` | Add new charging station | `{ stationName, location, completeAddress, chargingType, latitude, longitude }` |
| `GET`  | `/api/chargingStation/allList` | Fetch all charging stations | N/A |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** v18.0.0 or higher
- **MongoDB** running locally (`mongodb://localhost:27017`) or a MongoDB Atlas URI
- **Android Studio** (for building the mobile app)

---

### 1️⃣ Setting Up the Backend Server

```bash
# Navigate to the backend directory
cd express-backend

# Install dependencies
npm install

# Create environment configuration (.env)
echo "PORT=5000" > .env
echo "MONGO_URI=mongodb://localhost:27017/boot" >> .env

# Start development server
npm run dev
# Or production start
npm start
```

The backend server will run on `http://localhost:5000` (or `http://YOUR_IP:5000`).

---

### 2️⃣ Setting Up the Android App

1. Open **Android Studio**.
2. Select **Open Project** and choose the `evcharger-app` folder.
3. Sync project with Gradle files.
4. Run the application on an Android Emulator or connected physical device.

---

## 🧪 Testing Backend Endpoints

Run the built-in test suite:

```bash
cd express-backend
npm test
```

---

## 👨‍💻 Author

Developed with ❤️ by **Shashank Agrawal**
- GitHub: [@shashank090704](https://github.com/shashank090704)
