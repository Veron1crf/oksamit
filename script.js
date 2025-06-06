// Product data
const products = [
    {
        id: 1,
        name: "Абайка",
        description: "Абайка из натурального бархата — это мягкая, теплая и дышащая одежда с лёгким блеском и приятной текстурой. Натуральный бархат обеспечивает комфорт и долговечность, а элегантный дизайн подходит как для повседневной носки, так и для особых случаев.",
        price: 45000,
        image: "абайка.jpg"
    },
    {
        id: 2,
        name: "Платье с пуговками",
        description: "Платье из натурального бархата — элегантное и приятное на ощупь изделие. Бархат обладает мягкой текстурой и красивым блеском, хорошо сохраняет тепло и дышит. Такое платье подходит для холодного времени года и создает роскошный, насыщенный образ.",
        price: 55000,
        image: "платье.jpg"
    },
    {
        id: 3,
        name: "Платье на запах",
        description: "Платье на запах из бархата — элегантное и удобное изделие с глубоким блеском и мягкой текстурой. Модель подчёркивает талию, подходит для разных фигур и создаёт стильный образ для торжеств и холодного сезона.",
        price: 75000,
        image: "платье 1.jpg"
    },
    {
        id: 4,
        name: "Костюм",
        description: "Стильный костюм из натурального бархата. Бархатный костюм — мягкий комплект из ткани с ворсом для комфорта и стиля.",
        price: 65000,
        image: "костюм.jpg"
    },
    {
        id: 5,
        name: "Куртка",
        description: "Бархатная куртка с жёлтой подкладкой — мягкая и стильная куртка из ткани с ворсом, внутри с яркой жёлтой подкладкой для комфорта и контраста.",
        price: 48000,
        image: "курточка.jpg"
    },
    {
        id: 6,
        name: "Кейп",
        description: "Кейп — безрукавка с застёжками спереди, подходит для многослойности и создаёт элегантный силуэт.",
        price: 42000,
        image: "кейп.jpg"
    },
    {
        id: 7,
        name: "Накидка классическая",
        description: "Классическая накидка из натуральных тканей",
        price: 35000,
        image: "накидка.jpg"
    },
    {
        id: 8,
        name: "Накидка",
        description: "Лёгкая и мягкая накидка из натурального бархата с приятной бархатистой текстурой и насыщенным цветом.",
        price: 72000,
        image: "накидка1.jpg"
    },
    {
        id: 9,
        name: "Накидка элегантная",
        description: "Элегантная накидка из натурального бархата.",
        price: 58000,
        image: "накидка 2.jpg"
    },
    {
        id: 10,
        name: "Накидка с цветной подкладкой",
        description: "Накидка из бархата с яркой цветной подкладкой, придающей контраст и оригинальность. Легкая, стильная и комфортная.",
        price: 28000,
        image: "накидка 3.jpg"
    },
    {
        id: 11,
        name: "Накидка праздничная",
        description: "Праздничная накидка из натурального бархата с декоративными элементами",
        price: 42000,
        image: "накидка 4.jpg"
    },
    {
        id: 12,
        name: "Накидка вечерняя",
        description: "Вечерняя накидка с изысканным дизайном",
        price: 38000,
        image: "накидка 5.jpg"
    }
];

// Cart functionality
let cart = [];

// Display products
function displayProducts() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product.html?id=${product.id}" class="product-image-link">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </a>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${product.price} ₽</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Добавить в корзину</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
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

// Функции для авторизации
function toggleAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabs = document.querySelectorAll('.auth-tab');
    
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function login() {
    const phone = document.getElementById('login-phone').value;
    if (!phone) {
        alert('Пожалуйста, введите номер телефона');
        return;
    }
    // Здесь будет логика входа
    alert('Код подтверждения отправлен на ваш номер телефона');
    toggleAuthModal();
}

function register() {
    const name = document.getElementById('register-name').value;
    const phone = document.getElementById('register-phone').value;
    
    if (!name || !phone) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    // Здесь будет логика регистрации
    alert('Код подтверждения отправлен на ваш номер телефона');
    toggleAuthModal();
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('auth-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Обработка формы подписки на новости
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const privacyCheckbox = document.getElementById('privacy');
    
    if (!privacyCheckbox.checked) {
        alert('Пожалуйста, примите пользовательское соглашение');
        return;
    }
    
    // Здесь можно добавить код для отправки данных на сервер
    alert('Спасибо за подписку! Мы отправили вам письмо для подтверждения.');
    this.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
}); 