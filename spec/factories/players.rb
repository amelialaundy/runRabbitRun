# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :player do
    kind "MyString"
    lat 1
    lng 1
  end
end
