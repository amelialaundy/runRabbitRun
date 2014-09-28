require 'rails_helper'
describe "the start new game process", :type => :feature do

  it "starts a new game" do
    visit '/'
    click_button 'Play New Game in Wellington'
    expect(page).to have_css '#map-canvas'
  end

  it "displays a list of current games" do
    visit '/'
    expect(page).to have_css '#open-games'
  end
end

