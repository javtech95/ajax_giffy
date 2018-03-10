
    var array = ["Wolf", "One Tree Hill", "Tide add", "Klaus", "kill bill", "Overwatch", "one piece", "Tennis", "naruto", "supernatural"];

    // FUNCTION FOR GIF'S
    function shoGif() {
    	var giffy = $(this).data("name");
    	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1HNqKE2k9BsiRH416pDBMW86AoRHv3Sk&q="+giffy+"&limit=10";

    	$.ajax ({
    	      url: queryURL,
    	      method: "GET"
    	}).then(function(response) {
    			console.log(response);

    			var results = response.data;
    			$("#gifContent").empty();
    			$("#gifContent").append("<h2>" + giffy + " Gifs:");
    			$("#gifContent").append('<hr>');


    			for (var i = 0; results.length; i++) {
    				var gifDiv = $("<div>");
    				gifDiv.addClass("gifImg");
    	            var p = $("<p>").text("Rating: " + results[i].rating);
    	            var imgURL = results[i].images.fixed_height_still.url;
    	            var image = $("<img>").attr("src", imgURL);
    	            image.addClass("giph container");


    	            // Still Setting
    	            var stillURL = results[i].images.fixed_height_still.url;
    	            image.attr("data-still", stillURL);

    	            // Animate Setting
    	            var animateURL = results[i].images.fixed_height.url;
         			image.attr("data-animate", animateURL);

         			// Start Still
         			image.attr("data-state", "still");

    	            gifDiv.append(p);
    	            gifDiv.append(image);
    	            $("#gifContent").append(gifDiv);


    			}
    		})
    }

    //CLICK FUNCTION FOR STILL /ANIMATE GIFS
    function clicka() {
    		var state = $(this).attr("data-state");
    		if (state == "still") {
    			$(this).attr("src", $(this).attr("data-animate"));
    			$(this).attr("data-state", "animate");
    		}else {
    			$(this).attr("src", $(this).attr("data-still"));
    			$(this).attr("data-state", "still");
    		}
    }
    console.log(clicka);

    // FUNCTION TO APPEND BUTTONS WITH ARRAY
    function createBtn() {
    	//Prevents array from repeating after gif input
    	$("#gifBtns").empty();
    	//Loops through the array
    	for (var i = 0; i < array.length; i++) {
    		var button = $("<button>");
    		button.addClass("gif");
    		button.attr("data-name", array[i]);
    		button.text(array[i]);
    		var glyph = $(" <span /> ");
    		glyph.addClass("glyphicon glyphicon-fire")
    		button.prepend(glyph);
    		$("#gifBtns").append(button);

    	}
    }

    //Calls Inital Array as Btns
    createBtn();

    // EVENT FOR WHEN BUTTON IS CLICKED
    $("#add-gif").on("click", function(event) {
        //event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        //This line will grab the text from the input box
        var giffy = $("#gif-input").val().trim();

        //The value from the textbox is then added to our array
        array.push(giffy);
        //input erased
        $("#gif-input").val("");

        createBtn();
    })

    $(document).on("click", ".gif", shoGif);
    $(document).on("click", ".giph", clicka);





