//Deposit some money
//Bet money
//Deal cards
//Hit or stand
//Check if you bust
//Check if dealer wins
//Get winnings
//Play again

let balance = 2000; 
let playerCards = [];
let dealerCards = [];
let deck = [
    ["Two", 2],
    ["Three", 3],
    ["Four", 4],
    ["Five", 5],
    ["Six", 6],
    ["Seven", 7],
    ["Eight", 8],
    ["Nine", 9],
    ["Ten", 10],
    ["Ace", 11]
];
let bet = 0;

/*
const SYMBOL_VALUES = {
    One: 1,
    B: 2,
    C: 3,
    D: 4
} */

startGame.addEventListener('click', () => {
    startGame.classList.add('hidden');
    Initial_Bet.classList.remove('hidden');
    Balance.classList.remove('hidden');
});

function updateBalance() {
    const input = document.getElementById("textInput");
    const value = parseFloat(input.value);
    if (isNaN(value) || value <= 0 || value > balance) {
        alert("Please enter a valid number.");
    }
    else {
        bet = value;
        //balance += value;
        //document.getElementById("Balance").innerText = "Your balance: " + balance;
        Game_Text.classList.remove('hidden');
        dealCardToPlayer(playerCards);
        dealCardToPlayer(playerCards);
        initialDealer();
        initialDealer();
        Initial_Bet.classList.add('hidden');
        Stand1.classList.remove('hidden');
        Hit1.classList.remove('hidden');
        //Game_Text.classList.remove('hidden');
    }
}

//function dealCards
//update playercount array
//remove from deck array
//get html to show card with div id corresponding to each symbol
function dealCardToPlayer(player_hand) {
    //document.getElementById("Balance").innerText = "Your balance: " + 9;
    //Initial_Bet.classList.add('hidden');
    //const symbols = Object.keys(SYMBOL_VALUES);
    //document.getElementById("Balance").innerText = "Your balance: " + symbols.length;
    if (deck.length === 0) {
        alert("The deck is empty. Cannot deal a card.");
        return; // Exit the function
    }

    const randomIndex = Math.floor(Math.random() * deck.length)
    
    const card = deck[randomIndex]
    player_hand.push(card);
    deck.splice(randomIndex, 1);
    const randomSymbol = card[0];
    //document.getElementById("Balance").innerText = "Your balance: " + randomSymbol;
   
    const symbolElement = document.getElementById(randomSymbol);

    if (!symbolElement) {
        console.error("Card symbol element not found:", randomSymbol);
        return;
    }

    const cardSlotIndex = player_hand.length; // Random card slot (1 to 5)
    //const slot = document.querySelector(`.card-slot[data-slot="${cardSlotIndex}"]`);
    let slot;
    if (player_hand === playerCards) {
         slot = document.getElementById(cardSlotIndex.toString());
    }
    else {
         slot = document.getElementById(cardSlotIndex.toString() + "a");
    }

    if (!slot) {
        console.error("Slot element not found for card:", player_hand.length);
        return;
    }
    slot.classList.remove('hidden');

    // Get the position of the target slot
    const rect = slot.getBoundingClientRect();
    
    console.log("Symbol Element position:");
    console.log("Symbol left: ", symbolElement.offsetLeft, "Symbol top: ", symbolElement.offsetTop);
    console.log("Slot position:");
    console.log("Slot left: ", rect.left, "Slot top: ", rect.top);  
    // Set custom properties for the animation
    symbolElement.classList.remove('hidden');
    symbolElement.style.setProperty('--target-x', `${rect.left - symbolElement.offsetLeft}px`);
    symbolElement.style.setProperty('--target-y', `${rect.top - symbolElement.offsetTop}px`);
    //symbolElement.classList.remove('hidden');
    symbolElement.classList.add("animate");

    //document.getElementById("Balance").innerText = "Your balance: " + randomIndex;
    
    checkWL(player_hand);
}

function initialDealer() {
    if (deck.length === 0) {
        alert("The deck is empty. Cannot deal a card.");
        return; // Exit the function
    }
    const randomIndex = Math.floor(Math.random() * deck.length)
    
    const card = deck[randomIndex]
    dealerCards.push(card);
    deck.splice(randomIndex, 1);
    const randomSymbol = card[0];
    //document.getElementById("Balance").innerText = "Your balance: " + randomSymbol;
   
    const symbolElement = document.getElementById(randomSymbol);

    let count = 0;

    for (const card of dealerCards) {
        count += card[1];
    }
    if (checkAce(dealerCards) === "true" && count > 21) {count -= 10;} 
    document.getElementById("Placeholder_CountD").innerText = "Count2 " + count;
    //checkWL(dealerCards);

    const cardSlotIndex = dealerCards.length; // Random card slot (1 to 5)
    //const slot = document.querySelector(`.card-slot[data-slot="${cardSlotIndex}"]`);
    let slot;
    slot = document.getElementById(cardSlotIndex.toString() + "a");
    if (!slot) {
        console.error("Slot element not found for card:", player_hand.length);
        return;
    }
    slot.classList.remove('hidden');

    const rect = slot.getBoundingClientRect();
    
    console.log("Symbol Element position:");
    console.log("Symbol left: ", symbolElement.offsetLeft, "Symbol top: ", symbolElement.offsetTop);
    console.log("Slot position:");
    console.log("Slot left: ", rect.left, "Slot top: ", rect.top);  
    // Set custom properties for the animation
    symbolElement.classList.remove('hidden');
    symbolElement.style.setProperty('--target-x', `${rect.left - symbolElement.offsetLeft}px`);
    symbolElement.style.setProperty('--target-y', `${rect.top - symbolElement.offsetTop}px`);
    //symbolElement.classList.remove('hidden');
    symbolElement.classList.add("animate");

    // Get the position of the target slot    
}

