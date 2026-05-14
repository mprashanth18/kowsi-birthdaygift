/* ========================================= */
/* PAGE SYSTEM */
/* ========================================= */

const pages = document.querySelectorAll(".page");

function showPage(pageId){

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const targetPage = document.getElementById(pageId);

    if(targetPage){

        targetPage.classList.add("active");

        targetPage.scrollTop = 0;

    }

}

/* ========================================= */
/* AUDIO ELEMENTS */
/* ========================================= */

const birthdayAudio =
document.getElementById("birthdayAudio");

const crackerAudio =
document.getElementById("crackerAudio");

const memoriesAudio =
document.getElementById("memoriesAudio");

const wishAudio =
document.getElementById("wishAudio");

/* ========================================= */
/* AUDIO HELPERS */
/* ========================================= */

function stopAllAudios(){

    const audios =
    document.querySelectorAll("audio");

    audios.forEach(audio=>{

        audio.pause();

        audio.currentTime = 0;

    });

}

function playAudio(audioElement,volume=0.8){

    stopAllAudios();

    if(audioElement){

        audioElement.volume = volume;

        audioElement.play().catch(()=>{

            console.log("Autoplay blocked");

        });

    }

}

/* ========================================= */
/* PASSWORD PAGE */
/* ========================================= */

const passwordInput =
document.getElementById("passwordInput");

const passwordBtn =
document.getElementById("passwordBtn");

const passwordMessage =
document.getElementById("passwordMessage");

if(passwordBtn){

    passwordBtn.addEventListener("click",()=>{

        const enteredPassword =
        passwordInput.value.trim();

        if(enteredPassword === "1518"){

            passwordMessage.innerHTML =
            "hehe correct ah potuta 😌💗";

            passwordMessage.style.color =
            "#28a745";

            createConfetti();

            setTimeout(()=>{

                showPage("page2");

                playAudio(birthdayAudio);

            },1200);

        }else{

            passwordMessage.innerHTML =
            "what bro, it's very wrong bro 🥲";

            passwordMessage.style.color =
            "#ff2e63";

            passwordInput.value = "";

            passwordInput.focus();

        }

    });

}

/* ENTER KEY SUPPORT */

if(passwordInput){

    passwordInput.addEventListener("keypress",(e)=>{

        if(e.key === "Enter"){

            passwordBtn.click();

        }

    });

}

/* ========================================= */
/* CAKE PAGE */
/* ========================================= */

const cutCakeBtn =
document.getElementById("cutCakeBtn");

const cakeWhole =
document.getElementById("cakeWhole");

const cakeSplit =
document.getElementById("cakeSplit");

const knife =
document.getElementById("knife");

const toLightPageBtn =
document.getElementById("toLightPageBtn");

if(cutCakeBtn){

    cutCakeBtn.addEventListener("click",()=>{

        cutCakeBtn.disabled = true;

        knife.style.transition =
        "1.2s ease";

        knife.style.transform =
        "translate(-120px,120px) rotate(35deg)";

        setTimeout(()=>{

            cakeWhole.classList.add("hidden");

            cakeSplit.classList.remove("hidden");

            createConfetti();

            launchBalloons();

            if(crackerAudio){

                crackerAudio.volume = 0.8;

                crackerAudio.play();

            }

            toLightPageBtn.classList.remove("hidden");

        },1200);

    });

}

if(toLightPageBtn){

    toLightPageBtn.addEventListener("click",()=>{

        showPage("page3");

    });

}

/* ========================================= */
/* LIGHT PAGE */
/* ========================================= */

const lightWorldBtn =
document.getElementById("lightWorldBtn");

const lightEffects =
document.getElementById("lightEffects");

if(lightWorldBtn){

    lightWorldBtn.addEventListener("click",()=>{

        lightEffects.classList.remove("hidden");

        createSparkles();

        launchBalloons();

        setTimeout(()=>{

            showPage("page4");

        },2500);

    });

}

/* ========================================= */
/* MUSIC PAGE */
/* ========================================= */

const playMusicBtn =
document.getElementById("playMusicBtn");

if(playMusicBtn){

    playMusicBtn.addEventListener("click",()=>{

        playAudio(memoriesAudio,0.6);

        showPage("page5");

    });

}

/* ========================================= */
/* MEMORIES PAGE */
/* ========================================= */

const toWishPageBtn =
document.getElementById("toWishPageBtn");

