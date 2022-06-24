var myarr = []
const highscore = localStorage.getItem('highscore');
console.log("Highscore: ",highscore)
var start_highscore = document.querySelector("#high-score")
var start_current = document.querySelector("#current-score")
start_current.textContent = 0

start_highscore.textContent = highscore

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function exactmovie(id) { // get exact movie info
    $.get('https://api.watchmode.com/v1/title/' + id + '/details/?apiKey=pOOtsQfzXZEFa6VpRSdE8KcL5AAzkbpb1bq4pZkt&append_to_response=sources', function(data) {
        var title = data["original_title"]
        var plot = data["plot_overview"]
        var release = data["release_date"]
        var streams = data["sources"]
        var user_rating = data["user_rating"]
        var image = data["poster"]
        var type = data["tmdb_type"]
        var stream_data = []
        var stream_name = []

        //get info on all streaming services its on
        for (let i = 0; i < streams.length; i++) {
            var platform = streams[i]["name"]
            var sub = streams[i]["type"] //buy subscription rent tv
            var link = streams[i]["web_url"] // link to watch it 
            var region = streams[i]["region"] //US,EU
            if (type === "buy") {
                var price = streams[i]["price"] // price if buy
            } else {
                var price = "N/A"
            }
            if(stream_name.indexOf(platform) === -1){
            stream_name.push(platform)
            stream_data.push({
                "platform_name": platform,
                "link": link,
            })
        }
        }

        
        
        myarr.push({
            "title": title,
            "plot": plot,
            "release": release,
            "image": image,
            "type": type,
            "stream": stream_data ,
        })

    })

}
function search_display(search_loop){

}

