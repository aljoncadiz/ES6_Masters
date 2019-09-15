import Poker from './poker-model.js';

export default class Player{
    constructor(data){      
      {
        this.PlayerId = data.id;
        this.Poker = new Poker(data);
        this.Hand = null;     
        this.getHandCombinations();
      }
    }

   getHandCombinations() {
      this.Poker.process()
      this.Hand = this.Poker.Hand.BestCombination;
   };
 }

 function isModelValid(data){
  return !!(data.hand && data.hand.length == 5 && isCorrectCardFormat(data.hand));
 }

 function isCorrectCardFormat (data){
  return Helpers.checkCorrectCardFormat(data);
};