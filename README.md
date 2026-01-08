
```md
# 📝 Notes App

A modern **full-stack Notes application** built with **Next.js (App Router)**, **MongoDB**, and **Tailwind CSS**.  
Users can create, view, edit, and delete notes with a clean and attractive UI.

---

## 🚀 Features

- ➕ Create new notes  
- 📋 View all notes  
- ✏️ Edit existing notes  
- 🗑️ Delete notes  
- 🪟 Modal-based create & edit UI  
- 🔔 Toast notifications  
- 📱 Responsive design  
- 💾 MongoDB data persistence  

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS  
- **Backend:** Next.js API Routes  
- **Database:** MongoDB (Mongoose)  
- **Styling:** Tailwind CSS  

---
```
---

### 📥 Clone the Repository

```bash
git clone https://github.com/Nikhil991127/notes-app.git
cd notes-app
```

---
---

### 📦 Install Dependencies

```bash
npm install
```

---

### ⚙️ Environment Setup

Create a `.env` file in the project root and add:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/notesDB
```

Make sure MongoDB is running:

```bash
mongod
```

---

### ▶️ Start the Development Server

```bash
npm run dev
```

---

### 🌐 Open the App

Open your browser and go to:

```
http://localhost:3000
```

---

## 🧪 API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/notes`     | Fetch all notes   |
| POST   | `/api/notes`     | Create a new note |
| PUT    | `/api/notes/:id` | Update a note     |
| DELETE | `/api/notes/:id` | Delete a note     |

---

