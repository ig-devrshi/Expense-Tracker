const state = {
    earnings: 0,
    expense: 0,
    net: 0,

    transactions: [
        // {
        //      id: Math.floor(Math.random() * 1000),
        //     text: "Example",
        //     amount: 10,
        //     category: "food",
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
        const { id, amount, text, type, date, category } = transaction;
        const isCredit = type === 'credit' ? true : false;
        const sign = isCredit ? '+' : '-';
        const transactionEl = `
        <div class="transaction" id${id}>
            <div class="content">
                <div class="left">
                    <h3>${text}</h3>
                    <p>${category}</p>
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

    const { text, amount, date, category } = tData;
    const transaction = {
        id: Math.floor(Math.random() * 1000),
        text: text,
        amount: +amount,
        date : date,
        category : category,
        type: isEarn ? "credit" : "debit",
    };

    state.transactions.push(transaction);

    displayTransactions();

    transactionForm.reset();
    
};

const deleteTransaction = (id)=>{
    const index = state.transactions.findIndex((t) => t.id === id);
    state.transactions.splice(index,1);
    displayTransactions();
};

transactionForm.addEventListener("submit", addTransaction);