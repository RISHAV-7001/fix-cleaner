/* =========================================================
   FIX CLEANER — CART SYSTEM
========================================================= */

let cart =
    JSON.parse(localStorage.getItem("fixCart")) || [];


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "fixCart",
        JSON.stringify(cart)
    );

    updateCartUI();
    window.dispatchEvent(new Event("cart:updated"));

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(product) {

    const existingItem =
        cart.find(item =>
            item.name === product.name &&
            item.size === product.size
        );


    if (existingItem) {

        existingItem.quantity +=
            product.quantity;

    } else {

        cart.push({

            name: product.name,

            size: product.size,

            price: Number(product.price),

            quantity: Number(product.quantity)

        });

    }


    saveCart();

    openCart();

}


/* =========================================================
   REMOVE
========================================================= */

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);

    saveCart();

}


/* =========================================================
   CART QUANTITY
========================================================= */

function changeCartQuantity(index, amount) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

}


/* =========================================================
   TOTAL ITEMS
========================================================= */

function getCartQuantity() {

    return cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

}


/* =========================================================
   TOTAL PRICE
========================================================= */

function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total +
            (item.price * item.quantity),
        0
    );

}


/* =========================================================
   PRICE FORMAT
========================================================= */

function formatCartPrice(price) {

    return Number(price)
        .toLocaleString("en-IN");

}


/* =========================================================
   UPDATE CART
========================================================= */

function updateCartUI() {

    const cartCounts =
        document.querySelectorAll(".cart-count");

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    /* -----------------------------------------------------
       CART COUNT
    ----------------------------------------------------- */

    cartCounts.forEach(cartCount => {
        cartCount.textContent = getCartQuantity();
    });


    /* -----------------------------------------------------
       CART ITEMS
    ----------------------------------------------------- */

    if (cartItems) {

        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="cart-empty">

                    <div class="cart-empty-icon">
                        🛒
                    </div>

                    <h3>
                        Your cart is empty
                    </h3>

                    <p>
                        Add something you love
                        from Fix Cleaner.
                    </p>

                </div>

            `;

        } else {

            cartItems.innerHTML =
                cart.map(
                    (item, index) => {

                        const itemTotal =
                            item.price *
                            item.quantity;


                        return `

                            <div class="cart-item">

                                <div class="cart-item-top">

                                    <div class="cart-item-details">

                                        <span class="cart-item-name">
                                            ${item.name}
                                        </span>

                                        <span class="cart-item-size">
                                            ${item.size}
                                        </span>

                                        <span class="cart-unit-price">
                                            ₹${formatCartPrice(item.price)}
                                            / unit
                                        </span>

                                    </div>


                                    <button
                                        type="button"
                                        class="cart-remove"
                                        onclick="removeFromCart(${index})"
                                        aria-label="Remove item"
                                    >
                                        ×
                                    </button>

                                </div>


                                <div class="cart-item-bottom">

                                    <div class="cart-quantity">

                                        <button
                                            type="button"
                                            onclick="changeCartQuantity(${index}, -1)"
                                        >
                                            −
                                        </button>

                                        <span>
                                            ${item.quantity}
                                        </span>

                                        <button
                                            type="button"
                                            onclick="changeCartQuantity(${index}, 1)"
                                        >
                                            +
                                        </button>

                                    </div>


                                    <strong class="cart-item-price">
                                        ₹${formatCartPrice(itemTotal)}
                                    </strong>

                                </div>

                            </div>

                        `;

                    }
                ).join("");

        }

    }


    /* -----------------------------------------------------
       CART TOTAL
    ----------------------------------------------------- */

    if (cartTotal) {

        cartTotal.textContent =
            formatCartPrice(
                getCartTotal()
            );

    }

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

    const drawer =
        document.getElementById("cart-drawer");

    const overlay =
        document.getElementById("cart-overlay");


    if (drawer) {

        drawer.classList.add("active");

    }


    if (overlay) {

        overlay.classList.add("active");

    }


    document.body.classList.add(
        "cart-open"
    );

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

    const drawer =
        document.getElementById("cart-drawer");

    const overlay =
        document.getElementById("cart-overlay");


    if (drawer) {

        drawer.classList.remove("active");

    }


    if (overlay) {

        overlay.classList.remove("active");

    }


    document.body.classList.remove(
        "cart-open"
    );

}


/* =========================================================
   CART SYNC
========================================================= */

window.addEventListener("storage", event => {
    if (event.key !== "fixCart") return;

    try {
        cart = event.newValue ? JSON.parse(event.newValue) : [];
        if (!Array.isArray(cart)) cart = [];
    } catch (error) {
        cart = [];
    }

    updateCartUI();
});

window.addEventListener("cart:updated", updateCartUI);


/* =========================================================
   EVENTS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const overlay =
            document.getElementById(
                "cart-overlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeCart
            );

        }


        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {

                    closeCart();

                }

            }
        );


        updateCartUI();

    }
);