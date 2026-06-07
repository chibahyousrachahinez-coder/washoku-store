const defaultProducts = [
  { id: 1, name: 'Santoku Knife', jp: '三徳包丁', category: 'knives', price: 89.99, rating: 4.9, reviews: 128, icon: '🗡️', badge: 'Chef\'s Pick', badgeClass: 'badge--chef', description: 'The ultimate all-purpose Japanese chef\'s knife. Forged from high-carbon stainless steel with a 17-degree edge, the Santoku ("three virtues") excels at slicing, dicing, and mincing. Each knife is hand-sharpened by master craftsmen in Seki City, Gifu Prefecture.', options: ['15cm (Santoku)', '18cm (Gyuto)', '21cm (Chef)'], shipping: 'Free shipping • 2-3 weeks from Japan' },
  { id: 2, name: 'Matcha Whisk Set', jp: '茶筌', category: 'tea', price: 34.99, rating: 4.8, reviews: 94, icon: '🍵', badge: 'Handmade', badgeClass: 'badge--handmade', description: 'Hand-carved bamboo whisk (chasen) from Nara, Japan. Each whisk is meticulously shaped from a single piece of bamboo, creating 80-120 fine tines for the perfect matcha consistency. Includes a ceramic whisk holder.', options: ['80 tine (Usucha)', '120 tine (Koicha)'], shipping: 'Free shipping • 1-2 weeks from Japan' },
  { id: 3, name: 'Sushi Rice Bowl', jp: '丼鉢', category: 'tableware', price: 24.99, rating: 4.7, reviews: 215, icon: '🍚', badge: 'Bestseller', badgeClass: 'badge--new', description: 'Handcrafted ceramic donburi bowl from the Mashiko pottery region. Each bowl is thrown on a wheel and glazed with a signature rice-husk ash glaze, creating a unique pattern. Microwave and dishwasher safe.', options: ['Small (12cm)', 'Medium (15cm)', 'Large (18cm)'], shipping: 'Free shipping • 1-2 weeks from Japan' },
  { id: 4, name: 'Hinoki Cutting Board', jp: '檜まな板', category: 'accessories', price: 54.99, rating: 4.9, reviews: 67, icon: '🪵', badge: 'Handmade', badgeClass: 'badge--handmade', description: 'Crafted from premium Yoshino hinoki cypress, aged for 3 years before milling. Naturally antibacterial with a warm, aromatic scent that enhances your cooking experience. The end-grain construction is gentle on knife edges.', options: ['Small (30x20cm)', 'Medium (40x28cm)', 'Large (50x35cm)'], shipping: 'Free shipping • 1-2 weeks from Japan' },
  { id: 5, name: 'Cast Iron Teapot', jp: '鉄瓶', category: 'tea', price: 72.99, rating: 4.8, reviews: 156, icon: '🫖', badge: 'Chef\'s Pick', badgeClass: 'badge--chef', description: 'Traditional Nambu tetsubin cast iron teapot from Iwate Prefecture. The iron infuses your water with trace minerals, enhancing the flavor of green tea. Interior enamel coating prevents rust. Includes a stainless steel infuser.', options: ['0.7L (Small)', '1.0L (Medium)', '1.2L (Large)'], shipping: 'Free shipping • 2-3 weeks from Japan' },
  { id: 6, name: 'Nabe Hot Pot', jp: '鍋', category: 'cookware', price: 64.99, rating: 4.6, reviews: 89, icon: '🍲', badge: 'New', badgeClass: 'badge--new', description: 'Traditional Japanese donabe clay pot from Iga, the pottery capital of Japan. Porous clay distributes heat evenly and retains warmth long after cooking. Perfect for hot pot, soups, and one-pot meals. Includes a wooden lid rest.', options: ['2.5L (2-3 people)', '3.8L (4-5 people)'], shipping: 'Free shipping • 2-3 weeks from Japan' },
  { id: 7, name: 'Paring Knife', jp: 'ペティナイフ', category: 'knives', price: 54.99, rating: 4.7, reviews: 73, icon: '🔪', badge: 'Handmade', badgeClass: 'badge--handmade', description: 'A precision paring knife forged by artisans in Sakai, Osaka. The 12cm blade is made from VG-10 Damascus steel with 67 layers, creating a stunning wave pattern. Perfect for intricate work like deveining shrimp or scoring fish.', options: ['10cm (Standard)', '12cm (Petite)', '15cm (Utility)'], shipping: 'Free shipping • 2-3 weeks from Japan' },
  { id: 8, name: 'Soba Noodle Set', jp: '蕎麦セット', category: 'tableware', price: 44.99, rating: 4.5, reviews: 42, icon: '🍜', badge: 'New', badgeClass: 'badge--new', description: 'Complete soba dining set from the Kiso region. Includes a bamboo zaru (draining basket), a ceramic soba cup with lid, and a handcrafted dipping sauce bottle. The set is designed to elevate your homemade soba experience.', options: ['2-Person Set', '4-Person Set'], shipping: 'Free shipping • 1-2 weeks from Japan' },
  { id: 9, name: 'Tamagoyaki Pan', jp: '卵焼き鍋', category: 'cookware', price: 48.99, rating: 4.8, reviews: 104, icon: '🍳', badge: 'Chef\'s Pick', badgeClass: 'badge--chef', description: 'Authentic rectangular tamagoyaki pan made from lightweight anodized aluminum. The non-stick surface requires minimal oil for perfectly layered Japanese omelettes. Compatible with gas, electric, and induction stoves.', options: ['13x18cm (Standard)', '15x20cm (Large)'], shipping: 'Free shipping • 1-2 weeks from Japan' },
  { id: 10, name: 'Ceramic Sake Set', jp: '酒器セット', category: 'tableware', price: 39.99, rating: 4.7, reviews: 138, icon: '🍶', badge: 'Handmade', badgeClass: 'badge--handmade', description: 'Hand-painted Arita porcelain sake set from Saga Prefecture. Each piece is individually crafted and painted with traditional indigo patterns. Set includes one 360ml tokkuri (flask) and four 60ml ochoko (cups). Dishwasher safe.', options: ['Indigo Pattern', 'Sakura Pattern', 'Dragon Pattern'], shipping: 'Free shipping • 2-3 weeks from Japan' },
  { id: 11, name: 'Bamboo Steamer', jp: '蒸し籠', category: 'cookware', price: 38.99, rating: 4.6, reviews: 57, icon: '🎋', badge: 'Handmade', badgeClass: 'badge--handmade', description: 'Traditional woven bamboo steamer from Takeo, known for its bamboo craftsmanship since the Edo period. The tight weave allows steam to circulate evenly while infusing a subtle bamboo fragrance. Use for dim sum, vegetables, and buns.', options: ['20cm (Small)', '26cm (Medium)', '30cm (Large)'], shipping: 'Free shipping • 1-2 weeks from Japan' },
  { id: 12, name: 'Ramen Ladle', jp: 'お玉杓子', category: 'accessories', price: 18.99, rating: 4.4, reviews: 39, icon: '🥄', badge: null, badgeClass: null, description: 'Hand-formed stainless steel ladle with a hand-carved wooden handle. The deep bowl is perfect for serving ramen broth, while the pointed lip allows precise pouring. Made in the Tsubame-Sanjo metalworking region.', options: ['Standard'], shipping: 'Free shipping • 1-2 weeks from Japan' },
];

