const category  = document.getElementById('category');
const cardCountEl = document.getElementById('card-count');
const button = document.getElementById('button');
const startBtn = document.getElementById('start');
const count = document.getElementById('count');
const gameContainer = document.getElementsByClassName('game-container')
let cardContainer = document.querySelector('#card-container');
// const cards = document.querySelectorAll(".card");
const cards = document.getElementById('cards');
const container = document.getElementById('container');
let firstCard = null,
    secondCard = null
let disableDeck = false;
let perPage;
let query;
let cardArray=[],
cardsArray = [];





cardCountEl.addEventListener('click',(e)=>{
    if(e.target.tagName === 'BUTTON') {
      const arg = e.target.innerText;
      cardCount(arg) 
    }

  })
   
  
function cardCount(arg){
    if(arg == '+'){
        count.innerHTML = Number(count.innerText) + 2;

    }else {
        if(count.innerText > 0){
            count.innerHTML = Number(count.innerText) - 2;
        } else{
            count.innerHTML = 0;
        }
    }
}

startBtn.addEventListener('click',()=>{
    query = document.querySelector('input[type="radio"]:checked').value;
    perPage = count.textContent;
    container.hidden = true;
    cards.hidden = false;
    createGame()
   
})

async function createGame() {
    try {
        const getCard = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&orientation=square`, {
            method: 'GET',
            headers: {
                'Authorization': '563492ad6f91700001000001d86fb0d72d054399bdda85e32054a519',
            },
        })
        const data = await getCard.json();
            data.photos.map(item => {
                cardArray.push(`
                    <div class="card" data-id="${item.id}">
                        <img src='${item.src.small}' alt="img">
                    </div>
                `);
                cardArray.push(`
                    <div class="card" data-id="${item.id}">
                        <img src='${item.src.small}' alt="img">
                    </div>
                `);
            });
    } catch (err) {
        // Error here
    }

    cardArray.sort(()=>Math.random()-0.5);
    
    cards.innerHTML = `
        <div class="cards-container">
            ${cardArray.join('')}
        </div>
    `
    
}





