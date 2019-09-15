import Helpers from '../@shared/helpers';
import { generateKeyPair } from 'crypto';
import { CARD_DATA } from '../@shared/card-data';
import { COMBINATIONS } from '../@shared/constants';

export default class Hand {  

    constructor(cards){
        this.Cards = cards.map( a => CARD_DATA().find( b => b.Id == a));
        this.Combinations = [];
        this.BestCombination = null;
    }

    getAllCombinations() {
        COMBINATIONS.forEach( x => getCombinations(this.Cards, this.Combinations, x))
        this.BestCombination = this.Combinations.slice(-1).pop();
    }
}

function getCombinations(cards, collection, func){
    let result = Helpers[`get${func}`](cards);   
    if(result) collection.push(result)
}
