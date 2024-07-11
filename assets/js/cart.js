// Menambah Produk ke dalam local Storage
function addToCart(e) {
  // e.target untuk mengambil target dari button mana yang diklik yang didapatkan dari dom dibawah
  const button = e.target;
  // Masing-masing dari target di fetch dan disesuaikan dengan atribut yang telah didapatkan dari DOM
  const product = {
    id: button.getAttribute("data-id"),
    name: button.getAttribute("data-name"),
    // ParseFloat digunakan untuk merubah/konversi data yang didapatkan dari atribut data price menjadi desimal / float
    price: parseFloat(button.getAttribute("data-price")),
    // Set default quantity saat pertama kali di klik menjadi 1
    qty: 1,
  };

  // Get localstorage CART, dan merubah datanya menjadi JSON/Object
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // cek apakah produk yang telah ditambahkan ada atau tidak, jika tidak maka akan me return -1
  const productIndex = cart.findIndex((item) => item.id === product.id);
  // Cek kondisi jika hasil dair produk index itu tidak -1, maka akan menampilkan alert
  if (productIndex !== -1) {
    alert("Produk inisudah ada di keranjang");
  } else {
    // Jika tidak ada maka hasil dari obj produk akan dipush ke dalam localStorage Cart
    cart.push(product);
    // Set item ke localstorage, dan rubah menjadi string
    localStorage.setItem("cart", JSON.stringify(cart));
    // Tampilkan alert dari sweet alert
    Swal.fire({
      title: "Produk",
      text: "Berhasil Ditambahkan",
      icon: "success",
    });
    // Update cart agar  selalu update
    updateCartTable();
  }
}

function updateCartTable() {
  // Get Cart dari Localsotrage dan di parse menjadi Object
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // Parent dari table
  const cartItemsContainer = document.getElementById("cart-items");
  // diisi Default kosong terlebih dahulu agar bisa diisi html kedepannya
  cartItemsContainer.innerHTML = "";

  // Fetch dari Obj cart yang didapatkan dari localstorage dan masukan ke dalam table
  cart.forEach((item) => {
    // Membuat element tr , disetiap looping/fetch dan menyesuaikan ukuran data
    const row = document.createElement("tr");
    // menambah class untuk table
    row.classList.add("py-6");
    //row dipush hasil dari fetch cart
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
    // masukan ke parent element
    cartItemsContainer.appendChild(row);
  });

  // Masukan total dari Cart
  const grandTotal = calculateGrandTotal(cart);
  // get parent grandTotal
  const grandTotalElement = document.getElementById("grand-total");
  // Masukan Hasilnya
  grandTotalElement.textContent = `GRANDTOTAL: Rp. ${grandTotal}`;
}

function updateQuantity(id, change) {
  // get data dari localstorage Cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // cek apakah produk yang telah ditambahkan ada atau tidak, jika tidak maka akan me return -1
  const productIndex = cart.findIndex((item) => item.id === id);
  console.log(productIndex, "pInd");
  if (productIndex !== -1) {
    // cart[index dari produknya berapa], jika ada maka ditambahkan quantitynya sesuai dengan
    // button yang didapatkan dari function updateCart, dikarenakan menerima 2 params
    cart[productIndex].qty += change;
    // jika produk dari indexnya saat dikurangin quantitynya  kurang dari 0 maka akan di splice/ dihapus
    if (cart[productIndex].qty <= 0) {
      cart.splice(productIndex, 1);
    }
    // set Item untuk save hasil dari kalkulasi
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartTable();
  }
}

const checkOut = () => {
  // Get item dari localstorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // get item Localstorage baru
  let checkoutHistory = JSON.parse(localStorage.getItem("checkoutHistory")) || [];
  // mendapatkan grand total dari masing-masing cart
  const grandTotal = calculateGrandTotal(cart);
  // Push hasil checkout yang didapatkan dari localStorage cart ke checkoutHistory
  checkoutHistory.push({ items: cart, grandTotal: grandTotal, checkoutTime: new Date() });

  // setelah berhasil di push maka localStorage cart akan hilang dan dihapus
  localStorage.removeItem("cart");

  // set Item localstorage baru
  localStorage.setItem("checkoutHistory", JSON.stringify(checkoutHistory));
  updateCartTable();
};

// Get Total Kalkulasi
function calculateGrandTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.qty, 0);
}
// get element untuk tambah ke cart
document.querySelectorAll("button[data-id]").forEach((button) => {
  button.addEventListener("click", addToCart);
});

updateCartTable();

// Get element button checkout
const checkOutButton = document.querySelector(".checkout");


// Untuk menampilkan popup alert checkout
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
    // jika iyaa maka akan jalankan function checkout
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
