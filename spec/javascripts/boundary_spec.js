describe("BoundaryModel", function(){

  beforeEach(function(){
    mapCentre = [41.32445,-172.30542]
    bounds = new Boundary(mapCentre, "player")
  });

  describe("on initialize",function(){

    it("separates longitude into its own variable", function(){
      expect(bounds.centreLat).toEqual(mapCentre[0])
    })

    it("separates latitude into its own variable", function(){
      expect(bounds.centreLng).toEqual(mapCentre[1])
    })
  })

  describe("#setMapLimits",function(){

    beforeEach(function(){
      latspan = 0.003882
      lngspan = 0.007397
      mapCentre = [41.32445,-172.30542]
      bounds = new Boundary(mapCentre, "player")
      bounds.setMapLimits()
    });

    it("sets biggest lat as predefined distance from centre", function() {
      expect(bounds.mapLimits.biggestLat).toEqual(mapCentre[0]+latspan);
    });

    it("sets biggest lng as predefined distance from centre", function() {
      expect(bounds.mapLimits.biggestLng).toEqual(mapCentre[1]+lngspan);
    });

    it("sets smallest lat as predefined distance from centre", function() {
      expect(bounds.mapLimits.smallestLat).toEqual(mapCentre[0]-latspan);
    });

    it("sets smallest lng as predefined distance from centre", function() {
      expect(bounds.mapLimits.smallestLng).toEqual(mapCentre[1]-lngspan);
    });
  });

  describe("#checkWithinLimits",function(){

    beforeEach(function(){
      latspan = 0.003822
      lngspan = 0.007397
      mapCentre = [41.32445,-172.30542]
      var player = {options: {lat:41.32445,lng:-172.30542}}
      bounds = new Boundary(mapCentre, player)
      bounds.setMapLimits()

    });



    it("is defined", function(){
      expect(bounds.checkWithinLimits).toBeDefined();
    })

    it("returns false when passed a faraway latitude", function(){
      var badvector = [2,0]
      expect(bounds.checkWithinLimits(badvector)).toBe(false)
    })

    it("returns false when passed a faraway longitude", function(){
      var badvector = [0,432]
      expect(bounds.checkWithinLimits(badvector)).toBe(false)
    })

    it("returns false when passed a to faraway latlng", function(){
      var badvector = [-2,-2]
      expect(bounds.checkWithinLimits(badvector)).toBe(false)
    })

    it("returns true when player lands in boundary", function(){
      var goodVector = [0,0]
      expect(bounds.checkWithinLimits(goodVector)).toBe(true)
    })

  })

})
