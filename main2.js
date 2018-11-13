function table(filterArray) { //displays string data as a table by creating td & tr
		let tbody = document.getElementById("tbody");
		tbody.innerHTML=''; // the div .tbody displays empty 
	//console.log(data);
	for (var a = 0; a < filterArray.length; a++) { //loop the array
		let tr = document.createElement("tr"); //define the new variables for fn
		let td = document.createElement("td");
		let td1 = document.createElement("td");
		let td2 = document.createElement("td");
		let td3 = document.createElement("td");
		let td4 = document.createElement("td");
		let name = filterArray[a].first_name; // give values to the variables
		let surname = filterArray[a].last_name;
		let middleName = filterArray[a].middle_name || " "; // means or else 
		let party = filterArray[a].party;
		let state = filterArray[a].state;
		let seniority = filterArray[a].seniority;
		let voteperc = filterArray[a].votes_with_party_pct;
		let anchor = document.createElement("a"); //this creates the anchor elemen
		// let fullName = document.createElement("fullName"); // creates element 
		let fullName = name + " " + middleName + " " + surname;
		let linkName = filterArray[a].url; // link variable finds the value
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

function states() {
	let statesArray = []; // new empty array to put all the states fom "let state" variable 
	let select = document.getElementById("selectOpt"); // creates an element 
	for (var a = 0; a < data.results[0].members.length; a++) {
		let state = data.results[0].members[a].state;
		statesArray.push(state); //all the states are on one array 
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
states();

//function newFunction(){
//	
//	return Array.from(new Set(data.results[0].members.map((member) =>{ member.state}).sort()));
//	
//}

function partyFilter (){ //This function is to get all the checkboxes with query selector
	let partyName=[];
	let checkValue = document.querySelectorAll("input[name=partyName]:checked"); // gets the values of all checkboxes and stores them in partyName array 
	
	for (let i=0; i < checkValue.length; i++){
		partyName.push(checkValue[i].value);
	}
	partyFilterTable(partyName); // thats how u call a previous function to get all the var.
}

function partyFilterTable (partyname) {
	let filterParty = [];
	 for (var i=0; i < data.results[0].members.length; i++){
		 for (var a=0; a < partyname.length; a++) {
			 if ( data.results[0].members[i].party === partyname[a]) {
				filterParty.push(data.results[0].members[i]);
			 }
		 }
	 }
	console.log("filterPArty", filterParty)
	table(filterParty); // call the table function to generate a new table with the value of the checkboxes
}