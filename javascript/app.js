//Starting elemetns in array 
var inputs = ["doneky Leather", "messi miss", "drama Queen"];
//Starting buttons
displaybuttons();

// creates button when user types in smth in text field and hits submit
$('#addBtn').click( function (event){ 
    $('#buttons').empty();  
    event.preventDefault();
    var textInput = $('#textInput').val();
    if(textInput == ''){
        alert('Please enter text');
    }else{
        inputs.push(textInput);
        displaybuttons();  
        $('#textInput').val('');
    }
});

//function to get gif from Giphy website
function getGif(searchFor){
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + searchFor;

    $.ajax({
        url: queryURL,
        method : 'GET'
    }).then( function (response){
        var numberOfGifs = Object.keys(response.data).length;
        if(numberOfGifs > 0){
            var  gifUrlStill = response.data.images.original_still.url;
            var gifUrlAnimited = response.data.images.original.url;

            var dispalyImage = $('<img />',{
                height: '400px',
                width: '286px',
                margin: '10px',
                src : gifUrlAnimited,
                class: 'gifClass',
                data_animate: gifUrlAnimited,
                data_still: gifUrlStill
            });
        $('#gifsPanel').prepend(dispalyImage);
        }else{
            alert("No gifs found, please search with another keyword");
        }
    });
}

//Function to display buttons
function displaybuttons(){
    for(var i = 0; i < inputs.length; i++){
        var newButton = $('<input />',{
                type : 'button',
                id  : 'btn'+[i],
                value : inputs[i],
                class : 'btn btn-primary gifButtons',
                on: {
                    click: function(){
                        var searchFor = this.value;
                        getGif(searchFor);
                    }
                }
        });
        $('#buttons').append(newButton);
    }
}

//Stops and starts giffs
 $(function(){
    $(document).on('click', '.gifClass', function(){
    var dataAnimate = $(this).attr("data_animate");
    var dataStill = $(this).attr("data_still");
    var src = this.src;
    if(this.src == dataAnimate){
        this.src = dataStill;
    }else{
        this.src = dataAnimate;
    }
    });
 });
