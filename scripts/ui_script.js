$(document).ready(function(){
    const api_key = "a8MiSOcIlGh3beHhAvF2ehJQ4ZAfRnjBp19wSg9x";//Add api key from Nasa
    let sol = "";
    let camera = "any";
    let jsonRes = "";

    $("#camera-selection option[value=any]").attr("selected", "selected");

    $("#camera-selection").change(function(){
        camera = $(this).val();   
    });

    $("#find-photos").click(function() {
        $("#images-div").empty();
        $("#loading-svg").show();
        sol = $("#sol-control").val();    
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
        jsonRes = "";
        if(camera == "any"){
            url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + sol
            + "&api_key=" + api_key;
            
        }else if(camera != "any"){
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
        
        let html = "";
        let image_url = "";
        if(jsonRes.photos.length == 0){
            html += "<div class='m-2 mx-auto'>No Photos Found!</div>" ;
            $("#images-div").append(html);
            return;  
        }
        for (let n = 0; n < 20; n++) {
            
            if(jsonRes.photos[n] == null)
                break;
            
            image_url = getPhoto(jsonRes.photos, n);
            html += "<div class='m-2 mx-auto'><img class='image' src='" + image_url + "' /></div>" 
        }
        
        $("#images-div").append(html);
    }

    function getPhoto(array, index){
        return array[index].img_src;
    }
}); 



