let myCountries = localStorage.getItem('countries')
  ? JSON.parse(localStorage.getItem('countries'))
  : countries;

function sort() {
  myCountries.sort(function (a, b) {
    a = a.name.toUpperCase();
    b = b.name.toUpperCase();
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
}

sort();

const countryTemplate = document.querySelector(
  '#handlebars-template',
).innerHTML;
const templateScript = Handlebars.compile(countryTemplate);
const countriesElem = document.querySelector('.countries');
const newCountry = document.querySelector('#country');
const newFlag = document.querySelector('#flag');
const addBtn = document.querySelector('.add_btn');
const searchCriteria = document.querySelector('.search_criteria');
const searchBtn = document.querySelector('.search_btn');
const errorCountry = document.querySelector('.country_error');
const errorFlag = document.querySelector('.flag_error');
const searchMsg = document.querySelector('.results');
const clearSearch = document.querySelector('.clear_search');


countriesElem.innerHTML = templateScript({countries: myCountries});

addBtn.addEventListener('click', () => {
  let name = newCountry.value.trim();
  name = name ? name[0].toUpperCase() + name.substring(1) : '';
  const flag = newFlag.value.trim();
  if(flag && name && validateFlag(flag) && !findFlag(flag) && !findName(name)) {
  myCountries.push({ 'name': name, 'flag': flag });
  sort()
  countriesElem.innerHTML = templateScript({ countries: myCountries });
    localStorage.setItem('countries', JSON.stringify(myCountries))
    newCountry.value = '';
    newFlag.value = ''
  } else {
    errorCountry.innerHTML = findName(name) ? 'This country is already on the list.' : 'Please enter a country name.'
    errorFlag.innerHTML = !validateFlag(flag) || !flag ? 'Please enter a valid country flag emoji.' : 'This flag is already on the list.'
    setTimeout(() => {
      errorCountry.innerHTML = '';
      errorFlag.innerHTML = '';
    }, 3000)
  }
  
})


function validateFlag(flag) {
  let pat = /^\p{Regional_Indicator}{2}$/u
  return pat.test(flag)
}

function findFlag(flag) {
  return myCountries.find(country => country.flag == flag)
}

function findName(name) {
  return myCountries.find(country => country.name == name)
}


searchBtn.addEventListener('click', () => {
  let search = searchCriteria.value.trim();
  let matches;
  if (search) {
    if (validateFlag(search)) {
    matches = findFlag(search)
    countriesElem.innerHTML = templateScript({ countries: [matches] });
  } else {
    search = search.length == 1 ? new RegExp(`^${search}`, "gi") : new RegExp(search, "gi")
    matches = myCountries.filter(country => country.name.match(search))
    countriesElem.innerHTML = templateScript({ countries: matches });
  }
    searchMsg.innerHTML = `Search results for: "${searchCriteria.value.trim()}"`
    clearSearch.style.display = 'initial'
  }
  if (matches.length == 0) {
    searchMsg.innerHTML = `I'm sorry, we have no flags or countries matching: "${searchCriteria.value.trim()}"`
    clearSearch.style.display = 'initial'
  }
  searchCriteria.value = '';
})

clearSearch.addEventListener('click', () => {
  searchMsg.innerHTML = '';
  clearSearch.style.display = 'none';
  countriesElem.innerHTML = templateScript({ countries: myCountries });
})
