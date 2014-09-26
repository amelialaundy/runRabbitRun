require 'rails_helper'

RSpec.describe PlayerController, :type => :controller do

	describe 'database updated' do

		it "" do
      post :update_player_position, {id: 1, lat: -41.295260, lng: 174.772480, game_id: 1}

		end
  
	end

end
