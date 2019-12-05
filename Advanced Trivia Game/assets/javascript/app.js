var questionsPage = [{
    question : "Which superhero carries an indestructible shield?", 
    options : ["The Green Lantern", "Captain America", "Captain Flag", "The Red Tornado"],
    answers : "Captain America",
    imageCorrect: "assets/images/win-1.jpg",
    imageIncorrect: "assets/images/lose-1.jpg"
},
{
    question : "Which character is often romantically paired with Batman?", 
    options : ["The Black Canary", "Miss America", "Catwoman", "Hawkgirl"],
    answers : "Catwoman",
    imageCorrect: "assets/images/win-2.jpg",
    imageIncorrect: "assets/images/lose-2.jpg"
},
{
    question : "Which superhero started out as a petty criminal?", 
    options : ["The Atom", "Spiderman", "The Blue Knight", "Plastic Man"],
    answers : "Plastic Man",
    imageCorrect: "assets/images/win-3.jpg",
    imageIncorrect: "assets/images/lose-3.jpg"
},
{
    question : "Which superhero's alter ego is Raymond Palmer?", 
    options : ["The Atom", "Hawkman", "The Green Arrow", "The Tornado"],
    answers : "The Atom",
    imageCorrect: "assets/images/win-4.jpg",
    imageIncorrect: "assets/images/lose-4.jpg"
},
{
    question : "Which superhero is nicknamed the 'Scarlett Speedster'?", 
    options : ["The Flash", "Speedball", "Stardust", "The Thing"],
    answers : "The Flash",
    imageCorrect: "assets/images/win-5.jpg",
    imageIncorrect: "assets/images/lose-5.jpg"
}
];


var timer = {
    startSecond: 30,
    second: 30,
    correctAnswers: 0,
    incorrectAnswers: 0,
    unAnswered: 0,
    nextPage: 3,  
}

var startStopTimer;



function startPage(){
    var button = $("<button style='padding:10px; font-size: 20px; margin-bottom: 15px;'>");
    button.text("Game Start");
    button.on("click", function(){
        questions();
    });
    $("#question").html(button);
}

var questionIndex = 0;
function questions(){
    var currentQuestion = questionsPage[questionIndex++];
    //퀘스천 아이디가 있는 엘레먼트에 p을 만들어서 넣고 버튼을 만들어서 옵션을 넣어준다. 
    var p = $("<p>");
    p.text(currentQuestion.question);
    $("#question").html(p);

    
    for(var i=0; i < currentQuestion.options.length; i++){
        var option = $("<button style='margin-top:20px; margin-right: 10px; padding: 10px;'>");
        option.text(currentQuestion.options[i]);
        option.click(function(){
            if(currentQuestion.answers === $(this).text()){
                answers("correct");
            }else{
                answers("incorrect");
            }
        })
        $("#question").append(option);
    }
    $("#timer").text("time remaining: " + timer.second +"second");
    startStopTimer = setInterval(function(){
        if(timer.second > 0){
        $("#timer").text("time remaining: " + --timer.second +"second");//앞으로 가면 마이너스를 한 값을 보여주고 뒤로 가면 값을 먼저 보여주고 마이너스를 하게 된다. 
        }else{
            clearInterval(startStopTimer);
            answers("time out");
            
        }
    },1000);
}

function finalPage(){
   var lastPage = $("<p>");
   
   lastPage.html("correctAnswers: " + timer.correctAnswers + "<br>" + "<br>");//text나 html은 원래 보여지던 데이터를 지우고 다음 데이터를 보여주므로 몇 가지의 데이터를 출력할때는 text나 html뒤에 append를 사용하거나 처음부터 append를 사용. 
   lastPage.append("incorrectAnswers: " + timer.incorrectAnswers + "<br>" + "<br>");
   lastPage.append("unAnswered: " + timer.unAnswered + "<br>" + "<br>");
    $("#question").html(lastPage);
    $("#timer").html("");//time remaining을 없애줌. 
}

function answers(input){
    clearInterval(startStopTimer);
    timer.second = timer.startSecond;
    if(input === "correct"){
        $("#question").text("you're right!");
        $("#question").append("<br><br><img src='" + questionsPage[questionIndex-1].imageCorrect + "'>");
        timer.correctAnswers++;
    }else if(input === "incorrect"){
        $("#question").text("you're wrong");
        $("#question").append("<br><br><img src='" + questionsPage[questionIndex-1].imageIncorrect + "'>");
        timer.incorrectAnswers++;
    }else{
        $("#question").text("time out");
        timer.unAnswered++;
    }
    startStopTimer = setTimeout(function(){
        if(questionIndex === questionsPage.length){
            finalPage();
        }else{
            questions();    
        }
    },3000);
}
//3초 뒤에 set time out사용해서 questions펑션 불려질 수 있도록 만듦. 인덱스도 1 올려준다. 

startPage();

