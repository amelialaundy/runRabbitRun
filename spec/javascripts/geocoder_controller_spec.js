describe("GeocoderController", function() {
	var geocodeController = null;
	describe("attributes on creation", function() {
		beforeEach(function() {
	  	var myView = spyOn(window, 'View');
	  	geocodeController = new GeocodeController();
	  });

		it("a new view has been created", function() {
			expect(geocodeController.view).toBeDefined();
		});

		it("a new GeocodeSearch object has been created", function() {
			expect(geocodeController.geocodeSearch).toBeDefined();
		});

		
	})
})