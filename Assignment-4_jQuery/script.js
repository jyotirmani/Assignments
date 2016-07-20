$("#do-search").on('click', function(){

		//Get data from input box
		var searchTitle = $('#movie-title').val();

		//Build our URI with the movie title
		var sURL = "http://www.omdbapi.com/?s=" + searchTitle;

		//Grab our container and assign it to variable for later use
		var container = $('#container');

		//clear search results if any
		container.empty();
		
		//use ajax call to access
		$.ajax({
			method: 'GET',
			url: sURL,
			success: function(results){
				 console.log("Done: ", results);
				var movies= results.Search;
				for (var i = 0; i< movies.length; i++) {
					var info='<tr><td>'+movies[i].Title+'</td><td>'+
										movies[i].Type+'</td><td>'+
										movies[i].imdbID+'</td><td>'+
										movies[i].Year+'</td><td>'+
										'<img src='+movies[i].Poster+'></td></tr>';
          			 $(info).appendTo('#table');  	
				}
			}
		});
})