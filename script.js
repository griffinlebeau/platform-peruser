function exactmovie(id){ // get exact movie info
    $.get('https://api.watchmode.com/v1/title/'+id+'/details/?apiKey=aySYE44XLhUinTPFNPoy9VXaRRPlAr346TfSaPht&append_to_response=sources',function(data){
        var title = data["original_title"]
        var plot = data["plot_overview"]
        var release = data["release_date"]
        var streams = data["sources"]
        var user_rating = data["user_rating"]
        var image = data["poster"]
        //get info on all streaming services its on
        for(let i = 0; i<streams.length; i++){
            var platform = streams[i]["name"]
            var type = streams[i]["type"]
            var link = streams[i]["web_url"]
            var region = streams[i]["region"]
            if(type === "buy"){
                var price = streams[i]["price"]
            }
        }

    })

}


function partialmovie(search){ // get movies/shows that inclueds words
    $.get('https://api.watchmode.com/v1/autocomplete-search/?apiKey=aySYE44XLhUinTPFNPoy9VXaRRPlAr346TfSaPht&search_value='+search+'&search_type=1',function(data){
        data = data["results"]
        for (let i = 0; i < data.length; i++) { // loop through results
            var id = data[i]["id"]
            var image = data[i]["image_url"]
            var name = data[i]["name"]
            var type = data[i]["tmdb_type"]
            var year = data[i]["year"]
            console.log(name)
        }

    })
}
var searchBttn = document.getElementById("CHANGEME")
var searchData = document.getElementById("CHANGEME")
searchBttn.addEventListener("click", partialmovie(searchData)); // look for click on search bar

