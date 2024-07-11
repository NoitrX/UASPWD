function getPesananTable() {
  let checkOutHistory = JSON.parse(localStorage.getItem("checkoutHistory")) || [];
  const pesananTable = document.getElementById("table-pesanan");
  pesananTable.innerHTML = "";

  // Fetch Hasil dari localstorage
  checkOutHistory.forEach((item) => {
    // di fetch 2 kali dikarenakan saya menyimpan 2 array object pada 1 localstorage
    // yang pertama digunakan untuk mendapatkan semua item dari barisan obj pertama, lalu yang kedua untuk mendapatkan list item dari object produk
    item.items.forEach((product, index) => {
      // create element tr
      const row = document.createElement("tr");
      row.classList.add("py-6");
      // cek kondisi menyesuaikan panjang dari length itemsnya, jika lengthnya 1, maka row hanya akan menampilkan 1 baris,
      // jika lengthnya lebih dari 1, maka row akan menampilkan 2 baris
      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-neutral-200">${product.name} (${product.qty})</td>
        
        ${index === 0 ? `<td rowspan="${item.items.length}" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-neutral-200">${new Date(item.checkoutTime)}</td>` : ""}
        ${index === 0 ? `<td rowspan="${item.items.length}" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-neutral-200">Rp. ${item.grandTotal}</td>` : ""}
       
        `;
      // push ke parent dari table
      pesananTable.appendChild(row);
    });
  });
}

getPesananTable();
