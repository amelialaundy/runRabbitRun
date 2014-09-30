require 'rails_helper'

RSpec.describe Player, :type => :model do
  
	describe "#update_position" do

		let(:position) { {lat: 4, lng: 6} }

		it "updates the player's lat" do
			subject.update_position(position)
			expect(subject.lat).to eq(4)
		end

		it "updates the player's lng" do
			subject.update_position(position)
			expect(subject.lng).to eq(6)
		end

		it "saves to the database" do
			expect(subject).to receive(:save)
			subject.update_position(position)
		end

	end

	describe "#rabbit?" do 

		it "returns false if the player is not a rabbit" do
			player = Player.new(kind: "hunter")
			expect(player.rabbit?).to eq(false)
		end

		it "returns true if the player is a rabbit" do
			player = Player.new(kind: "rabbit")
			expect(player.rabbit?).to eq(true)
		end

	end

end
