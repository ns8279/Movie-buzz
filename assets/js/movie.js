
$(document).ready(() => {
    $('#search-form').on('submit', (e) => {
        var searchText = $('#search-text').val();
        //console.log(searchText);
        getMoviesInfo(searchText);
        e.preventDefault();
    });
});

//function to get the movies information on searching for it

var getMoviesInfo = function(searchText) {
   
    var apiKey = "13cdef0c";
    var apiUrl = "https://omdbapi.com/?apikey=" + apiKey +"&s=" + searchText;

    //make a fetch request to the api
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(response){
            //console.log(data);
            var movies = response.Search;
            var output = '';

            //function to display the output
             $.each(movies, (index, movie) => {
                output += ` 
            
                    <div class = "col m3">
                        <div class="card">
                            
                                <img src="${movie.Poster}">
                                <h6 class="card-title">${movie.Title}</h6>
                                <a onclick = "movieSelected('${movie.imdbID}')" class="btn-small teal lighten-3" href= "#"> Movie Details</a>
                            
                        </div>
                    </div>
                    
                    `;
            });
             $('#movies').html(output);
            
         });
        } 
            else {
                alert("Error:" + response.statusText);
            }   
    
    })
    .catch(function(error){
         //Notice this '.catch()' getting chained onto the end of the .then() method
        alert("unable to connect to Movie Buzz! Please try again later");
     });
   
}

 //function to pop up the selected movie
var movieSelected = function(id) {
    localStorage.setItem('movieId', id);

    //Change the page
    window.location = 'movie.html';
    return false;
}

//function to get the movie id from local storage
var getMovie = function() {
    var movieId = localStorage.getItem('movieId');
    var apiKey = "13cdef0c";
    var apiUrl = "https://omdbapi.com/?apikey=" + apiKey +"&i=" + movieId;

    //make a fetch request to the api
    fetch(apiUrl).then(function(response){
        response.json().then(function(response){
        //console.log(response);  
        var movie = response;
        //console.log(movie);
        

        //dynamically display the movie details
        var output =  ` 
            <div class = "row">

                <div class = "col m4">
                    <img src = "${movie.Poster}" class="responsive-image">
                </div>

                <div class = "col m8">
                    <h2>${movie.Title}</h2>
                    <ul class="collection">
                        <li class= "collection-item"> <strrong>Actors: </strong> ${movie.Actors}</li>
                        <li class= "collection-item"> <strrong>Genre: </strong> ${movie.Genre}</li>
                        <li class= "collection-item"> <strrong>Release Date: </strong> ${movie.Released}</li>
                        <li class= "collection-item"> <strrong>Ratings: </strong> ${movie.Rated}</li>
                        <li class= "collection-item"> <strrong>IMDB Ratings: </strong> ${movie.imdbRating}</li>
                        <li class= "collection-item"> <strrong>Director: </strong> ${movie.Director}</li>
                        <li class= "collection-item"> <strrong>Writer: </strong> ${movie.Writer}</li>             
                    </ul>
                </div>

             </div>

        
            <div class = "row">
                <div class = "card">
                    <h3> Plot </h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class = "waves-light btn-small">IMDB</a>
                    <a href=" index.html" class = "waves-light btn-small"> Go back to Search </a>
                </div>
            </div>
        
        `;
        $('#movie').html(output);

        });
    })
    .catch(function(error){
         console.log(error);
     });

}


