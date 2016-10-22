
var apikey = "mefey87fb8k8r3b2zdp4v72g";
var baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";

// construct the uri with our apikey
var moviesSearch = baseUrl + '/movies.json?apikey=' + apikey;
var searchMovie;
var movieId;


$(document).ready(function() {
 $('#search-mini').keypress(function(e){	 
 		
	 if(e.which == 13 && $("#search-mini").val() ==""){ // Kollar om värde finns i sökfältet och enter
	 	 alert("Du måste söka efter en film");

	 }
	 if(e.which == 13 && $("#search-mini").val() !=""){ // kollar om värde finns och enter är tryckt
		$.mobile.changePage($('#movies'), 'slideup');
		$.mobile.loading( 'show' );
		searchFilm();

	 }
	
	function searchFilm(){ // Kollar värdet i sökfältet och söker med ajax & json söker efter värdet
		searchMovie= $("#search-mini").val().trim();
		  // send off the query
	  $.ajax({
		url: moviesSearch + '&q=' + searchMovie + '&page_limit=10',
		dataType: "jsonp",
		error: function(xhr, ajaxOptions, thrownError) {
		  alert("Något blev fel");
		 },
		success: searchCallb
	  });
  
  
	 }
		
});
   

// callback for when we get back the results
function searchCallb(data) {
 var resultat=""; 
 var movies = data.movies;
 
 if(movies ==""){
	 $(".search").html("Ingen film matchade ditt sökord");
 }
 else{
 	 $(".search").html("Filmer som hittades");

 $.each(movies, function(index, movie) { // loopar igenom alla resultat som fanns
    
	movieId =movie.id;
  	resultat += '<li class="similar" name="'+movieId+'"><a href="#">' + '<img src="' + movie.posters.thumbnail + '" class="floatLeft"/>' + '<h1>' + movie.title  + '  (' + movie.year + ')</h1><p>' + movie.synopsis + '</p></a></li>';
 
 });
 }
//visa resultatet i div-taggen lista
	$.mobile.loading( 'hide' );
	$("#searchLista").html(resultat); // Skriver ut resultat i listan
 	$("#searchLista").listview().listview("refresh"); 
	clickItem();
 

}

function clickItem(){ // Vid click på någon av listelementen
	
	$(".similar").click(function() {	
	$.mobile.changePage($('#movieInformation'), 'slide');
		var itemKey = $(this).attr("name");
   		$.mobile.loading( 'show' );
		   similarMovies(itemKey);
		   about(itemKey);

});
}

function about (itemKey){ // Sökvägen för information om filmen, för att söka ut info
	var about = baseUrl + '/movies/' + itemKey + '.json?apikey=' + apikey;
	
	$.ajax({
    url: about,
    dataType: "jsonp",
	error:function(xhr, ajaxOptions, thrownError) {
      alert("Något blev fel när sökningen efter film genomfördes");},
    success: searchCallba
  });
}
	function searchCallba(data) { // Skriver ut resultatet
	var svar = "";
	 svar += '<img src="' + data.posters.thumbnail + '" class="floatLeft"/>' + '<h3>' + data.title + ' (' + data.year + ')</h3><p>' + data.genres + '</p><p class="in">' + data.synopsis + '</p>';
$('.info').html(svar);
	$.mobile.loading( 'hide' );

	}



function similarMovies(itemKey){ //söker efter liknande filmer
	var similar =  baseUrl + '/movies/' + itemKey +'/similar.json?apikey=' + apikey;
	$.ajax({
    url: similar,
    dataType: "jsonp",
	error:function(xhr, ajaxOptions, thrownError) {
      alert("Något blev fel med din sökning");},
    success: searchCallback
  });
}

function searchCallback(datan) { // loopar igenom svaren som finns och skriver ut lista med liknande filmer
 	var result=""; 
	var movies = datan.movies;
	
	if(movies == ""){
		$(".lika").html("Tyvär fanns det inga liknanade filmer");
	}
	else{
		$(".lika").html("Liknande filmer");

		$.each(movies, function(index, movie) {
  	
	result += '<li>' + '<img src="' + movie.posters.thumbnail + '" class="floatLeft"/>' + '<h1 class>' + movie.title + ' (' + movie.year + ')</h1></li>';
 
	});
}
//visa resultatet i div-taggen lista
	$.mobile.loading( 'hide' );

 	$("#similarList").html(result);
	$("#similarList").listview().listview("refresh");  
}

});