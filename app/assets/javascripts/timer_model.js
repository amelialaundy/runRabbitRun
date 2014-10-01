function Timer(interval, url, player, callback) {
	this.player = player
	this.url = url
	this.callback = callback
	this.locationTimer = setInterval(this.sendPosition.bind(this), interval)


}

Timer.prototype = {
	sendPosition: function() {
		$.ajax({
			type: 'POST',
			url: this.url,
			data: this.player.options,
			success: this.callback 
		})
	}
}