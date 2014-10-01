require 'rails_helper'

RSpec.describe PlayersController, :type => :controller do
	let(:params) {{
								"id"=>"1",
								"lat"=>"-41.29526",
								"lng"=>"174.77248",
								"game_id"=>"1",
								"controller"=>"players",
								"action"=>"update_player_position"
							}}
	before do
		test_game = create(:game)
	end

	describe '#update_player_position' do

		it "#update receives json from ajax" do
			expect(GameStatus).to receive(:new).with(:test_game)
      post :update_player_position, params
		end

		it "returns the game status" do
			allow(GameStatus).to receive(:update).and_return(true)
			post :update_player_position, params
			expect(response.body).to eq("{\"proximity\":true}")
		end

	end

	describe "#send_win_message" do

		xit "receives data from ajax" do
			push_db = double(:Pusher, trigger:4)
			post :send_win_message, params
		end

		xit "returns a message" do
		end
	end

end
