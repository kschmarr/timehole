'use strict';
const apiKeyWeather = 'P0Cg94I1UtQ64UEhXAu446vGtNAnfnpa';
const apiKeyMtnPrj = '106112509-335f6e6c09491cbfddee0a14b80779b4';
const searchURLWeather = 'https://dataservice.accuweather.com/';
const searchURLMtnPrj = 'https://www.mountainproject.com/data/get-routes-for-lat-lon?';

const maxResults = 10;
const maxDistance = 20;

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  $('#weather-div').empty();
  // iterate through the data array
  // console.log(responseJson);
  // for (let i = 0; i < responseJson.data.length; i++) {
  //   // for each park object in the data 
  //   //array, add a list item to the results 
  //   //list with the park name, description,
  //   //and url
    $('#weather-div').append(
      `<h3>Today's theme: ${responseJson.DailyForecasts[0].Day.IconPhrase}</h3>
      <p>High of: ${responseJson.DailyForecasts[0].Temperature.Maximum.Value}F</p>
      <p>Headline: ${responseJson.Headline.Text}</p>
      <a href="${responseJson.DailyForecasts[0].Link}">More Info</a>`
    )
  // };
  //display the results section  
  $('.results').removeClass('hidden');
};

function getLocation(query) {
  const params = {
    apikey: apiKeyWeather,
    q: query,
  };
  const locationURL = 'locations/v1/cities/search';
  const queryString = formatQueryParams(params);
  const url = searchURLWeather + locationURL + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      getWeather(responseJson);
      getRoutes(responseJson);
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getWeather(query) {
  // console.log(query);
  const key = query[0].Key
  const params = {
    apikey: apiKeyWeather,
  };
  const forecastURL = 'forecasts/v1/daily/1day/'
  const queryString = formatQueryParams(params)
  const url = searchURLWeather + forecastURL + key + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      displayResults(responseJson);
      displayLocation(query);
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getRoutes(query) {
  // console.log(query);
  const lat = query[0].GeoPosition.Latitude
  const lon = query[0].GeoPosition.Longitude
  const params = {
    key: apiKeyMtnPrj,
    lat: lat,
    lon: lon,
    maxDistance: maxDistance
  };
  const queryString = formatQueryParams(params)
  const url = searchURLMtnPrj+ queryString;
  // https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=40.03&lon=-105.25&maxDistance=10&minDiff=5.6&maxDiff=5.10&key=106112509-335f6e6c09491cbfddee0a14b80779b4
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      displayRoutes(responseJson.routes);
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayRoutes(responseJson) {
  console.log(responseJson);
  const routeArr = responseJson.filter(route => route.stars>=4);
  let locationDetail = '';
  $('#results-list').empty();
  routeArr.forEach(route => {
    locationDetail = '';
    for(let i=0;i<route.location.length;i++){
      if(i<route.location.length-1){
        locationDetail += (route.location[i] + ' > ');
      } else {
        locationDetail += route.location[i];
      }
    }
    
    $('#results-list').append(
      `<li><h3 class="inline"><a href="${route.url}" target="_blank">${route.name}</a></h3>
      <p class="inline">Grade: ${route.rating}, ${route.type}, ${route.stars} <i class="fas fa-star"></i></p>
      <p>${locationDetail}</p></li>`
    )
  })
};

function displayLocation(query) {
  const location = query[0].LocalizedName + ', ' + query[0].AdministrativeArea.LocalizedName;
  $('#weather-div').append(
      `<h3>${location}</h3>`
    )
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#location').val();
    getLocation(searchTerm);
  });
}

$(watchForm);

