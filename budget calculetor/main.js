
let arr = [{ income: [], expence: [] }];
let budget = arr[0].income;

function localStoragedata() {
    localStorage.setItem('budgetData', JSON.stringify(arr));
}


let inpbudget = document.getElementById('inpbudget');
let inpbudgettitle = document.getElementById('inpbudgettitle');
let btnbudget = document.getElementById('btnbudget');
let totalBudget = document.getElementById('totalBudget');
let tablebodybudget = document.getElementById("tblbudget");
let btnupdatebudget = document.getElementById('btnupdatebudget');

btnupdatebudget.style.visibility = "hidden";

inpbudget.addEventListener('keyup', (p) => {
    if (inpbudget.value == "") {
        inpbudget.classList.add('err_inp');
        document.getElementById('inpbudget_error').innerHTML = "please enter valid amount";
    } else {
        inpbudget.classList.remove('err_inp');
        document.getElementById('inpbudget_error').innerHTML = "";
    }
})

inpbudgettitle.addEventListener('keyup', (p) => {
    if (inpbudgettitle.value == "") {
        inpbudgettitle.classList.add('err_inp');
        document.getElementById('inpbudgettitle_error').innerHTML = "please enter valid title";
    } else {
        inpbudgettitle.classList.remove('err_inp');
        document.getElementById('inpbudgettitle_error').innerHTML = "";
    }
})

// btnbudget.addEventListener('click', () => {
function addNewBudget() {
    if (inpbudget.value != "") {
        if (inpbudget.value <= 0) {
            inpbudget.classList.add('err_inp');
            document.getElementById('inpbudget_error').innerHTML = "please enter valid amount";
        } else if (inpbudgettitle.value == "") {
            inpbudgettitle.classList.add('err_inp');
            document.getElementById('inpbudgettitle_error').innerHTML = "please enter valid title";
        } else {
            budget.push({
                id: budget.length < 1 ? 1 : budget[budget.length - 1].id + 1,
                amount: parseFloat(inpbudget.value),
                title: inpbudgettitle.value
            });
            inpbudget.value = '';
            inpbudgettitle.value = '';
            console.log(budget);
            localStoragedata();
        }
    } else {
        inpbudget.classList.add('err_inp');
        document.getElementById('inpbudget_error').innerHTML = "please enter valid amount";
    }
    BudgetList();
}

function BudgetList() {
    let storedData = JSON.parse(localStorage.getItem('budgetData'))
    arr[0].income = storedData[0].income;
    budget = arr[0].income;
    tablebodybudget.innerHTML = '';
    for (let i = 0; i < budget.length; i++) {
        tablebodybudget.innerHTML += `<tr>
        <td>${budget[i].title}</td> 
        <td>${budget[i].amount}</td> 
        <td><span id="${budget[i].id}" onclick="removebudget(id)">&#10006;</span><i id="${budget[i].id}
        " onclick="updatebudget(id)">&#9998;</i></td>
        </tr>`
    }
    TotalBudget();
    TotalAvailableBudget();
}

function removebudget(id) {
    let index = budget.findIndex(p => p.id == id);
    if ((parseFloat(totalavailable.innerHTML) - budget[index].amount) < 0) {
        alert('plese delete expence first!!')
    } else {
        alert('are you sure?');
        budget.splice(index, 1)
    }
    localStoragedata();
    BudgetList();
    TotalAvailableBudget();
}

let buttonbudget = document.getElementById('buttonbudget')
function updatebudget(id) {
    console.log(id);
    let index = budget.findIndex(p => p.id == id);
    let updatedata = budget[index];
    document.getElementById('inpbudget').value = updatedata.amount;
    document.getElementById('inpbudgettitle').value = updatedata.title;

    if (id) {
        buttonbudget.innerHTML = `<button id="btnupdatebudget" onclick="updatebudgetdata(${id})" class="btn btn-success">update</button>`;
    }
}

function updatebudgetdata(id) {
    console.log(id);
    let index = budget.findIndex(p => p.id == id);
    let updatedata = budget[index];

    if (parseFloat(inpbudget.value) < parseFloat(totalexpence.innerHTML)) {
        inpbudget.classList.add('err_inp');
        document.getElementById('inpbudget_error').innerHTML = "please enter amount greater than totalexpence";
        buttonbudget.innerHTML = `<button id="btnupdatebudget" onclick="updatebudgetdata(${id})" class="btn btn-success">update</button>`;

    } else {
        updatedata.amount = parseFloat(inpbudget.value);
        updatedata.title = document.getElementById('inpbudgettitle').value;
        alert('update data successfully !!')
        buttonbudget.innerHTML = `<button id="btnbudget" onclick="addNewBudget()" class="btn btn-success">Add</button><br>`;
        inpbudget.value = '';
        inpbudgettitle.value = '';
    }
    localStoragedata();
    BudgetList();
    TotalBudget();
}

function TotalBudget() {
    let sum = budget.reduce((a, b) => a + b.amount, 0);
    totalBudget.innerHTML = `${sum}`;
}

let totalavailable = document.getElementById('totalavailable');
function TotalAvailableBudget() {
    let totalIncome = budget.reduce((a, b) => a + b.amount, 0);
    let totalExpenses = expence.reduce((a, b) => a + b.amount, 0);
    let availableBudget = totalIncome - totalExpenses;
    totalavailable.innerHTML = `${availableBudget}`;
}


