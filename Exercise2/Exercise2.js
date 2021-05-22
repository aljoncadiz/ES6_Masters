var input = [ 
	{name: "Jowey", score: 7}, 
	{name: "Aljon", score: 5},
	{name: "Julio", score: 9},
	{name: "Pabo", score: 7}
	];
	
var topScore = 10;
	
compare = (a, b) => {
  return (a.score < b.score ? -1 : 1) * -1;
};

rankElements = (arr) => {
	return arr.reduce( (a, b) => {
		if(a.some(el => el.score == b.score)){ //check if there is a tie			
			let index = a.findIndex( e => e.score == b.score); //get tie index
			a[index].name = `${a[index].name}, ${b.name}`; //set tie names
		}else{
			a.push(b);
		}
		return a;
	},[])//.map( e => console.log(e));
};

printResult = (rank, name, score) => {
	var test = null;
	console.log(`(${rank}) ${name} scored ${score} out of ${topScore}`);
};

main = () => {
	debugger;
	input.sort(compare);
	var [top1 ,top2 ,top3] = rankElements(input);
	!!top1 ? printResult("1st", top1.name, top1.score): null;
	!!top2 ? printResult("2nd", top2.name, top2.score): null;
	!!top3 ? printResult("3rd", top3.name, top3.score): null;
};

main();