// ---------------- Main elements to be defined and called for use by the functions --------------------------------------------//

selector()

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

//-----------------------------------------------------Fetch statement for each house ---------------------------------------------------------//
function selector() {
	if (window.location.pathname == ("/senate.html")) {

		fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
			method: "GET",
			headers: {
				"X-API-Key": "OOjcbPUBAjPmyTaJuKWhFqXIWhvXp72cFsY0rJ5O"
			}
		}).then(function (result) {
			return result.json()
		}).then(function (data) {
			let senateData = data.results[0].members;
			console.log("Congress113 Senate Succses!!!!!!!!!");
			states(senateData);
			createTable(senateData);
			checkiCheck(senateData);
		})
	}
	if (window.location.pathname == ("/senate_party_loyalty.html")) {
		fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
			method: "GET",
			headers: {
				"X-API-Key": "OOjcbPUBAjPmyTaJuKWhFqXIWhvXp72cFsY0rJ5O"
			}
		}).then(function (result) {
			return result.json()
		}).then(function (data) {
			let senateData = data.results[0].members;
			console.log("Senate loyalty Succses!!!!!!!!!");
			//			numberParty(senateData)
			calculateAll(senateData)
			representatives(senateData)
			loyalty("tbody_mostEngaged", "most")
			loyalty("tbody_leastEngaged", "least")
		})
	}
	if (window.location.pathname == ("/senate_attendance.html")) {
		fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
			method: "GET",
			headers: {
				"X-API-Key": "OOjcbPUBAjPmyTaJuKWhFqXIWhvXp72cFsY0rJ5O"
			}
		}).then(function (result) {
			return result.json()
		}).then(function (data) {
			let senateData = data.results[0].members;
			console.log("Senate attendance Succses!!!!!!!!!");
			calculateAll(senateData)
			representatives(senateData)
			leastEngaged("tbody_mostEngaged", "most")
			leastEngaged("tbody_leastEngaged", "least")
		})
	}
	if (window.location.pathname == ("/house.html")) {
		fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
			method: "GET",
			headers: {
				"X-API-Key": "OOjcbPUBAjPmyTaJuKWhFqXIWhvXp72cFsY0rJ5O"
			}
		}).then(function (result) {
			return result.json()
		}).then(function (data) {
			let houseData = data.results[0].members;
			console.log("Congress 113_House Succses!!!!!!!!!");
			states(houseData);
			createTable(houseData);
			checkiCheck(houseData);

		})
	}
	if (window.location.pathname == ("/house_attendance.html")) {
		fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
			method: "GET",
			headers: {
				"X-API-Key": "OOjcbPUBAjPmyTaJuKWhFqXIWhvXp72cFsY0rJ5O"
			}
		}).then(function (result) {
			return result.json()
		}).then(function (data) {
			let houseData = data.results[0].members;
			console.log("House attendance Succses!!!!!!!!!");
			calculateAll(houseData);
			representatives(houseData)
			leastEngaged("tbody_mostEngaged", "most")
			leastEngaged("tbody_leastEngaged", "least")
		})
	}
	if (window.location.pathname == ("/house_party_loyalty.html")) {
		fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
			method: "GET",
			headers: {
				"X-API-Key": "OOjcbPUBAjPmyTaJuKWhFqXIWhvXp72cFsY0rJ5O"
			}
		}).then(function (result) {
			return result.json()
		}).then(function (data) {
			let houseData = data.results[0].members;
			console.log("House loyalty Succses!!!!!!!!!");
			calculateAll(houseData);
			representatives(houseData)
			loyalty("tbody_mostEngaged", "most")
			loyalty("tbody_leastEngaged", "least")
		})
	}
}

//------------------------------------------------------- Event Listeners --------------------------------------------------------//



function checkiCheck(array) {
	document.getElementById("selectOpt").addEventListener("change", function () {
		filterAll(array);
	});

	document.getElementById("democrat").addEventListener("click", function () {
		filterAll(array);
	});
	document.getElementById("repu").addEventListener("click", function () {
		filterAll(array);
	});
	document.getElementById("indepe").addEventListener("click", function () {
		filterAll(array);
	});
}

//---------------------------------------------------- Elemination of repeated states --------------------------------------------------------------//

function states(array) {
	let statesArray = [];
	for (var a = 0; a < array.length; a++) {
		let state = array[a].state;
		statesArray.sort().push(state);
		var repeatedValues = [];
		for (var i = 0; i < statesArray.length; i++) {
			for (var j = i + 1; j < statesArray.length; j++) {
				if (statesArray[i] == statesArray[j]) {
					if (!repeatedValues.includes(statesArray[i])) {
						repeatedValues.push(statesArray[i]);
					}
				}
			}
		}
	}
	for (var ll = 0; ll < repeatedValues.length; ll++) {
		let option = document.createElement("option");
		option.append(repeatedValues[ll]);
		let select = document.getElementById("selectOpt");
		selectOpt.append(option);
	}
}

//-------------------------------------------- State append to dropdown list ------------------------------------------------------//

