// Product data with specifications
const products = [
    {
        id: 1,
        name: "Абайка",
        description: "Абайка из натурального бархата — это мягкая, теплая и дышащая одежда с лёгким блеском и приятной текстурой. Натуральный бархат обеспечивает комфорт и долговечность, а элегантный дизайн подходит как для повседневной носки, так и для особых случаев.",
        price: 45000,
        image: "абайка.jpg",
        specifications: [
            "Материал: 100% натуральный бархат",
            "Размеры: 42-54",
            "Цвет: Черный",
            "Уход: Сухая чистка",
            "Сезон: Демисезон"
        ],
        category: "верхняя одежда"
    },
    {
        id: 2,
        name: "Платье с пуговками",
        description: "Платье из натурального бархата — элегантное и приятное на ощупь изделие. Бархат обладает мягкой текстурой и красивым блеском, хорошо сохраняет тепло и дышит. Такое платье подходит для холодного времени года и создает роскошный, насыщенный образ.",
        price: 55000,
        image: "платье.jpg",
        specifications: [
            "Материал: 100% натуральный бархат",
            "Размеры: 40-52",
            "Цвет: Бордовый",
            "Уход: Сухая чистка",
            "Сезон: Осень-Зима"
        ],
        category: "платья"
    },
    {
        id: 3,
        name: "Шелковый халат",
        description: "Роскошный халат из натурального шелка с традиционным орнаментом. Идеально подходит для особых случаев и домашнего отдыха. Мягкая ткань и свободный крой обеспечивают максимальный комфорт.",
        price: 18000,
        image: "images/robe.jpg",
        specifications: {
            "Материал": "100% натуральный шелк",
            "Размеры": "S, M, L, XL",
            "Цвет": "Бордовый",
            "Уход": "Ручная стирка при 30°C"
        },
        category: "robe"
    },
    {
        id: 4,
        name: "Летнее платье",
        description: "Легкое летнее платье из льна с цветочным принтом. Свободный крой и натуральные материалы обеспечивают комфорт в жаркую погоду. Идеально подходит для пляжного отдыха и городских прогулок.",
        price: 9500,
        image: "images/summer-dress.jpg",
        specifications: {
            "Материал": "100% лен",
            "Размеры": "XS, S, M, L",
            "Цвет": "Голубой",
            "Уход": "Машинная стирка при 30°C"
        },
        category: "dress"
    },
    {
        id: 5,
        name: "Вечернее платье",
        description: "Элегантное вечернее платье из атласа с ручной вышивкой. Изысканный дизайн и качественные материалы делают его идеальным выбором для особых случаев. Подчеркивает женственность и элегантность.",
        price: 25000,
        image: "images/evening-dress.jpg",
        specifications: {
            "Материал": "100% атлас",
            "Размеры": "XS, S, M, L, XL",
            "Цвет": "Черный",
            "Уход": "Химчистка"
        },
        category: "dress"
    },
    {
        id: 6,
        name: "Повседневная абайка",
        description: "Удобная повседневная абайка из хлопка с современным дизайном. Идеально подходит для ежедневной носки. Комфортный крой и качественные материалы обеспечивают удобство в течение всего дня.",
        price: 8500,
        image: "images/casual-abayka.jpg",
        specifications: {
            "Материал": "100% хлопок",
            "Размеры": "S, M, L, XL",
            "Цвет": "Серый",
            "Уход": "Машинная стирка при 30°C"
        },
        category: "abayka"
    }
];

// Cart functionality
let cart = [];

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Display product details
function displayProductDetails() {
    const product = products.find(p => p.id === productId);
    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    // Set page title
    document.title = `${product.name} - Oksamit`;

    // Display main product info
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `${product.price} ₽`;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('main-image').src = product.image;
    document.getElementById('main-image').alt = product.name;

    // Display specifications
    const specsList = document.getElementById('product-specs');
    for (const [key, value] of Object.entries(product.specifications)) {
        const li = document.createElement('li');
        li.textContent = `${key}: ${value}`;
        specsList.appendChild(li);
    }

    // Display similar products
    displaySimilarProducts(product);
}

// Display similar products
function displaySimilarProducts(currentProduct) {
    const similarProducts = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    const similarProductsContainer = document.getElementById('similar-products');
    similarProductsContainer.innerHTML = '';

    similarProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </a>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price} ₽</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Добавить в корзину</button>
            </div>
        `;
        similarProductsContainer.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCartCount();
    updateCartModal();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update cart modal
function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>${item.price} ₽ x ${item.quantity}</p>
            </div>
            <div>
                <button onclick="removeFromCart(${item.id})">Удалить</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = total;
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartModal();
}

// Modal functionality
const modal = document.getElementById('cart-modal');
const cartLink = document.querySelector('.cart-link');
const closeBtn = document.querySelector('.close');

cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Buy button functionality
document.getElementById('buy-button').addEventListener('click', () => {
    addToCart(productId);
    modal.style.display = 'block';
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    displayProductDetails(productId);
}); 