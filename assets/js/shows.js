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
   
    //var apiKey = "13cdef0c";
    var apiUrl = "https://www.episodate.com/api/search?q=" + searchText;
    //var apiUrl = "https://omdbapi.com/?apikey=" + apiKey +"&s=" + searchText;

    //make a fetch request to the api
    fetch(apiUrl).then(function(response){
        response.json().then(function(response){
        //console.log(data);
        var shows = response.tv_shows;

        var output = '';

        //function to display the output
        $.each(shows, (index, show) => {
            output += ` 
            
            <div class = "col m4">
                <div class="card">
                    
                        <img src="${show.image_thumbnail_path}">
                        <h6 class="card-title">${show.name}</h6>
                        <a onclick = "movieSelected('${show.id}')" class="btn-small teal lighten-3" href= "#"> Show Details</a>
                    
                </div>
            </div>
            
            `;
        });

        $('#shows').html(output);
            
        });
    })
    .catch(function(error){
         console.log(error);
     });
   
}

 //function to pop up the selected movie
var movieSelected = function(id) {
    localStorage.setItem('showId', id);

    //Change the page
    window.location = 'show.html';
    return false;
}

//function to get the movie id from local storage
var getMovie = function() {
    var showId = localStorage.getItem('showId');
    //var apiKey = "13cdef0c";
    var apiUrl = " https://www.episodate.com/api/show-details?q=" + showId;

    //make a fetch request to the api
    fetch(apiUrl).then(function(response){
        response.json().then(function(response){
        //console.log(response);  
        var show = response.tvShow;
        //console.log(movie);
        

        //dynamically display the movie details
        var output =  ` 
            <div class = "row">

                <div class = "col m5">
                    <img src = "${show.image_thumbnail_path}" class="responsive-image">
                </div>

                <div class = "col m7">
                    <h2>${show.name}</h2>
                    <ul class="collection">
                        
                        <li class= "collection-item"> <strrong>Genre: </strong> ${show.genres}</li>
                        <li class= "collection-item"> <strrong>Release Date: </strong> ${show.start_date}</li>
                        <li class= "collection-item"> <strrong>Ratings: </strong> ${show.rating}</li>
                        <li class= "collection-item"> <strrong>Country: </strong> ${show.country}</li>   
                        <li class= "collection-item"> <strrong>Youtube Link: </strong><a href = " ${show.youtube}" target="_blank">${show.name}</a></li>         
                    </ul>
                </div>

             </div>

        
            <div class = "row">
                <div class = "card">
                    <h3> Plot </h3>
                    ${show.description}
                    <hr>
                    <a href="tvIndex.html" class = "waves-light btn-small"> Go back to Search </a>
                    <a href="index.html" class = "waves-light btn-small"> Go back to Movies </a>
                </div>
            </div>
        
        `;
        $('#show').html(output);

        });
    })
    .catch(function(error){
         console.log(error);
     });

}