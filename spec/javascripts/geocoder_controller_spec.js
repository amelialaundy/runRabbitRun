describe("GeocoderController", function() {
	var geocodeController = null;
	var myView = null;
	describe("attributes on creation", function() {
		beforeEach(function() {

			var location = "101 street"
	  	var myView = spyOn(window, 'View')
	  	geocodeController = new GeocodeController();
	  });

		it("a new view has been created", function() {
			expect(geocodeController.view).toBeDefined();
		});

		it("a new GeocodeSearch object has been created", function() {
			expect(geocodeController.geocodeSearch).toBeDefined();
		});
	})

	describe("getGeocodeLocation function", function() {
		beforeEach(function() {
			// spyOn(window, 'GeocodeSearch')
	  	geocodeController = new GeocodeController();
	  });

		it("a new location has been defined", function() {
			var address = "101 street"
			var e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
			var myView = spyOn(View.prototype, 'getAddress').and.callFake(function() {
	  		return address
	  	});;

	  	spyOn(GeocodeSearch.prototype, 'search')
			geocodeController.getGeocodeLocation(e);
			expect(geocodeController.location).toEqual(address);
		});

	
	})

})