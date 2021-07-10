const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];




document.getElementById("search").addEventListener("keypress", function (event) {
  console.log('worked')
  // event.preventDefault();
  console.log('after worked')
  if (event.keyCode == 13)
    document.getElementById("search-btn").click();
});
//slider 
document.getElementById('duration').addEventListener("keypress", function (event) {
  if(event.keyCode == 13){
    document.getElementById('create-slider').click();
  }
})
// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';
// const KEY = '7928670-03283d8906dbc545d490bbce8';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img id="duration" class="img-fluid img-thumbnail img-custom-container" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })
  // console.log(images);

}

const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    // finding simple bug where hitS replace by hits
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');
  element.classList.remove('img-effect')


  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    // alert('Hey, Already added !')
    sliders.splice(item,1);
    element.classList.toggle('added')
    element.classList.toggle('img-effect')
  }
}
var timer;
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  
  // hide image aria
  imagesArea.style.display = 'none';
  let duration = document.getElementById('duration').value || 1000;
  if(duration <= 400)
  {
    duration = 1000;
    if(confirm('Opps Sorry! it  is not valid duration value please set another one or it will set to 1 second default')){
      sliders.forEach(slide => {
        let item = document.createElement('div')
        item.className = "slider-item";
        item.innerHTML = `<img class="w-100" src="${slide}" alt="">`;
        sliderContainer.appendChild(item)
      })
      changeSlide(0)
      timer = setInterval(sliderMovingCallback,duration);
      lastSetDuration = duration;
    }
    else{
      imagesArea.style.display = 'block';
    }
  }
  else{
    sliders.forEach(slide =>{
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100" src="${slide}" alt="">`;
      sliderContainer.appendChild(item)
    })
    changeSlide(0);
    timer = setInterval(sliderMovingCallback,duration);
    lastSetDuration = duration;
  }
//   sliders.forEach(slide => {
//     let item = document.createElement('div')
//     item.className = "slider-item";
//     item.innerHTML = `<img class="w-100"
//     src="${slide}"
//     alt="">`;
//     sliderContainer.appendChild(item)
//   })
//   changeSlide(0)
//   timer = setInterval(function () {
//     slideIndex++;
//     changeSlide(slideIndex);
//   }, duration);
}

const sliderMovingCallback = ()=> {
  changeSlide(++slideIndex);
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })
 
  items[index].style.display = "block"
}

function getInputValue(){
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
}
// searchBtn.addEventListener('click', function () {
//   document.querySelector('.main').style.display = 'none';
//   clearInterval(timer);
//   const search = document.getElementById('search');
//   getImages(search.value)
//   sliders.length = 0;
// })

sliderBtn.addEventListener('click', function () {
  createSlider()
})


// bonus Marking JavaScript

sliderContainer.addEventListener('mouseenter', e => {
  clearInterval(timer);
  timer = undefined;
});

sliderContainer.addEventListener('mouseleave', e => {
  if(timer === undefined){
    //if no animation is performing
    timer = setInterval(sliderMovingCallback,lastSetDuration);
  }
})

const toggleSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.classList.toggle('d-flex');
}

const dangerInfo = (show) => {
  const error = document.getElementById('error');

  if (show) {
    error.classList.add('d-flex');
  }
  else {
    error.classList.remove('d-flex');
  }

}
