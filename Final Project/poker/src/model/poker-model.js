import HandModel from './hand-model.js';
import Helpers from '../@shared/helpers';

export default class Poker{
    constructor(data){      
      this.isValid = isModelValid(data);
      if(this.isValid){
        this.Hand = new HandModel(data.hand);
      }
    }

   process() {
      this.Hand.getAllCombinations()
   };
   
 }

 function isModelValid(data){
  return !!(data.hand && (data.hand.length >= 5 && data.hand.length <= 7) && isCorrectCardFormat(data.hand));
 }

 function isCorrectCardFormat (data){
  return Helpers.checkCorrectCardFormat(data);
};