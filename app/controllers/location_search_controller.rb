class LocationSearchController < ActionController::Base
	def new
    sanitized_address = (params[:address]).gsub(" ", "%20")
    geocode_query = GoogleGeocode.search(sanitized_address)
    results = geocode_query['results']
    # render json: results
    # redirect_to 'games/create' 
	  end
  
end