// Main funtion to be called for display information 
states(); //allways called for the states to show on the dropdown filter

//-----------------------------------------------------------------------------------------------------------------------------------------------------//


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

document.getElementById("selectOpt").addEventListener("change", filterAll); // event that listens to the filter drop down list and starts the function filterAll


function filterAll() {
	var members = data.results[0].members; // insted of writing everything I just write members.length etc for the loops 
	let checkValue = [...document.querySelectorAll("input[name=partyName]:checked")]; // gets the values of all checkboxes and stores them
	let parties = checkValue.map(checked => checked.value); // a function that filters every value of the checkboxes and stores the value in an array
	let idVal = document.getElementById("selectOpt"); // connect the variable to the value of the html checkbox "value=D,R,I" 
	let statesF = idVal.value; // the value of the filter by state
	let filteredMembers = []; // main array that gets filtered by the loops and used to store elements every time a condition is met
	
	for (var i = 0; i < members.length; i++) { // main loop that is going to be used by every if(conditions are met / not )
		if ((statesF == "All") && (parties.length == 0)) { // if the states dropdown has no value and no checkboxes checked condition
			filteredMembers.push(members[i]); // Loop everything and push all members to the main array
		} else if ((members[i].state == statesF) && (parties.length == 0)) { // if members state is true and no checkboxes are checked 
			filteredMembers.push(members[i]);
		} else if ((statesF == "All") && (parties.length > 0)) { // if state is false and the checkboxes are checked 
			for (var i = 0; i < members.length; i++) { // loop through all the members 
				for (var a = 0; a < parties.length; a++) {// loop to filter all the members by the checkbox value  
					if (members[i].party === parties[a]) { // if members party is equal to the value of checkbox 
						filteredMembers.push(members[i]); // push everything to the array 
					}
				}
			}
		} else if ((statesF == members[i].state) && (parties.length > 0)) { // if state value is true and checkboxes checked 
			for (var i = 0; i < members.length; i++) { 
				for (var a = 0; a < parties.length; a++) { //loop through the value of the checkboxes
					if ((members[i].party == parties[a]) && (members[i].state == statesF)) { //if value of states and value of party is equal to the member
						filteredMembers.push(members[i]);
					}
				}
			}
		}
		table(filteredMembers); // call the table with this array to print the results 
	}
}
	filterAll(); // Needs to be called to print all the members without filters 

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
