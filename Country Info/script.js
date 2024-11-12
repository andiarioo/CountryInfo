const endpoint = "https://restcountries.com/v3.1/all";

let countryData = [];

const countryList = document.getElementById("country-list");

// Mengambil data dari API
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
    displayCountries(countryData);
  })
  .catch((error) => console.error("Error", error));

// Menampilkan list country pada UI
const displayCountries = (countries) => {
  const countryList = document.getElementById("country-list"); //ambil elemen HTML

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
    </div>
    `; // isi li
    countryList.appendChild(listItem); // input li ke ul
  });
};

let inputText = "";
const getInput = document.getElementById("form-search"); // mengambil inputan form
// trigger submit form
getInput.addEventListener("submit", (event) => {
  event.preventDefault();
  inputText = document.getElementById("search-country").value;

  const searchResult = searchData(inputText, countryData);

  countryList.innerHTML = "";

  // menampilkan hasil search
  if (typeof searchResult === "string") {
    const messagesItem = document.createElement("li");
    messagesItem.textContent = searchResult;
    countryList.appendChild(messagesItem);
  } else {
    displayCountries(searchResult);
  }
});

// Cari hasil inputan form pada list countryData
const searchData = (input, data) => {
  // ubah input form menjadi lowercase
  const inputLowercase = input.toLowerCase();
  const filteredCountries = data.filter((item) => {
    return item.name.toLowerCase().includes(inputLowercase);
  });
  if (filteredCountries.length === 0) {
    return "Country not found";
  }
  return filteredCountries;
};
