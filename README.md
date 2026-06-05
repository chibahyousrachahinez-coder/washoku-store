
# 🏮 Washoku Store — Japanese Kitchen, Delivered to Your Door

An elegant, modern, and high-performance e-commerce frontend interface dedicated to traditional Japanese kitchenware and artisan crafts. This project is built entirely using vanilla technologies, focusing on clean architecture, semantic markup, and a fully interactive user experience.

🎨 **Live Demo:**

---

## ✨ Features

*   **Fully Functional Shopping Cart & Wishlist:** Real-time state handling with local storage persistence
*   **Interactive Modals & Sidebars:** Seamlessly view detailed product descriptions, filter categories, and manage checkouts
*   **Live Search System:** An instantaneous dynamic search overlay filtering items on the fly (accessible via `Ctrl + K`)
*   **Dynamic UI Elements:** Interactive cherry blossom animation engine, custom carousel slider, and theme toggling capabilities.
*   **Adaptive Dark Mode:** Complete aesthetic transformation utilizing CSS variable states (`data-theme="dark"`).
*   **Promo Code System:** Includes dynamic discount calculations (Try testing with `SAKURA10` or `MATCHA20`).

---

## 🛠️ Tech Stack & Architecture

*   **Structure:** Semantic **HTML5** architecture with multi-section layout (`#home`, `#shop`, `#story`, `#contact`).
*   **Styling:** Custom **CSS3** utilizing advanced variables, modern grid system layouts, full responsive design, and CSS transitions.
*   **Interactivity:** **Vanilla JavaScript (ES6+)** built around safe event delegation strategies, modular architecture, and modular UI rendering logic.
*   **Icons & Fonts:** FontAwesome 6.5.0 along with Google Fonts integration (*Noto Serif JP*, *DM Sans*, *Shippori Mincho*).

---

## 📂 Project Structure

```text
├── index.html        # Main template and semantic document structure
├── css/
│   └── style.css     # CSS Variables, resets, layouts, themes, and animations
└── js/
    ├── data.js       # Hardcoded mock artisan data structures (products & reviews)
    ├── store.js      # Global application state management (cart, wishlist, storage)
    └── app.js        # DOM references, event listeners, and UI rendering logic
