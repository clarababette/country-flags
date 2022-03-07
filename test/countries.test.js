import {Countries} from '../countries.js';
describe('The Country class', function () {
  it('should return an alphabetical list of the country names and flags.', () => {
    const testCountries = new Countries();
    const countries = [
      {name: 'Argentina', flag: '🇦🇷'},
      {name: 'Brazil', flag: '🇧🇷'},
      {name: 'Chile', flag: '🇨🇱'},
      {name: 'Ireland', flag: '🇮🇪'},
      {name: 'Malawi', flag: '🇲🇼'},
      {name: 'Rwanda', flag: '🇷🇼'},
      {name: 'Switzerland', flag: '🇨🇭'},
      {name: 'Uganda', flag: '🇺🇬'},
      {name: 'Zambia', flag: '🇿🇲'},
    ];
    assert.deepEqual(testCountries.countryList, countries);
  });
  it('should add valid and unique country names and flags.', async () => {
    const testCountries = new Countries();
    const countries = [
      {name: 'Argentina', flag: '🇦🇷'},
      {name: 'Brazil', flag: '🇧🇷'},
      {name: 'Chile', flag: '🇨🇱'},
      {name: 'Grenada', flag: '🇬🇩'},
      {name: 'Ireland', flag: '🇮🇪'},
      {name: 'Malawi', flag: '🇲🇼'},
      {name: 'Rwanda', flag: '🇷🇼'},
      {name: 'Switzerland', flag: '🇨🇭'},
      {name: 'Uganda', flag: '🇺🇬'},
      {name: 'Zambia', flag: '🇿🇲'},
    ];
    await testCountries.addToList('Grenada','🇬🇩')
    assert.deepEqual(testCountries.countryList, countries);
  });
  it('should not add duplicate country names and flags.', async () => {
    const testCountries = new Countries();
    const countries = [
      {name: 'Argentina', flag: '🇦🇷'},
      {name: 'Brazil', flag: '🇧🇷'},
      {name: 'Chile', flag: '🇨🇱'},
      {name: 'Ireland', flag: '🇮🇪'},
      {name: 'Malawi', flag: '🇲🇼'},
      {name: 'Rwanda', flag: '🇷🇼'},
      {name: 'Switzerland', flag: '🇨🇭'},
      {name: 'Uganda', flag: '🇺🇬'},
      {name: 'Zambia', flag: '🇿🇲'},
    ];
    await testCountries.addToList('Chile', '🇬🇩').catch(error => { });
    await testCountries.addToList('Grenada', '🇿🇲').catch(error => { });
    assert.deepEqual(testCountries.countryList, countries);
  });
  it('should not add emojis that are not country flags.', async () => {
    const testCountries = new Countries();
    const countries = [
      {name: 'Argentina', flag: '🇦🇷'},
      {name: 'Brazil', flag: '🇧🇷'},
      {name: 'Chile', flag: '🇨🇱'},
      {name: 'Ireland', flag: '🇮🇪'},
      {name: 'Malawi', flag: '🇲🇼'},
      {name: 'Rwanda', flag: '🇷🇼'},
      {name: 'Switzerland', flag: '🇨🇭'},
      {name: 'Uganda', flag: '🇺🇬'},
      {name: 'Zambia', flag: '🇿🇲'},
    ];
    await testCountries.addToList('Chile', '🙈').catch(error => { });
    await testCountries.addToList('Grenada', '🐻').catch(error => { });
    assert.deepEqual(testCountries.countryList, countries);
  });
  it('should search and return a list of countries that start with the letter "S".', async () => {
    const testCountries = new Countries();
    await testCountries.addToList('Somalia', '🇸🇴')
    await testCountries.addToList('Sweden', '🇸🇪')
    assert.deepEqual(await testCountries.filterCountries('s').then(matches => matches), [ {name: 'Somalia', flag: '🇸🇴'},
      {name: 'Sweden', flag: '🇸🇪'},{name: 'Switzerland', flag: '🇨🇭'}]);
  });
  it('should search and return the country that has this flag: 🇲🇼 .', async () => {
    const testCountries = new Countries();
    assert.deepEqual(await testCountries.filterCountries('🇲🇼').then(matches => matches), [{name: 'Malawi', flag: '🇲🇼'},]);
  });
  it('should search and return the Rwandan flag when "Rwanda" is searched.', async () => {
    const testCountries = new Countries();
    assert.deepEqual(await testCountries.filterCountries('Rwanda').then(matches => matches), [ {name: 'Rwanda', flag: '🇷🇼'},]);
  });
  it('should search and return an error message if no matches are found.', async () => {
    const testCountries = new Countries();
    assert.deepEqual(await testCountries.filterCountries('🇸🇪').catch(error => error), `I'm sorry, we have no flags or countries matching: "🇸🇪"`);
  });

});
