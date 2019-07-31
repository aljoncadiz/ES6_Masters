var myString = "the quick brown qa jumps over the lazy dev.";

matchResult = (str, regexStr) => {
	return str.match(regexStr).length;
};

printResult = (str, type) => {
	myString = myString.toLowerCase();
	
	let typeCount = 0;
	switch(type){
		case "word": typeCount = matchResult(myString, /\S+/g); break;
		case "vowel": typeCount = matchResult(myString, /[aeiou]/g); break;
		case "consonant": typeCount = matchResult(myString, /[b-df-hj-np-tv-z]/g); break;
	}
	
	return `${str[0]}${type}${str[1]} ${typeCount}`;
};

processMyString = (type) => {
	return printResult`Number of ${type}(s) found:`;
};

main = () => {
	return console.log(`
		${processMyString("word")}
		${processMyString("vowel")}
		${processMyString("consonant")}
	`);
};

main();
