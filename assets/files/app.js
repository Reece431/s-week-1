//carousel
const slider = document.querySelector('.gameCarousel');
const games = document.querySelectorAll('.game');
const arrows = document.querySelectorAll('.arrow');
const btns = document.querySelectorAll('button');
let isDown = false;
let startX;
let scrollLeft;

/*-------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------*/
const cidLinks = document.querySelectorAll('.cid');
//edit to update the cid
const cid = 'https://www.slotzo.com/?PAR=178ga64cidLPTest1-OnlineSlots&NeoDL=registration'
//set all cid links
cidLinks.forEach(x => {
  x.href = cid;
})
/*-------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------*/

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.classList.remove('scrolling');
});
slider.addEventListener('mouseup', (e) => {
    isDown = false;
    pos = e.pageX - slider.offsetLeft;
    if(pos == startX){
      window.location.href="https://www.slotzo.com/?PAR=178ga64cidLPTest1-OnlineSlots&NeoDL=registration";
    }
})
slider.addEventListener('mouseleave', () =>{
    isDown = false;
})

slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1;
  slider.scrollLeft = scrollLeft - walk;
});

//carousel view 
window.addEventListener('load', e => {
  shiftSlider(e);
  fetchGames(games);
})
window.addEventListener('resize', e => {
  shiftSlider(e);
})

function shiftSlider(x){
  w = x.currentTarget.innerWidth;
  if(w <= 500){
    slider.scrollLeft = 595;
  }
}

//add game images
fetchGames = async (x) =>{
  const res = await fetch('./assets/files/games.json');
  const data = await res.json();
  x.forEach((e, i) =>{
    //console.log(data.instant[1].images.default);
    const gameImg = document.createElement("img");
    gameImg.src = data.instant[i].images.default;
    e.appendChild(gameImg);
  })
}

//carousel arrows
arrows.forEach(x => {
  x.addEventListener('click', e => {
    slider.classList.add('scrolling')
    slider.style.scrollBehaviour = 'smooth';
    if(e.target.classList.contains('fa-arrow-circle-left')){
      slider.scrollLeft -=150;
    }
    else{
      slider.scrollLeft +=150;
    }
  })
})