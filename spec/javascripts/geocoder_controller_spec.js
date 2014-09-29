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

	describe("setGeocodedLocationForNewGame function", function() {
		beforeEach(function() {
	  	geocodeController = new GeocodeController();

	  	spyOn($, 'ajax');
	  	this.setMap = spyOn(View.prototype, 'setMapLocation');

	  	this.dataForPost = jasmine.createSpyObj('postData', ['data']);

	  	geocodeController.setGeocodedLocationForNewGame(this.dataForPost);
	  	this.requestArgs = $.ajax.calls.argsFor(0);
	  })

		it("makes a POST request ", function() {
			expect(this.requestArgs[0].type).toEqual('POST');
		});


		it("sends data to '/games", function() {
			expect(this.requestArgs[0].url).toEqual(geocodeController.createGameUrl);
		});

		it("sends the correct data to '/games", function() {
			expect(this.requestArgs[0].data).toEqual(this.dataForPost);
		});

		it("calls a reload function on ajax success", function() {
			expect(this.requestArgs[0].success).toEqual(geocodeController.redirectToNewGame);
		});
	})

})
