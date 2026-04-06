document.getElementById('report-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const city = document.getElementById('place-search').value.trim();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const problemType = document.getElementById('problemType').value;

  if (!city) {
    alert('Please enter a city name.');
    return;
  }
  if (!title) {
    alert('Please enter an issue title.');
    return;
  }
  if (!description) {
    alert('Please enter issue description.');
    return;
  }
  if (!problemType) {
    alert('Please select a problem type.');
    return;
  }

  const apiKey = '3558555c74970e9a055789fcfc2fb418';
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(weatherUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    })
    .then(weatherData => {
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;

      document.getElementById('location-display').textContent = city;
      document.getElementById('temperature-display').textContent = temperature + ' °C';
      document.getElementById('weather-description').textContent = weatherDescription;
      document.getElementById('weather-info').style.display = 'block';

      const report = {
        city,
        title,
        description,
        problemType,
        temperature,
        weatherDescription,
        status: 'pending',
        date: new Date().toISOString()
      };

      let reports = JSON.parse(localStorage.getItem('reports')) || [];
      reports.push(report);
      localStorage.setItem('reports', JSON.stringify(reports));

      return fetch('http://localhost:3000/api/reports', {  // backend server URL और पोर्ट
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit report to server');
      }
      return response.json();
    })
    .then(data => {
      alert('Report submitted successfully.');
      document.getElementById('report-form').reset();
      document.getElementById('weather-info').style.display = 'none';
    })
    .catch(error => {
      alert(error.message);
    });
});
