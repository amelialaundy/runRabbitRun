require 'rails_helper'

  RSpec.describe WelcomeController, :type => :controller do

  describe "#index" do

    it "Acts as the home page" do
      expect(:get => "/").to route_to(
        :controller => 'welcome',
        :action => 'index')
    end

    it "assigns @games" do
      game = Game.create( active:true)
      get :index
      expect(assigns(:games)).to eq([game])
    end

  end

end
