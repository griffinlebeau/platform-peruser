var myjson = {}

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
  }

function exactmovie(id){ // get exact movie info
    $.get('https://api.watchmode.com/v1/title/'+id+'/details/?apiKey=aySYE44XLhUinTPFNPoy9VXaRRPlAr346TfSaPht&append_to_response=sources',function(data){
        var title = data["original_title"]
        var plot = data["plot_overview"]
        var release = data["release_date"]
        var streams = data["sources"]
        var user_rating = data["user_rating"]
        var image = data["poster"]
        var type = data["tmdb_type"]
        var stream_data = []
        //get info on all streaming services its on
        for(let i = 0; i<streams.length; i++){
            var platform = streams[i]["name"]
            var sub = streams[i]["type"] //buy subscription rent tv
            var link = streams[i]["web_url"] // link to watch it 
            var region = streams[i]["region"] //US,EU
            if(type === "buy"){
                var price = streams[i]["price"] // price if buy
            } else {
                var price = "N/A"
            }
            stream_data.push({"platform_name": platform, "type": sub, "link": link, "region":region, "Price":price,})
       
     }
     myjson[id] = {"title":title,"plot":plot,"release":release,"rating":user_rating,"image":image,"type":type,"stream":stream_data,};

    })

}


function partialmovie(search){ // get movies/shows that inclueds words
    myjson = {}
    $.get('https://api.watchmode.com/v1/autocomplete-search/?apiKey=aySYE44XLhUinTPFNPoy9VXaRRPlAr346TfSaPht&search_value='+search+'&search_type=1',function(data){
        data = data["results"]
        console.log(data)
        for (let i = 0; i < data.length; i++) { // loop through results
            var id = data[i]["id"]
           /* var image = data[i]["image_url"]
            var name = data[i]["name"]
            var type = data[i]["tmdb_type"]
            var year = data[i]["year"]*/
            exactmovie(id)
        }

    })
}

function gettrivia(){
    $.get("https://opentdb.com/api.php?amount=1&category=11",function(data){

    
        var question = data["results"][0]["question"]
        var correct_answer = data["results"][0]["correct_answer"]
        var incorrect_answers = data["results"][0]["incorrect_answers"]
        incorrect_answers.push(correct_answer)
        incorrect_answers = shuffleArray(incorrect_answers)
        console.log(incorrect_answers)
})
}

var searchBttn = document.getElementById("searchbttn") // search button 
var searchData = document.getElementById("search-input")
//var movieclick = document.getElementById("specificmovieclick") //the box of the movie
//var movieid = document.getElementById("specificmovieid")
searchBttn.addEventListener("click", partialmovie(searchData)); // look for click on search bar
//searchBttn.addEventListener("click", exactmovie(moviedata)) // look for click on specific movie