function Stand2(playerhand) {
    Stand1.classList.add('hidden');
    Hit1.classList.add('hidden');
    document.getElementById("Game_Text").innerText = "";
    checkWL(playerhand);
}

function GameContinue(Win_lose) {
    continueYes1.classList.remove('hidden');
    continueNo1.classList.remove('hidden');
    Hit1.classList.add('hidden');
    Stand1.classList.add('hidden');
    
    document.getElementById("Game_Text").innerText = Win_lose + ", continue playing?";
    playerCards = [];
    dealerCards = [];
    
    /* deck = [
        ["One", 1],
        ["Two", 2],
        ["Three", 3],
        ["Four", 4],
        ["Five", 5],
        ["Six", 6],
        ["Seven", 7],
        ["Eight", 8],
        ["Nine", 9],
        ["Ten", 10]
    ]; */
    bet = 0;
}

function GameContinue2() {
    const cardElements = document.querySelectorAll("#Cards > div");
    cardElements.forEach(card => {
        card.classList.add('hidden');
    });
    Initial_Bet.classList.remove('hidden');
    document.getElementById("Placeholder_Count").innerText = "Here ";
    document.getElementById("Placeholder_CountD").innerText = "Here ";
    document.getElementById("Game_Text").innerText = "";
    continueYes1.classList.add('hidden');
    continueNo1.classList.add('hidden');
}

function GameContinue3() {
    const cardElements = document.querySelectorAll("#Cards > div");
    cardElements.forEach(card => {
        card.classList.add('hidden');
    });
    document.getElementById("Game_Text").innerText = "Thank you for playing";
    continueYes1.classList.add('hidden');
    continueNo1.classList.add('hidden');
}

function checkAce(player_hand) {
    for (const card of player_hand) {
        if (card[0] === "Ace") {
            return "true";
        }  
    }
    return "false";
}

function checkWL(player_hand)
{
    let count = 0;

    for (const card of player_hand) {
        count += card[1];      
    }
    if (checkAce(player_hand) === "true" && count > 21) {count -= 10;} 
    //document.getElementById("Placeholder_Count").innerText = "Count " + count;
    if (count > 21) {
        if (player_hand === playerCards) {
            balance = parseFloat(balance - bet);
            document.getElementById("Balance").innerText = "Your balance: " + balance;
            document.getElementById("Placeholder_Count").innerText = "Count " + count;
            document.getElementById("Game_Text").innerText = "You lose";
            GameContinue("You lost1");
        }
        if (player_hand === dealerCards) {
            balance = parseFloat(bet+ balance);
            document.getElementById("Balance").innerText = "Your balance: " + balance;
            document.getElementById("Placeholder_CountD").innerText = "Count2 " + count;
            document.getElementById("Game_Text").innerText = "You win";
            GameContinue("You won1");
        }
    }
    else if (player_hand === dealerCards) {
        //document.getElementById("Placeholder_CountD").innerText = "Count2 " + count;

        if (count < 17) {
            //document.getElementById("Placeholder_CountD").innerText = "Count2 " + count;
            initialDealer();
            //document.getElementById("Placeholder_CountD").innerText = "Count2 " + count;
            let countA = 0;

            for (const card of player_hand) {
                countA += card[1];
            }
            if (checkAce(player_hand) === "true" && count > 21) {countA -= 10;} 

            let count2 = 0;

            for (const card of playerCards) {
                count2 += card[1];
            }
            if (checkAce(playerCards) === "true" && count > 21) {count2 -= 10;} 
            if (countA > 21 || count2 > countA) {
                balance = parseFloat(bet + balance);
                document.getElementById("Balance").innerText = "Your balance: " + balance;
                document.getElementById("Game_Text").innerText = "You win";
                GameContinue("You won2");
            }
            else if (count2 < countA) {
                balance = parseFloat(balance - bet);
                document.getElementById("Balance").innerText = "Your balance: " + balance;
                document.getElementById("Game_Text").innerText = "You lose";
                GameContinue("You lost2");
            }
            else {
                document.getElementById("Game_Text").innerText = "Push";
                GameContinue("Push");
            }
        }
        else {
            let count2 = 0;

            for (const card of playerCards) {
                count2 += card[1];
            }
            if (checkAce(playerCards) === "true" && count > 21) {count2 -= 10;} 
            if (count2 > count ) {
                balance = parseFloat(bet + balance);
                document.getElementById("Game_Text").innerText = "You win";
                document.getElementById("Balance").innerText = "Your balance: " + balance;
                GameContinue("You won3");
            }
            else if (count2 < count ) {
                balance = parseFloat(balance - bet);
                document.getElementById("Game_Text").innerText = "You lose";
                document.getElementById("Balance").innerText = "Your balance: " + balance;
                GameContinue("You lost3");
            }
            else {
                document.getElementById("Game_Text").innerText = "Push";
                GameContinue("Push");
            }
            document.getElementById("Placeholder_CountD").innerText = "Count2 " + count;

        }
    }
    else {
        document.getElementById("Placeholder_Count").innerText = "Count " + count;

    }


}

