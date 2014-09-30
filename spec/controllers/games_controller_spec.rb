require 'rails_helper'

RSpec.describe GamesController, :type => :controller do

	describe "#create" do

		let(:send_params) {{lat: "-41.29526", lng: "174.77248"}}
    let(:params) {{centre_lat: "-41.29526", centre_lng: "174.77248", num_players: 1, active: true}}

    before do
      allow(GamesController).to receive(:get_params).and_return(send_params)
    end

    it "receives json parameters" do
      expect(Game).to receive(:new).with(params).and_call_original
      post :create, send_params
    end

    it "creates a game" do
    	expect { post :create, params }.to change {Game.count}.by(1)
    end

    it "gives the game the right params" do
    	post :create, params

    	game = Game.last
    	expect(game.centre_lat.to_s).to eq params[:centre_lat]
    	expect(game.centre_lng.to_s).to eq params[:centre_lng]
    	expect(game.num_players).to eq params[:num_players]
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
