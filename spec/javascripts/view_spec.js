describe("View", function() {
  var view = null;

  describe("attrbutes on initialize", function() {

    beforeEach(function() {
      spyOn(DomManager, 'getDivContents')
      DomManager.getDivContents = function(){
        return {
          plId: 1,
          plLat: -41.295308,
          plLng: 174.773082,
          plGameId: 1,
          kind: "rabbit"
        }
      };
      view = new View();
    });

    it("sets latitude attribute ", function () {
      expect(view.lat).not.toBe(null);
    });

    it("sets longitude attribute", function () {
      expect(view.lng).not.toBe(null);
    });

    it("calls DomManager.getDivContents", function () {
      expect(DomManager.getDivContents).toHaveBeenCalled();
    });
  })
});