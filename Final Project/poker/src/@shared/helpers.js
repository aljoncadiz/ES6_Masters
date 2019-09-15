import {
  SUIT_SPADES,
  SUIT_CLUBS,
  SUIT_HEARTS,
  SUIT_DIAMONDS,
  DESCENDING,
  ASCENDING,
  COMBINATIONS_HIGHCARD,
  COMBINATIONS_PAIR,
  COMBINATIONS_TWOPAIR,
  COMBINATIONS_THREEOFAKIND,
  COMBINATIONS_STRAIGHT,
  COMBINATIONS_FLUSH,
  COMBINATIONS_FULLHOUSE,
  COMBINATIONS_FOUROFAKIND,
  COMBINATIONS_STRAIGHTFLUSH,
  COMBINATIONS_ROYALFLUSH
} from './constants'
import HandType from '../model/hand-type-model';

const Helpers = {
    //TODO: check duplicate cards
    checkCorrectCardFormat(cards){
      let regx = /^(C|S|H|D)+([2-9]|10|J|Q|K|A)$/;
      return (cards.every( x => regx.test(x)) && checkIsNoDuplicates(cards))
    },

    getHighCard(data){
      const cards = sortByRank(data);
      return new HandType("High Card", cards[0], COMBINATIONS_HIGHCARD);
    },

    getPair(data){
      let pairs = checkFaceRepetitions(data, 2);      
      return (!!pairs && pairs.length > 0) ? new HandType("Pair", pairs, COMBINATIONS_PAIR): null;
    },

    getTwoPair(data){
      const pair = this.getPair(data);
      if(!!pair){
        let cards = getRemainingCards(pair.Value, data);
        const anotherPair = this.getPair(cards);
        if(!!anotherPair){
          const twoPair = [...pair.Value, ...anotherPair.Value];
          return  new HandType("Two Pair", twoPair, COMBINATIONS_TWOPAIR)
        } 
      }
      return null;
    },

    getThreeOfAKind(data){
      let pairs = checkFaceRepetitions(data, 3);      
      return (!!pairs && pairs.length > 0) ? new HandType("Three of a Kind", pairs, COMBINATIONS_THREEOFAKIND): null;
    },

    getStraight(data){
      let cards = sortByValueThenRank(data, ASCENDING);
      let straight = getStraightCards(cards);
      return (!!straight && straight.length > 0) ? new HandType("Straight", straight, COMBINATIONS_STRAIGHT): null;
    },

    getFlush(data){
      let flush = getFlushCards(data);
      return (!!flush && flush.length >= 5) ? new HandType("Flush", flush.slice(0,5), COMBINATIONS_FLUSH): null;
    },
    
    getFullHouse(data){
      const threeOfaKind = this.getThreeOfAKind(data);
      if(!!threeOfaKind){
        let cards = getRemainingCards(threeOfaKind.Value, data);
        const pair = this.getPair(cards);
        if(!!pair){
          const fullHouse = [...threeOfaKind.Value, ...pair.Value];
          return  new HandType("Full House", fullHouse, COMBINATIONS_FULLHOUSE)
        }
      }
      return null;
    },

    getFourOfAKind(data){
      let fourKind = checkFaceRepetitions(data, 4);
      if(!!fourKind && fourKind.length > 0){
        let cards = getRemainingCards(fourKind, data);
        const fourOfAKind = [...fourKind, cards[0]];
          return  new HandType("Four of a Kind", fourOfAKind, COMBINATIONS_FOUROFAKIND)
      }
      return null;
    },

    getStraightFlush(data){
      
      let flush = getFlushCards(data);
      if(!!flush && flush.length >= 5){
        let straightFlush = this.getStraight(flush);
        if(!!straightFlush){
          if(straightFlush.Value[0].Face != 'Ace'){
            return (!!straightFlush.Value && straightFlush.Value.length >= 5) ? new HandType("Straight Flush", straightFlush.Value, COMBINATIONS_STRAIGHTFLUSH): null;
          }
          return null;
        }
        return null;
      }
      return null;
    },

    getRoyalFlush(data){      
      let flush = getFlushCards(data);
      if(!!flush && flush.length >= 5){
        let straightFlush = this.getStraight(flush);
        if(!!straightFlush){
          if(straightFlush.Value[0].Face === 'Ace' && straightFlush.Value[1].Face == 'King'){
            return (!!straightFlush.Value && straightFlush.Value.length >= 5) ? new HandType("Royal Flush", straightFlush.Value, COMBINATIONS_ROYALFLUSH): null;
          }
          return null;
        }
        return null;
      }
      return null;
    }
}

