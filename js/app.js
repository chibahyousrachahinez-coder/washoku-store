// ===== DOM REFS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== TOAST =====
function showToast(icon, text) {
  const existing = $('.notification');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = 'notification';
  el.innerHTML = `<span class="notification__icon">${icon}</span><span class="notification__text">${text}</span>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('notification--visible'));
  setTimeout(() => { el.classList.remove('notification--visible'); setTimeout(() => el.remove(), 500); }, 3000);
}

// ===== BADGES =====
function updateBadges() {
  const cartCount = state.cart.reduce((sum, i) => sum + i.qty, 0);
  $('#cartCount').textContent = cartCount;
  $('#wishlistCount').textContent = state.wishlist.length;
}

// ===== CHERRY BLOSSOMS =====
function initCherryBlossoms() {
  const container = $('#cherryBlossoms');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const petal = document.createElement('div');
    petal.className = 'cherry-blossom';
    const size = 12 + Math.random() * 18;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (8 + Math.random() * 12) + 's';
    petal.style.animationDelay = (Math.random() * 15) + 's';
    petal.style.opacity = 0.3 + Math.random() * 0.4;
    container.appendChild(petal);
  }
}

// ===== PRODUCT CARD HTML =====
function productCardHTML(product, inWishlist = false) {
  const badgeHTML = product.badge ? `<span class="product-card__badge ${product.badgeClass}">${product.badge}</span>` : '';
  const wishClass = inWishlist ? 'product-card__wishlist--active' : '';
  const stars = 'â˜…'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? 'Â½' : '');
  return `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-card__image">
        ${badgeHTML}
        <button class="product-card__wishlist ${wishClass}" data-id="${product.id}"><i class="fa${inWishlist ? 's' : 'r'} fa-heart"></i></button>
        <span>${product.icon}</span>
      </div>
      <div class="product-card__body">
        <h4 class="product-card__name">${product.name}</h4>
        <p class="product-card__jp">${product.jp}</p>
        <div class="product-card__rating">${stars} <span>(${product.reviews})</span></div>
        <div class="product-card__bottom">
          <span class="product-card__price">$${product.price.toFixed(2)}</span>
          <button class="product-card__add" data-id="${product.id}"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    </div>`;
}

// ===== RENDER =====
function renderFeatured() {
  const track = $('#carouselTrack');
  if (!track) return;
  track.innerHTML = products.slice(0, 8).map(p => productCardHTML(p, state.wishlist.includes(p.id))).join('');
}

function renderShop(filter = 'all') {
  const grid = $('#shopGrid');
  if (!grid) return;
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => productCardHTML(p, state.wishlist.includes(p.id))).join('');
}

function renderCategories() {
  const grid = $('#categoriesGrid');
  if (!grid) return;
  grid.innerHTML = categories.map(c => `
    <div class="category-card" data-filter="${c.id}">
      <span class="category-card__icon">${c.icon}</span>
      <h4 class="category-card__name">${c.name}</h4>
      <p class="category-card__jp">${c.jp}</p>
      <span class="category-card__count">${c.count} products</span>
    </div>`).join('');
}

function renderReviews() {
  const grid = $('#reviewsGrid');
  if (!grid) return;
  grid.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-card__header">
        <div class="review-card__avatar">${r.avatar}</div>
        <div>
          <div class="review-card__name">${r.name}</div>
          <div class="review-card__date">${r.date}</div>
        </div>
      </div>
      <div class="review-card__rating">${'â˜…'.repeat(r.rating)}${'â˜†'.repeat(5 - r.rating)}</div>
      <p class="review-card__text">"${r.text}"</p>
      <span class="review-card__product">â€” ${r.product}</span>
    </div>`).join('');
}

