describe("PlayerController", function() {
	var controller = null;
	describe("attributes on creation", function() {
		var myBindEvents = null;
	  beforeEach(function() {
	  	var myView = spyOn(window, 'View');
	  	var myBindEvents = spyOn(document, 'addEventListener');
	  	controller = new PlayerController();
	  });

	  it("a new view has been created", function() {
	    expect(controller.view).toBeDefined();
	  });

	  it("creates playerOptions", function() {
	    expect(controller.playerOptions).toBeDefined();
	  });

	  it("creates attributes of null for biggest lat", function() {
	    expect(controller.biggestLat).toBeNull();
	  });

	  it("creates attributes of null for biggest lng", function() {
	    expect(controller.biggestLng).toBeNull();
	  });

	  it("creates attributes of null for smallest lat", function() {
	    expect(controller.smallestLat).toBeNull();
	  });

	  it("creates attributes of null for smallest lng", function() {
	    expect(controller.smallestLng).toBeNull();
	  });

	  it("has a start function", function() {
	    expect(controller.start).toBeDefined();
	  });

	  it("bind events adds a keyup event listener to the document", function() {
	  	controller.bindEvents();
	  	this.bindEventsArgs = document.addEventListener.calls.argsFor(0);
	    expect(this.bindEventsArgs[0]).toEqual('keyup');
	  });

	  it("bind events sets the keyup call back to the sendPlayerPosition function", function() {
	  	controller.bindEvents();
	  	this.bindEventsArgs = document.addEventListener.calls.argsFor(0);
	    expect(this.bindEventsArgs[1]).toEqual(jasmine.any(Function));
	  });
	})

	describe("sending player position", function() {
		beforeEach(function() {
			// spyOn(controller, 'checkWinState');

			spyOn($, 'ajax');
			controller.playerOptions = {
			    lat: -41.295308,
			    lng: 174.773082,
			    id: 1,
			    game_id: 1,
			    kind: "rabbit"
			};
			controller.sendPlayerPosition();

			this.requestArgs = $.ajax.calls.argsFor(0);
		})

		it("makes a POST request", function () {
	    expect(this.requestArgs[0].type).toEqual('POST');
	  });

  	it("makes a POST request to '/player/update_position' ", function () {
      expect(this.requestArgs[0].data).toEqual(controller.playerOptions);
    });

	})

		describe("check win state", function() {
			beforeEach(function() {
				spyOn(window, 'clearInterval');
				spyOn(window, 'alert')

				// spyOn(PlayerController, 'locationTimer');
				this.data = {
				    game_status: true
				};
				controller.checkWinState(this.data);
			})

			it("stops the timer when the game is won", function () {
		    expect(clearInterval).toHaveBeenCalled();
		  });

		})
});




