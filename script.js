function trackTrain() {
	const trainNumber = document.getElementById("train-number").value;
	const date = document.getElementById("journey-date").value;
	const statusSection = document.getElementById("train-status");
	if (trainNumber.trim() === "" || date.trim() === "") {
		alert("Please enter both train number and date.");
		return;
	}
	statusSection.innerHTML = `
	               <p>Tracking Train: <strong>${trainNumber}<\/strong><\/p>
	               <p>Journey Date: <strong>${date}<\/strong><\/p>
	               <p>Status: <span class='on-time'>On Time<\/span><\/p>
	           `;
	statusSection.style.display = "block";
}

function checkPNRStatus() {
	const pnrNumber = document.getElementById("pnr-number").value.trim();
	const pnrStatusSection = document.getElementById("pnr-status");
	if (pnrNumber.length !== 10 || isNaN(pnrNumber)) {
		alert("Please enter a valid 10-digit PNR number.");
		return;
	}
	const statuses = ["Confirmed", "RAC", "Waiting List", "Cancelled"];
	const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
	pnrStatusSection.innerHTML = `
	               <p>PNR Number: <strong>${pnrNumber}<\/strong><\/p>
	               <p>Status: <span class='status-${randomStatus.toLowerCase()}'>${randomStatus}<\/span><\/p>
	           `;
	pnrStatusSection.style.display = "block";
}

function showBookingForm() {
	document.querySelector(".form-section").style.display = "block";
	document.getElementById("pnr-modal").style.display = "none";
	document.getElementById("book-btn").classList.add("active-btn");
	document.getElementById("pnr-btn").classList.remove("active-btn");
}

function showPNRBlock() {
	document.querySelector(".form-section").style.display = "none";
	document.getElementById("pnr-modal").style.display = "block";
	document.getElementById("book-btn").classList.remove("active-btn");
	document.getElementById("pnr-btn").classList.add("active-btn");
}

function updateFromDetails() {
	const selectElement = document.getElementById("from-location");
	const selectedOption = selectElement.options[selectElement.selectedIndex];
	const stationCode = selectedOption.getAttribute("data-station");
	document.getElementById("from-details").textContent = stationCode;
}

function updateToDetails() {
	const selectElement = document.getElementById("to-location");
	const selectedOption = selectElement.options[selectElement.selectedIndex];
	const stationCode = selectedOption.getAttribute("data-station");
	document.getElementById("to-details").textContent = stationCode;
}

function bookTicket() {
	const from = document.getElementById("from-location").value;
	const to = document.getElementById("to-location").value;
	const date = document.getElementById("date").value;
	const trainClass = document.getElementById("class-selection").value;
	const trainSelected = document.getElementById("train-selection").value;
	const numPassengers = parseInt(document.getElementById("num-passengers").value, 10);
	if (!from || !to || !date || !trainClass || !trainSelected || isNaN(numPassengers) || numPassengers <= 0) {
		showMessage("❌ Please fill in all details before booking.", "error");
		return;
	}
	const isSenior = document.getElementById("senior").checked;
	const isDisabled = document.getElementById("disabled").checked;
	const seatsAvailable = Math.random() < 0.7;
	if (!seatsAvailable) {
		showMessage("⚠️ Sorry, no seats available in the selected train/class.", "warning");
		return;
	}
	let seatNumbers = new Set();
	let seatDetails = "";
	for (let i = 1; i <= numPassengers; i++) {
		const name = document.getElementById(`name-${i}`).value.trim();
		const gender = document.getElementById(`gender-${i}`).value;
		if (!name) {
			showMessage(`❌ Please enter the name for Passenger ${i}.`, "error");
			return;
		}
		let seatType = "Regular Seat";
		let seatNo;
		do {
			seatNo = Math.floor(Math.random() * 100) + 1;
		} while (seatNumbers.has(seatNo));
		seatNumbers.add(seatNo);
		if (isSenior) {
			seatType = "Lower Berth (Priority for Senior Citizen)";
		} else if (isDisabled) {
			seatType = "Accessible Seat (For Disabled)";
		}
		seatDetails += `<p><strong>${i}. ${name}:<\/strong> ${gender} - Seat No: ${seatNo} (${seatType})<\/p>`;
	}
	const confirmationSection = document.getElementById("booking-confirmation");
	confirmationSection.innerHTML = `
	           <div class="success-box">
	               <h3>✅ Booking Confirmed!<\/h3>
	               <p><strong>Train:<\/strong> ${trainSelected}<\/p>
	               <p><strong>Class:<\/strong> ${trainClass}<\/p>
	               <p><strong>From:<\/strong> ${from} → <strong>To:<\/strong> ${to}<\/p>
	               <p><strong>Journey Date:<\/strong> ${date}<\/p>
	               <p><strong>Passengers:<\/strong> ${numPassengers}<\/p>
	               ${seatDetails}
	           <\/div>
	       `;
	confirmationSection.style.display = "block";
}

function updatePassengerFields() {
	const numPassengers = parseInt(document.getElementById("num-passengers").value, 10);
	const passengerFields = document.getElementById("passenger-details");
	passengerFields.innerHTML = "";
	if (isNaN(numPassengers) || numPassengers <= 0) {
		return;
	}
	for (let i = 1; i <= numPassengers; i++) {
		passengerFields.innerHTML += `
	               <div class="form-group">
	                   <label>Passenger ${i} Name<\/label>
	                   <input type="text" id="name-${i}" placeholder="Enter Name" required>
	               <\/div>
	               <div class="form-group">
	                   <label>Passenger ${i} Gender<\/label>
	                   <select id="gender-${i}">
	                       <option value="Male">Male<\/option>
	                       <option value="Female">Female<\/option>
	                       <option value="Other">Other<\/option>
	                   <\/select>
	               <\/div>
	           `;
	}
}

function showMessage(message, type) {
	const messageBox = document.getElementById("message-box");
	messageBox.innerHTML = message;
	messageBox.className = `message ${type}`;
	messageBox.style.display = "block";
	setTimeout(() => {
		messageBox.style.display = "none";
	}, 3000);
}