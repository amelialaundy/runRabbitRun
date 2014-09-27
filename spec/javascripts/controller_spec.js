describe("PlayerController", function() {

	describe("attributes on creation", function() {
		// beforeEach(function() {
		//     var controller = new PlayerController();
		//   });
	  it("creates a new View", function() {
	  	controller = new PlayerController();
	    expect(controller.view).toBeDefined();
	  });

	})




	// describe("attributes on creation", function() {
	//   var controller = null;

	//   beforeEach(function() {
	//     controller = new PlayerController();
	//   	// };

	//   	spyOn(controller, 'view');
	//     controller.view();
	//   });

	//   it("a new view has been created", function() {
	//     expect(controller.view).toHaveBeenCalled();
	//   });

	//   // it("tracks all the arguments of its calls", function() {
	//   //   expect(foo.setBar).toHaveBeenCalledWith(123);
	//   //   expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
	//   // });

	//   // it("stops all execution on a function", function() {
	//   //   expect(bar).toBeNull();
	//   // });
	// })
});