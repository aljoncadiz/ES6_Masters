import PokerDemo from '../model/poker-demo-model.js';

const PokerDemoController = {
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns Poker hand array
   */
  getAllCombinations(req, res) {
    let pokerObj = new PokerDemo(req.body)

    if(!pokerObj.isValid){
      return res.status(400).send("Invalid request");
    }  
    pokerObj.process();
    return res.status(200).send(pokerObj.Hand.Combinations.map(x => x.Hand));
  },
}

export default PokerDemoController;