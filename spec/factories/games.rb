# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :game do
    centre_lat 41.295260
    centre_lng 174.772480
    num_players 1
    active false
  end
end
