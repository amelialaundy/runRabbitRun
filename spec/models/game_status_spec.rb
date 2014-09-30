require 'rails_helper'

RSpec.describe GameStatus, :type => :model do

  describe "#update" do

    let(:game) { instance_double("Game", finished!: false) }
    let(:game_status) { GameStatus.new(game) }
    let(:player) { instance_double("Player", rabbit?: true) }
    let(:hunter) { create(:player, kind: "hunter")}
    # let(:hunter) { instance_double("Player", kind: "hunter") }
    let(:rabbit) { instance_double("Player", kind: "rabbit") }
    let(:proximity) { ProximityChecker.new({hunter: hunter, rabbit: rabbit})}

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

    # it "ends the game if the hunter is very close to the rabbit" do
    #   allow(player).to receive(:update_position)
    #   allow(ProximityChecker).to receive(:new).and_return(proximity)
    #   allow(proximity).to receive(:win_zone?).and_return(true)
    #   game_status.update({id: 1, lat: 3, lng: 5})
    #   expect(game).to receive(:finished!).and_return(false)
    # end

    # it "returns 'win_zone' if the hunter is very close to the rabbit" do
    #   allow(player).to receive(:update_position)
    #   result = game_status.update({id: 1, lat: 3, lng: 5})
    #   expect(result).to eq({proximity: "win_zone"})
    # end

  end

end