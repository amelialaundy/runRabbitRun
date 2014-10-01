require 'rails_helper'

RSpec.describe Coordinate, :type => :model do

	describe "#initialize" do

		context "when passed valid parameters" do 

			let(:coordinate) { Coordinate.new(lat: 2, lng: 4) }

			it "initializes with a lat" do
				expect(coordinate.lat).to eq(2)
			end

			it "initializes with a lng" do
				expect(coordinate.lng).to eq(4)
			end

		end

		context "when passed invalid parameters" do

		  it "returns an error message when incorrect parameters are passed in" do
		  	expect { Coordinate.new }.to raise_error
		  end

		  it "returns an error when only a hunter is passed in" do
		  	hunter = build(:player, kind: "hunter")
		  	expect { Coordinate.new({ lat: 2 }) }.to raise_error
		  end

		  it "returns an error when only a rabbit is passed in" do
		  	rabbit = build(:player, kind: "rabbit")
		  	expect { Coordinate.new({ lng: 2 }) }.to raise_error
		  end

		end

	end

end