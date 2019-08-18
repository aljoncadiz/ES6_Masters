const Janken = new Set([
    "Rock",
    "Paper",
    "Scissors"
])

class JankenPlayer{
    constructor(name){
        this.Name = name;
    }

    selectHand() { 
        return new Promise(function(resolve, reject){
            this.Hand = Math.floor(Math.random() * (2 - 0 + 1) + 0);
            console.log(`${this.Name} ${[...Janken][this.Hand]}`);
            resolve(this);            
        }.bind(this));
    }
}; 


let Player1 =  new JankenPlayer("Player 1");
let Player2 = new JankenPlayer("Player 2");

compare = (p1, p2) => {
    let winner = "";
    if(p1.Hand == p2.Hand) {
        console.log(`It's a tie!`);
        return;
    } else if( p1.Hand == 2 || p2.Hand == 2){
        winner = p1.Hand !== 2 ?
        p1.Hand == 0 ?  p1.Name : p2.Name :
        p2.Hand == 0 ?  p2.Name : p1.Name
    } else {
        winner = p1.Hand > p2.Hand ? p1.Name : p2.Name 
    }

    console.log(`${winner} wins!!!`)
}

async function jankenStart(){
    const player1 = await Player1.selectHand(); 
    const player2 = await Player2.selectHand();  
    compare(player1, player2);
}

jankenStart();


