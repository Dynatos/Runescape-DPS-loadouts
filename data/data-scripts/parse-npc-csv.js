const fs = require('fs');
const { data } = require('./NPC-stats.csv.js');

const monsterDataStrings = data.split(/\n/gm);

// column names from CSV doc
const statOrder = [
	"name",
	"locations",
	"expMultiplier",
	
	"combat",
	"hitpoints",
	"attack",
	"defence",
	"strength",
	"magic",
	"ranged",
	
	"attackStyle",
	
	"attackSpeed",
	"stab",
	"slash",
	"crush",
	"magic",
	"ranged",
	"attackBonus",
	"meleeStrength",
	"rangedStrength",
	
	"stabDefence",
	"slashDefence",
	"crushDefence",
	"magicDefence",
	"rangedDefence",
	
	"intervals",
	"types",
];

function parseMultipleElementCells(unformatted) {
	const splitData = unformatted.split(',');
	const output = [];
	let stringData;
	let onStringData = false;
	
	for (let i = 0; i < splitData.length; i++) {
		if (i < 1) { // this was for debugging but also doesn't break the logic and can be nice for console output. Leaving for now
			console.log('pushing name', splitData[i]);
			output.push(splitData[i]);
			continue;
		}
		// if a monster appears in multiple areas then it will have a multi-element cell which contains additional commas
		// in order to handle this logic there is some nasty stuff here!
		// check if an element starts with a string quotation, as that denotes the start of the list
		if (!onStringData && splitData[i].startsWith('"')) {
			stringData = ""; // overwrites any old data
			onStringData = true; // sets a flag that will capture any elements that aren't the first and last (they won't contain any quotation marks)
		}
		if (onStringData) { // push string data is the flag is set, this is the logic that pushes each string (including first and last)
			if (stringData.length) {
				stringData += ','; // add comma is we're about to push another element, for parsing into an array of locations
			}
			stringData += splitData[i]; // add string data 
		}
		if (onStringData && splitData[i].endsWith('"')) { // when we find the last element from the cell it will have a closing quotation mark
			onStringData = false; // uncheck our flag
			// nasty one-liner that separates our final string into multiple strings and filters the quotations out of the first/last string
			output.push(stringData.split(', ').map(e => e.split('').filter(e => e !== '"').join(''))); 
			continue;
		}
		if (!onStringData) {
			output.push(splitData[i]); // pushes any non multi-cell data 
		}
	}
	return output;
}

const outputLookup = {};

monsterDataStrings.forEach((monsterData, monsterIndex) => {
	
	const splitMonsterData = parseMultipleElementCells(monsterData) // that function combines the multi cell location column into a single array if needed
	const formattedMonsterData = {};
	
	if (monsterIndex === 0) {
		console.log("splitMonsterData", splitMonsterData);
	}
	
	splitMonsterData.forEach((monsterStat, statIndex) => {
		
		const currentStatName = statOrder[statIndex];
		formattedMonsterData[currentStatName] = monsterStat;
		
	});
	
	outputLookup[formattedMonsterData.name] = formattedMonsterData;
	
});

fs.writeFileSync('monsterData.json', JSON.stringify(outputLookup));
