const state = {
  cart: JSON.parse(localStorage.getItem('washoku_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('washoku_wishlist')) || [],
  currentFilter: 'all',
  darkMode: localStorage.getItem('washoku_dark') === 'true',
  promoApplied: localStorage.getItem('washoku_promo_discount') ? true : false,
  promoDiscount: parseFloat(localStorage.getItem('washoku_promo_discount')) || 0,
};

function saveState() {
  localStorage.setItem('washoku_cart', JSON.stringify(state.cart));
  localStorage.setItem('washoku_wishlist', JSON.stringify(state.wishlist));
  localStorage.setItem('washoku_dark', state.darkMode);
  localStorage.setItem('washoku_promo_discount', state.promoDiscount || 0);
  if (typeof updateBadges === 'function') updateBadges();
  if (typeof renderCart === 'function') renderCart();
  if (typeof renderWishlist === 'function') renderWishlist();
}

function addToCart(id) {
  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id, qty: 1 });
  }
  saveState();
  const product = products.find(p => p.id === id);
  if (typeof showToast === 'function') showToast(product.icon, `${product.name} added to cart!`);
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  saveState();
}

function updateCartQty(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  if (item.qty === 0) removeFromCart(id);
  else saveState();
}

function toggleWishlist(id) {
  const idx = state.wishlist.indexOf(id);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    if (typeof showToast === 'function') showToast('💔', 'Removed from wishlist');
  } else {
    state.wishlist.push(id);
    const p = products.find(pr => pr.id === id);
    if (typeof showToast === 'function') showToast('❤️', `${p ? p.name : 'Item'} added to wishlist!`);
  }
  saveState();
  if (typeof renderFeatured === 'function') renderFeatured();
  if (typeof renderShop === 'function') renderShop(state.currentFilter);
}

function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : '');
  const icon = document.querySelector('#themeToggle i');
  if (icon) icon.className = state.darkMode ? 'fas fa-sun' : 'fas fa-moon';
  saveState();
}