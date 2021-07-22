const elemSlideTarget = document.querySelectorAll('.g-slider__slide');
const closePopupSlider = document.querySelector('.popup-slider__close');
const popupSliderBlock = document.querySelector('.popup-slider');
const popupSliderWrap = document.querySelector('.popup-slider__wrap');

const gSlider = new Swiper('.g-slider__container', {
  slidesPerView: 7,
  spaceBetween: 30,
  navigation: {
    nextEl: ".g-slider__arrow-next",
    prevEl: ".g-slider__arrow-prev",
  },
});

const popupSlider = new Swiper('.popup-slider__container', {
  slidesPerView: 3,
  slideToClickedSlide: true,
  spaceBetween: 60,
  centeredSlides: true,
  navigation: {
    nextEl: ".popup-slider__arrow-next",
    prevEl: ".popup-slider__arrow-prev",
  },
});

if (elemSlideTarget.length != 0) {
  for (let elem of elemSlideTarget) {
    elem.addEventListener('click', function () {
      let images = getImagesForSlider(this);
      if (images.length != 0) {
        setImagesForSlider(images, popupSliderWrap);
        updateSlider(popupSlider);
        showSlider(popupSliderBlock);
      }
    })
  }
}

if (closePopupSlider) {
  closePopupSlider.addEventListener('click', function () {
    hideSlider(popupSliderBlock);
    removeChild(popupSliderWrap);
  })
}

function getImagesForSlider(elem) {
  return elem.querySelectorAll('.g-slider__hide-wrap img');
}

function setImagesForSlider(arr, parent) {
  for (let elem of arr) {
    let item = createElement('div', 'popup-slider__slide', 'swiper-slide');
    item.appendChild(elem.cloneNode(true));
    parent.appendChild(item);
  }
}

function removeChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createElement(div, class1, class2) {
  let el = document.createElement(div);
  el.classList.add(class1);
  el.classList.add(class2);
  return el;
}

function updateSlider(slider) {
  slider.update();
}

function showSlider(slider) {
  slider.classList.add('show-slider');
}

function hideSlider(slider) {
  slider.classList.remove('show-slider');
}
