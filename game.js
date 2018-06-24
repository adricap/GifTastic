var heroes = ["Captain America", "Hulk", "Iron Man", "Thor"];

function displayHeroes() {
    var hero = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

    $.ajax({
        url:queryURL,
        method:'GET'
    })
    .done(function(response){
        console.log(response);
        $("#heroesView").empty();
        
        results = response.data;
        for (var i=0; i<results.legth; i++) {
            var rating = results[i].rating;
            var heroImage = results[i].images.fixed_height.url;
            var heroStill = results[i].images.fixed_height_still.url;

            var image = $("<img>");
            var p = $("<p id='rating'>" + "Rating: " + rating + "</p>");

            image.attr('src', heroStill);
            image.attr('alt', 'hero');
            image.attr('data-state', 'still');
            image.attr('data-still', heroStill);
            image.attr('data-animate', heroImage);

            $("#heroesView").prepend(image,p);
            checkState();
            
        }
    });
}
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < heroes.length; i++) {
        var newButton =$("<button>");
        newButton.addClass("newHero");
        newButton.attr("data-name", heroes[i]);
        newButton.text(heroes[i]);
        $("#buttons-view").append(newButton);
    }
}

$("#add-hero").on("click", function() {
    event.preventDefault();
    var newHero = $("#hero-input").val().trim();
    heroes.push(newHero);
    renderButtons();

})

$(document).on("click", ".newHero", displayHeroes);
renderButtons();

function checkState() {
    image.on('click', function(){
        var state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', $(this).data('animate'));
        } 
        else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
};