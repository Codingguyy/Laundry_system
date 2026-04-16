# 🧺 Laundry Order Management System (AI-First)

A lightweight, production-inspired order management system for a dry cleaning store.
Built with an **AI-first development approach**, focusing on rapid execution, clean architecture, and real-world usability.

---

## 🎯 Objective

To build a system that allows staff to:

* Create and manage customer orders
* Track order status through a defined workflow
* Automatically calculate billing
* Monitor business performance via a dashboard

---

## 🚀 Live Demo

laundry-system-vak5.vercel.app

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/Codingguyy/Laundry_system.git
cd Laundry_system

npm install
npm run dev
```

Open: http://localhost:3000

---

## 🧠 System Overview

```text
Create Order → Stored in Memory → Listed in Orders
→ Status Updated → Reflected in Dashboard
```

The system simulates a real-world laundry workflow while keeping implementation simple and fast.

---

## ✨ Features

### 📝 Order Creation

* Input customer name & phone number
* Add multiple garments with quantity
* Automatic price calculation via pricing map
* Generates unique Order ID

---

### 🔄 Order Status Management

* Status flow:

  * RECEIVED → PROCESSING → READY → DELIVERED
* Validation logic prevents invalid transitions
* Supports controlled updates for operational flexibility

---

### 🔍 Orders Management

* View all orders
* Filter by:

  * Status
  * Customer name
  * Phone number

---

### 📊 Dashboard Analytics

* Total orders
* Total revenue
* Orders grouped by status
* Real-time updates using global state

---

### ⚡ Real-Time State Management

* Powered by Zustand
* Instant UI updates without reload
* Efficient state synchronization across pages

---

## 🧩 Advanced UI Features (Key Differentiators)

### 🧭 Quick Navigation Widget

* Floating, draggable navigation panel
* Built using React RND
* Enables fast switching between pages

---

### 💬 Activity Message Panel

* Displays real-time activity logs
* Floating and draggable UI
* Helps simulate operational visibility

---

### 🎨 UI/UX Design

* Clean, minimal, and functional interface
* Tailwind CSS for styling
* Status-based visual indicators
* Focus on clarity over unnecessary complexity

---

## 🏗️ Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **State Management:** Zustand
* **Styling:** Tailwind CSS
* **UI Enhancements:** React RND
* **Storage:** In-memory database

---

## 📂 Project Structure

```bash
app/
├── dashboard/
│   └── page.tsx              # Dashboard (analytics view)
│
├── createorder/
│   └── page.tsx              # Create Order page
│
├── orderssss/
│   └── page.tsx              # Orders list + filtering
│
├── api/
│   ├── orders/
│   │   ├── route.ts                  # Create order (POST), Get all orders (GET)
│   │   ├── [id]/
│   │   │   └── route.ts              # Get single order, Update status (GET, PATCH)
│   │   ├── createorder/
│   │   │   └── route.ts              # Dedicated create order endpoint
│   │   └── ordersdetails/
│   │       └── route.ts              # Additional order-related operations
│   │
│   └── messages/
│       └── getactivity/
│           └── route.ts              # Activity / message logs API
│
components/
├── activity.tsx             # Floating activity/message panel
├── dropdown.tsx             # Reusable dropdown component
├── navigate.tsx             # Navigation helper
├── navigation.tsx           # Main navigation UI
├── ordercard.tsx            # Order display card
└── orderpricing.ts          # Pricing display logic
│
utils/
├── calc_price.ts                     # Total price calculation logic
├── checkstatus.ts                   # Status validation
├── checkstatusflow.ts              # Status flow control (RECEIVED → DELIVERED)
└── formatinputitemstoorderitems.ts # Input transformation logic
│
types/
├── message.ts              # Message type definitions
├── order.ts                # Order and item types
└── utils.ts                # Shared utility types
│
store/
├── store.ts                # In-memory database
└── zustand.ts              # Zustand global state management
```

---

## 🧠 Structure Explanation

* **`app/`** → Contains all pages and API routes using Next.js App Router
* **`api/`** → Backend logic for order management and activity tracking
* **`components/`** → Reusable UI components including draggable panels
* **`utils/`** → Core business logic (pricing, validation, transformations)
* **`types/`** → TypeScript definitions for type safety
* **`store/`** → In-memory database and global state (Zustand)

---

## ⚠️ Notes

* The project uses **in-memory storage**, so data resets on server restart
* Some folder names (e.g., `orderssss`) are kept as-is to match the repository
* API structure is slightly expanded to support modular operations
* UI components include **floating draggable panels (React RND)** for enhanced usability

---

## 🧾 Sample Prompts Used (AI Requirement)

* "Design REST APIs for a laundry order management system using Next.js"
* "Fix TypeScript error: element implicitly has an 'any' type when indexing object"
* "How to structure dynamic API routes in Next.js App Router"
* "Tailwind CSS not working in Next.js, how to fix?"
* "How to prevent duplicate state updates in Zustand"
* "How to validate workflow status transitions"

---

## 🤖 AI Usage Report

### 🔹 Tools Used

* ChatGPT (primary development assistant)

---

### 🔹 Where AI Helped

* API design and route structuring
* TypeScript type creation and debugging
* Fixing Tailwind configuration issues
* Designing UI layout and page structure
* Implementing Zustand state patterns

---

### ⚠️ Where AI Fell Short

* Incorrect Tailwind setup (version mismatch)
* Incorrect typing for pricing map indexing
* Initial lack of proper status validation logic
* Message duplication due to improper state updates
* Confusion around Next.js route params typing

---

### 🔧 Improvements Made

* Implemented strict status flow validation
* Fixed duplicate message issue with controlled triggers
* Corrected Next.js route handler typing for production builds
* Refactored types for better safety and clarity
* Simplified UI for better usability

---

## ⚖️ Tradeoffs

* Used in-memory storage instead of a database for speed
* No authentication (focus on core features)
* UI kept minimal rather than highly styled

---

## 🧠 Key Design Decisions

* Pricing controlled via backend map (not user input)
* Status transitions reflect real-world workflow
* Zustand chosen for simplicity and performance
* Floating widgets added to simulate real operational dashboards

---

## 🚀 Future Improvements

* Add persistent database (MongoDB / PostgreSQL)
* Implement authentication & role-based access
* Add estimated delivery customization
* Improve mobile responsiveness
* Add order history & logs

---

## 📸 Screenshots

Dashboard-> /assets/Dashoard.png
Orders->  /assets/orders.png
Createorder-> /assets/createorder.png
widgetsUI-> /assets/widgets.png
---

## 📌 Conclusion

This project demonstrates:

* Fast and effective AI-assisted development
* Strong problem-solving and debugging ability
* Practical system design and API structuring
* Focus on usability and real-world application

---

## 🙌 Author

**Amulya**
