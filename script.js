const images = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];


// 랜덤 섞기
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}


// 섞기 실행
shuffle(images);



// 전체 이미지태그 선택
const itemImages = document.querySelectorAll('.card__back img');



// 전체 이미지에 이미지주소 넣어주기
itemImages.forEach((image, index) => {
    let srcValue = image.getAttribute('src');
    srcValue = `img/${images[index]}.png`;
    image.src = srcValue;
});




let tryCount = 0; //첫번째클릭,두번째클릭 구분하기위한 변수
let round = 0; //회차 변수 (2번 뒤집을때마다 +1 됨)
let matchedCount = 0; //맞춘카드쌍갯수

let firstClickDiv;


// let toggle = true;

// 모든 card__item를 선택
const itemDivs = document.querySelectorAll('.card__item');

// Div에 클릭 이벤트를 준다.  (카드뒤집히는 애니메이션 등)
itemDivs.forEach((div) => {

    div.addEventListener('click', () => {
        const test = div.classList.contains('is-flipped');
        console.log(test);

        // isStarted가 false일때 (=스타트버튼이 클릭되지 않았을때)
        if (!isStarted) {
            alert("게임 시작을 위해 start 버튼을 클릭해주세요.")
            return;


            // isStarted가 true일때 동작 (=스타트버튼이 클릭되었을때)  
        } else {

            // 숫자카드가 안보일때, 즉 is-flipped 가 없을때만 !!!!!!!!!!! 카드 뒤집히는 애니메이션 클래스 추가
            if (!div.classList.contains('is-flipped')) {


                div.classList.add('is-flipped');


                // 선택시도한 횟수 +1 
                tryCount += 1;
                console.log("tryCount", tryCount)



                //첫번째 클릭일때
                if (tryCount === 1) {
                    // 첫번째 클릭한 div 자체를 firstClickDiv에 넣는다.  두번째클릭(이미지src)이랑 비교하기위해서임
                    firstClickDiv = div;
                    console.log("첫번째클릭div", div)



                    //두번째 클릭일때
                } else if (tryCount === 2) {
                    // toggle = false;
                    console.log("두번째클릭div", div)

                    //첫번째 클릭한 div의 img태그
                    const firstClickImage = firstClickDiv.querySelector('img');

                    //현재 클릭한 img태그
                    const image = div.querySelector('img');

                    //첫번째 클릭한 div안에있는 img태그의 src
                    const firstClickSrc = firstClickImage.getAttribute('src');

                    //현재 클릭한 img태그의 src
                    const src = image.getAttribute('src');


                    // 첫번째 클릭한 div안에 img태그의 src와 
                    // 현재 클릭한 img태그의 src가 같은지 확인한다.
                    const isSrcMatch = firstClickSrc === src;
                    // debugger;


                    //맞든 틀리든 라운드 올림 tryCount2일때마다 올라감
                    updateRound();



                    //src값이 일치하지 않을 때만 판떄기를 둘다 뒤집어줌
                    if (!isSrcMatch) { //틀리면 판때기 뒤집기
                        // debugger;
                        console.log("2번째판때기다름")


                        // 2초 동안 클릭 안되게하기
                        

                        // 2초 뒤에 다시 뒤집는 애니메이션 
                        setTimeout(() => {
                            firstClickDiv.classList.remove('is-flipped');
                            div.classList.remove('is-flipped');
                        }, 1000)

                        console.log("처음 클릭된 div", firstClickDiv)
                        console.log("현재 클릭된 div", div)
                    } else {
                        // 카드 두개 일치할때 카드수 카운트
                        matchedCount += 1;
                        console.log("카드두개 일치할때마다 추가됨", matchedCount)
                        // 1초 동안 클릭 안되게하기
                        // disableClick(1000);

                    }
                    disableClick(1500);
                    // 첫번째클릭인지 두번째클릭인지 구분하는변수 초기화
                    tryCount = 0;


                }

                // 2번째 클릭이면서 맞춘 카드 쌍 갯수 8개째일때 타이머종료
                if (tryCount === 2 || matchedCount === 8) {
                    stopTimer();
                    setTimeout(() => {
                        alert("게임이 종료되었습니다.")
                    }, 1000)
                }






                // 숫자카드가 보일때는 클릭안되게 막아버리기
            } 
            
            // else {

            //     alert("이미 선택되었습니다.");
            //     div.style.pointerEvents = "none";
            //     return;
            // }



        }


    })

})




function isEven(number) {
    return number % 2 === 0; // 짝수면 true 반환
}

function isOdd(number) {
    return number % 2 !== 0; // 홀수면 true 반환
}







// 카드전체감싸고 있는 부모요소 클릭방지하기 위한 변수
const cardWrap = document.getElementById('card__wrap');
// 클릭 안되게 하는 함수
function disableClick(time) {
    // 클릭안되게함
    console.log("클릭안되게하는함수 실행중")
    cardWrap.style.pointerEvents = "none";
    // 다시클릭되게함
    setTimeout(() => {
        cardWrap.style.pointerEvents = "auto";
        console.log("클릭안되게하는함수 실행종료")
    }, time);

}


// 시작버튼 상태값 관리(버튼 누르기전 카드동작을 막기위해)
let isStarted = false;
// 시작버튼 선택
const startButton = document.getElementById('start__button');

// 시작버튼 클릭이벤트 
startButton.addEventListener('click', () => {
    disableClick(3000);

    if (!isStarted) {
        isStarted = true;

        // 모든 카드 뒤집힌후 3초후 돌아오는 애니메이션 함수 실행
        filpAll()


    } else {
        alert("게임이 진행 중 입니다.")
    }
})

// 모든 카드 뒤집힌후 3초후 돌아오는 애니메이션 함수
function filpAll() {

    // 전체카드 뒤집히는 애니메이션 클래스 추가
    itemDivs.forEach((div) => {
        div.classList.add('is-flipped');
    });

    // 3초후 다시 뒤집히게 함, + 타이머 시작
    setTimeout(() => {
        itemDivs.forEach((div) => {
            div.classList.remove('is-flipped');
        });

        if (!timerInterval) {
            timerInterval = setInterval(updateTimer, 1000);
        }
        alert("game start!!!")
    }, "3000");

}





/// 시간 관련 함수
///

let timerInterval; // 타이머 저장용 변수
let seconds = 0; // 경과 시간(초)

// 시간 형식을 00:00으로 포맷팅
function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// 타이머 업데이트
function updateTimer() {
    seconds++;
    document.getElementById('timer').textContent = formatTime(seconds);
}

// 타이머 멈춤 함수
function stopTimer() {
    clearInterval(timerInterval); // 타이머 중지
    timerInterval = null; // 타이머 ID 초기화
}

// 라운드 업데이트
function updateRound() {
    round++;
    document.getElementById('round').textContent = round;
}




