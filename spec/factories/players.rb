# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :player do
    kind "hunter"
    lat -41.295260
    lng 174.772480
  end
end