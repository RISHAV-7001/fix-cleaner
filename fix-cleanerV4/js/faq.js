<<<<<<< HEAD
/* =========================================================
   FIX CLEANER — FAQ ACCORDION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        if (!question || !answer) {
            return;
        }


        question.addEventListener("click", () => {

            const isOpen =
                item.classList.contains("open");


            /* Close all other questions */

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove("open");

                    const otherAnswer =
                        otherItem.querySelector(".faq-answer");

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }

                    const otherIcon =
                        otherItem.querySelector(
                            ".faq-question span:last-child"
                        );

                    if (otherIcon) {
                        otherIcon.textContent = "+";
                    }
                }
            });


            /* Toggle current question */

            if (isOpen) {

                item.classList.remove("open");

                answer.style.maxHeight = null;

                const icon =
                    question.querySelector(
                        "span:last-child"
                    );

                if (icon) {
                    icon.textContent = "+";
                }

            } else {

                item.classList.add("open");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                const icon =
                    question.querySelector(
                        "span:last-child"
                    );

                if (icon) {
                    icon.textContent = "−";
                }
            }

        });

    });

=======
/* =========================================================
   FIX CLEANER — FAQ ACCORDION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        if (!question || !answer) {
            return;
        }


        question.addEventListener("click", () => {

            const isOpen =
                item.classList.contains("open");


            /* Close all other questions */

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove("open");

                    const otherAnswer =
                        otherItem.querySelector(".faq-answer");

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }

                    const otherIcon =
                        otherItem.querySelector(
                            ".faq-question span:last-child"
                        );

                    if (otherIcon) {
                        otherIcon.textContent = "+";
                    }
                }
            });


            /* Toggle current question */

            if (isOpen) {

                item.classList.remove("open");

                answer.style.maxHeight = null;

                const icon =
                    question.querySelector(
                        "span:last-child"
                    );

                if (icon) {
                    icon.textContent = "+";
                }

            } else {

                item.classList.add("open");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                const icon =
                    question.querySelector(
                        "span:last-child"
                    );

                if (icon) {
                    icon.textContent = "−";
                }
            }

        });

    });

>>>>>>> origin/main
});