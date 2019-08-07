var pokemons = [
	{id: 1, name: 'Bulbasaur', type: 'Grass'},
	{id: 2, name: 'Ivaysaur', type: 'Grass'},
	{id: 4, name: 'Charmander', type: 'Fire'},
	{id: 7, name: 'Squirtle',  type: 'Water'}, //trailing commas xD	
];

findWhere = (arr, obj = {}) => {
    const keys = Object.keys(obj);
    let itemsFound = arr.reduce((a, b) => {      
      if( 
          keys.every( y => 
			Object.entries(b).some(([key, value]) =>
				y === key && obj[y] === value ))
      ){
        a.push(b);
      }
	  return a;
    }, [])
    
	itemsFound.forEach(x => console.log(x));
  }

findWhere(pokemons, {type: 'Grass', name: 'Ivaysaur'}) //findWhere(pokemons) will return all of the items on the array.