const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userPattern = [];
let level = 0;

function nextSequence() {
    userPattern.length = 0;

    let randomNumber = Math.floor(Math.random()*4); 
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    // $(`#${randomChosenColor}`).fadeOut(200).fadeIn(200);
    $(`#${randomChosenColor}`).addClass("btn-flash");
    setTimeout(function(){$(`#${randomChosenColor}`).removeClass("btn-flash")}, 250);

    level++;
    $("#title").text(`Level ${level}`);
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(function(){nextSequence()},300);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")}, 1000);
    $("#title").html("Game Over,<br>Press Any Key To Restart");
    $(".btn").prop("disabled", true);
    level = 0;
    gamePattern.length = 0;
}

$(document).keypress(function() {
    if (gamePattern.length === 0) {
        $(".btn").prop("disabled", false);
        nextSequence();
    }
});

$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);

    playSound(userChosenColor);

    checkAnswer(userPattern.length-1);
});


