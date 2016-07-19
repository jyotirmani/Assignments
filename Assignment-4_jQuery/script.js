$(document).ready(function(){

		$("#do-search").on('click', function(){

		//Get data from input box
		var searchTitle = $('#movie-title').val();

		//Build our URI with the movie title
		var sURL = "http://www.omdbapi.com/?s=" + searchTitle + "&y=&plot=short&r=json";

		//Grab our container and assign it to variable for later use
		var container = $('#container');

		//clear search results if any
		container.empty();
		
		//use ajax call to access
		$.ajax({
			method: 'GET',
			url: sURL,
			success: function(results){
				// console.log("Done: ", results);
				var movies= results.Search;
				for (var i = 0; i< movies.length; i++) {
					container.append('<li><img src="' +movies[i].Poster + '"/></li>'+
						'<li>' + movies[i].Title + '</li>' +
						'<li>' + movies[i].Type + '</li>' +
						'<li>' + movies[i].Year + '</li>');

				}
			},
			error: function(error){
				console.error('@ERROR', error);
			}
		});

	});//End search
})