document.addEventListener("DOMContentLoaded", function() {
	// Select all password toggle buttons
	const togglePasswords = document.querySelectorAll(".toggle-password");
	togglePasswords.forEach(toggle => {
		toggle.addEventListener("click", function() {
			const passwordInput = this.previousElementSibling; // Selects the password input before the icon
			if (passwordInput && passwordInput.type === "password") {
				passwordInput.type = "text";
				this.classList.add("fa-eye-slash"); // Change icon
			} else {
				passwordInput.type = "password";
				this.classList.remove("fa-eye-slash"); // Revert icon
			}
		});
	});
});