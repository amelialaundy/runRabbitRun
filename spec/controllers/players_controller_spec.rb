require 'rails_helper'

RSpec.describe PlayersController, :type => :controller do

	describe '#update_player_position' do

		let(:params) {{"id"=>"1", "lat"=>"-41.29526", "lng"=>"174.77248", "game_id"=>"1", "controller"=>"players", "action"=>"update_player_position"}}

		it "#update receives json from ajax" do
			expect(GameStatus).to receive(:update).with(params)
      post :update_player_position, params
		end

		it "returns the game status" do
			allow(GameStatus).to receive(:update).and_return(true)
			post :update_player_position, params
			expect(response.body).to eq("{\"proximity\":true}")
		end
  
	end

end