function renderCart() {
  const container = $('#cartItems');
  const footer = $('#cartFooter');
  const count = $('#cartItemCount');
  if (!container) return;
  const itemCount = state.cart.reduce((sum, i) => sum + i.qty, 0);
  count.textContent = `(${itemCount})`;
  if (state.cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p><span>Add some Japanese kitchen essentials!</span></div>`;
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'block';
  container.innerHTML = state.cart.map(item => {
    const p = products.find(pr => pr.id === item.id);
    if (!p) return '';
    return `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item__image">${p.icon}</div>
        <div class="cart-item__info">
          <div class="cart-item__name">${p.name}</div>
          <div class="cart-item__jp">${p.jp}</div>
          <div class="cart-item__bottom">
            <div class="cart-item__qty">
              <button class="cart-qty-minus" data-id="${item.id}"><i class="fas fa-minus"></i></button>
              <span>${item.qty}</span>
              <button class="cart-qty-plus" data-id="${item.id}"><i class="fas fa-plus"></i></button>
            </div>
            <span class="cart-item__price">$${(p.price * item.qty).toFixed(2)}</span>
          </div>
        </div>
        <button class="cart-item__remove" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
      </div>`;
  }).join('');

  const subtotal = state.cart.reduce((sum, item) => {
    const p = products.find(pr => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const discount = state.promoDiscount ? subtotal * state.promoDiscount : 0;
  const total = subtotal + shipping - discount;
  $('#cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
  $('#cartShipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
  $('#cartTotal').textContent = `$${Math.max(0, total).toFixed(2)}`;
}

function renderWishlist() {
  const container = $('#wishlistItems');
  const count = $('#wishlistItemCount');
  if (!container) return;
  count.textContent = `(${state.wishlist.length})`;
  if (state.wishlist.length === 0) {
    container.innerHTML = `<div class="cart-empty"><i class="fas fa-heart"></i><p>Your wishlist is empty</p><span>Save items you love!</span></div>`;
    return;
  }
  container.innerHTML = state.wishlist.map(id => {
    const p = products.find(pr => pr.id === id);
    if (!p) return '';
    return `
      <div class="cart-item" data-id="${p.id}">
        <div class="cart-item__image">${p.icon}</div>
        <div class="cart-item__info">
          <div class="cart-item__name">${p.name}</div>
          <div class="cart-item__jp">${p.jp}</div>
          <div class="cart-item__bottom">
            <span class="cart-item__price">$${p.price.toFixed(2)}</span>
            <button class="wishlist-add-cart" data-id="${p.id}" style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--color-sakura),var(--color-sakura-dark));display:flex;align-items:center;justify-content:center;font-size:0.85rem;color:var(--color-wood-dark);transition:all var(--transition);box-shadow:0 2px 12px rgba(255,183,197,0.3)"><i class="fas fa-shopping-bag"></i></button>
          </div>
        </div>
        <button class="cart-item__remove wishlist-remove" data-id="${p.id}"><i class="fas fa-trash-alt"></i></button>
      </div>`;
  }).join('');
}

// ===== PRODUCT MODAL =====
function openProductModal(id) {
  const p = products.find(pr => pr.id === id);
  if (!p) return;
  const stars = 'â˜…'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? 'Â½' : '');
  const badgeHTML = p.badge ? `<span class="product-modal__badge ${p.badgeClass}">${p.badge}</span>` : '';
  const optionsHTML = p.options.length > 1 ? `
    <div class="product-modal__options">
      <h4>Size / Option</h4>
      <select>${p.options.map(o => `<option>${o}</option>`).join('')}</select>
    </div>` : '';
  const body = $('#productModalBody');
  body.innerHTML = `
    <div class="product-modal__image">${p.icon}</div>
    <div class="product-modal__info">
      ${badgeHTML}
      <h2>${p.name}</h2>
      <p class="product-modal__jp">${p.jp}</p>
      <div class="product-modal__rating">${stars} <span>(${p.reviews} reviews)</span></div>
      <div class="product-modal__price">$${p.price.toFixed(2)}</div>
      <p class="product-modal__shipping"><i class="fas fa-shipping-fast"></i> ${p.shipping}</p>
      <p class="product-modal__desc">${p.description}</p>
      ${optionsHTML}
      <button class="btn btn--primary product-modal__add" data-id="${p.id}" style="width:100%;justify-content:center">
        <i class="fas fa-shopping-bag"></i> Add to Cart â€” $${p.price.toFixed(2)}
      </button>
    </div>`;
  $('#productModal').classList.add('product-modal--active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  $('#productModal').classList.remove('product-modal--active');
  document.body.style.overflow = '';
}

// ===== SEARCH =====
function performSearch(query) {
  const container = $('#searchResults');
  if (!query.trim()) { container.innerHTML = ''; return; }
  const q = query.toLowerCase();
  const results = products.filter(p =>
    p.name.toLowerCase().includes(q) || p.jp.includes(q) ||
    p.category.includes(q) || p.description.toLowerCase().includes(q)
  );
  if (results.length === 0) {
    container.innerHTML = `<div class="search-no-results"><i class="fas fa-search" style="font-size:2rem;margin-bottom:12px;display:block;opacity:0.3"></i><p>No products found for "${query}"</p></div>`;
    return;
  }
  container.innerHTML = results.map(p => `
    <div class="search-result-item" data-id="${p.id}">
      <span class="search-result-item__icon">${p.icon}</span>
      <div class="search-result-item__info">
        <h4>${p.name}</h4>
        <span>${p.jp}</span>
      </div>
      <span class="search-result-item__price">$${p.price.toFixed(2)}</span>
    </div>`).join('');
}

// ===== CAROUSEL =====
let carouselPos = 0;
function moveCarousel(dir) {
  const track = $('#carouselTrack');
  if (!track) return;
  const card = track.querySelector('.product-card');
  if (!card) return;
  const cardWidth = card.offsetWidth + 24;
  const maxScroll = track.scrollWidth - track.clientWidth;
  carouselPos = Math.max(0, Math.min(maxScroll, carouselPos + dir * cardWidth));
  track.scrollTo({ left: carouselPos, behavior: 'smooth' });
}

// ===== INIT =====
function init() {
  if (state.darkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    const icon = $('#themeToggle i');
    if (icon) icon.className = 'fas fa-sun';
  }

  initCherryBlossoms();
  renderFeatured();
  renderCategories();
  renderShop();
  renderReviews();
  renderCart();
  renderWishlist();
  updateBadges();

  // ===== EVENT DELEGATION =====
  document.addEventListener('click', (e) => {
    const target = e.target;
    const button = target.closest('button');

    if (button && button.closest('.product-card__add')) {
      e.preventDefault();
      addToCart(parseInt(button.dataset.id));
    }

    if (button && button.closest('.product-card__wishlist')) {
      e.preventDefault();
      toggleWishlist(parseInt(button.dataset.id));
    }

    if (button && button.closest('.cart-qty-plus')) {
      updateCartQty(parseInt(button.dataset.id), 1);
    }
    if (button && button.closest('.cart-qty-minus')) {
      updateCartQty(parseInt(button.dataset.id), -1);
    }

    if (button && button.closest('.cart-item__remove')) {
      const id = parseInt(button.dataset.id);
      if (button.closest('.cart-item')) {
        if (button.closest('.wishlist-sidebar__items') || button.closest('#wishlistItems')) {
          const idx = state.wishlist.indexOf(id);
          if (idx > -1) { state.wishlist.splice(idx, 1); saveState(); renderFeatured(); renderShop(state.currentFilter); }
        } else {
          removeFromCart(id);
        }
      }
    }

    if (button && button.closest('.wishlist-add-cart')) {
      addToCart(parseInt(button.dataset.id));
    }

    const card = target.closest('.product-card');
    if (card && !target.closest('.product-card__wishlist') && !target.closest('.product-card__add')) {
      e.preventDefault();
      openProductModal(parseInt(card.dataset.id));
    }

    const result = target.closest('.search-result-item');
    if (result) {
      const id = parseInt(result.dataset.id);
      closeSearch();
      setTimeout(() => openProductModal(id), 300);
    }

    const catCard = target.closest('.category-card');
    if (catCard) {
      const filter = catCard.dataset.filter;
      if (filter) { $('#shop').scrollIntoView({ behavior: 'smooth' }); setFilter(filter); }
    }
  });

  // ===== PRODUCT MODAL =====
  $('#productModalClose').addEventListener('click', closeProductModal);
  $('#productModalOverlay').addEventListener('click', closeProductModal);
  document.addEventListener('click', (e) => {
    if (e.target.closest('.product-modal__add')) {
      addToCart(parseInt(e.target.closest('.product-modal__add').dataset.id));
      closeProductModal();
    }
  });

  // ===== CART SIDEBAR =====
  $('#cartToggle').addEventListener('click', () => { $('#cartSidebar').classList.add('cart-sidebar--active'); document.body.style.overflow = 'hidden'; });
  $('#cartClose').addEventListener('click', () => { $('#cartSidebar').classList.remove('cart-sidebar--active'); document.body.style.overflow = ''; });
  $('#cartOverlay').addEventListener('click', () => { $('#cartSidebar').classList.remove('cart-sidebar--active'); document.body.style.overflow = ''; });

  // ===== WISHLIST SIDEBAR =====
  $('#wishlistToggle').addEventListener('click', () => { $('#wishlistSidebar').classList.add('wishlist-sidebar--active'); document.body.style.overflow = 'hidden'; });
  $('#wishlistClose').addEventListener('click', () => { $('#wishlistSidebar').classList.remove('wishlist-sidebar--active'); document.body.style.overflow = ''; });
  $('#wishlistOverlay').addEventListener('click', () => { $('#wishlistSidebar').classList.remove('wishlist-sidebar--active'); document.body.style.overflow = ''; });

  // ===== SEARCH =====
  $('#searchToggle').addEventListener('click', () => {
    $('#searchOverlay').classList.add('search-overlay--active');
    setTimeout(() => $('#searchInput').focus(), 200);
    document.body.style.overflow = 'hidden';
  });
  $('#searchClose').addEventListener('click', closeSearch);
  $('#searchOverlay').addEventListener('click', (e) => { if (e.target === $('#searchOverlay')) closeSearch(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSearch(); closeProductModal(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); $('#searchToggle').click(); }
  });
  $('#searchInput').addEventListener('input', (e) => {
    performSearch(e.target.value);
    const clear = $('#searchClear');
    if (e.target.value.trim()) clear.classList.add('search-box__clear--visible');
    else clear.classList.remove('search-box__clear--visible');
  });
  $('#searchClear').addEventListener('click', () => {
    $('#searchInput').value = ''; $('#searchResults').innerHTML = '';
    $('#searchClear').classList.remove('search-box__clear--visible'); $('#searchInput').focus();
  });
  function closeSearch() {
    $('#searchOverlay').classList.remove('search-overlay--active');
    document.body.style.overflow = '';
    $('#searchInput').value = ''; $('#searchResults').innerHTML = '';
    $('#searchClear').classList.remove('search-box__clear--visible');
  }

  // ===== DARK MODE =====
  $('#themeToggle').addEventListener('click', toggleDarkMode);

  // ===== SHOP FILTERS =====
  $$('.shop__filter-btn').forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
  });
  function setFilter(filter) {
    state.currentFilter = filter;
    $$('.shop__filter-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.shop__filter-btn[data-filter="${filter}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    renderShop(filter);
  }

  // ===== CAROUSEL =====
  $('#carouselPrev').addEventListener('click', () => moveCarousel(-1));
  $('#carouselNext').addEventListener('click', () => moveCarousel(1));
  $('#carouselTrack').addEventListener('scroll', () => { carouselPos = $('#carouselTrack').scrollLeft; });

  // ===== NAV MENU (mobile) =====
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');
  const navOverlay = $('#navOverlay');
  function closeNavMenu() {
    navMenu.classList.remove('nav__menu--open');
    if (navOverlay) navOverlay.classList.remove('nav__overlay--visible');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
  }
  function toggleNavMenu() {
    const open = !navMenu.classList.contains('nav__menu--open');
    navMenu.classList.toggle('nav__menu--open');
    if (navOverlay) navOverlay.classList.toggle('nav__overlay--visible');
    navToggle.innerHTML = open ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  navToggle.addEventListener('click', toggleNavMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeNavMenu);
  $$('.nav__link').forEach(link => link.addEventListener('click', closeNavMenu));

  // ===== SHIPPING BANNER =====
  $('#closeBanner').addEventListener('click', () => { $('#shippingBanner').classList.add('shipping-banner--hidden'); });

  // ===== SCROLL TOP =====
  window.addEventListener('scroll', () => {
    const btn = $('#scrollTop');
    if (window.scrollY > 500) btn.classList.add('scroll-top--visible');
    else btn.classList.remove('scroll-top--visible');
    const sections = $$('section[id]');
    const navLinks = $$('.nav__link');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active-link');
    });
  });
  $('#scrollTop').addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // ===== PROMO CODE =====
  $('#applyPromo').addEventListener('click', () => {
    const code = $('#promoCode').value.trim().toLowerCase();
    if (code === 'sakura10') {
      state.promoApplied = true;
      state.promoDiscount = 0.10;
      saveState();
      showToast('ðŸŽ‰', 'Promo code applied! 10% off!');
      renderCart();
    } else if (code === 'matcha20') {
      state.promoApplied = true;
      state.promoDiscount = 0.20;
      saveState();
      showToast('ðŸŽ‰', 'Promo code applied! 20% off!');
      renderCart();
    } else {
      showToast('ðŸ˜…', 'Invalid promo code. Try "SAKURA10"');
    }
  });

  // ===== CONTACT FORM =====
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('ðŸ“¬', 'Message sent! We\'ll respond within 24 hours.');
    $('#contactForm').reset();
  });

  console.log('ðŸ¥¢ Washoku Store loaded! ðŸŽ‰');
  console.log('ðŸŒ¸ Use Ctrl+K to search');
  console.log('ðŸµ Promo code: SAKURA10');
}

document.addEventListener('DOMContentLoaded', init);