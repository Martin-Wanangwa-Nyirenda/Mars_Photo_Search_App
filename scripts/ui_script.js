$(document).ready(function(){
    var api_key = "";
    var sol = "";
    var camera = "any";
    var jsonRes = "";

    $("#camera-selection").change(function(){
        camera = $(this).val();
    });

    $("#find-photos").click(function() {
        $("#loading-svg").show();
        sol = $("#sol-control").val();    
        console.log(camera + "vo");
        getPhotosFromAPI(sol, camera);   
    })
    
    var HttpClient = function() {
        this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( "GET", aUrl, true ); 
        anHttpRequest.send( null ); 
        }
    }

    function getPhotosFromAPI(sol, camera) {
        var url = "";
        if(camera = "any"){
            url = url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + sol
            + "&api_key=" + api_key; 
        }else{
            url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + sol + "&camera=" + camera
            + "&api_key=" + api_key;
        }
        
        var client = new HttpClient();
        client.get(url, function(response){
           jsonRes = JSON.parse(response);
           $("#loading-svg").hide();
           viewPhotos();
        }) 
    }
    
    function viewPhotos(){
        var html = "";
        for (let i = 0; i < jsonRes.photos.length; i++) {
            html += "<div class='m-2 mx-auto'><img class='image' src='" + jsonRes.photos[i].img_src + "' /></div>" 
        }
        $("#images-div").empty();
        $("#images-div").append(html);
    }
}); 



