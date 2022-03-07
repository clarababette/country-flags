import {Countries} from './countries.js';

const countries = new Countries(JSON.parse(localStorage.getItem('countries')));

const countryTemplate = document.querySelector(
  '#handlebars-template',
).innerHTML;
const templateScript = Handlebars.compile(countryTemplate);

const selectors = [
  '.countries',
  '#country',
  '#flag',
  '.add_btn',
  '.search_criteria',
  '.search_btn',
  '.country_error',
  '.flag_error',
  '.results',
  '.clear_search',
];

const elements = selectors.map((selector) => document.querySelector(selector));

const [
  countriesElem,
  newCountry,
  newFlag,
  addBtn,
  searchCriteria,
  searchBtn,
  errorCountry,
  errorFlag,
  searchMsg,
  clearSearch,
] = elements;

countriesElem.innerHTML = templateScript({countries: countries.countryList});

addBtn.addEventListener('click', () => {
  countries
    .addToList(newCountry.value.trim(), newFlag.value.trim())
    .then((updatedList) => {
      countriesElem.innerHTML = templateScript({countries: updatedList});
      localStorage.setItem('countries', JSON.stringify(updatedList));
      newCountry.value = '';
      newFlag.value = '';
    })
    .catch((error) => {
      errorCountry.innerHTML = error.nameError;
      errorFlag.innerHTML = error.flagError;
      setTimeout(() => {
        errorCountry.innerHTML = '';
        errorFlag.innerHTML = '';
      }, 3000);
    });
});

searchBtn.addEventListener('click', () => {
  if (searchCriteria.value) {
    countries.filterCountries(searchCriteria.value.trim()).then(matches => {
      countriesElem.innerHTML = templateScript({ countries: matches });
      searchMsg.innerHTML = `Search results for: "${searchCriteria.value.trim()}"`
    }).catch(error => {
      searchMsg.innerHTML = error;
    }).finally(() => {
      clearSearch.style.display = 'initial';
      searchCriteria.value = '';
    })
  }
})

clearSearch.addEventListener('click', () => {
  searchMsg.innerHTML = '';
  clearSearch.style.display = 'none';
  countriesElem.innerHTML = templateScript({ countries: countries.countryList});
})
