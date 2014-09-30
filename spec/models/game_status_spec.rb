require 'rails_helper'

RSpec.describe GameStatus, :type => :model do

  describe "#update" do

    let(:game) { instance_double("Game") }
    let(:game_status) { GameStatus.new(game) }
    let(:player) { instance_double("Player", rabbit?: true) }

    before do
      allow(Player).to receive(:find).and_return(player)
    end

    it "updates the player's location" do
      expect(player).to receive(:update_position).with(lat: 3, lng: 5)
      game_status.update({id: 1, lat: 3, lng: 5})
    end

    it "returns 'irrelevent' if the player is a rabbit" do
      allow(player).to receive(:update_position)
      result = game_status.update({id: 1, lat: 3, lng: 5})
      expect(result).to eq({ proximity: "irrelevent"})
    end

    it "returns 'win_zone' if the hunter is very close to the rabbit" do
      allow(player).to receive(:update_position)
      result = game_status.update({id: 1, lat: 3, lng: 5})
      expect(result).to eq({proximity: "win_state"})
    end



  #   it "returns 'red_zone if the hunter is close to the rabbit"

  end

  # let(:options) {{id: 1, lat: -41.285114, lng: 174.775034, game_id: 1}} 
  # let(:player) { double(:player, lat: 5, lng: 6, hunter?: true) }
  # let(:game) {double(:game, :find_rabbit)}
  # subject { GameStatus.new(game) }


  # describe "#update method" do

  #   before do
  #     allow(Player).to receive(:find).with(27).and_return(player)
  #     allow(player).to receive(:update)
  #   end

    # it "finishes the game if the hunter is close enough to the rabbit" 


    # it "returns the win zone if hunter is really close to the rabbit" do
    #   hunter_position = { lat: -43.345635,lng: 173.443543 }
    #   rabbit_position = { lat: -43.345635,lng: 173.443544 }
    #   rabbit = double(:rabbit, position: rabbit_position)
    #   allow(game).to receive(:find_rabbit).and_return(rabbit)
    #   result = subject.update({id: 27}.merge(hunter_position))
    #   expect(result).to eq('win_zone')
    # end

    # it "returns the red zone if hunter is close to the rabbit" do
    #   hunter_position = { lat: -43.345635,lng: 173.443543 }
    #   # rabbit_position = { lat: -43.345635,lng: 173.443544 }
    #   # rabbit = double(:rabbit, position: rabbit_position)
      
    #   result = subject.update({id: 27}.merge(hunter_position))
    #   expect(result).to eq('red_zone')
    # end

    # it "updates the player's location" do
    #   expect(player).to receive(:update).with(lat: -43.345635,lng: 173.443543)
    #   subject.update(id: 27, lat: -43.345635,lng: 173.443543)
    # end

  # end

  

end