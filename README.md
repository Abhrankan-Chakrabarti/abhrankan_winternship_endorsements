# Jedi Endorsement Network – Backend API

This repository contains the backend service for the **Jedi Endorsement Network**, a self-healing trust network that models endorsements between interns and visualizes hierarchical relationships in real time.

The API powers a static frontend (hosted on GitHub Pages) that renders endorsement trees using Mermaid.js.

---

## 🚀 Features

- REST API to fetch endorsement relationships
- MongoDB-backed persistence
- Simple, lightweight Express server
- Native MongoDB driver (no ORM overhead)
- Designed for visualization-friendly data output
- CORS-enabled for static frontend consumption

---

## 🧱 Tech Stack

- **Node.js**
- **Express**
- **MongoDB**
- **Native MongoDB Driver**
- **dotenv**
- **CORS**

---

## 📁 Project Structure

```

backend/
├── server.js        # Express server + API routes
├── seed.js          # Database seeding script
├── package.json
├── .env             # Environment variables (not committed)

```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```

PORT=5001
MONGO_URI=your_mongodb_connection_string
DB_NAME=endorsement_network

````

---

## ▶️ Running the Server

Install dependencies:

```bash
npm install
````

Start the server:

```bash
npm start
```

Server will run at:

```
http://localhost:5001
```

---

## 🌱 Seeding the Database

To populate the database with sample members and endorsements:

```bash
npm run seed
```

This will:

* Clear existing collections
* Insert sample interns
* Insert endorsement relationships

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
    "action": "Endorse"
  }
]
```

---

## 🌐 Frontend Integration

This backend is designed to be consumed by a static frontend hosted on **GitHub Pages**.

The frontend dynamically fetches endorsement data and renders a hierarchical tree using **Mermaid.js**.

---

## 📌 Design Philosophy

* Minimal abstractions
* Clear data flow
* Visualization-first API design
* No unnecessary frameworks or ORMs
* Easy to extend for audits, penalties, and analytics

---

## 📄 License

ISC

---

## ✨ Author

**Abhrankan Chakrabarti**
WIN Internship Program
