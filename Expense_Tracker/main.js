const form = document.getElementById("myForm");
const amouunt = document.getElementById("amount");
const description = document.getElementById("description");
const category = document.getElementById("category");
form.addEventListener("submit", onSubmit);
//load from localStorage
window.addEventListener("DOMContentLoaded", async () => {
  const expenses = await axios.get("http://localhost:3000/get-expense");
  console.log(expenses.data);
  for (let i = 0; i < expenses.data.length; i++) {
    display(expenses.data[i]);
    console.log(expenses.data[i]);
  }
  // for (let i = 0; i < localKeys.length; i++) {
  //   const key = localKeys[i];
  //   const expenseDetailsString = local[key];
  //   const expenseDetailsObj = JSON.parse(expenseDetailsString);
  //   display(expenseDetailsObj);
  // }
});

//function to run on form submit
function onSubmit(e) {
  e.preventDefault();
  try {
    if (
      amouunt.value === "" ||
      description.value === "" ||
      category.value === ""
    ) {
      alert("Please enter all fields");
    } else {
      let newData = {
        expense: amouunt.value,
        desc: description.value,
        categ: category.value,
      };
      axios.post("http://localhost:3000/add-expense", newData);
      display(newData);
      amouunt.value = "";
      description.value = "";
      category.value = "";
    }
  } catch (error) {
    console.log(err);
  }
}
function display(data) {
  const parentNode = document.getElementById("display");
  const childHTML = `<li id="${data.description}">${data.amount}-${data.description}-${data.category} <button onclick = "deleteExpense('${data.amount}','${data.description}')">Delete Expense</button> <button onclick = "editExpense('${data.amount}','${data.description}','${data.category}')">Edit Expense</button> </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
//remove user from screen
function deleteExpense(amount, uniqueId) {
  const node = document.getElementById(uniqueId);
  node.remove();
  localDel(amount + uniqueId);
}
//edit user
const editExpense = (expense, desc, categ) => {
  amouunt.value = expense;
  description.value = desc;
  category.value = categ;
  deleteExpense(expense, desc);
};
//remove expense from localStorage
function localDel(key) {
  localStorage.removeItem(key);
}
