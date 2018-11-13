// Main funtion to be called for display information 
table(data.results[0].members);  
states(); //allways called for the states to show on the dropdown filter

//-------------------------------------------------------------------------------------------------------//


function states() { // function to display all the states on the filter dropdown list 
	let statesArray = []; // new empty array to put all the states fom "let state" variable 
	let select = document.getElementById("selectOpt"); // creates an element 
	for (var a = 0; a < data.results[0].members.length; a++) {
		let state = data.results[0].members[a].state;
		statesArray.sort().push(state); //all the states are on one array 
		var repeatedValues = []; // new empty array to contain all the values that are not repeated
		for (var i = 0; i < statesArray.length; i++) { //loop to look all the states in the states.array
			for (var j = i + 1; j < statesArray.length; j++) { // another loop to to check the data again  
				if (statesArray[i] == statesArray[j]) { // loop to compare each state with eah other 
					if (!repeatedValues.includes(statesArray[i])) { // ! opperator eleminates all the values that are identical
						repeatedValues.push(statesArray[i]);
					}
				}
			}
		}
	}
	for (var ll = 0; ll < repeatedValues.length; ll++) { // new loop to append every state to the selection / option html
		let option = document.createElement("option");
		option.append(repeatedValues[ll]);
		selectOpt.append(option);
	}
}

//-------------------------------------------------------------------------------------------------------//


//--------------------------------States array that calles the table ------------------------------------//




function partyFilter() { //This function is to get all the checkboxes with query selector
	let partyName = [];
	let checkValue = document.querySelectorAll("input[name=partyName]:checked"); // gets the values of all checkboxes and stores them in partyName array 
	for (let i = 0; i < checkValue.length; i++) {
		partyName.push(checkValue[i].value);
	}
	partyFilterTable(partyName); // thats how u call a previous function to get all the var.
}

function partyFilterTable(partyname) {
	let filterParty = [];
	if (partyname.length == 0) {
		filterParty = data.results[0].members;
	} else {
		for (var i = 0; i < data.results[0].members.length; i++) {
			for (var a = 0; a < partyname.length; a++) {
				if (data.results[0].members[i].party == partyname[a]) {
					filterParty.push(data.results[0].members[i]);
				}
			}
		}
	}
	console.log("filterPArty", filterParty)
	stateFilter(filterParty);
//	table(filterParty); // call the table function to generate a new table with the value of the checkboxes
}

document.getElementById("selectOpt").addEventListener("change",stateFilter);

function stateFilter (filterParty){
	let stateFiltered = [];
	let idVal = document.getElementById("selectOpt");
	let statesF = idVal.value;
	for ( let i = 0 ; i < filterParty.length; i++){
		if(statesF === filterParty[i].state){
			stateFiltered.push(filterParty[i]);
		}
	}
	console.log(stateFiltered);
	table(stateFiltered);
}

//-------------------------------------------------------------------------------------------------------//


function table(stateFiltered) { //displays string data as a table by creating td & tr
	let tbody = document.getElementById("tbody");
	tbody.innerHTML = ''; // the div .tbody displays empty 
	for (var a = 0; a < stateFiltered.length; a++) { //loop the array
		let tr = document.createElement("tr"); //define the new variables for fn
		let td = document.createElement("td");
		let td1 = document.createElement("td");
		let td2 = document.createElement("td");
		let td3 = document.createElement("td");
		let td4 = document.createElement("td");
		let name = stateFiltered[a].first_name; // give values to the variables
		let surname = stateFiltered[a].last_name;
		let middleName = stateFiltered[a].middle_name || " "; // means or else 
		let party = stateFiltered[a].party;
		let state = stateFiltered[a].state;
		let seniority = stateFiltered[a].seniority;
		let voteperc = stateFiltered[a].votes_with_party_pct;
		let anchor = document.createElement("a"); //this creates the anchor elemen
		let fullName = name + " " + middleName + " " + surname;
		let linkName = stateFiltered[a].url; // link variable finds the value
		anchor.setAttribute("href", linkName);
		anchor.setAttribute("target", "_blank");
		anchor.innerHTML = fullName;
		td.append(anchor); // used to join different values "conct"
		td1.append(party);
		td2.append(state);
		td3.append(seniority);
		td4.append(voteperc + "%");
		tr.append(td, td1, td2, td3, td4);
		tbody.append(tr);
	}

}