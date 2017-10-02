// We create an array of famous Girl Groups
var girlBands = ["destiny's child", "the supremes", "spice girls", "danity kane", "tlc", "en vogue", "little mix", "2ne1"]

// We create a for loop that appends a button for each string in the array
function renderButtons() {
// we empty out the buttons div each time we go though the for loop
// This prevents repeat buttons
  $("#girlGroupButtons").empty();

  for ( i = 0; i < girlBands.length; i++) {
    // we create a variable called "button"
    var button = $("<button>");

    button.addClass("girlGroup");
    button.attr("data-name", girlBands[i]);
    button.text(girlBands[i]);
    $("#girlGroupButtons").append(button);  
  }

}

renderButtons();




// When the user clicks a button, the page grabs 10 static, non animated gif images from the giphy API
// Under every gif, we display the rating
$("button").on("click", function displayGirlGroups() {
  
  var girlGroup = $(this).attr("data-name")
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + girlGroup + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"

  }).done(function(response) {
    var searchResults = response.data;

      for (i=0; i<searchResults.length; i++){
        var gifDiv = $("<div>");
        var rating = searchResults[i].rating;
        var p = $("<p>").text("This gif is rated: " + rating);
        var girlGroupGif = $("<img>");
        girlGroupGif.addClass(".gif")
        girlGroupGif.attr("src", searchResults[i].images.original_still.url);
        girlGroupGif.attr("data-state" , "still");
        girlGroupGif.attr("data-animate", searchResults[i].images.original.url)
        girlGroupGif.attr("data-still", searchResults[i].images.original_still.url)

        gifDiv.append(girlGroupGif);
        gifDiv.append(p);

        $("#girlGroups").append(gifDiv);

      }
    
    })

});

// // When the user click one of the still GIPHY images, the gif animates. 
$(".gif").on("click", function toggleAnimation(){
    var state = $(this).attr("data-state");
    console.log(state);
    

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");

    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");

    }

});

  


  

// If the user clicks the gif again, it stops playing


// We add a form that take the value from a user and pushes it to our topic array

// We create a function that clears the buttons div and repopulates it with all new buttons