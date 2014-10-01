require 'rails_helper'

RSpec.describe ProximityChecker, :type => :model do

	describe "#new" do

		context "when passed in valid parameters" do 

			let(:hunter) { build(:player, kind: "hunter") }
			let(:rabbit) { build(:player, kind: "rabbit") }
			let(:proximity_checker) { ProximityChecker.new({ hunter: hunter, rabbit: rabbit }) }
	 		
	 		before do
	 			allow(Coordinate).to receive(:new)
	 		end

			it "initializes with a hunter object" do 
				allow(Coordinate).to receive(:new)
				expect(proximity_checker.hunter.kind).to eq("hunter")
			end

			it "initializes with a rabbit object" do
				expect(proximity_checker.rabbit.kind).to eq("rabbit")
			end

		end

		context "when passed in invalid parameters" do

			before do
				allow(Coordinate).to receive(:new)
			end

			it "returns an error message when incorrect parameters are passed in" do
				expect {ProximityChecker.new()}.to raise_error
			end

			it "returns an error when only a hunter is passed in" do
				hunter = build(:player, kind: "hunter")
				expect {ProximityChecker.new({ hunter: hunter })}.to raise_error
			end

			it "returns an error when only a rabbit is passed in" do
				rabbit = build(:player, kind: "rabbit")
				expect {ProximityChecker.new({ rabbit: rabbit })}.to raise_error
			end

		end

	end

	describe "#distance_between_hunter_and_rabbit" do

		it "returns a distance of 34.0" do
			hunter = build(:player, kind: "hunter", lat: 1, lng: 5)
			rabbit = build(:player, kind: "rabbit", lat: 6, lng: 8)
			proximity_checker = ProximityChecker.new({ hunter: hunter, rabbit: rabbit })
			expect(proximity_checker.distance_between_hunter_and_rabbit).to eq(34.0)
		end 

		it "returns a distance of 18.0" do
			hunter = build(:player, kind: "hunter", lat: 7, lng: 12)
			rabbit = build(:player, kind: "rabbit", lat: 4, lng: 9)
			proximity_checker = ProximityChecker.new({ hunter: hunter, rabbit: rabbit })
			expect(proximity_checker.distance_between_hunter_and_rabbit).to eq(18.0)
		end 

	end

	describe "#zone" do

		it "indicates that the game is over if the hunter is very close to the rabbit" do
			hunter = double("hunter")
			rabbit = double("rabbit")
			proximity_checker = ProximityChecker.new({ hunter: hunter, rabbit: rabbit })
			allow(proximity_checker).to receive(:distance_between_hunter_and_rabbit).and_return(0.00000024)
			proximity_checker.zone
			expect(proximity_checker.win).to eq(true)
		end

	end

end