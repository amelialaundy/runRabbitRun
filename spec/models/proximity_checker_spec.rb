require 'rails_helper'

RSpec.describe ProximityChecker, :type => :model do

	describe "#new" do
		
		it "initializes with a hunter object" do
			hunter = build(:player)
			proximity_checker = ProximityChecker.new(hunter: hunter)
			expect(proximity_checker.hunter.kind).to eq("hunter")
		end

		it "initializes with a rabbit object" do
			rabbit = build(:player, kind: "rabbit")
			proximity_checker = ProximityChecker.new(rabbit: rabbit)
			expect(proximity_checker.rabbit.kind).to eq("rabbit")
		end

	end

end