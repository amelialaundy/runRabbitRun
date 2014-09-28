class StreetView
  base_uri =  "http://maps.googleapis.com/maps/api/streetview?size=400x400&location="

  def self.street_view(lat,lng)
    "#{base_uri}#{lat},#{lng}"
  end
end
