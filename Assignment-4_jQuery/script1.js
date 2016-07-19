$("#do-search").on('click',function(){
    //Get data from input box
    var movieTitle = $('#movie-title').val();

    //Build our URI with the movie title
    var sURL = "http://www.omdbapi.com/?s=" + movieTitle + "&plot=short&r=json";

    //Grab our container and assign it to variable for later use
    var container = $('#container');

    $.ajax({
        method: 'GET',
        url: sURL,
        success: function(results){
            console.log("Done: ", results);
        },
        error: function(error){
            console.error('@ERROR', error);
        }
    });

});