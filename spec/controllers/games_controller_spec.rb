require 'rails_helper'

RSpec.describe GamesController, :type => :controller do

  describe "#create" do

    let(:send_params) do
      { data: { results: { "0" => { geometry: { location: {
         lat: "-41.29526",
          lng: "174.77248"
      }}}}}}
    end
    let(:params) {{centre_lat: "-41.29526", centre_lng: "174.77248", active:true}}

    it "receives json parameters" do
      game = double(:game, id:4)
      expect(Game).to receive(:create).with(params).and_return(game)
      post :create, send_params
    end

    context "hits the database", db:true do
      it "creates a game" do
        expect { post :create, send_params }.to change {Game.count}.by(1)
      end
    end

    it "gives the game the right params" do
      post :create, send_params

      game = Game.last
      expect(game.centre_lat.to_s).to eq params[:centre_lat]
      expect(game.centre_lng.to_s).to eq params[:centre_lng]
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


# Rabbit
# describe "#update rabbit street view" do
#   let(:params) {{
#       "lat"=>"-41.29526",
#       "lng"=>"174.77248"
#     }}

#   xit "receives an ajax POST call" do
#     expect(latlng).to receive(params["lat"],params["lng"])
#     post :update_rabbit_street_view, params
#   end

# end


# RSpec.describe PlayersController, :type => :controller do
#   let(:params) {{
#                 "id"=>"1",
#                 "lat"=>"-41.29526",
#                 "lng"=>"174.77248",
#                 "game_id"=>"1",
#                 "controller"=>"players",
#                 "action"=>"update_player_position"
#               }}
#   before do
#     test_game = create(:game)
#   end

#   describe '#update_player_position' do

#     it "#update receives json from ajax" do
#       expect(GameStatus).to receive(:new).with(:test_game)
#       post :update_player_position, params
#     end

#     it "returns the game status" do
#       allow(GameStatus).to receive(:update).and_return(true)
#       post :update_player_position, params
#       expect(response.body).to eq("{\"proximity\":true}")
#     end

#   end

#   describe "#send_win_message" do

#     xit "receives data from ajax" do
#       push_db = double(:Pusher, trigger:4)
#       post :send_win_message, params
#     end

#     xit "returns a message" do
#     end
#   end

# end