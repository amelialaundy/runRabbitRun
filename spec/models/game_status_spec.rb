require 'rails_helper'

RSpec.describe GameStatus, :type => :model do

  describe "#update" do

    let(:game) { instance_double("Game") }
    let(:game_status) { GameStatus.new(game) }
    let(:player) { instance_double("Player") }
    let(:game_status_update) { game_status.update({id: 1, lat: 3, lng: 5}) }

    before do
      allow(Player).to receive(:find).and_return(player)
      allow(player).to receive(:update_position)
    end 

    context "player is a rabbit" do

      before do
        allow(player).to receive(:rabbit?).and_return(true)
      end

      it "updates the player's location (for rabbit and hunter)" do
        expect(player).to receive(:update_position).with(lat: 3, lng: 5)
        game_status_update
      end

      it "returns 'irrelevent' if the player is a rabbit" do
        expect(game_status_update).to eq({ proximity: "irrelevent"})
      end

    end

    context "player is a hunter" do

      let(:proximity) { instance_double("Proximity", win?: true) } 

      before do
        allow(player).to receive(:rabbit?).and_return(false)
        allow(game).to receive(:find_rabbit)
        allow(ProximityChecker).to receive(:new).and_return(proximity)
        allow(proximity).to receive(:zone).and_return("win")
      end

      it "ends the game if the hunter is very close to the rabbit" do
        expect(game).to receive(:finished!)
        game_status_update
      end

      it "returns 'win_zone' if the hunter is very close to the rabbit" do
        allow(game).to receive(:finished!)
        expect(game_status_update).to eq({proximity: "win"})
      end

    end

  end

end