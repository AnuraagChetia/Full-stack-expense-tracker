const form = document.getElementById("myForm");
const amouunt = document.getElementById("amount");
const description = document.getElementById("description");
const category = document.getElementById("category");
form.addEventListener("submit", onSubmit);
//load from localStorage
window.addEventListener("DOMContentLoaded", async () => {
  const expenses = await axios.get("http://localhost:3000/get-expense");
  for (let i = 0; i < expenses.data.length; i++) {
    display(expenses.data[i]);
  }
});

//function to run on form submit
async function onSubmit(e) {
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
        amount: amouunt.value,
        description: description.value,
        category: category.value,
      };
      const res = await axios.post(
        "http://localhost:3000/add-expense",
        newData
      );
      console.log(res.data.expenseData);
      display(res.data.expenseData);
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
  const childHTML = `<li id="${data.description}">${data.amount}-${data.description}-${data.category} <button type="button" onclick = "deleteExpense('${data.id}','${data.description}')">Delete Expense</button> <button type="button" onclick = "editExpense('${data.id}','${data.amount}','${data.description}','${data.category}')">Edit Expense</button> </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
//remove user from screen
function deleteExpense(id, desc) {
  axios
    .delete(`http://localhost:3000/delete-expense/${id}`)
    .then(() => {
      const node = document.getElementById(desc);
      node.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}
//edit user
const editExpense = (id, amount, desc, categ) => {
  amouunt.value = amount;
  description.value = desc;
  category.value = categ;
  deleteExpense(id, desc);
};
