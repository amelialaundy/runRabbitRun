require 'rails_helper'

RSpec.describe GameStatus, :type => :model do

  let(:options) {{id: 1, lat: -41.285114, lng: 174.775034, game_id: 1}} 

  describe "#update method" do
    it "calls player location method with args" do
      allow(GameStatus).to receive(:player_location).with(options)
      allow(GameStatus).to receive(:proximity_to_rabbit?)
      expect(GameStatus).to receive(:player_location).with(options)
      GameStatus.update(options)
    end

    it "calls proximity_to_rabbit? method with args" do
      allow(GameStatus).to receive(:player_location).with(options)
      allow(GameStatus).to receive(:proximity_to_rabbit?)
      expect(GameStatus).to receive(:proximity_to_rabbit?).with(options[:game_id])
      GameStatus.update(options)
    end

    it "receives true back from proximity_to_rabbit? method" do
      allow(GameStatus).to receive(:player_location).with(options)
      allow(GameStatus).to receive(:proximity_to_rabbit?)
      expect(GameStatus).to receive(:proximity_to_rabbit?).with(options[:game_id]).and_return(true)
      GameStatus.update(options)
    end
  end

  

end