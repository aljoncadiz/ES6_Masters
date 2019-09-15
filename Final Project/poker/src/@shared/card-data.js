import Card from "../model/card-model";
import { SUIT_CLUBS, SUIT_SPADES, SUIT_HEARTS, SUIT_DIAMONDS } from "./constants";

export const CARD_DATA = function(){
    const cardValues = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    const numberValues = [0,1,2,3,4,5,6,7,8,9,10,11,12];
    const cardNameValues = ['Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King','Ace'];
    const cardTypes = ['C','S','H','D']
    const cardTypeNames = [SUIT_CLUBS, SUIT_SPADES, SUIT_HEARTS, SUIT_DIAMONDS]

    let deck = [];
    let rank = 0;
    cardValues.map( (cardValue, valueIndex) => {
        cardTypes.map( (cardType, typeIndex) => {
            let currentCard = `${cardType}${cardValue}`;            
            rank++;
            deck.push(new Card(currentCard, cardNameValues[valueIndex], cardTypeNames[typeIndex], numberValues[valueIndex],  rank))
        })
    });

    return deck;
}