if(toWishPageBtn){

    toWishPageBtn.addEventListener("click",()=>{

        playAudio(wishAudio,0.7);

        showPage("page6");

    });

}

/* ========================================= */
/* WISH PAGE */
/* ========================================= */

const toQuizPageBtn =
document.getElementById("toQuizPageBtn");

if(toQuizPageBtn){

    toQuizPageBtn.addEventListener("click",()=>{

        stopAllAudios();

        showPage("page7");

    });

}

/* ========================================= */
/* QUIZ SYSTEM */
/* ========================================= */

/* ========================================= */
/* QUIZ SYSTEM */
/* ========================================= */

let score = 0;

const answeredQuestions = new Set();

const optionButtons =
document.querySelectorAll(".option-btn");

const popupOverlay =
document.getElementById("popupOverlay");

const popupText =
document.getElementById("popupText");

const closePopupBtn =
document.getElementById("closePopupBtn");

/* ========================================= */
/* POPUP FUNCTION */
/* ========================================= */

function openPopup(message){

    popupText.innerHTML = message;

    popupOverlay.classList.remove("hidden");

}

function closePopup(){

    popupOverlay.classList.add("hidden");

}

if(closePopupBtn){

    closePopupBtn.addEventListener("click",closePopup);

}

/* ========================================= */
/* OPTION BUTTONS */
/* ========================================= */

optionButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const quizBox =
        button.closest(".quiz-box");

        const questionIndex =
        Array.from(
            document.querySelectorAll(".quiz-box")
        ).indexOf(quizBox);

        if(answeredQuestions.has(questionIndex)){
            return;
        }

        answeredQuestions.add(questionIndex);

        const isCorrect =
        button.dataset.correct === "true";

        const allOptions =
        quizBox.querySelectorAll(".option-btn");

        /* ========================= */
        /* CORRECT ANSWER */
        /* ========================= */

        if(isCorrect){

            score++;

            button.classList.add("correct");

            createConfetti();

            launchBalloons();

            /* SPECIAL LAST QUESTION */

            if(questionIndex === 4){

                openPopup(
                "your figured it out😉<br><br>yep you're my forever favorite bro 💗🫂"
                );

            }

        }

        /* ========================= */
        /* WRONG ANSWER */
        /* ========================= */

        else{

            button.classList.add("wrong");

            /* LAST QUESTION WRONG */

            if(questionIndex === 4){

                openPopup(
                "ena da dei 👊🙃<br><br>ne thana en fav uhhh pannniii 🫠❤️‍🩹🫂"
                );

            }

        }

        /* ========================= */
        /* DISABLE OPTIONS */
        /* ========================= */

        allOptions.forEach(option=>{

            option.disabled = true;

            if(
                option.dataset.correct === "true"
            ){

                option.classList.add("correct");

            }

        });

    });

});

/* ========================================= */
/* QUIZ RESULT */
/* ========================================= */

const showResultBtn =
document.getElementById("showResultBtn");

const quizResult =
document.getElementById("quizResult");

if(showResultBtn){

    showResultBtn.addEventListener("click",()=>{

        let resultMessage = "";

        if(score < 3){

            resultMessage =
            "ena mapla ipdi ena yemathitiyee🥲";

        }

        else if(score === 3 || score === 4){

            resultMessage =
            "paravaliyeee pannniii😁💓";

        }

        else if(score === 5){

            resultMessage =
            "ne than da en uyir nanbannn💗🫂😭✨";

        }

        quizResult.innerHTML = `
            <div style="
                margin-top:30px;
                font-size:2rem;
                line-height:1.8;
                font-family:'Baloo 2',cursive;
            ">
                ${score}/5 💖
                <br>
                ${resultMessage}
            </div>
        `;

        createConfetti();

        launchBalloons();

        setTimeout(()=>{

            showPage("page8");

        },5000);

    });

}
/* ========================================= */
/* VIDEO PAGE */
/* ========================================= */

const montageVideo =
document.getElementById("montageVideo");

const toEndPageBtn =
document.getElementById("toEndPageBtn");

if(montageVideo){

    montageVideo.volume = 1;

}

if(toEndPageBtn){

    toEndPageBtn.addEventListener("click",()=>{

        stopAllAudios();

        showPage("page9");

        createConfetti();

    });

}

/* ========================================= */
/* CONFETTI */
/* ========================================= */

