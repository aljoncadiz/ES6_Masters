var myString = "the quick brown qa jumps over the lazy dev.";

matchResult = ({str, rgx}) => {
	return str.match(rgx).length;
};

getRegexByType = ({type}) => {
	switch(type){
		case "word": return /\S+/g; break;
		case "vowel": return /[aeiou]/g; break;
		case "consonant": return /[b-df-hj-np-tv-z]/g; break;
	}
}

printResult = (str, type) => {
	myString = myString.toLowerCase();

	let strObject = { type: type, str: myString};	//Object Initializer
	let rgxObject = { type: type, rgx: getRegexByType(strObject)};
	
	let mergedObj = { ...strObject, ...rgxObject}; //Spead operator

	let typeCount = matchResult(mergedObj);

	return `${str[0]}${type}${str[1]} ${typeCount}`;
};

processMyString = (type) => {
	return printResult`Number of ${type}(s) found:`;
};

main = (...args) => { //rest operator
	debugger; 
	var test = null;
	for(let arg of args){ //For ..of
		console.log(
			processMyString(arg)
		)
	}
};

main("word", "vowel", "consonant"); //args for rest operator