function filterAll(array) {

	var members = array;

	let checkValue = [...document.querySelectorAll("input[name=partyName]:checked")];
	let parties = checkValue.map(checked => checked.value);
	let idVal = document.getElementById("selectOpt");
	let statesF = idVal.value;
	let filteredMembers = [];

	for (var i = 0; i < array.length; i++) {
		if ((statesF == "All") && (parties.length == 0)) {
			filteredMembers.push(array[i]);
		} else if ((array[i].state == statesF) && (parties.length == 0)) {
			filteredMembers.push(array[i]);
		} else if ((statesF == "All") && (parties.length > 0)) {
			for (var i = 0; i < array.length; i++) {
				for (var a = 0; a < parties.length; a++) {
					if (array[i].party === parties[a]) {
						filteredMembers.push(array[i]);
					}
				}
			}
		} else if ((statesF == array[i].state) && (parties.length > 0)) {
			for (var i = 0; i < array.length; i++) {
				for (var a = 0; a < parties.length; a++) {
					if ((array[i].party == parties[a]) && (array[i].state == statesF)) {
						filteredMembers.push(array[i]);
					}
				}
			}
		}
	}
	createTable(filteredMembers);
}

function createTable(filteredArray) {

	const myTable = document.getElementById("tbody");

	const members = filteredArray;

	myTable.innerHTML = ""; // removes the previous information

	for (let i = 0; i < members.length; i++) {
		let linkName = members[i].url;
		let anchor = document.createElement("a");
		anchor.setAttribute("href", linkName);
		anchor.setAttribute("target", "_blank");
		let fullName = members[i].first_name + " " + (members[i].middle_name || " ") + " " + members[i].last_name;
		anchor.textContent = fullName;
		const row = document.createElement("tr");
		row.insertCell().append(anchor);
		row.insertCell().innerHTML = members[i].party;
		row.insertCell().innerHTML = members[i].state;
		row.insertCell().innerHTML = members[i].seniority;
		row.insertCell().innerHTML = members[i].votes_with_party_pct + "%";
		myTable.append(row);

	}

	console.log("ahgsda")

	if (myTable.rows.length == 0) {
		const row = document.createElement("tr");
		row.append("No members with the selected criteria!!! - thanks to Raul ");
		myTable.append(row);
		alert("no members sorry :( btw - thank you Raul");

	}
}

//------------------------------------------ Calculations for senate/house, att/loyalty -----------------------------------------------------//
function calculateAll(array) {

	let members = array;

	let democratNumber = [];
	let republicanNumber = [];
	let independentNumber = [];

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

	}

	average();

	function noIndep() {
		let sumD = democratVotes.reduce((previous, current) => current += previous);
		let avgD = sumD / democratNumber.length;
		let sumR = repubVotes.reduce((previous, current) => current += previous);
		let avgR = sumR / republicanNumber.length;
		statistics.numbers.TotalPercentage = ((avgD + avgR) / 2).toFixed(1) + "%";
		let sumI = 0;
		let avgI = 0;

		if (window.location.pathname == ("/senate_party_loyalty.html" || "/senate_attendance.html")) {

			sumI = indepVotes.reduce((previous, current) => current += previous);
			avgI = sumI / independentNumber.length;
			statistics.numbers.TotalPercentage = ((avgD + avgI + avgR) / 3).toFixed(1) + "%";
		}
		statistics.numbers.PercentageVotedDemoParty = avgD.toFixed(1) + "%";
		statistics.numbers.PercentageVotedRepuParty = avgR.toFixed(1) + "%";
		statistics.numbers.PercentageVotedIndepParty = avgI.toFixed(1) + "%";
	}
	noIndep()

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

	statistics.MostEngagedVotes = mostPartic;

	let missedV = [];

	function missV() {

		members.sort(function (v1, v2) {
			return v1.missed_votes_pct - v2.missed_votes_pct;
		});
		let leastEng = members.reverse();
		for (let i = 0; i <= (105 * 0.1); i++) {
			missedV.push(leastEng[i]);
		}
	}
	missV()

	statistics.LeastEngagedVotes = missedV;

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

	statistics.MostEngagedVotes = mostPartic;

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
}

console.log(statistics);

function representatives(members) {
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

function leastEngaged(id, table) {

	const myTable = document.getElementById(id);
	let members;

	if (table = "most") {
		members = statistics.MostEngagedVotes;

	} else {
		members = statistics.LeastEngagedVotes;
	}
	for (let i = 0; i < members.length; i++) {

		const row = document.createElement("tr");
		row.insertCell().innerHTML = members[i].first_name;
		row.insertCell().innerHTML = members[i].missed_votes;
		row.insertCell().innerHTML = members[i].missed_votes_pct + "%";
		myTable.append(row);
	}

}

function loyalty(id, table) {

	const myTable = document.getElementById(id);
	let members;

	if (table = "most") {
		members = statistics.MostEngagedVotes;

	} else {
		members = statistics.LeastEngagedVotes;
	}
	for (let i = 0; i < members.length; i++) {

		const row = document.createElement("tr");
		row.insertCell().innerHTML = members[i].first_name;
		row.insertCell().innerHTML = members[i].total_votes;
		row.insertCell().innerHTML = members[i].votes_with_party_pct + "%";
		myTable.append(row);
	}

}
