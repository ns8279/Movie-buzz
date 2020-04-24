var inputTextEl = $('#input-search');
var searchMovieEl = $(".btn");

$(document).ready(() => {
    $('.btn').on("click", (e) => {
        inputTextElContent = inputTextEl.val();
        console.log(inputTextElContent);
        //getMovies(inputTextElContent);
        e.preventDefault();
    });
});

