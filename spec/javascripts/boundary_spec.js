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
      latspan = 0.003822
      lngspan = 0.007397
      mapCentre = [41.32445,-172.30542]
      bounds = new Boundary(mapCentre, "player")
      bounds.setMapLimits()
    });

    it("sets biggest lat as predefined distance from centre", function() {
      expect(bounds.biggestLat).toEqual(mapCentre[0]+latspan);
    });

    it("sets biggest lng as predefined distance from centre", function() {
      expect(bounds.biggestLng).toEqual(mapCentre[0]+lngspan);
    });

    it("sets smallest lat as predefined distance from centre", function() {
      expect(bounds.smallestLat).toEqual(mapCentre[0]-latspan);
    });

    it("sets smallest lng as predefined distance from centre", function() {
      expect(bounds.smallestLng).toEqual(mapCentre[0]-lngspan);
    });
  });

  describe("#checkWithinLimits",function(){

    beforeEach(function(){
      latspan = 0.003822
      lngspan = 0.007397
      mapCentre = [41.32445,-172.30542]
      bounds = new Boundary(mapCentre, "player")
      bounds.setMapLimits()
    });

    it("is defined", function(){
      expect(bounds.checkWithinLimits).toBeDefined();
    })

  })

})
