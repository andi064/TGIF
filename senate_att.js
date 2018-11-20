let statistics = { // the creation of an object
	numbers: {
		"RepublicansNumber": 0,
		"DemocratsNumber": 0,
		"IndependentsNumber": 0,
		"PercentageVotedDemoParty": 0,
		"PercentageVotedRepuParty": 0,
		"PercentageVotedIndepParty": 0,
		"TotalPercentage": 0,

	},
	"MostEngagedVotes": 0, // this element contain arrays
	"LeastEngagedVotes": 0, // this element contain arrays
}

let democratNumber = []; // Global varriables so they can be used by all the functions
let republicanNumber = [];
let independentNumber = [];
let members = data.results[0].members;

function numberParty() {
	for (let i = 0; i < members.length; i++) {
		if (members[i].party === "D") { // if the members contain the specific letter push them into different arrays
			democratNumber.push(members[i]);
		}
		if (members[i].party === "R") {
			republicanNumber.push(members[i]);
		}
		if (members[i].party === "I") {
			independentNumber.push(members[i]);
		}
	}
	console.log(democratNumber.length, republicanNumber.length, independentNumber.length);
}
numberParty();

statistics.numbers.DemocratsNumber = democratNumber.length; // giving value to the object elements
statistics.numbers.RepublicansNumber = republicanNumber.length;
statistics.numbers.IndependentsNumber = independentNumber.length;

//------------------------------------------------------------------------------//


let democratVotes = [];
let repubVotes = [];
let indepVotes = [];


function average() {
	for (let i = 0; i < members.length; i++) {
		if (members[i].party === "D") {
			democratVotes.push(members[i].votes_with_party_pct)
		}
		if (members[i].party === "R") {
			repubVotes.push(members[i].votes_with_party_pct)
		}
		if (members[i].party === "I") {
			indepVotes.push(members[i].votes_with_party_pct)
		}
	}
	//	console.log(democratVotes, indepVotes, repubVotes);
}

average();

let sumD = democratVotes.reduce((previous, current) => current += previous); // a variable defined by a function with 2 parameters which returnes the added value of both parametters, reduce() - reduces the array in to a single value and follows with the operration given by the fn
let avgD = sumD / democratNumber.length;
let sumR = repubVotes.reduce((previous, current) => current += previous);
let avgR = sumR / republicanNumber.length;
let sumI = indepVotes.reduce((previous, current) => current += previous);
let avgI = sumI / independentNumber.length;



statistics.numbers.TotalPercentage = ((avgD+avgI+avgR)/3).toFixed(3) +"%";
statistics.numbers.PercentageVotedDemoParty = avgD.toFixed(3) + "%";
statistics.numbers.PercentageVotedRepuParty = avgR.toFixed(3) + "%";
statistics.numbers.PercentageVotedIndepParty = avgI.toFixed(3) + "%";

//----------------------------------------------------------------------------//
let mostPartic = [];

function participV() {
	members.sort(function (v1, v2) {
		return v1.missed_votes_pct - v2.missed_votes_pct;
	});

	for (let i = 0; i <= (105 * 0.1); i++) {
		mostPartic.push(members[i]);
	}
}
participV()

console.table(mostPartic);

statistics.MostEngagedVotes = mostPartic;

//----------------------------------------------------------------------------//

let missedV = [];

function missV() { // a function to compare every candidate by sorting and using a loop comparing everyone to find the lowest 10%

	members.sort(function (v1, v2) {
		return v1.missed_votes_pct - v2.missed_votes_pct;
	});
	let leastEng = members.reverse();
	for (let i = 0; i <= (105 * 0.1); i++) {
		missedV.push(leastEng[i]);
	}
}
missV()

console.log(missedV);

statistics.LeastEngagedVotes = missedV;

//-----------------------------------------------------------------------------//

//----------------------------------------------------------------------------//
let loyalMembers = [];

function loyalParty() {
	members.sort(function (v1, v2) {
		return v1.votes_with_party_pct - v2.votes_with_party_pct;
	});

	for (let i = 0; i <= (105 * 0.1); i++) {
		loyalMembers.push(members[i]);
	}
}
loyalParty()

console.table(mostPartic);

statistics.MostEngagedVotes = mostPartic;

//----------------------------------------------------------------------------//

let unLoyalmember = [];

function unLoyal() {

	members.sort(function (v1, v2) {
		return v1.votes_with_party_pct - v2.votes_with_party_pct;
	});
	let leastEng = members.reverse();
	for (let i = 0; i <= (105 * 0.1); i++) {
		unLoyalmember.push(leastEng[i]);
	}
}
unLoyal()

console.log(unLoyalmember);

statistics.LeastEngagedVotes = missedV;

//-----------------------------------------------------------------------------//

// Table with number of representatives and % voted

function representatives() {
	let tbody = document.getElementById("tbody_numbers");
	let tr = document.createElement("tr");
	let tr1 = document.createElement("tr");
	let tr2 = document.createElement("tr");
	let tr3 = document.createElement("tr");
	let td = document.createElement("td");
	let td1 = document.createElement("td");
	let td2 = document.createElement("td");
	let td3 = document.createElement("td");
	let td4 = document.createElement("td");
	let td5 = document.createElement("td");
	let td6 = document.createElement("td");
	let td7 = document.createElement("td");
	let td8 = document.createElement("td");
	let td9 = document.createElement("td");
	let td10 = document.createElement("td");
	let td11 = document.createElement("td");
	td.append("Democrats");
	td1.append(statistics.numbers.DemocratsNumber);
	td2.append(statistics.numbers.PercentageVotedDemoParty);
	td3.append("Republicans");
	td4.append(statistics.numbers.RepublicansNumber);
	td5.append(statistics.numbers.PercentageVotedRepuParty);
	td6.append("Independents");
	td7.append(statistics.numbers.IndependentsNumber);
	td8.append(statistics.numbers.PercentageVotedIndepParty);
	td9.append("Totals");
	td10.append(members.length);
	td11.append(statistics.numbers.TotalPercentage);
	tr.append(td, td1, td2);
	tr1.append(td3, td4, td5);
	tr2.append(td6, td7, td8);
	tr3.append(td9, td10, td11);
	tbody.append(tr, tr1, tr2, tr3);

}
representatives();

function leastEngaged() {

	const myTable = document.getElementById("tbody_leastEngaged");

	const members = statistics.LeastEngagedVotes;


	for (let i = 0; i < members.length; i++) {

		const row = document.createElement("tr");
		row.insertCell().innerHTML = members[i].first_name;
		row.insertCell().innerHTML = members[i].missed_votes;
		row.insertCell().innerHTML = members[i].missed_votes_pct;
		myTable.append(row);
	}
}
leastEngaged();

console.log(statistics);
function mostEngaged() {

	const myTable = document.getElementById("tbody_mostEngaged");

	const members = statistics.MostEngagedVotes;


	for (let i = 0; i < members.length; i++) {

		const row = document.createElement("tr");
		row.insertCell().innerHTML = members[i].first_name;
		row.insertCell().innerHTML = members[i].missed_votes;
		row.insertCell().innerHTML = members[i].missed_votes_pct;
		myTable.append(row);
	}
}
mostEngaged();
