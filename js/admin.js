function adminNotify(msg) {
  const el = document.getElementById('adminNotif');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}

function renderAdminTable() {
  const tbody = document.getElementById('adminTableBody');
  const empty = document.getElementById('adminEmpty');
  const all = getProducts();
  if (all.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  tbody.innerHTML = all.map(p => {
    const preview = p.imageUrl
      ? `<img src="${p.imageUrl}" alt="${p.name}">`
      : p.icon || '📦';
    return `<tr>
      <td>
        <div class="name-cell">
          <div class="product-preview">${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}">` : (p.icon || '📦')}</div>
          <div class="info">
            <strong>${p.name}</strong>
            <small>${p.jp || ''}</small>
          </div>
        </div>
      </td>
      <td class="price-cell">$${p.price.toFixed(2)}</td>
      <td><span class="cat-cell">${p.category || 'uncategorized'}</span></td>
      <td style="text-align:center"><button class="btn--delete" data-id="${p.id}"><i class="fas fa-trash-alt"></i> Delete</button></td>
    </tr>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderAdminTable();

  document.getElementById('adminForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const imageUrl = document.getElementById('productImage').value.trim();
    const category = document.getElementById('productCategory').value;
    if (!name || isNaN(price) || !category) return;
    const all = getProducts();
    const newId = all.length > 0 ? Math.max(...all.map(p => p.id)) + 1 : 1;
    all.push({
      id: newId,
      name, price, imageUrl, category,
      icon: '📦', jp: '', rating: 0, reviews: 0,
      badge: null, badgeClass: null,
      description: '', options: ['Standard'],
      shipping: 'Free shipping'
    });
    saveProducts(all);
    renderAdminTable();
    adminNotify(`"${name}" added successfully!`);
    document.getElementById('adminForm').reset();
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn--delete');
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    let all = getProducts();
    const p = all.find(x => x.id === id);
    all = all.filter(x => x.id !== id);
    saveProducts(all);
    renderAdminTable();
    if (p) adminNotify(`"${p.name}" deleted.`);
  });
});