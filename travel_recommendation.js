let data = {};

fetch('./travel_recommendation_api.json')
  .then(response => response.json())
  .then(result => {
    data = result;
    console.log("Loaded:", data);
  })
  .catch(error => console.log("Error:", error));

function search() {
  const input = document.getElementById("searchInput").value.toLowerCase();

  if (input.includes("beach")) {
    displayResults(data.beaches || []);
  } 
  else if (input.includes("temple")) {
    displayResults(data.temples || []);
  } 
  else if (input.includes("country")) {
    let countryResults = [];

    (data.countries || []).forEach(country => {
      countryResults.push(...country.cities);
    });

    displayResults(countryResults);
  }
}

function displayResults(items) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  items.slice(0, 2).forEach(item => {
    resultsDiv.innerHTML += `
      <div>
        <h3>${item.name}</h3>
        <img src="${item.imageUrl}" width="300">
        <p>${item.description}</p>
      </div>
    `;
  });
}

function clearResults() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("searchInput").value = "";
}