function createConfetti(){

    for(let i=0;i<80;i++){

        const confetti =
        document.createElement("div");

        confetti.style.position = "fixed";

        confetti.style.width = "10px";

        confetti.style.height = "10px";

        confetti.style.borderRadius = "50%";

        confetti.style.left =
        Math.random()*100 + "vw";

        confetti.style.top = "-20px";

        confetti.style.zIndex = "999";

        confetti.style.opacity = "0.8";

        confetti.style.pointerEvents = "none";

        confetti.style.background =
        randomColor();

        confetti.style.transition =
        (3 + Math.random()*2) +
        "s linear";

        document.body.appendChild(confetti);

        setTimeout(()=>{

            confetti.style.transform =
            `
            translateY(120vh)
            translateX(${Math.random()*200-100}px)
            rotate(${Math.random()*360}deg)
            `;

            confetti.style.opacity = "0";

        },100);

        setTimeout(()=>{

            confetti.remove();

        },6000);

    }

}

/* ========================================= */
/* BALLOONS */
/* ========================================= */

function launchBalloons(){

    for(let i=0;i<25;i++){

        const balloon =
        document.createElement("div");

        balloon.innerHTML =
        ["🎈","💖","✨","🌸","🐶"][Math.floor(Math.random()*5)];

        balloon.style.position = "fixed";

        balloon.style.left =
        Math.random()*100 + "vw";

        balloon.style.bottom = "-50px";

        balloon.style.fontSize =
        (24 + Math.random()*18) + "px";

        balloon.style.zIndex = "999";

        balloon.style.pointerEvents = "none";

        balloon.style.transition =
        (5 + Math.random()*3) +
        "s linear";

        document.body.appendChild(balloon);

        setTimeout(()=>{

            balloon.style.transform =
            `
            translateY(-130vh)
            translateX(${Math.random()*120-60}px)
            rotate(${Math.random()*360}deg)
            `;

            balloon.style.opacity = "0";

        },100);

        setTimeout(()=>{

            balloon.remove();

        },8000);

    }

}

/* ========================================= */
/* SPARKLES */
/* ========================================= */

function createSparkles(){

    for(let i=0;i<30;i++){

        const sparkle =
        document.createElement("div");

        sparkle.innerHTML =
        ["✨","💫","🌟"][Math.floor(Math.random()*3)];

        sparkle.style.position = "fixed";

        sparkle.style.left =
        Math.random()*100 + "vw";

        sparkle.style.top =
        Math.random()*100 + "vh";

        sparkle.style.fontSize =
        (18 + Math.random()*18) + "px";

        sparkle.style.zIndex = "999";

        sparkle.style.opacity = "0";

        sparkle.style.pointerEvents = "none";

        sparkle.style.transition =
        "1.5s ease";

        document.body.appendChild(sparkle);

        setTimeout(()=>{

            sparkle.style.opacity = "1";

            sparkle.style.transform =
            "scale(1.5)";

        },100);

        setTimeout(()=>{

            sparkle.style.opacity = "0";

        },1800);

        setTimeout(()=>{

            sparkle.remove();

        },2600);

    }

}

/* ========================================= */
/* RANDOM COLORS */
/* ========================================= */

function randomColor(){

    const colors = [

        "#ff4f87",
        "#ff85b5",
        "#ffd1e3",
        "#ffffff",
        "#ffc0cb"

    ];

    return colors[
        Math.floor(
            Math.random()*colors.length
        )
    ];

}

/* ========================================= */
/* EXTRA FLOATING HEARTS */
/* ========================================= */

setInterval(()=>{

    const heart =
    document.createElement("div");

    heart.innerHTML =
    ["💗","💕","💞","✨","🌸","🐶"][Math.floor(Math.random()*6)];

    heart.style.position = "fixed";

    heart.style.left =
    Math.random()*100 + "vw";

    heart.style.bottom = "-40px";

    heart.style.fontSize =
    (16 + Math.random()*16) + "px";

    heart.style.opacity = "0.65";

    heart.style.zIndex = "2";

    heart.style.pointerEvents = "none";

    heart.style.transition =
    (6 + Math.random()*4) +
    "s linear";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.style.transform =
        `
        translateY(-130vh)
        translateX(${Math.random()*120-60}px)
        rotate(${Math.random()*360}deg)
        `;

        heart.style.opacity = "0";

    },100);

    setTimeout(()=>{

        heart.remove();

    },10000);

},1300);

/* ========================================= */
/* INITIAL PAGE */
/* ========================================= */

window.addEventListener("load",()=>{

    showPage("page1");

});