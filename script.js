// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    const paymentForm = document.getElementById('paymentForm');
    const paymentList = document.getElementById('paymentList');
    const totalAmountElem = document.getElementById('totalAmount');
    const deleteDailyDataBtn = document.getElementById('deleteDailyData');

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        const payment = { name, email, amount, date, time };

        savePayment(payment);
        addPaymentToList(payment);
        updateTotalAmount();
        paymentForm.reset();
    });

    deleteDailyDataBtn.addEventListener('click', () => {
        deleteDailyData();
        loadPayments();
        updateTotalAmount();
    });

    function savePayment(payment) {
        let payments = getPayments();
        payments.push(payment);
        localStorage.setItem('payments', JSON.stringify(payments));
    }

    function getPayments() {
        let payments = localStorage.getItem('payments');
        return payments ? JSON.parse(payments) : [];
    }

    function addPaymentToList(payment) {
        const li = document.createElement('li');
        li.textContent = `Name: ${payment.name}, Email: ${payment.email}, Amount: $${payment.amount}, Date: ${payment.date}, Time: ${payment.time}`;
        paymentList.appendChild(li);
    }

    function updateTotalAmount() {
        let payments = getPayments();
        let today = new Date().toLocaleDateString();
        let total = payments.filter(payment => payment.date === today)
                            .reduce((sum, payment) => sum + payment.amount, 0);
        totalAmountElem.textContent = `${total.toFixed(2)}`;
    }

    function loadPayments() {
        paymentList.innerHTML = '';
        let payments = getPayments();
        payments.forEach(payment => addPaymentToList(payment));
        updateTotalAmount();
    }

    function deleteDailyData() {
        let payments = getPayments();
        let today = new Date().toLocaleDateString();
        payments = payments.filter(payment => payment.date !== today);
        localStorage.setItem('payments', JSON.stringify(payments));
    }

    loadPayments();
});

document.addEventListener('DOMContentLoaded', function() {
    const deleteButton = document.getElementById('deleteDailyData');
    const paymentList = document.getElementById('paymentList');
    const totalAmount = document.getElementById('totalAmount');

    // Function to delete today's data
    deleteButton.addEventListener('click', function() {
        // Show confirmation dialog
        if (confirm('Are you sure you want to delete today\'s data?')) {
            // Clear payment list
            paymentList.innerHTML = '';

            // Reset total amount
            totalAmount.textContent = '$0';

            // Here you can add further logic to clear any stored data or perform additional actions
            // For demonstration, we're just clearing the list and resetting the total amount
        }
    });
});
