let total = 0;
let orderItems = [];
let customerNumber = 1000; // Starting customer number

function addItem(item, price) {
    const orderList = document.getElementById('orderList');
    const listItem = document.createElement('li');
    listItem.textContent = `${item} - ${price.toFixed(2)}`;
    orderList.appendChild(listItem);

    total += price;
    document.getElementById('total').textContent = total.toFixed(2);

    // Add item to orderItems array
    orderItems.push({ item, price });
}

function clearOrder() {
    document.getElementById('orderList').innerHTML = '';
    total = 0;
    document.getElementById('total').textContent = total.toFixed(2);
    orderItems = [];
}

function showReceipt() {
    const modal = document.getElementById('receiptModal');
    const orderList = document.getElementById('orderList');
    const receiptList = document.getElementById('receiptList');
    const totalElement = document.getElementById('total');

    // Clear previous receipt items
    receiptList.innerHTML = '';

    // Copy order items to receipt
    orderList.querySelectorAll('li').forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.textContent;
        receiptList.appendChild(li);
    });

    // Show total and customer number on receipt
    document.getElementById('receiptTotal').textContent = totalElement.textContent;
    document.getElementById('customerNumber').textContent = customerNumber;

    // Increment customer number for the next order
    customerNumber++;

    // Display the receipt modal
    modal.style.display = 'flex';
}

function closeReceipt() {
    document.getElementById('receiptModal').style.display = 'none';
    clearOrder();
}

function printReceipt() {
    const receiptContent = document.querySelector('.receipt-content').innerHTML;
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Receipt</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(receiptContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

function showCategory(category) {
    const items = document.querySelectorAll('.menu-item');
    const buttons = document.querySelectorAll('.menu-categories button');
    
    // Show all items if 'all' is selected
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // Update active button style
    buttons.forEach(button => button.classList.remove('active'));
    if (category === 'all') {
        document.getElementById('allBtn').classList.add('active');
    } else {
        buttons.forEach(button => {
            if (button.innerText.toLowerCase() === category) {
                button.classList.add('active');
            }
        });
    }
}
