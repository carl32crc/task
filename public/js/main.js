console.log("Hello from main.js")

$(".tasks").on("click", function(e) {
	e.preventDefault();
	console.log(this);
	var url = $(this).attr("href");
	//console.log(url);
	var $self = $(this);

	$.ajax({
		url: url,
		type: 'delete'
	})
	.done(function(msg) {
		$self.parent().remove();
	})
})

$(".completed").on("click", function(e) {
	e.preventDefault();
	console.log(this);
	var url = $(this).attr("href");
	console.log(url);

	$.ajax({
		url: url,
		type: 'put'
	})
	.done(function(msg) {
		window.location = '/tasks';
	})

})