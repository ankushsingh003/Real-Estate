# LuxeEstate 🏰✨
**Premium Real Estate Platform**

LuxeEstate is a high-end, production-ready real estate web application designed for a sophisticated user experience. Built with a modern tech stack, it features glassmorphism aesthetics, fluid animations, and a robust backend for seamless property browsing and management.

---

## 🚀 Features
- **Premium UI/UX**: Crafted with **Tailwind CSS v4** and **Outfit** typography for a modern, high-end feel.
- **Advanced Auth**: Secure Registration and Login with role-based access (Buyer/Seller).
- **Email Verification**: OTP-based email verification using **Brevo** and JWT.
- **Glassmorphism Design**: Elegant, translucent interfaces with backdrop-blur effects.
- **Responsive Layout**: Optimized for every device, from mobile to desktop.
- **Interactive Property Cards**: Dynamic listings with detailed stats and hover animations.

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** (Vite-powered)
- **Tailwind CSS v4** (Modern, CSS-first engine)
- **Framer Motion** (Smooth transitions and animations)
- **Lucide React** (Premium iconography)
- **React Router 7** (State-of-the-art routing)
- **React Hot Toast** (Elegant notification system)

### **Backend**
- **Node.js & Express**
- **MongoDB Atlas** (Cloud Database)
- **JWT** (Secure Token-based Authentication)
- **Brevo API** (Transactional Email Service)

---

## 📂 Project Structure

```text
├── backend/               # Express server, routes, and controllers
│   ├── config/            # DB and Environment config
│   ├── controllers/       # Business logic (Auth, Properties)
│   ├── models/            # Mongoose Schemas
│   └── routes/            # API Endpoints
├── frontend/              # React/Vite application
│   ├── src/
│   │   ├── components/    # Reusable UI elements
│   │   ├── pages/         # Page components (Home, Login, etc.)
│   │   ├── index.css      # Tailwind v4 Global Styles
│   │   └── App.jsx        # Root component & Routing
└── .env                   # Sensitive environment variables
```

---

## ⚙️ Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/ankushsingh003/Real-Estate.git
cd Real-Estate
```

### **2. Backend Setup**
Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
BREVO_API_KEY=your_api_key
```
Install and run:
```bash
cd backend
npm install
npm run dev
```

### **3. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

---

## 🛤️ Roadmap
- [x] Initial UI Design & Design System
- [x] Tailwind v4 Migration
- [x] Auth Workflow (Register/Login/Verify)
- [ ] Property Listing Search & Filters
- [ ] Seller Dashboard for Property Uploads
- [ ] Favorites & Wishlist functionality
- [ ] Real-time Chat between Buyer and Seller

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.

---
Built with ❤️ by [Ankush Singh](https://github.com/ankushsingh003)
