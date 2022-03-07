import {sortByPropStr, capitalize} from './useful_functions.js';

export class Countries {
  constructor(countries) {
    this._countries = countries || [
      {name: 'Argentina', flag: '🇦🇷'},
      {name: 'Brazil', flag: '🇧🇷'},
      {name: 'Chile', flag: '🇨🇱'},
      {name: 'Zambia', flag: '🇿🇲'},
      {name: 'Uganda', flag: '🇺🇬'},
      {name: 'Malawi', flag: '🇲🇼'},
      {name: 'Rwanda', flag: '🇷🇼'},
      {name: 'Ireland', flag: '🇮🇪'},
      {name: 'Switzerland', flag: '🇨🇭'},
    ];
  }
  get countryList() {
    return sortByPropStr(this._countries, 'name');
  }
  addToList(name, flag) {
    name = name ? capitalize(name) : '';
    return new Promise((resolve, reject) => {
      if (
        flag &&
        name &&
        this.validateFlag(flag) &&
        !this.findCountry(flag) &&
        !this.findCountry(name)
      ) {
        this._countries = [{name: name, flag: flag}, ...this._countries];
        resolve(this.countryList);
      } else {
        reject({
          nameError: this.findCountry(name)
            ? 'This country is already on the list.'
            : !name
            ? 'Please enter a country name.'
            : '',
          flagError:
            !this.validateFlag(flag) || !flag
              ? 'Please enter a valid country flag emoji.'
              : 'This flag is already on the list.',
        });
      }
    });
  }

  validateFlag(flag) {
    let pat = /^\p{Regional_Indicator}{2}$/u;
    return pat.test(flag);
  }

  findCountry(input) {
    return this._countries.find(
      (country) => country.flag == input || country.name == input,
    );
  }

  filterCountries(input) {
  const search = input.length == 1 ? new RegExp(`^${input}`, "gi") : new RegExp(input, "gi")
   const matches = this._countries.filter(country => country.name.match(search) || country.flag.match(search))
    return new Promise((resolve, reject) => {
      if (matches.length == 0) {
        reject(`I'm sorry, we have no flags or countries matching: "${input}"`)
      } else {
        resolve(matches);
      }
    })
  }
}
