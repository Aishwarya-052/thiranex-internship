// 1. Global Application State
const state = {
    cart: [],
    products: [
        { id: 1, name: "Wireless Headphones", price: 99, img: "https://unsplash.com" },
        { id: 2, name: "Minimalist Smartwatch", price: 149, img: "https://unsplash.com" },
        { id: 3, name: "Mechanical Keyboard", price: 89, img: "https://unsplash.com" }
    ]
};

// 2. Modular Frontend Components (Views)
const CatalogView = () => {
    const productCards = state.products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}" loading="lazy" class="product-img">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <button class="btn add-to-cart" data-id="${p.id}">Add to Cart</button>
        </div>
    `).join('');

    return `
        <section class="catalog-section">
            <h2>Product Catalog</h2>
            <div class="products-grid">${productCards}</div>
        </section>
    `;
};

const CartView = () => {
    if (state.cart.length === 0) {
        return `<h2>Your Cart</h2><p class="empty-msg">Your shopping cart is empty.</p>`;
    }

    const cartItems = state.cart.map(item => `
        <div class="cart-item">
            <h4>${item.name}</h4>
            <p>$${item.price} x ${item.quantity}</p>
        </div>
    `).join('');

    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return `
        <section class="cart-section">
            <h2>Your Shopping Cart</h2>
            <div class="cart-list">${cartItems}</div>
            <div class="cart-total">
                <h3>Total: $${total}</h3>
                <button class="btn checkout-btn" id="checkout-btn">Proceed to Checkout</button>
            </div>
        </section>
    `;
};

// 3. Client-Side Routing Engine
const routes = {
    "/": CatalogView,
    "/cart": CartView
};

const router = () => {
    // Treat any non-root path as "/" for basic deployment setups
    const path = window.location.pathname === "/cart" ? "/cart" : "/";
    const viewFn = routes[path] || CatalogView;
    
    document.getElementById('app').innerHTML = viewFn();
    attachEventListeners();
};

// Navigate without browser reloads
const navigateTo = (url) => {
    window.history.pushState(null, null, url);
    router();
};

// 4. Dynamic Event Management
const attachEventListeners = () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const product = state.products.find(p => p.id === id);
            const cartItem = state.cart.find(item => item.id === id);

            if (cartItem) {
                cartItem.quantity++;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
            
            updateCartCounter();
        });
    });

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert("Order placed successfully! Custom deployment setup is working perfectly.");
            state.cart = [];
            updateCartCounter();
            navigateTo("/");
        });
    }
};

const updateCartCounter = () => {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;
};

// 5. Intercept standard navigation clicks
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.getAttribute("href"));
        }
    });

    window.addEventListener("popstate", router);
    router();
});
            <h4>${item.name}</h4>
            <p>$${item.price} x ${item.quantity}</p>
        </div>
    `).join('');

    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return `
        <section class="cart-section">
            <h2>Your Shopping Cart</h2>
            <div class="cart-list">${cartItems}</div>
            <div class="cart-total">
                <h3>Total: $${total}</h3>
                <button class="btn checkout-btn" id="checkout-btn">Proceed to Checkout</button>
            </div>
        </section>
    `;
};

// 3. Client-Side Routing Engine
const routes = {
    "/": CatalogView,
    "/cart": CartView
};

const router = () => {
    const path = window.location.pathname;
    const viewFn = routes[path] || CatalogView;
    
    document.getElementById('app').innerHTML = viewFn();
    attachEventListeners();
};

// Navigate without browser reloads
const navigateTo = (url) => {
    window.history.pushState(null, null, url);
    router();
};

// 4. Dynamic Event Management
const attachEventListeners = () => {
    // Add to Cart Logic
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const product = state.products.find(p => p.id === id);
            const cartItem = state.cart.find(item => item.id === id);

            if (cartItem) {
                cartItem.quantity++;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
            
            updateCartCounter();
        });
    });

    // Simulated Checkout Link
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert("Order placed successfully! Custom deployment setup is working perfectly.");
            state.cart = [];
            updateCartCounter();
            navigateTo("/");
        });
    }
};

const updateCartCounter = () => {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;
};

// 5. Intercept standard navigation clicks
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.getAttribute("href"));
        }
    });

    window.addEventListener("popstate", router);
    router();
});

function renderWeather(data) {
    cityNameEl.textContent = data.name;
    tempEl.textContent = Math.round(data.main.temp);
    humidityEl.textContent = data.main.humidity;
    windEl.textContent = data.wind.speed;

    weatherDisplay.classList.add('active');
}
