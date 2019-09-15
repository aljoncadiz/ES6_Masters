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

    let topScore = Math.max(...players.map(o => o.HandValue), 0);
    let result = players.map(x => ({ id: x.PlayerId, hand: x.Hand, handValue: x.HandValue }))
    const resultObj = {
        result: result,
        winners: result.filter(x => x.handValue == topScore)
    };
    return res.status(200).send(resultObj);
  },
}

export default PokerController;