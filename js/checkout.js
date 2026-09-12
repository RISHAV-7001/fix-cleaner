/* =========================================================
   FIX CLEANER — CHECKOUT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutTotal =
        document.getElementById("checkout-total");

    const grandTotal =
        document.getElementById("checkout-grand-total");

    const checkoutForm =
        document.getElementById("checkout-form");


    /* =====================================================
       DISPLAY ORDER SUMMARY
    ===================================================== */

    function renderCheckout() {

        if (!checkoutItems) {
            return;
        }

        if (cart.length === 0) {

            checkoutItems.innerHTML = `
                <div class="checkout-empty">
                    <h3>Your cart is empty</h3>
                    <p>Add a product before checking out.</p>
                </div>
            `;

        } else {

            checkoutItems.innerHTML = cart.map(item => {

                const itemTotal =
                    item.price * item.quantity;

                return `
                    <div class="summary-line">

                        <span>
                            ${item.name}
                            <small>
                                ${item.size} × ${item.quantity}
                            </small>
                        </span>

                        <strong>
                            ₹${itemTotal.toLocaleString("en-IN")}
                        </strong>

                    </div>
                `;

            }).join("");
        }


        /* =================================================
           TOTAL
        ================================================= */

        const total =
            cart.reduce(
                (sum, item) =>
                    sum + (item.price * item.quantity),
                0
            );


        if (checkoutTotal) {
            checkoutTotal.textContent =
                total.toLocaleString("en-IN");
        }

        if (grandTotal) {
            grandTotal.textContent =
                total.toLocaleString("en-IN");
        }
    }


    renderCheckout();


    /* =====================================================
       CHECKOUT FORM
    ===================================================== */

    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                /* ---------- EMPTY CART ---------- */

                if (cart.length === 0) {

                    alert(
                        "Your cart is empty. Please add a product first."
                    );

                    return;
                }


                /* ---------- FORM VALIDATION ---------- */

                if (!checkoutForm.checkValidity()) {

                    checkoutForm.reportValidity();

                    return;
                }


                /* ---------- ORDER DATA ---------- */

                const formData =
                    new FormData(checkoutForm);

                const order = {

                    customer: {
                        name: formData.get("name"),
                        phone: formData.get("phone"),
                        email: formData.get("email")
                    },

                    address: {
                        address: formData.get("address"),
                        city: formData.get("city"),
                        state: formData.get("state"),
                        pincode: formData.get("pincode")
                    },

                    items: cart,

                    total:
                        cart.reduce(
                            (sum, item) =>
                                sum +
                                (item.price * item.quantity),
                            0
                        ),

                    createdAt:
                        new Date().toISOString()
                };


                console.log(
                    "Fix Cleaner Order:",
                    order
                );


                /* ---------- DEMO SUCCESS ---------- */

                alert(
                    "Order details submitted successfully!"
                );


                /*
                    PAYMENT / BACKEND WILL BE
                    CONNECTED LATER.
                */

            }
        );
    }


    /* =====================================================
       PINCODE CHECK
    ===================================================== */

    const pincodeInput =
        document.getElementById("pincode");

    const pincodeResult =
        document.getElementById("pincode-result");


    window.checkPincode = function () {

        if (!pincodeInput || !pincodeResult) {
            return;
        }

        const pincode =
            pincodeInput.value.trim();


        if (!/^[0-9]{6}$/.test(pincode)) {

            pincodeResult.textContent =
                "Please enter a valid 6-digit pincode.";

            pincodeResult.className =
                "pincode-result error";

            return;
        }


        pincodeResult.textContent =
            "Checking delivery availability...";

        pincodeResult.className =
            "pincode-result";


        /*
            Real delivery-service API will be
            connected later.
        */

        setTimeout(() => {

            pincodeResult.textContent =
                "Pincode format looks valid. Actual delivery availability will be confirmed during order processing.";

            pincodeResult.className =
                "pincode-result success";

        }, 500);
    };

});