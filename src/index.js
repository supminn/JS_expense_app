/**
 * Delete functionality pending
 * Trying to replicate
 * https://www.youtube.com/watch?v=C_R6dvU4820&list=PLzvhQUIpvvuj9nN70USkHJrrSeQ9aiqdB
 */

const values = document.querySelectorAll(".form-control");
const btn = document.getElementById("btn-add");
const tableContents = document.querySelector("#contents");
const displayTotal = document.getElementById("txt-total");
const errorMsg = document.querySelector(".alert-danger");
let data = [];

const deleteItem = (id) => {
  data = data.filter((item) => item.id !== id);
  printTableContents();
};

const htmlContent = (item) => {
  return `<tr>
  <td>${item.desc}</td>
  <td>${item.price}</td>
  <td>
  <button type="button" 
  class="btn-outline-danger" 
  onclick="deleteItem(${item.id})">
  <i class="fas fa-trash"></i>
  </button>
  </tr>`;
};

const printTableContents = () => {
  const totalExpenses = data.reduce((prev, curr) => prev + curr.price, 0);
  displayTotal.innerText = `Total: ${totalExpenses}`;
  tableContents.innerHTML = data.reduce(
    (prev, curr) => prev + htmlContent(curr),
    ""
  );
};

const addData = (desc, price) => {
  data.push({ desc, price, id: data.length + 1 });
  printTableContents();
};

const handleClick = () => {
  const desc = values[0];
  const price = values[1];
  if (!desc.value) {
    errorMsg.innerText = "Description cannot be left blank";
    errorMsg.classList.remove("hidden");
    desc.focus();
  } else if (!price.value) {
    errorMsg.innerText = "Enter the price";
    errorMsg.classList.remove("hidden");
    price.focus();
  } else {
    addData(desc.value, Number(price.value));
    values.forEach((item) => (item.value = ""));
    errorMsg.classList.add("hidden");
  }
};

btn.addEventListener("click", handleClick);
