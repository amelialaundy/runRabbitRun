# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :game do
    centre_lat 1
    centre_long 1
    num_players 1
    active false
  end
end
