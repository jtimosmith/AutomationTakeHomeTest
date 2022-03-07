describe('Open Weather Map API Test', function() {
	it("Uses GET API request to retrieve the city of London's weather", function() {
		
		const lat = '51.5072'; // define the latitude for London
		const long = '-0.1276'; // define the longitude for London
		const app_id = 'f638f6f8e88952d0d5d20bfd2785e073'; // define the custom API key to access the server

		// full request method to get London's weather and print the response body to the user
		cy.request({
			method: 'GET',
			url: `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${app_id}`
		}).then((response) => {
			expect(response.status).to.eq(200); // check that the server response is successful
			
			// check that the response body has all expected keys as according to https://openweathermap.org/current
			expect(response.body).to.have.all.keys(
				'coord',
				'weather',
				'base',
				'main',
				'visibility',
				'wind',
				'clouds',
				'dt',
				'sys',
				'timezone',
				'id',
				'name',
				'cod');

			// function to convert temperature from Kelvin to Farenheit
			function convert_kelvin_to_farenheit(kelvin_temp){
				let farenheit_temp = Math.floor((kelvin_temp - 273) * (9/5) + 32);
				return farenheit_temp;
			}

			// function to convert meters per second to miles per hour
			function convert_mps_mph(meters_sec_speed){
				let miles_hour = meters_sec_speed * 2.23694;
				return miles_hour;
			}

			cy.log('City: ' + response.body.name); // print the city name
			cy.log('Country: ' + response.body.sys.country); // print the country name
			cy.log('Longitude: ' + response.body.coord.lon); // print the longitude
			cy.log('Latitude: ' + response.body.coord.lat); // print the latitude
			cy.log('Temperature: ' + convert_kelvin_to_farenheit(response.body.main.temp) + '˚F'); // print the temperature
			cy.log('Feels like: ' + convert_kelvin_to_farenheit(response.body.main.feels_like) + '˚F'); // print what the temperature feels like
			cy.log('Atmospheric pressure: ' + response.body.main.pressure + ' hPa'); // print the atmospheric pressure
			cy.log('Humidity: ' + response.body.main.humidity + '%'); // print the humidity level
			cy.log('Wind speed: ' + convert_mps_mph(response.body.wind.speed) + ' mph'); // print the wind speed
		});
	})
})