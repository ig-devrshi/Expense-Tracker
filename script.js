const state = {
    earnings: 0,
    expense: 0,
    net: 0,

    transactions: [
        // {
        //      id: Math.floor(Math.random() * 1000),
        //     text: "Example",
        //     amount: 10,
        //     date : new Date(),
        //     type: "credit",
        // },
    ],
};

const transactionForm = document.getElementById("transactionForm");

const displayTransactions = () => {
    const transactioncontainer = document.getElementById("transactions");
    const netAmount = document.getElementById("netbalance");
    const earn = document.getElementById("earning");
    const exp = document.getElementById("expense");

    const transactions = state.transactions

    let earning = 0;
    let expense = 0;
    let net = 0;

    transactioncontainer.innerHTML = "";
    transactions.forEach((transaction) => {
        const { id, amount, text, type, date } = transaction;
        const isCredit = type === 'credit' ? true : false;
        const sign = isCredit ? '+' : '-';
        const transactionEl = `
        <div class="transaction" id${id}>
            <div class="content" onclick="showEdit(${id})">
                <div class="left">
                    <p>${text}</p>
                    <p>${new Date (date).toLocaleDateString()}</p>
                    <p>${sign} ₹${amount}</p>
                </div>
                <div class="status ${type}">${isCredit ? "C" : "D"}</div>
                <div class = "button" onclick="deleteTransaction(${id})">
                ✖
                </div>
            </div>
        </div>`;

        earning += isCredit ? amount : 0;
        expense += !isCredit ? amount : 0;
        net = earning - expense;
        transactioncontainer.insertAdjacentHTML("afterbegin", transactionEl);
    });

    console.log({net, earning, expense});
    netAmount.innerHTML = `₹${net}`;
    earn.innerHTML = `₹${earning}`;
    exp.innerHTML = `₹${expense}`;
};

const addTransaction = (e) => {
    e.preventDefault();

    const isEarn = e.submitter.id == "earnBtn" ? true : false;

    console.log(e.submitter.id);
    const formData = new FormData(transactionForm);

    const tData = {};
    formData.forEach((value, key) => {
        tData[key] = value;
    });

    const { text, amount, date } = tData;
    const transaction = {
        id: Math.floor(Math.random() * 1000),
        text: text,
        amount: +amount,
        date : date,
        type: isEarn ? "credit" : "debit",
    };

    state.transactions.push(transaction);

    displayTransactions();

    transactionForm.reset();
    
};

// const showEdit = (id) => {

//     console.log("id", id);
//     const selectedTransaction = document.getElementById(id);
//     const lowerEl = selectedTransaction.querySelector(".lower");
//     lowerEl.classList.toggle("showTransaction");
// };
// displayTransactions();

const deleteTransaction = (id)=>{
    const index = state.transactions.findIndex((t) => t.id === id);
    state.transactions.splice(index,1);
    displayTransactions();
};

transactionForm.addEventListener("submit", addTransaction);


{/* <div class="lower">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" onclick="deleteTransaction(${id})"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                
            </div> */}