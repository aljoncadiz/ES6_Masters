import Poker from '../model/poker-model.js';
import Player from '../model/player-model.js';

const PokerController = {
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns Poker hand array
   */
  getAllCombinations(req, res) {
    let pokerObj = new Poker(req.body)

    if(!pokerObj.isValid){
      return res.status(400).send("Invalid request");
    }  
    pokerObj.process();
    return res.status(200).send(pokerObj.Hand.Combinations);
  },

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns Poker hand array
   */
  getWinner(req, res) {   
    let players = [];    
    req.body.players.forEach(element => {
        players.push( new Player(element))
    });

    //pokerObj.process();
    //return res.status(200).send(pokerObj.Hand.Combinations);
  },
}

export default PokerController;