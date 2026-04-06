// dashboard.js

// Function to update the issue counts
function updateStatusCounts(reports) {
  let solvedCount = 0;
  let pendingCount = 0;
  let failedCount = 0;
  
  reports.forEach(report => {
    switch (report.status) {
      case 'solved':
        solvedCount++;
        break;
      case 'pending':
        pendingCount++;
        break;
      case 'failed':
        failedCount++;
        break;
      default:
        pendingCount++; // If no status, consider pending
    }
  });

  document.getElementById('solved-count').textContent = solvedCount;
  document.getElementById('pending-count').textContent = pendingCount;
  document.getElementById('failed-count').textContent = failedCount;
}

// Function to populate the recent reports table
function populateReportTable(reports) {
  const reportList = document.getElementById('report-list');
  reportList.innerHTML = ''; // Clear existing entries

  reports.forEach(report => {
    const tr = document.createElement('tr');

    const titleTd = document.createElement('td');
    titleTd.textContent = report.title || 'No title';
    tr.appendChild(titleTd);

    const statusTd = document.createElement('td');
    statusTd.textContent = report.status || 'pending';
    tr.appendChild(statusTd);

    const locationTd = document.createElement('td');
    locationTd.textContent = report.city || 'Unknown';
    tr.appendChild(locationTd);

    const dateTd = document.createElement('td');
    const date = new Date(report.date);
    dateTd.textContent = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    tr.appendChild(dateTd);

    reportList.appendChild(tr);
  });
}

// Fetch reports from API and update dashboard
function fetchAndUpdateDashboard() {
  fetch('http://localhost:3000/api/reports')
    .then(res => res.json())
    .then(reports => {
      updateStatusCounts(reports);
      populateReportTable(reports);
    })
    .catch(err => {
      console.error('Error fetching reports for dashboard:', err);
    });
}

// Call fetchAndUpdateDashboard when page loads
window.addEventListener('DOMContentLoaded', fetchAndUpdateDashboard);
