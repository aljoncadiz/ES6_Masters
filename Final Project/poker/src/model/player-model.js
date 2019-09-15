import Poker from './poker-model.js';
import { COMBINATIONS, COMBINATIONS_FLUSH, SUIT_DIAMONDS, SUIT_HEARTS, SUIT_SPADES, SUIT_CLUBS, COMBINATIONS_STRAIGHTFLUSH, COMBINATIONS_ROYALFLUSH } from '../@shared/constants.js';

const xtrSuitPoints = [
    COMBINATIONS_FLUSH,
    COMBINATIONS_STRAIGHTFLUSH,
    COMBINATIONS_ROYALFLUSH
]

export default class Player{
    constructor(data){      
      {
        this.PlayerId = data.id;
        this.Poker = new Poker(data);
        this.Hand = null;
        this.HandValue = 0;     
        this.getHandCombinations();
      }
    }

   getHandCombinations() {
      this.Poker.process()
      this.Hand = this.Poker.Hand.BestCombination;

      let handType = this.Hand.Type;
      this.HandValue = this.Hand.Value.reduce(function (r, a) {
            return r + a.Value + (xtrSuitPoints.some(x => x === handType) ? getSuitPoints(a.Suit): 0);
        }, 0);
      const multiplier = COMBINATIONS.indexOf(this.Hand.Type);
      this.HandValue = this.HandValue * (multiplier + 1);
   };
 }

 function getSuitPoints(suit){
    let suitPoints = 0; 
    switch(suit){
        case SUIT_DIAMONDS: suitPoints = 40; break;
        case SUIT_HEARTS: suitPoints = 30; break;
        case SUIT_SPADES: suitPoints = 20; break;
        case SUIT_CLUBS: suitPoints = 10; break;
    }
    return suitPoints;
 }

 function isModelValid(data){
  return !!(data.hand && data.hand.length == 5 && isCorrectCardFormat(data.hand));
 }

 function isCorrectCardFormat (data){
  return Helpers.checkCorrectCardFormat(data);
};