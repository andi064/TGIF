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
			console.log("Congress113 Succses!!!!!!!!!");
			states(senateData);
			createTable(senateData);
			checkiCheck(senateData);
		})
	} else if ((window.location.pathname == ("/senate_party_loyalty" || "/senate_attendance.html"))) {
		fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
			method: "GET",
			headers: {
				"X-API-Key": "OOjcbPUBAjPmyTaJuKWhFqXIWhvXp72cFsY0rJ5O"
			}
		}).then(function (result) {
			return result.json()
		}).then(function (data) {
			let senateData = data.results[0].members;
			console.log("Senate Succses!!!!!!!!!");
			numberParty(senateData)
		})
	} else if (window.location.pathname == ("/house.html")) {
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
	} else {
		fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
			method: "GET",
			headers: {
				"X-API-Key": "OOjcbPUBAjPmyTaJuKWhFqXIWhvXp72cFsY0rJ5O"
			}
		}).then(function (result) {
			return result.json()
		}).then(function (data) {
				let houseData = data.results[0].members;
				console.log("House Succses!!!!!!!!!");
			numberParty(senateData)
			})
	}
}
	