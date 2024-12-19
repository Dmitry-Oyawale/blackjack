//Deposit some money
//Bet money
//Deal cards
//Hit or stand
//Check if you bust
//Check if dealer wins
//Get winnings
//Play again

let balance = 0; 

startGame.addEventListener('click', () => {
    startGame.classList.add('hidden');
    Initial_Bet.classList.remove('hidden');
    Balance.classList.remove('hidden');
});

function updateBalance() {
    const input = document.getElementById("textInput");
    const value = parseFloat(input.value);
    if (isNaN(value) || value <= 0) {
        alert("Please enter a valid number.");
    }
    else {
        balance += value;
        document.getElementById("Balance").innerText = "Your balance: " + balance;
    }
    
}