// Select the form and complaint list
const complaintForm = document.getElementById('complaintForm');
const complaintList = document.getElementById('complaintList');

// Load complaints from local storage
document.addEventListener('DOMContentLoaded', loadComplaints);

// Handle form submission
complaintForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent page refresh on submit

  const complaint = document.getElementById('complaint').value.trim();

  // Only add if complaint field has content
  if (complaint) {
    addComplaint(complaint);
    saveComplaint(complaint);
    complaintForm.reset(); // Clear the form
  } else {
    alert("Please describe your complaint.");
  }
});

// Function to add a complaint to the list
function addComplaint(complaint) {
  const complaintItem = document.createElement('li');
  complaintItem.classList.add('complaint-item');

  const complaintText = document.createElement('p');
  complaintText.textContent = complaint;

  complaintItem.appendChild(complaintText);
  complaintList.appendChild(complaintItem);
}

// Function to save a complaint to local storage
function saveComplaint(complaint) {
  let complaints = JSON.parse(localStorage.getItem('complaints')) || [];
  complaints.push(complaint);
  localStorage.setItem('complaints', JSON.stringify(complaints));
}

// Function to load complaints from local storage
function loadComplaints() {
  let complaints = JSON.parse(localStorage.getItem('complaints')) || [];
  complaints.forEach(complaint => addComplaint(complaint));
}
