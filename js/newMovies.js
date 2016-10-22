var apikey = "mefey87fb8k8r3b2zdp4v72g";
var baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";

// construct the uri with our apikey
var moviesSearchUrl = baseUrl + '/lists/movies/in_theaters.json?apikey=' + apikey + '&page_limit=10';
var searchMovie;

$(document).ready(function() {         
      // send off the query
  $.ajax({
    url: moviesSearchUrl,
    dataType: "jsonp",
    success: searchCallback
  });
    
    });

// callback for when we get back the results
function searchCallback(data) {
var resultat ="";

 var movies = data.movies;
 $.each(movies, function(index, movie) {
resultat += '<li><img src="' + movie.posters.thumbnail + '" class="floatLeft"/>' + '<h1>' + movie.title  + '  (' + movie.year + ')</h1><p>' + movie.synopsis + '</p></a></li>';
 
 });
//visa resultatet i div-taggen lista
 	$("#lista").html(resultat);
 	$("#lista").listview().listview("refresh"); 


}