const STORAGE_KEY = 'washoku_products';
let products = [];

function getProducts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch (_) {}
  }
  return defaultProducts;
}

function saveProducts(arr) {
  products = arr;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

function loadProducts() {
  products = getProducts();
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
  }
}
loadProducts();

const reviews = [
  { id: 1, name: 'Sarah M.', avatar: '👩', rating: 5, text: 'The Santoku knife is incredible. It arrived sharp enough to slice through paper. I\'ve never enjoyed cooking as much as I do now.', date: 'March 2026', product: 'Santoku Knife' },
  { id: 2, name: 'James K.', avatar: '👨', rating: 5, text: 'I bought the matcha whisk set as a gift for my wife. She says it makes the best matcha she\'s ever had outside of Japan. The quality is stunning.', date: 'February 2026', product: 'Matcha Whisk Set' },
  { id: 3, name: 'Yumi L.', avatar: '👩‍🦰', rating: 4, text: 'Beautiful hinoki board. The smell alone transports me to a Japanese ryokan. It\'s gentle on my Global knives, too. Worth every penny.', date: 'January 2026', product: 'Hinoki Cutting Board' },
  { id: 4, name: 'Michael R.', avatar: '🧑', rating: 5, text: 'Ordered the donabe hot pot and it has become our weekly family tradition. The clay distributes heat so evenly. Shipping took 2.5 weeks but was worth the wait.', date: 'March 2026', product: 'Nabe Hot Pot' },
  { id: 5, name: 'Aiko S.', avatar: '👘', rating: 5, text: 'The sake set is exquisite. I\'m Japanese-American and this set reminds me of my grandmother\'s table. The indigo pattern is even more beautiful in person.', date: 'December 2025', product: 'Ceramic Sake Set' },
  { id: 6, name: 'David W.', avatar: '👨‍🦱', rating: 4, text: 'Tamagoyaki pan changed my breakfast game. Took a few tries to get the roll right but the non-stick surface is amazing. Great quality.', date: 'February 2026', product: 'Tamagoyaki Pan' },
];

const categories = [
  { id: 'knives', name: 'Knives', jp: '包丁', icon: '🗡️', count: 2 },
  { id: 'cookware', name: 'Cookware', jp: '調理器具', icon: '🍳', count: 3 },
  { id: 'tableware', name: 'Tableware', jp: '食器', icon: '🍶', count: 3 },
  { id: 'tea', name: 'Tea Sets', jp: '茶道具', icon: '🍵', count: 2 },
  { id: 'accessories', name: 'Accessories', jp: 'アクセサリー', icon: '🎋', count: 2 },
];