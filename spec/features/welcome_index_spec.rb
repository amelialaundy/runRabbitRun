require 'rails_helper'
describe "the start new game process", :type => :feature do


  it "displays a list of current games" do
    visit '/'
    expect(page).to have_css '#open-games'
  end
end

