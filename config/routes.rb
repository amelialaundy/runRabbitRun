Rails.application.routes.draw do

  root 'welcome#index'

  get 'games/new' => 'games#new'
  post 'games' => 'games#create'
  get 'games/:id' => 'games#show'
  post 'games/update_game_status' => 'games#update_game_status'
  post '/games/send_win_message' => 'games#send_win_message'
  post 'games/update_rabbit_street_view' => 'games#update_rabbit_street_view'

  post 'chat' => 'chat#new'

  
  

end
