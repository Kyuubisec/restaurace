document.addEventListener("DOMContentLoaded", () => {
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    let quantityInputs = document.querySelectorAll("input[type='number']");
    let submitButton = document.getElementById("submitOrder");
    let resetButton = document.getElementById("resetOrder");
    let orderSummary = document.getElementById("orderSummary");

    // Povolení/disable inputů množství
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            quantityInputs[index].disabled = !checkbox.checked;
        });
    });

    //  objednávky
    submitButton.addEventListener("click", () => {
        let total = 0;
        let orderDetails = "<ul>";

        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                let itemName = checkbox.value;
                let itemPrice = parseInt(checkbox.getAttribute("data-price"));
                let quantity = parseInt(quantityInputs[index].value);
                let itemTotal = itemPrice * quantity;

                total += itemTotal;
                orderDetails += `<li>${itemName} (${quantity} ks) - ${itemTotal} Kč</li>`;
            }
        });

        orderDetails += `</ul><strong>Celkem: ${total} Kč</strong>`;
        orderSummary.innerHTML = orderDetails;
    });

    // Reset formuláře
    resetButton.addEventListener("click", () => {
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = false;
            quantityInputs[index].disabled = true;
            quantityInputs[index].value = 1;
        });

        orderSummary.innerHTML = "";
    });
});
