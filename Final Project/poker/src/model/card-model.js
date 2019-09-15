export default class Card {
    constructor(id, face, suit, value, rank ){
        this.Id = id;
        this.Face = face;
        this.Suit = suit;
        this.CardName = getCardName(face, suit);
        this.Value = value;
        this.Rank = rank;
    }
}

function getCardName(face, suit){
    return `${face} of ${suit}`;
}
