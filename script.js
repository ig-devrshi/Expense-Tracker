const state = {
    earnings: 0,
    expense: 0,
    net: 0,

    transactions: [
        // {
        //     id: Math.floor(Math.random() * 1000),
        //     text: "Example",
        //     amount: 10,
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
        const { id, amount, text, type } = transaction;
        const isCredit = type === 'credit' ? true : false;
        const sign = isCredit ? '+' : '-';

        const transactionEl = `
        <div class="transaction" id${id}>
            <div class="left">
                <p>${text}</p>
                <p>${sign} ₹${amount}</p>
            </div>
            <div class="status ${type}">${isCredit ? "C" : "D"}</div>
        </div>`

        earning += isCredit ? amount : 0;
        expense += !isCredit ? amount : 0;
        net = earning - expense;
        transactioncontainer.insertAdjacentHTML("afterbegin", transactionEl);
    });

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

    const { text, amount } = tData;
    const transaction = {
        id: Math.floor(Math.random() * 1000),
        text: text,
        amount: +amount,
        type: isEarn ? "credit" : "debit",
    };

    state.transactions.push(transaction);

    displayTransactions();
};

transactionForm.addEventListener("submit", addTransaction);