let expence = arr[0].expence;
let inpexpence = document.getElementById('inpexpence');
let inpexpencetitle = document.getElementById('inpexpencetitle');
let btnexpence = document.getElementById('btnexpence');
let totalexpence = document.getElementById('totalexpence');
let tablebodyexpence = document.getElementById('tblexponce')
let btnupdateexpence = document.getElementById('btnupdateexpence')

btnupdateexpence.style.visibility = "hidden";


inpexpence.addEventListener('keyup', (p) => {
    if (inpexpence.value == "") {
        inpexpence.classList.add('err_inp');
        document.getElementById('inpexpence_error').innerHTML = "please enter valid amount";
    } else {
        inpexpence.classList.remove('err_inp');
        document.getElementById('inpexpence_error').innerHTML = "";
    }
})

inpexpencetitle.addEventListener('keyup', (p) => {
    if (inpexpencetitle.value == "") {
        inpexpencetitle.classList.add('err_inp');
        document.getElementById('inpexpencetitle_error').innerHTML = "please enter valid title";
    } else {
        inpexpencetitle.classList.remove('err_inp');
        document.getElementById('inpexpencetitle_error').innerHTML = "";
    }
})

// btnexpence.addEventListener('click', () => {
function addNewExpence() {
    if (inpexpence.value != "") {
        if (inpexpence.value <= 0) {
            inpexpence.classList.add('err_inp');
            document.getElementById('inpexpence_error').innerHTML = "please enter a valid amount";
        } else if (inpexpencetitle.value == "") {
            inpexpencetitle.classList.add('err_inp');
            document.getElementById('inpexpencetitle_error').innerHTML = "please enter a valid title";
        } else {
            let expenseAmount = parseFloat(inpexpence.value);
            let availableBudget = totalavailable.innerHTML;

            if (expenseAmount > availableBudget) {
                inpexpence.classList.add('err_inp');
                document.getElementById('inpexpence_error').innerHTML = "please enter amount less than totalavilable";
            } else {
                inpexpence.classList.remove('err_inp');
                document.getElementById('inpexpence_error').innerHTML = "";

                expence.push({
                    id: expence.length < 1 ? 1 : expence[expence.length - 1].id + 1,
                    amount: expenseAmount,
                    title: inpexpencetitle.value
                });
                inpexpence.value = '';
                inpexpencetitle.value = '';
                localStoragedata();
            }
        }
    } else {
        inpexpence.classList.add('err_inp');
        document.getElementById('inpexpence_error').innerHTML = "please enter a valid amount";
    }
    ExpenceList();
}


function ExpenceList() {
    let storedData = JSON.parse(localStorage.getItem('budgetData'))
    arr[0].expence = storedData[0].expence;
    expence = arr[0].expence;
    tablebodyexpence.innerHTML = '';
    for (let i = 0; i < expence.length; i++) {
        tablebodyexpence.innerHTML += `<tr>
        <td>${expence[i].title}</td> 
        <td>${expence[i].amount}</td> 
        <td><span id="${expence[i].id}" onclick="removeexpence(id)">&#10006;</span><i id="${expence[i].id}" onclick="updateexpence(id)">&#9998;</i></td>
        </tr>`
    }
    TotalExpence();
    TotalAvailableBudget();
}


function removeexpence(id) {
    alert('are you sure?')
    let index = expence.findIndex(p => p.id == id);
    expence.splice(index, 1);
    localStoragedata();
    ExpenceList();
    TotalAvailableBudget();
}

let buttonexpence = document.getElementById('buttonexpence')
function updateexpence(id) {
    console.log(id);
    let index = expence.findIndex(p => p.id == id);
    let updatedata = expence[index];

    document.getElementById('inpexpence').value = updatedata.amount;
    document.getElementById('inpexpencetitle').value = updatedata.title;

    if (id) {
        buttonexpence.innerHTML = `<button id="btnupdateexpence" onclick="updateexpencedata(${id})" class="btn btn-success">update</button>`;
    }
}

function updateexpencedata(id) {
    console.log(id);
    let index = expence.findIndex(p => p.id == id);
    let updatedata = expence[index];

    if (parseFloat(inpexpence.value) < parseFloat(totalBudget.innerHTML)) {
        updatedata.amount = parseFloat(inpexpence.value);
        updatedata.title = document.getElementById('inpexpencetitle').value;
        alert('update data successfully !!')
        buttonexpence.innerHTML = `<button id="btnexpence" onclick = "addNewExpence()" class="btn btn-danger">Add</button><br>`;
        inpexpence.value = '';
        inpexpencetitle.value = '';
    } else {
        inpexpence.classList.add('err_inp');
        document.getElementById('inpexpence_error').innerHTML = "please enter amount  less than totalbudget";
        buttonexpence.innerHTML = `<button id="btnupdateexpence" onclick="updateexpencedata(${id})" class="btn btn-success">update</button>`;
    }

    localStoragedata();
    ExpenceList();
    TotalExpence();
}


function TotalExpence() {
    let sum = expence.reduce((a, b) => a + b.amount, 0);
    totalexpence.innerHTML = `${sum}`;
}




// fetch('http://localhost:3000/Deteledata/6593a90e46b58e7975a82943',{
//     method: "",
//     // headers: { 'Content-Type': 'application/json' },
//     // body: JSON.stringify({
//     //     label : 'salary',
//     //     amount : '500000',
//     //     type : 'budget'
//     // })
// })
//     .then(p => p.json())
//     .then(json => console.log(json)) 