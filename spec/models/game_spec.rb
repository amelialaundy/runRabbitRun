require 'rails_helper'

RSpec.describe Game, :type => :model do

  let(:game) { create(:game) }

  describe "get_random_lat" do
    it "returns a random latitude within 0.005 of centre" do
      expect(game.get_random_lat).to be_within(0.007337).of(41.295260)
    end
  end

  describe "get_random_lng" do
    it "returns a random longtitude within 0.005 of centre" do
      expect(game.get_random_lng).to be_within(0.012514).of(174.772480)
    end
  end

  describe "mark_as_rabbit?" do
    it "gives the player who starts the game the 'rabbit' kind" do
      expect(game.mark_as_rabbit?).to eq('rabbit')
    end

  end

end
