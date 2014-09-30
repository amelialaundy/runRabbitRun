class ChatController < ApplicationController

	def new
		File.open("../../../pusher-realtime-chat-widget/src/ruby-sinatra/chat.rb", "r+")
	end
end