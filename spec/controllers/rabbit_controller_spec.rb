require 'rails_helper'

RSpec.describe RabbitController, :type => :controller do

  describe "#update rabbit street view" do
    let(:params) {{
        "lat"=>"-41.29526",
        "lng"=>"174.77248"
      }}

    xit "receives an ajax POST call" do
      expect(latlng).to receive(params["lat"],params["lng"])
      post :update_rabbit_street_view, params
    end

  end

end
