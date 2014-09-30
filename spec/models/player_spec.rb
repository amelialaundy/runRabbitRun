require 'rails_helper'

RSpec.describe Player, :type => :model do
  
	describe "#update_position" do

		let(:position) { {lat: 4, lng: 6} }
		let(:update) { subject.update_position(position) }

		it "updates the player's lat" do
			update
			expect(subject.lat).to eq(4)
		end

		it "updates the player's lng" do
			update
			expect(subject.lng).to eq(6)
		end

		it "saves to the database" do
			expect(subject).to receive(:save)
			update
		end

	end

	describe "#rabbit?" do 

		it "returns false if the player is not a rabbit" do
			player = build(:player, kind: "hunter")
			expect(player.rabbit?).to eq(false)
		end

		it "returns true if the player is a rabbit" do
			player = build(:player, kind: "rabbit")
			expect(player.rabbit?).to eq(true)
		end

	end

end
