countries.sort(function(a, b) {
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

const countryTemplate = document.querySelector('#handlebars-template').innerHTML
const templateScript = Handlebars.compile(countryTemplate);

document.querySelector(".countries").innerHTML = templateScript({ countries: countries })

console.log()

let count = 0
allFlags.forEach(emoji => {
  let pat = /\p{Regional_Indicator}{2,}/u
  if (pat.test(emoji)) {
    console.log(emoji)
    count++
  }
});

console.log(count)
  
