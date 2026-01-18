# Jedi Endorsement Network

A **self-healing endorsement network** that models trust relationships between interns and visualizes them as a hierarchical tree.

This repository contains **both**:
- a **backend API** (Express + MongoDB via Mongoose), and  
- a **static frontend** (HTML + Mermaid.js) hosted on **GitHub Pages**.

---

## 🌐 Live Demo (Frontend)

👉 https://abhrankan-chakrabarti.github.io/abhrankan_winternship_endorsements/

The frontend fetches live data from the backend API and renders the endorsement tree dynamically.

---

## 🧠 Concept Overview

- Interns endorse each other, forming a **directed trust network**
- Endorsements eventually link to a **root intern**
- The tree is rendered visually using **Mermaid.js**
- Indirect relationships (multi-level endorsements) are supported
- Ordering is preserved exactly as defined in configuration JSON files

---

## 📁 Project Structure

```

.
├── index.html                  # Static frontend (GitHub Pages)
├── config.js                   # Frontend runtime configuration (API base URL)
│
├── backend/
│   ├── server.js               # Express server + API routes
│   ├── seed.js                 # Deterministic database seeding script
│   ├── models/
│   │   ├── Member.js           # Mongoose Member schema
│   │   └── Endorsement.js      # Mongoose Endorsement schema
│   ├── endorsement_network.members.json   # All interns (authoritative list)
│   ├── endorsement_network.indirect.json  # Indirect endorsement edges
│   ├── endorsement_network.config.json    # Root + ordering config
│   ├── package.json
│   └── .env                    # Environment variables (not committed)

````

---

## 🧱 Tech Stack

### Backend
- **Node.js**
- **Express**
- **MongoDB Atlas**
- **Mongoose (ODM)**
- **dotenv**
- **CORS**

### Frontend
- **Vanilla HTML/CSS**
- **Mermaid.js**
- **Fetch API**
- **GitHub Pages**

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
DB_NAME=endorsement_network
````

---

## ▶️ Running the Backend Locally

```bash
cd backend
npm install
npm start
```

Server runs at:

```
http://localhost:5001
```

---

## 🌱 Database Seeding (Deterministic)

```bash
cd backend
npm run seed
```

### What the seed script guarantees:

* Members are seeded **exactly in JSON order**
* Endorsements preserve **stable parent → child ordering**
* `createdAt` timestamps are **manually offset**, not identical
* Root is resolved via config (not hardcoded)
* Indirect links are defined **externally**, not inside code

This ensures:

* MongoDB Atlas does **not reorder** the tree
* Frontend rendering is **100% consistent**

---

## 📡 API Endpoints

### Health Check

```
GET /
```

### Fetch Endorsements (used by frontend)

```
GET /api/endorsements
```

**Response format:**

```json
[
  {
    "parentId": "WIN25625",
    "parentName": "Abhrankan Chakrabarti",
    "childId": "WIN25693",
    "childName": "Aashi",
    "action": "Endorse",
    "order": 1
  }
]
```

Results are sorted by `order` to preserve visual order.

---

## 🌐 Frontend Configuration

The frontend uses a runtime config file:

```js
// config.js
const CONFIG = {
  API_BASE: location.hostname.includes("github.io")
    ? "https://abhrankan-winternship-endorsements.onrender.com"
    : "http://localhost:5001"
};
```

This allows:

* GitHub Pages hosting
* Zero hardcoded backend URLs in HTML
* Easy environment switching

---

## 🧩 Design Decisions

* **Mongoose over native driver** for schema clarity & timestamps
* **JSON-driven topology** (members, indirect links, config)
* **No hardcoded root IDs**
* **Separation of structure vs logic**
* **Visualization-first API design**

---

## 📜 License

MIT License

---

## ✨ Author

**Abhrankan Chakrabarti**
WIN Internship Program
Jedi Endorsement Network

