class Pokemon {
  constructor(id, name, type){
    this.ID = id;
    this.Name = name;
    this.Type = type;    
  }

  printAttack(str, pokemonName, attckName){
    return `${pokemonName} ${str[1]} ${attckName} ${str[2]}`
  }

  Attack(attackname){
    return this.printAttack`${this.Name} used ${attackname} and its super effective!`
  }
}

let pokemons = [
  new Pokemon(1,'Bulbasaur', ['Grass']),
  new Pokemon(2,'Ivaysaur',['Grass']),
  new Pokemon(4,'Charmander',['Fire']),
  new Pokemon(7,'Squirtle',['Water', 'Grass']),
];

findWhere = (arr, obj = {}) => {
  const keys = Object.keys(obj);
  let itemsFound = arr.reduce((a, item) => {
    if(keys.every( objKey => 
          Object.entries(item).some(([itemKey, value]) => 
             objKey === itemKey && (Array.isArray(value) ? value.some(val => obj[objKey] == val) : obj[objKey] === value)            
          )
        )      
    ){
      a.push(item);
    }
  return a;
  }, [])
  
  itemsFound.forEach(x => console.log(x));
}

findWhere(pokemons, {Type: 'Grass'}); //findWhere(pokemons) will return all of the items on the array.
console.log(pokemons[0].Attack('PabloSmash!'));