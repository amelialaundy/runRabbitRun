describe("PlayerController", function() {
	var controller = null;

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


	})

describe("bind events function", function() {

	beforeEach(function() {
		$ = jasmine.createSpyObj('val'['body']);
		// ('e', [ 'preventDefault' ])
		$.withArgs('body').returns(sinon.stub({val: function(){}}));
		// var myBindEvents = spyOn($, 'val');
	})

	xit("bind events adds a keyup event listener to the document", function() {
		controller.bindEvents();
		this.bindEventsArgs = document.addEventListener.calls.argsFor(0);
	  expect(this.bindEventsArgs[0]).toEqual('keyup');
	});

	xit("bind events sets the keyup call back to the sendPlayerPosition function", function() {
		controller.bindEvents();
		this.bindEventsArgs = document.addEventListener.calls.argsFor(0);
	  expect(this.bindEventsArgs[1]).toEqual(jasmine.any(Function));
	});
})

	describe("sending player position", function() {
		beforeEach(function() {
			// spyOn(controller, 'checkProximityToRabbit');

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

  	it("sends the request to '/player/update_position' ", function () {
      expect(this.requestArgs[0].data).toEqual(controller.playerOptions);
    });

	})

	describe("check win state", function() {
		beforeEach(function() {
			spyOn(window, 'clearInterval');
			spyOn(window, 'alert')

		})

		it("stops the timer when the game is won", function () {
			this.data = {
			    proximity: true
			};
			controller.checkProximityToRabbit(this.data);
	    expect(clearInterval).toHaveBeenCalledWith(controller.locationTimer);
	  });

  	it("doesnt stops the timer when the game is won", function () {
  		this.data = {
  		    proximity: false
  		};
  		controller.checkProximityToRabbit(this.data);
      expect(clearInterval).not.toHaveBeenCalled();
    });

	})

	describe("create player markers", function() {
		beforeEach(function() {
			this.marker = spyOn(window, 'PlayerMarker');
			controller.view = {
				playerId: 1,
				playerLat: -41.295308,
				playerLng: 174.773082,
				gameId: 4,
				playerKind: "rabbit",

				renderMapPlayerMarkers: function() {}
			}
			spyOn(controller.view, "renderMapPlayerMarkers")
			controller.createPlayerMarkers();
		})

		it("sets the player options id from info from the view", function () {

	    expect(controller.playerOptions.id).toBe(1);
	  });

	  it("sets the player options lat from info from the view", function () {
	    expect(controller.playerOptions.lat).toBe(-41.295308);
	  });

	  it("sets the player options lng from info from the view", function () {
	    expect(controller.playerOptions.lng).toBe(174.773082);
	  });

	  it("sets the player options lng from info from the view", function () {
	    expect(controller.playerOptions.game_id).toBe(4);
	  });

	  it("creates a new player marker object with the player options", function () {
	    expect(this.marker).toHaveBeenCalledWith(controller.playerOptions);
	  });

	  it("calls a render map marker object with the controllers player object", function () {
	    expect(controller.view.renderMapPlayerMarkers).toHaveBeenCalledWith(controller.player);
	  });
	})


	describe("move player marker function", function() {
		beforeEach(function() {
			controller.view = {
				moveMarker: function() {}
			}
			this.moveMarker = spyOn(controller.view, 'moveMarker');
			controller.biggestLat = -41.287971
	    controller.biggestLng = 174.785596
	    controller.smallestLat = -41.302645
	    controller.smallestLng = 174.760568

		})

		it("changes the latitude of the player positively when the up arrow is pressed", function () {
			this.event = {
			    keyCode: 38
			};
			var originalLat = controller.playerOptions.lat
			controller.movePlayerMarker(this.event);
	    expect(controller.playerOptions.lat).toBe(originalLat + 0.00008);
	  });

	  it("changes the longitude of the player positively when the right arrow is pressed", function () {
			this.event = {
			    keyCode: 39
			};
			var originalLng = controller.playerOptions.lng
			controller.movePlayerMarker(this.event);
	    expect(controller.playerOptions.lng).toBe(originalLng + 0.00008);
	  });

	  it("changes the latitude of the player negatively when the down arrow is pressed", function () {
			this.event = {
			    keyCode: 40
			};
			var originalLat = controller.playerOptions.lat
			controller.movePlayerMarker(this.event);
	    expect(controller.playerOptions.lat).toBe(originalLat - 0.00008);
	  });

	  it("changes the longitude of the player negatively when the right arrow is pressed", function () {
			this.event = {
			    keyCode: 37
			};
			var originalLng = controller.playerOptions.lng
			controller.movePlayerMarker(this.event);
	    expect(controller.playerOptions.lng).toBe(originalLng - 0.00008);
	  });

	  it("doesn't change the longitude of the player when attempting to move out of the boundary", function () {
			this.event = {
			    keyCode: 39
			};
			controller.playerOptions.lng = 174.785597
			var originalLng = controller.playerOptions.lng
			controller.movePlayerMarker(this.event);
	    expect(controller.playerOptions.lng).toBe(originalLng);
	  });

	  it("doesn't change the latitude of the player when attempting to move out of the boundary", function () {
			this.event = {
			    keyCode: 40
			};
			controller.playerOptions.lat = -41.302644
			var originalLat = controller.playerOptions.lat
			controller.movePlayerMarker(this.event);
	    expect(controller.playerOptions.lat).toBe(originalLat);
	  });

	});

	describe('Rabbit street view',function(){
  	beforeEach(function(){
  		var myView = spyOn(window, 'View');
    	controller = new PlayerController();
  	});

  	it("initializes with an endpoint to send the rabbit's position", function(){
  		expect(controller.updateRabbitUrl).toBeDefined()
  	});

  	it('sets a up rabbit location timer', function(){
  		expect(controller.setUpRabbitLocationTimer).toBeDefined()
  	});

  	it('has a send rabbit position function', function(){
  		expect(controller.sendRabbitPosition).toBeDefined()
  	});

  	describe("sendRabbitPosition", function() {
			beforeEach(function() {
				spyOn($, 'ajax');
				controller.playerOptions = {
			    lat: -41.295308,
			    lng: 174.773082,
			    id: 1,
			    game_id: 1,
			    kind: "rabbit"
				};
				controller.sendRabbitPosition();
				this.requestArgs = $.ajax.calls.argsFor(0);
			});

			it("makes a POST request", function () {
	    	expect(this.requestArgs[0].type).toEqual('POST');
	  	});

	  	it("sends the POST request to '/rabbit/update_rabbit_street_view'",function(){
	    	expect(this.requestArgs[0].url).toEqual(controller.updateRabbitUrl);
	  	})

			it("sends the correct details of the rabbit", function(){
	    	expect(this.requestArgs[0].data).toEqual(controller.playerOptions);
			});

		});


  });

});




