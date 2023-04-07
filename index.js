function displayProducts(products) {
  const container = document.getElementById('products');

  container.innerHTML = '';

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const productImage = document.createElement('img');
    productImage.src = product.image;

    const productName = document.createElement('h2');
    productName.textContent = product.name;

    const productDescription = document.createElement('p');
    productDescription.textContent = product.description;

    const itemsAvailable = document.createElement('span');
    itemsAvailable.id = `items-available-${product.id}`;
    itemsAvailable.textContent = `Items available: ${product.itemsAvailable}`;

    const itemsSold = document.createElement('span');
    itemsSold.id = `items-sold-${product.id}`;
    itemsSold.textContent = `Items sold: ${product.itemsSold}`;

    const productPrice = document.createElement('p');
    productPrice.textContent = `$${product.price}`;

    // Create a "Buy" button for each product
    const buyBtn = document.createElement('button');
    buyBtn.textContent = 'Buy';
    buyBtn.id = `buy-btn-${product.id}`;
    buyBtn.addEventListener('click', () => {
      if (product.itemsAvailable > 0) {
        product.itemsAvailable--;
        product.itemsSold++;
        updateItems(product.id, product.itemsAvailable, product.itemsSold);
        updateUI(product.id, product.itemsAvailable, product.itemsSold);
      } else {
        alert('This product is out of stock!');
      }
    });

    productDiv.appendChild(productName);
    productDiv.appendChild(productImage);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(itemsAvailable);
    productDiv.appendChild(itemsSold);
    productDiv.appendChild(buyBtn);

    container.appendChild(productDiv);
  });
}


function fetchProducts() {
  fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => displayProducts(data));
}

function updateItems(id, itemsAvailable, itemsSold) {
  fetch(`http://localhost:3000/products/id{}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemsAvailable, itemsSold })
  });
}

function updateUI(id, itemsAvailable, itemsSold) {
  const itemsAvailableSpan = document.getElementById(`items-available-${id}`);
  const itemsSoldSpan = document.getElementById(`items-sold-${id}`);
  itemsAvailableSpan.textContent = `Items available: ${itemsAvailable}`;
  itemsSoldSpan.textContent = `Items sold: ${itemsSold}`;
}

fetchProducts();
