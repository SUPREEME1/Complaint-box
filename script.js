document.addEventListener('DOMContentLoaded', loadComplaints);

const complaintForm = document.getElementById('complaintForm');
const complaintList = document.getElementById('complaintList');
const exportBtn = document.getElementById('exportBtn');
const adminModal = document.getElementById('adminModal');
const loginBtn = document.getElementById('loginBtn');
const errorMessage = document.getElementById('error-message');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

const adminCredentials = { username: "admin", password: "admin123" };

complaintForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const complaint = document.getElementById('complaint').value.trim();
  
  if (!complaint) {
    alert("Please enter a complaint.");
    return;
  }
  
  if (!isDuplicateComplaint(complaint)) {
    addComplaint(complaint);
    saveComplaint(complaint);
  } else {
    alert("This complaint already exists.");
  }
  
  complaintForm.reset();
});

function addComplaint(complaint) {
  const complaintItem = document.createElement('li');
  complaintItem.textContent = complaint;
  complaintItem.classList.add('complaint-item');
  complaintList.appendChild(complaintItem);
}

function saveComplaint(complaint) {
  let complaints = JSON.parse(localStorage.getItem('complaints')) || [];
  complaints.push(complaint);
  localStorage.setItem('complaints', JSON.stringify(complaints));
}

function isDuplicateComplaint(complaint) {
  let complaints = JSON.parse(localStorage.getItem('complaints')) || [];
  return complaints.includes(complaint);
}

function loadComplaints() {
  let complaints = JSON.parse(localStorage.getItem('complaints')) || [];
  complaints.forEach(addComplaint);
}

adminLoginBtn.addEventListener('click', () => adminModal.style.display = "flex");
closeModalBtn.addEventListener('click', () => adminModal.style.display = "none");

loginBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (username === adminCredentials.username && password === adminCredentials.password) {
    adminModal.style.display = "none";
    exportBtn.style.display = "block";
  } else {
    errorMessage.style.display = "block";
  }
});

exportBtn.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Complaint Log", 14, 10);
  let y = 20;
  JSON.parse(localStorage.getItem('complaints') || "[]").forEach(complaint => {
    doc.text(`- ${complaint}`, 14, y);
    y += 10;
  });
  doc.save('complaints.pdf');
});
