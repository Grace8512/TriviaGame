//페이지1 - 타이틀, 스타트 버튼
//페이지2 - 타이틀, 타이머 러닝, 질문들
//페이지3 - 타이틀, p(all done), 결과.(correct answers, incorrect answers, unanswered.) 

//스타트 버튼을 눌렀을때 페이지가 넘어가면 타이머가 자동으로 시작된다.
//페이지2에서 타이머가 카운팅 되는동안 유저가 문제를 풀 수 있다.
//타이머가 0이 되면 페이지가 자동으로 넘어가고 결과값이 나타난다. 
// 타이머가 0이 될 때 유저가 한 답들을 계산한다.  
var mainPage = [{
    question : "1. What was the first full length CGI movie?",
    options : ["A Bug's Life", "Monsters Inc", "Toy Story", "The Lion King"],
    answers : ["2"]

},
{
    question : "2. Which popular Disney movie featured the song, \"Circle of Life\" ?",
    options : ["Aladdin", "The Lion King", "Mulan", "The Little Mermaid"],
    answers : ["1"]

},
{
    question : "3. What colour is the brandy liquor called Chartreuse?",
    options : ["Blue","Green","Yellow","Brown"],
    answers : ["1","2"]

}

];
var timer;
var startSecond = 5;
var second;
var correctAnswers;
var incorrectAnswers;
var unanswered;
function tick(){
    second--;
   
    $("#timeR").text("count number: " + second);//html의 timeR이라는 id를 가지고 있는 엘레먼트를 찾아서 텍스트를 세컨드로 바꿔준다. 
    if(second === 0){
        allDone();
    }
    console.log("tick");
}

function preStart(){
    $("#timeR").html("<button style='width:70px; height: 50px;'>Start Game</button>");
    $("#question").html("");
    $("button").click(function(){
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        startTimer();
        startGame();

    });
}

function startTimer(){
    second = startSecond;
    $("#timeR").text("count number: " + second);//설정값 표시(30초)
    timer = setInterval(tick, 1000);//타이머가 시작되는 펑션. 1000 밀리세컨마다 tick이라는 펑션을 불러준다. 
    // timer = setInterval(()=>{
    //     second--;
    //     $("#timeR").text(second);
    //     if(second === 0){
    //         allDone();
    //     }
    // },1000);
    console.log("start timer");
}

function startGame(){
    var questionHtml = "";
    for(var i=0; i < mainPage.length; i++){
         questionHtml += "<p>" + mainPage[i].question + "</p>";
        //html전체를 스트링으로 작성하고 html로 지정을 한다. 

        for(var j=0; j<mainPage[i].options.length; j++){
            questionHtml += "<input type='radio' name='button_" + i + "' value="+ j + ">" + mainPage[i].options[j] + "</input>";
            } 
        }
        $("#question").html(questionHtml);

        var allClicked;
        
        var button = $("<button>");
        button.text("submit");
        // button.addClass("jsbutton");
        //button.attr("id", "submit button");
        button.on("click", function(){
            allDone();
        });
        button.css({"margin-top": "20px", "padding": "10px"});
        $("#question").append("<br>");  
        $("#question").append(button);    
    }

function allDone(){
    clearInterval(timer);//더이상 tick을 1초마다 부르지 않는다. 
    // $("#timeR").text("completed");
    // $("#question").text("all done");
    for(var i=0; i < mainPage.length; i++){
       
        // var isAnswered = false;
         console.log(i + " = " + ($("input[name=\"button_"+i+"\"]:checked")==true));

         if($("input[name=button_"+i+"]").is(":checked")){
            // isAnswered = true;
            //name page 의 i 번째의 답과 같을때, 
            console.log(mainPage[i].answers);
            console.log($("input[name=button_"+i+"]:checked").val());
            if(mainPage[i].answers.includes($("input[name=button_"+i+"]:checked").val())){
                console.log("working: " + i);
                correctAnswers++;
            }
            else{
                incorrectAnswers++;
            }
        }
        else{
            unanswered++;
        }
    }
    $("#timeR").html("<button style='height: 50px; width: 70px; font-size: 15px;' id='button'>reset</button>");
    $("#question").html("correct answeres: " + correctAnswers + "<br>" + "incorrect answeres: " + incorrectAnswers +"<br>" + "unanswered: " + unanswered);
    // console.log(unanswered+","+correctAnswers+","+incorrectAnswers);
    $("#button").click(function(){click()});
 }

function click(){
  preStart();
}

preStart();






