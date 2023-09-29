const nav = document.querySelector("#nav")
const open = document.querySelector("#open")
const close = document.querySelector("#close")
open.addEventListener('click',()=>{
  nav.classList.add('visibility')
})

close.addEventListener('click',()=>{
  nav.classList.remove('visibility')
})



const games = document.querySelectorAll('.game');

games.forEach((game, gameIndex) => {
    const questions = game.querySelectorAll('.question-container');
    const nextButton = game.querySelector(`#game${gameIndex + 1}-next-button`);
    const resultDiv = game.querySelector(`#game${gameIndex + 1}-result`);
    const scoreSpan = game.querySelector(`#game${gameIndex + 1}-score`);
    
    let currentQuestion = 0;
    let totalScore = 0;
    
    function showQuestion(index) {
        questions[index].style.display = 'block';
    }
    
    function hideQuestion(index) {
        questions[index].style.display = 'none';
    }
    
    function updateScore() {
        scoreSpan.textContent = totalScore;
    }
    
    nextButton.addEventListener('click', () => {
        const selectedValue = parseInt(game.querySelector(`#game${gameIndex + 1}-question${currentQuestion + 1}`).value);
        
        if (selectedValue > 0) {
            totalScore += selectedValue;
            
        }
    
        hideQuestion(currentQuestion);
    
        currentQuestion++;
    
        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion);
        } else {
            nextButton.style.display = 'none';
            resultDiv.style.display = 'block';
            updateScore();
        }
    });
    
    showQuestion(currentQuestion);
});


document.getElementById('result1').addEventListener('click', primerResultado);

function primerResultado() {
    fetch('json/resultsA.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let html = "";
            data.forEach(function (result1) {

            html += 
            `
            <div class="card">
                <img src="${result1.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${result1.fullName}</h5>
            </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Occupation: </b>${result1.occupation}</li>
                    <li class="list-group-item"><b>Civil Status: </b>${result1.civilStatus}</li>
                    <li class="list-group-item"><b>Gender: </b>${result1.gender}</li>
                    <li class="list-group-item"><b>Family: </b>${result1.family}</li>
                    <li class="list-group-item">Result: <b>${result1.resultValue}</b></li>
                </ul>
            </div>`;
            });
        document.getElementById('allResults1').innerHTML = html
        })
        .catch(function (error) {
            console.log(error);
        })
}

document.getElementById('result2').addEventListener('click', segundoResultado);

function segundoResultado() {
    fetch('json/resultsB.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let html = "";
            data.forEach(function (result2) {

            html += `            
        <div class="card">
            <img src="${result2.img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${result2.name}</h5>
        </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>Real Name: </b>${result2.real_Name}</li>
                <li class="list-group-item"><b>Race: </b>${result2.race}</li>
                <li class="list-group-item"><b>Weapon: </b>${result2.weapon}</li>
                <li class="list-group-item"><b>Age: </b>${result2.age}</li>
                <li class="list-group-item"><b>Occupation: </b>${result2.occupation}</li>
                <li class="list-group-item">Result: <b>${result2.resultValue}</b></li>
            </ul>
        </div>`;
            });
        document.getElementById('allResults2').innerHTML = html
        })
        .catch(function (error) {
            console.log(error);
        })
}


const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_78pr3rd';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send';
      Swal.fire({
        icon: 'success',
        title: 'Email sent successfully',
      })

    }, (err) => {
      btn.value = 'Send';
      Swal.fire({
        icon: 'error',
        title: 'Plese complete the form ',
      })
    });
});