function partialmovie() { // get movies/shows that inclueds words
    console.log("i run")
    var search = document.querySelector("#search-input").value

    myarr = [] // compare data.length (the number of pages you get) with count ( add one count for ever page got ) when data.length = count display()
    $.get('https://api.watchmode.com/v1/autocomplete-search/?apiKey=pOOtsQfzXZEFa6VpRSdE8KcL5AAzkbpb1bq4pZktM&search_value=' + search + '&search_type=1', function(data) {
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
    setTimeout(display_results,750)
}
var hard_loop = 0
function display_results(way){ 
    var image1 = $("#movie-art1")
    var image2 = $("#movie-art2")
    var image3 = $("#movie-art3")
    var movie_title1 = document.querySelector("#movie-title1")
    var movie_title2 = document.querySelector("#movie-title2")
    var movie_title3 = document.querySelector("#movie-title3")
    var link1 = document.querySelector("#platform-one")
    var link2 = document.querySelector("#platform-two")
    var link3 = document.querySelector("#platform-three")
    var link4 = document.querySelector("#platform-four")
    var link5 = document.querySelector("#platform-five")
    var link6 = document.querySelector("#platform-six")
    var link7 = document.querySelector("#platform-seven")
    var link8 = document.querySelector("#platform-eight")
    var link9 = document.querySelector("#platform-nine")
    var link10 = document.querySelector("#platform-ten")
    var link11 = document.querySelector("#platform-eleven")
    var link12 = document.querySelector("#platform-twelve")

    var for_count = 0
    for(i = hard_loop; i < hard_loop+3; i++ ){
        for_count++
        if(for_count === 1){
            image1.attr("src", myarr[i].image)
            movie_title1.textContent = myarr[i].title
            link1.href = myarr[i].stream[0]["link"]
            link1.textContent = myarr[i].stream[0]["platform_name"]
            link2.href = myarr[i].stream[1]["link"]
            link2.textContent = myarr[i].stream[1]["platform_name"]
            link3.href = myarr[i].stream[2]["link"]
            link3.textContent = myarr[i].stream[2]["platform_name"]
            link4.href = myarr[i].stream[3]["link"]
            link4.textContent = myarr[i].stream[3]["platform_name"]


        }
        if(for_count === 2){
            image2.attr("src", myarr[i].image)
            movie_title2.textContent = myarr[i].title
            link5.href = myarr[i].stream[0]["link"]
            link5.textContent = myarr[i].stream[0]["platform_name"]
            link6.href = myarr[i].stream[1]["link"]
            link6.textContent = myarr[i].stream[1]["platform_name"]
            link7.href = myarr[i].stream[2]["link"]
            link7.textContent = myarr[i].stream[2]["platform_name"]
            link8.href = myarr[i].stream[3]["link"]
            link8.textContent = myarr[i].stream[3]["platform_name"]


        }
        if(for_count === 3){
            image3.attr("src", myarr[i].image)
            movie_title3.textContent = myarr[i].title
            link9.href = myarr[i].stream[0]["link"]
            link9.textContent = myarr[i].stream[0]["platform_name"]
            link10.href = myarr[i].stream[1]["link"]
            link10.textContent = myarr[i].stream[1]["platform_name"]
            link11.href = myarr[i].stream[2]["link"]
            link11.textContent = myarr[i].stream[2]["platform_name"]
            link12.href = myarr[i].stream[3]["link"]
            link12.textContent = myarr[i].stream[3]["platform_name"]


        }
        
    }
}
var count = 0
var current_score = 0
var lastcorrect = true
function gettrivia() {
    count++
    $.get("https://opentdb.com/api.php?amount=1&category=11", function(data) {

        console.log(data)
        var question = data["results"][0]["question"]
        var correct_answer = data["results"][0]["correct_answer"]
        var incorrect_answers = data["results"][0]["incorrect_answers"]
        incorrect_answers.push(correct_answer)
        incorrect_answers = shuffleArray(incorrect_answers)
        console.log(incorrect_answers)
        question.content = question

        $("#question").text(question.replace(/(&quot\;)/g,"\"").replace("&#039;","'")) // display the question
        $("#answer-one").text(incorrect_answers[0].replace(/(&quot\;)/g,"\"").replace("&#039;","'"))
        $("#answer-two").text(incorrect_answers[1].replace(/(&quot\;)/g,"\"").replace("&#039;","'"))
        $("#answer-three").text(incorrect_answers[2].replace(/(&quot\;)/g,"\"").replace("&#039;","'"))
        $("#answer-four").text(incorrect_answers[3].replace(/(&quot\;)/g,"\"").replace("&#039;","'"))
        var answer = waitforanswer(correct_answer, count, incorrect_answers)

    })

    function waitforanswer(correct, x,incorrect) {
        function iscorrectone() {
            if (x === count) {
                var background = document.querySelector("#answer-one")
                var answer_one = document.querySelector("#answer-one").textContent
                if (answer_one === correct) {
                    console.log("answer is corerct")
                    background.style.backgroundColor = "green"
                    setTimeout(function(){
                        refresh(true)
                    },1750)
                    return
                } else {
                    console.log("no")
                    background.style.backgroundColor = "red"
                    
                    setTimeout(function(){
                        refresh(false)
                    },1750)
                   return
                }
            }
        }

        function iscorrecttwo() {
            if (x === count) {
                var background = document.querySelector("#answer-two")
                var answer_one = document.querySelector("#answer-two").textContent
                if (answer_one === correct) {
                    console.log("answer is corerct")
                    background.style.backgroundColor = "green"
                    setTimeout(function(){
                        refresh(true)
                    },1750)
                    return
                } else {
                    console.log("no")
                    mark_correct()
                    background.style.backgroundColor = "red"
                    setTimeout(function(){
                        refresh(false)
                    },1750)
                    return
                }
            }
        }

        function iscorrectthree() {
            if (x === count) {
                var background = document.querySelector("#answer-three")
                var answer_one = document.querySelector("#answer-three").textContent
                if (answer_one === correct) {
                    console.log("answer is corerct")
                    background.style.backgroundColor = "green"
                    setTimeout(function(){
                        refresh(true)
                    },1750)
                    return
                } else {
                    console.log("no")
                    mark_correct()
                    background.style.backgroundColor = "red"
                    setTimeout(function(){
                        refresh(false)
                    },1750)
                    return
                }
            }
        }

        function iscorrectfour() {
            if (x === count) {
                var background = document.querySelector("#answer-four")
                var answer_one = document.querySelector("#answer-four").textContent
                if (answer_one === correct) {
                    console.log("answer is corerct")
                    background.style.backgroundColor = "green"
                    setTimeout(function(){
                        refresh(true)
                    },1750)
                    return
                } else {
                    console.log("no")
                    background.style.backgroundColor = "red"
                    mark_correct()
                    setTimeout(function(){
                        refresh(false)
                    },1750)
                    return
                }
            }
        }
        function mark_correct(){
            console.log("hi")
           var spot = incorrect.indexOf(correct)
           var one = document.querySelector("#answer-one")
           var two = document.querySelector("#answer-two")
           var three = document.querySelector("#answer-three")
           var four = document.querySelector("#answer-four")
            if(spot === 0){
                one.style.backgroundColor = "green"
            } else if(spot === 1){
                two.style.backgroundColor = "green"
            }
            if(spot === 2){
                three.style.backgroundColor = "green"
            } else if(spot === 3){
                four.style.backgroundColor = "green"
            }
            
        }
        var one = document.querySelector("#answer-one")
        var two = document.querySelector("#answer-two")
        var three = document.querySelector("#answer-three")
        var four = document.querySelector("#answer-four")
        one.addEventListener("click", iscorrectone);
        two.addEventListener("click", iscorrecttwo);
        three.addEventListener("click", iscorrectthree);
        four.addEventListener("click", iscorrectfour);

    }
    function refresh(oncorrect){
    if(oncorrect === true && lastcorrect === true){
        current_score++
        var display_current = document.querySelector("#current-score")
        display_current.textContent = current_score

        console.log("Adding one to current score",current_score)
        if(current_score > +highscore){
            console.log(current_score,highscore)
            var display_highscore = document.querySelector("#high-score")
            display_highscore.textContent = current_score
            localStorage.setItem('highscore', current_score);

        }
    } else if(oncorrect === false ){
        lastcorrect = false
        current_score = 0
    }
    var background_one = document.querySelector("#answer-one")
    var background_two = document.querySelector("#answer-two")
    var background_three = document.querySelector("#answer-three")
    var background_four = document.querySelector("#answer-four")

    background_one.style.backgroundColor = ""
    background_two.style.backgroundColor = ""
    background_three.style.backgroundColor = ""
    background_four.style.backgroundColor = ""
        gettrivia()
    return;
    }
}


gettrivia()
var searchBttn = document.querySelector("#search-bttn") // search button 
console.log(searchBttn)

if(searchBttn){
searchBttn.addEventListener("click", partialmovie);
}


// look for click on search bar
//searchBttn.addEventListener("click", exactmovie(moviedata)) // look for click on specific movie