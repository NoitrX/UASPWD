function getPesananTable() {
  let checkOutHistory = JSON.parse(localStorage.getItem("checkoutHistory")) || [];
  const pesananTable = document.getElementById("table-pesanan");
  pesananTable.innerHTML = "";

  checkOutHistory.forEach((item) => {
    item.items.forEach((product, index) => {
      const row = document.createElement("tr");
      row.classList.add("py-6");
      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-neutral-200">${product.name} (${product.qty})</td>
        ${index === 0 ? `<td rowspan="${item.items.length}" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-neutral-200">${new Date(item.checkoutTime)}</td>` : ""}
        ${index === 0 ? `<td rowspan="${item.items.length}" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-neutral-200">Rp. ${item.grandTotal}</td>` : ""}
       
        `;
      pesananTable.appendChild(row);
    });
  });
}

getPesananTable();
