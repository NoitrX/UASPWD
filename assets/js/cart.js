function addToCart(e) {
  const button = e.target;
  const product = {
    id: button.getAttribute("data-id"),
    name: button.getAttribute("data-name"),
    price: parseFloat(button.getAttribute("data-price")),
    qty: 1,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex((item) => item.id === product.id);
  if (productIndex !== -1) {
    alert("Produk inisudah ada di keranjang");
  } else {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire({
      title: "Produk",
      text: "Berhasil Ditambahkan",
      icon: "success",
    });
    updateCartTable();
  }
}

function updateCartTable() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("py-6");
    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-neutral-200">${item.name}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-200">${item.price}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-200">${item.qty}</td>
        <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">${item.price * item.qty}</td>
        <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
          <button class="mx-2" onclick="updateQuantity('${item.id}', -1)">-</button>
          <button onclick="updateQuantity('${item.id}', 1)">+</button>
        </td>
      `;
    cartItemsContainer.appendChild(row);
  });

  const grandTotal = calculateGrandTotal(cart);
  const grandTotalElement = document.getElementById("grand-total");
  grandTotalElement.textContent = `GRANDTOTAL: Rp. ${grandTotal}`;
}

function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex((item) => item.id === id);
  if (productIndex !== -1) {
    cart[productIndex].qty += change;
    if (cart[productIndex].qty <= 0) {
      cart.splice(productIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartTable();
  }
}

const checkOut = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let checkoutHistory = JSON.parse(localStorage.getItem("checkoutHistory")) || [];
  const grandTotal = calculateGrandTotal(cart);
  checkoutHistory.push({ items: cart, grandTotal: grandTotal, checkoutTime: new Date() });

  localStorage.removeItem("cart");

  localStorage.setItem("checkoutHistory", JSON.stringify(checkoutHistory));
  updateCartTable();
};

function calculateGrandTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.qty, 0);
}
document.querySelectorAll("button[data-id]").forEach((button) => {
  button.addEventListener("click", addToCart);
});

updateCartTable();

const checkOutButton = document.querySelector(".checkout");

checkOutButton.addEventListener("click", function () {
  Swal.fire({
    title: "Yakin?",
    text: "Yakin ingin checkout barang ini??!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "YAKIN",
  }).then((result) => {
    checkOut();
    if (result.isConfirmed) {
      Swal.fire({
        title: "Berhasil Checkout",
        text: "Produk berhasil dipesan!!",
        icon: "success",
      });
    }
  });
});
