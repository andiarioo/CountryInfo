const endpoint = "https://restcountries.com/v3.1/all";

let countryData = [];

const countryList = document.getElementById("country-list");

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    countryData = data.map((country) => {
      return {
        "name": country.name.common,
        "capital": country.capital ? country.capital[0] : "No capital",
        "population": country.population.toLocaleString("id-ID"),
        "flag": country.flags.png,
      };
    });
    // menampilkan data di HTML
    displayCountries(countryData);
  })
  .catch((error) => {
    console.error("Error", error);
    alert("Failed to load data");
  });

const displayCountries = (countries) => {
  countries.forEach((country) => {
    const listItem = document.createElement("li"); // bikin li baru
    listItem.innerHTML = `
    <div class="country-title">
      <h3>${country.name}</h3>
      <p>Capital : ${country.capital}</p>
      <p>Population : ${country.population}</p>
    </div>
    <div class="country-flag">
      <img src="${country.flag}"/>
    </div>`; // isi li
    countryList.appendChild(listItem); // input li ke ul
  });
};
