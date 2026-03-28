let data = {};

fetch('./travel_recommendation_api.json?v=2')
  .then(response => response.json())
  .then(result => {
    data = result;
    console.log("Loaded:", data);
  })
  .catch(error => console.log("Error:", error));

function search() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();

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
  else {
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
        <img 
          src="${item.imageUrl}" 
          alt="${item.name}" 
          width="300"
          onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200?text=Image+Unavailable';"
        >
        <p>${item.description}</p>
      </div>
    `;
  });
}

function clearResults() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("searchInput").value = "";
}