function checkIsNoDuplicates(data){
  let duplicates = [];  
  data.reduce( (a,b) => {
    if(a.indexOf(b) < 0){
      a.push(b)
    }else{
      duplicates.push(b);
    }
    return a;
  }, [])
  let result = duplicates.length == 0;
  return result;
}

function getRemainingCards(hand, data){
  let remaining = new Set([...data].filter((x) => !hand.some(y => y.Face == x.Face && y.Suit == x.Suit)));
  return sortByRank(Array.from(remaining));
}

function getStraightCards(data){
  let distinctTop = data.reduce((a,b) => {
    if(a.some(x => x.Face === b.Face && x.Rank < b.Rank)){
      let index = a.findIndex(x => x.Face === b.Face);
      a[index] = b;
    }else{
      a.push(b)
    }
    return a;
  }, []);

  let numbers = distinctTop.map(x => x.Value);

  let group = numbers.reduce((arr, val, i, a) => {
    if (!i || val !== a[i - 1] + 1) arr.push([]);
    arr[arr.length - 1].push(val);
    return arr;
  }, []);

  let largestGroup = group.reduce((p, c, i, a) => a[p].length > c.length ? p : i, 0);

  if(largestGroup >= 0){
    let cardGroup = group[largestGroup].reduce((a, b) => {
      a.push(distinctTop.find(y => y.Value == b))
      return a;
    }, []);
    
    if(cardGroup.length === 4){
      const ace =  distinctTop.find(x => x.Value == 12);
      if(cardGroup[0].Value === 0 && ace){
        cardGroup.push(ace);
        return sortByValueThenRank(cardGroup, ASCENDING);
      }else{
        return null;
      }
    }else if(cardGroup.length > 4){
      return cardGroup.length === 5 ? 
        sortByValueThenRank(cardGroup, DESCENDING) : 
        sortByValueThenRank(cardGroup, DESCENDING).slice(0, 5);
    }else{
      return null;
    }
  }
}



function getFlushCards(data){
  const suits = [
    SUIT_CLUBS,
    SUIT_SPADES,
    SUIT_HEARTS,
    SUIT_DIAMONDS
  ]
  let flush = [];
  suits.filter(suit => {
    let cards = data.filter(x => x.Suit === suit);
    if(cards.length >= 5){ 
      flush = sortByRank(cards);
    }
    return cards.length >= 5;
  });
  
  return flush;
}

function checkFaceRepetitions(data, multip){
    const cards = sortByRank(data);

    let multipleReps = cards.reduce( (a,b) => {
      if(a.indexOf(b.Face) < 0){
        a.push(b.Face)
      }
      return a;
    }, []).filter( a => cards.filter( b => b.Face == a).length >= multip)

    let pairs = cards.filter(x => multipleReps.some( y => x.Face == y));

    return pairs.slice(0, multip);
}

//sort desc
function sortByRank(cards){
  return cards.sort( (a,b) => b.Rank - a.Rank)
}

function sortByValueThenRank(cards, type){
  return type === ASCENDING ?
   cards.sort( (a, b) => a.Value - b.Value || a.Rank - b.Rank) :
   cards.sort( (a, b) => b.Value - a.Value || b.Rank - a.Rank) 
}
  
export default Helpers;