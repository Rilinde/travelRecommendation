let data = {};

fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(result => {
    data = result;
    console.log(data);
  })
  .catch(error => console.log('Error loading JSON:', error));

function search() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();

  if (input.includes("beach")) {
    displayResults(data.beaches || []);
  } else if (input.includes("temple")) {
    displayResults(data.temples || []);
  } else if (input.includes("country")) {
    let countryResults = [];

    (data.countries || []).forEach(country => {
      countryResults = countryResults.concat(country.cities);
    });

    displayResults(countryResults);
  } else {
    document.getElementById("results").innerHTML = "<p>No results found.</p>";
  }
}

function displayResults(items) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  items.slice(0, 2).forEach(item => {
    resultsDiv.innerHTML += `
      <div>
        <h3>${item.name}</h3>
        <img src="${item.imageUrl}" width="300" alt="${item.name}">
        <p>${item.description}</p>
      </div>
    `;
  });
}

function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
}
