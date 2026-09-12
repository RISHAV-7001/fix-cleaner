/* =========================================================
   FIX CLEANER — PRODUCT PAGE
   Supports multiple product sections without changing the
   existing cart system.
========================================================= */

const productCatalog = {
    floor: {
        name: "Fix Floor Cleaner",
        sizes: {
            "3L": 249,
            "7L": 499,
            "15L": 999,
            "20L": 1299,
            "25L": 1699
        }
    },

    bathroom: {
        name: "Fix Bathroom Cleaner",
        sizes: {
            "3L": 249,
            "7L": 499,
            "15L": 999,
            "20L": 1299,
            "25L": 1699
        }
    }
};

const productStates = {};

/* =========================================================
   INITIALISE EACH PRODUCT SECTION
========================================================= */

document.querySelectorAll(".product-detail[data-product-id]").forEach(section => {
    const productId = section.dataset.productId;
    const product = productCatalog[productId];

    if (!product) return;

    productStates[productId] = {
        selectedSize: "3L",
        selectedPrice: product.sizes["3L"],
        quantity: 1
    };

    const sizeButtons = section.querySelectorAll(".size-option");

    sizeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const state = productStates[productId];

            state.selectedSize = button.dataset.size;
            state.selectedPrice = Number(button.dataset.price);

            updateProductUI(productId);
        });
    });

    updateProductUI(productId);
});


/* =========================================================
   PRICE FORMAT
========================================================= */

function formatPrice(price) {
    return Number(price).toLocaleString("en-IN");
}


/* =========================================================
   UPDATE PRODUCT UI
========================================================= */

function updateProductUI(productId) {
    const section = document.querySelector(
        `.product-detail[data-product-id="${productId}"]`
    );

    const state = productStates[productId];

    if (!section || !state) return;

    const priceElement = section.querySelector("[data-selected-price]");
    const quantityElement = section.querySelector("[data-quantity]");
    const selectedSizeLabel = section.querySelector("[data-selected-size-label]");

    const totalPrice = state.selectedPrice * state.quantity;

    if (priceElement) {
        priceElement.textContent = formatPrice(totalPrice);
    }

    if (quantityElement) {
        quantityElement.textContent = state.quantity;
    }

    if (selectedSizeLabel) {
        selectedSizeLabel.textContent = `${state.selectedSize} selected`;
    }

    section.querySelectorAll(".size-option").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.size === state.selectedSize
        );
    });
}


/* =========================================================
   QUANTITY
========================================================= */

function changeQuantity(productId, amount) {
    const state = productStates[productId];

    if (!state) return;

    state.quantity += Number(amount);

    if (state.quantity < 1) {
        state.quantity = 1;
    }

    if (state.quantity > 99) {
        state.quantity = 99;
    }

    updateProductUI(productId);
}


/* =========================================================
   ADD TO CART
========================================================= */

function addCurrentProduct(productId) {
    const product = productCatalog[productId];
    const state = productStates[productId];

    if (!product || !state) return;

    const item = {
        name: product.name,
        size: state.selectedSize,
        price: state.selectedPrice,
        quantity: state.quantity
    };

    if (typeof addToCart === "function") {
        addToCart(item);
    } else {
        console.error("cart.js is not loaded.");
    }
}


/* =========================================================
   BACKWARD COMPATIBILITY
   Keeps the old single-product function behaviour available
   if another part of the current page calls these functions.
========================================================= */

function getDefaultProductId() {
    return productStates.floor ? "floor" : Object.keys(productStates)[0];
}

function changeQuantityLegacy(amount) {
    changeQuantity(getDefaultProductId(), amount);
}

function addCurrentProductLegacy() {
    addCurrentProduct(getDefaultProductId());
}
