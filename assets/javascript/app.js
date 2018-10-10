var topics = "cars";
var cars = [];
// var queryURL = "https://api.giphy.com/v1/gifs/search?";
// var queryParams = { "apikey" : "JE0pt5Rejzn2NgWYoWWwxJG0uqgr43Eb"}
var api_key = "JE0pt5Rejzn2NgWYoWWwxJG0uqgr43Eb";
// var api_key = "dc6zaTOxFJmzC";

function getCarGiphies() {
  var carName = $(this).attr("data-name");
  var limit = "10";

  console.log(carName);
  // // Make call to giphy
  var queryURL git=
    "http://api.giphy.com/v1/gifs/search?q=" +
    carName +
    "&api_key=" +
    api_key +
    "&limit=" +
    limit;

  // AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Storing an array of results in the results variable
    var results = response.data;

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {
      // Get static non-animated gif images

      // Only taking action if the photo has an appropriate rating
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        // Creating a button for the gif
        var gifBtn = $("<button>");
        gifBtn.attr("id", "btn");
        // Storing the result item's rating
        var rating = results[i].rating;
        var capRating = rating.toUpperCase();
        // Creating a paragraph tag with the result item's rating
        // Under every gif, display its rating (PG, G, so on).
        var p = $("<p>").text("Rating: " + capRating);

        // Creating an image tag
        var carImage = $("<img>");
        carImage.addClass("gif");

        //initial state //still
        carImage.attr("data-state", "still");
        carImage.attr("src", results[i].images.fixed_height_still.url);
        carImage.attr("data-still", results[i].images.fixed_height_still.url);
        //anitmated
        carImage.attr("data-animate", results[i].images.fixed_height.url);

        // Append img and p to "gifBtn"
        gifBtn.append(carImage);
        gifBtn.append(p); // Under every gif, display its rating (PG, G, so on).

        // Prepending gifBtn to car-btns-view on DOM
        $("#car-btns-view").prepend(gifBtn);
      }
    }
  });
}

function changeGifState() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}
// Function for creating car buttons
function createBtns() {
  // Delete car buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#car-view").empty();
  // Loop array of cars
  for (var i = 0; i < cars.length; i++) {
    // Create button car in array.
    var btn = $("<button>");
    btn.addClass("cars");
    btn.attr("id", "car-" + i);
    // Add data-name car at index i
    btn.attr("data-name", cars[i]);
    // Providing the button's text car at index i
    btn.text(cars[i]);
    // Add  button to DOM
    $("#car-view").append(btn);
  }
}

function clear() {
  $("#car-btns-view").empty();
  $("#instruction").show();
}

// get user input of car push to array then send to createBtns
$("#add-car").on("click", function(event) {
  event.preventDefault();
  // This line will grab the text from the input box
  var car = $("#user-input")
    .val()
    .trim();
  // The car is added to car array
  cars.push(car);
  createBtns();
  $("#user-input").val(" ");
  $("#instruction").hide();
});

// When clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// Click button
$(document).on("click", ".cars", getCarGiphies);

// When the user clicks one of the still GIPHY images, the gif should animate.
// If the user clicks the gif again, it should stop playing./
// CURRENTLY this is NOT WORKING
$(document).on("click", ".gif", changeGifState);

// .on("click") function  with the clear car buttons from DOM
$("#clear-cars").on("click", clear);

// Call createBtns function to display initial list of cars
createBtns();
