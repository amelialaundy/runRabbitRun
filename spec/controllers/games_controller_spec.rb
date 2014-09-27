require 'rails_helper'

RSpec.describe GamesController, :type => :controller do

	describe "#create" do

		let(:params) {{game: {centre_lat: "-41.29526", centre_lng: "174.77248", num_players: "2"}}}

    it "receives json parameters" do
      expect(Game).to receive(:new).with(params[:game]).and_call_original
      post :create, params
    end

    it "creates a game" do
    	expect { post :create, params }.to change {Game.count}.by(1)
    end

    it "gives the game the right params" do
    	post :create, params

    	game = Game.last
    	expect(game.centre_lat.to_s).to eq params[:game][:centre_lat]
    	expect(game.centre_lng.to_s).to eq params[:game][:centre_lng]
    	expect(game.num_players.to_s).to eq params[:game][:num_players]
    end
	end

	describe "#show" do

		let(:game) {create(:game)}
		let(:params) { {id: game.id} }

		it "creates a player" do
			expect { get :show, params }.to change {Player.count}.by(1)
		end

	end
end


# RSpec.describe PlayersController, :type => :controller do

# 	describe 'game_status update' do

# 		let(:params) {{"id"=>"1", "lat"=>"-41.29526", "lng"=>"174.77248", "game_id"=>"1", "controller"=>"players", "action"=>"update_player_position"}}

# 		it "#update receives json from ajax" do
# 			expect(GameStatus).to receive(:update).with(params)
#       post :update_player_position, params
# 		end

# 		it "returns the game status" do
# 			allow(GameStatus).to receive(:update).and_return(true)
# 			post :update_player_position, params
# 			expect(response.body).to eq("{\"game_status\":true}")
# 		end
  
# 	end

# end
