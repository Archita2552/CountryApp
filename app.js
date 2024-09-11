var app = angular.module('countryApp', []);

// Define the controller for the country list
app.controller('CountryController', function ($scope, $http, $window) {
  // Load the country data from the JSON file or an API
  $http.get('countries.json').then(function (response) {
    $scope.countries = response.data;
    console.log('Countries Data:', $scope.countries);
  });

  // Define regions for filter dropdown
  $scope.regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  $scope.selectedRegion = '';
  $scope.darkMode = false;

  // Function to filter countries by region
  $scope.filterByRegion = function (country) {
    console.log('Selected Region:', $scope.selectedRegion);
    console.log('Country Region:', country.region);
    if ($scope.selectedRegion) {
      return country.region === $scope.selectedRegion;
    }
    return true;
  };

  // Function to handle card click and navigate to details page
  $scope.selectCountry = function (country) {
    // Store the selected country data in localStorage
    localStorage.setItem('selectedCountry', JSON.stringify(country));
    // Navigate to the country details page
    $window.location.href = 'country-details.html';
  };
});

// Define the controller for the country details page
app.controller('CountryDetailsController', function ($scope, $window) {
  // Retrieve selected country data from localStorage
  var countryData = localStorage.getItem('selectedCountry');
  
  // Parse and assign the country data to the scope
  if (countryData) {
    $scope.selectedCountry = JSON.parse(countryData);
  } else {
    console.error('No country data found in localStorage');
  }

  // Function to navigate back to the previous page
  $scope.goBack = function () {
    $window.history.back();
  };
});