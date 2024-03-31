let gameSeq=[];
let userSeq=[];

let max=0;
let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game started");
        started=true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(event){
        btn.classList.remove("gameflash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    if(level>max)
    max=level;
    h2.innerHTML=`Level ${level} <br>Highest score: ${max}`;

    let ind=Math.floor(Math.random()*3);
    let randColor=btns[ind];
    let randbtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor)
    btnFlash(randbtn);
}

function checkAns(ind){
    if(userSeq[ind]==gameSeq[ind]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }

    }
    else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },250);
        reset();
    }
}

function btnPress(){
    let btn=this;
    btn.classList.add("userflash");
    setTimeout(function(event){
        btn.classList.remove("userflash");
    },250);

    userColor=btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);

}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}