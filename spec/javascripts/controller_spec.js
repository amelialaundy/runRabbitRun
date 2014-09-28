describe("PlayerController", function() {

	describe("attributes on creation", function() {
		// beforeEach(function() {
		//     var controller = new PlayerController();
		//   });
	  // it("creates a new View", function() {
	  // 	controller = new PlayerController();
	  // 	allow(DomManager.getlATlng).to 
	  //   expect(controller.view).toBeDefined();
	  // });

	})




	describe("attributes on creation", function() {
	  beforeEach(function() {
	  	var myView = spyOn(window, 'View');
	  	controller = new PlayerController();
	  });

	  it("a new view has been created", function() {
	    expect(controller.view).toBeDefined();
	  });

	  it("creates playerOptions", function() {
	    expect(controller.playerOptions).toBeDefined();
	  });

	  // it("stops all execution on a function", function() {
	  //   expect(bar).toBeNull();
	  // });
	})
});