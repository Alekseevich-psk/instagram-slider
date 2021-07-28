const elemSlideTarget = document.querySelectorAll('.g-slider__slide');
const closePopupSlider = document.querySelector('.popup-slider__close');
const popupSliderBlock = document.querySelector('.popup-slider');
const popupSliderWrap = document.querySelector('.popup-slider__wrap');

const gSlider = new Swiper('.g-slider__container', {
  slidesPerView: 7,
  slideToClickedSlide: true,
  spaceBetween: 30,
  navigation: {
    nextEl: ".g-slider__arrow-next",
    prevEl: ".g-slider__arrow-prev",
  },
});

const popupSlider = new Swiper('.popup-slider__container', {
  slideToClickedSlide: true,
  centeredSlides: true,
  breakpoints: {
    320: {
      slidesPerView: 1.8,
      spaceBetween: 20
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    960: {
      slidesPerView: 3,
      spaceBetween: 160
    }
  }
});

if (closePopupSlider) {
  closePopupSlider.addEventListener('click', () => {
    hideSlider(popupSliderBlock);
    deleteSlider(popupSlider.slides[popupSlider.activeIndex]);
  })
}

if (elemSlideTarget.length != 0) {
  elemSlideTarget.forEach(elem => {
    const elemChildPreview = elem.querySelector('.g-slider__preview');
    if (elemChildPreview) {
      createPreviewSlide(elemChildPreview)
    }
    elem.addEventListener('click', () => {
      popupSlider.activeIndex = gSlider.activeIndex;
      popupSlider.update();
      showSlider(popupSliderBlock);
      startHistorySlider(popupSlider.slides[popupSlider.activeIndex]);
    })
  })
}

popupSlider.on('slideChange', function () {
  deleteSlider(popupSlider.slides[popupSlider.previousIndex]);
  startHistorySlider(popupSlider.slides[popupSlider.activeIndex]);
});


function deleteSlider(beforeTargetItem) {
  let elemSlider = beforeTargetItem.querySelector('.history-slider');
  if(elemSlider) {
    elemSlider.remove();
  }
  beforeTargetItem.querySelector('.popup-slider__preview').style.display = "block";
}

function startHistorySlider(targetItem) {
  createSlider(targetItem);
  const imagesForslider = getImagesForSlider(gSlider.slides[popupSlider.activeIndex], '.g-slider__hide-item');
  let parentContainerSlider = targetItem.querySelector('.history-slider__container');
  addNavSubItemSlider(parentContainerSlider);
  addScrollBar(parentContainerSlider);

  imagesForslider.forEach(el => {
    let elemClone = el.cloneNode(true);
    editClass(elemClone, 'g-slider__hide-item', 'history-slider__slide', 'swiper-slide');
    targetItem.querySelector('.history-slider__wrap').appendChild(elemClone);
  })

  targetItem.querySelector('.popup-slider__preview').style.display = "none";
  new Swiper('.history-slider__container', {
    allowTouchMove: false,
    slideActiveClass: 'swiper-slide-active-history',
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: '.popup-slider__nav-next',
      prevEl: '.popup-slider__nav-prev',
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    slidesPerView: 1,
    nested: true,
  });
}

function createPreviewSlide(elem) {
  const elemChildPreviewClone = elem.cloneNode(true);
  const elemSlide = createElement('div', 'popup-slider__slide', 'swiper-slide');

  editClass(elemChildPreviewClone, 'g-slider__preview', 'popup-slider__preview');
  elemSlide.appendChild(elemChildPreviewClone);
  popupSliderWrap.appendChild(elemSlide);
  popupSlider.update();
}

function getImagesForSlider(elem, searchClass) {
  return elem.querySelectorAll(searchClass);
}

function createSlider(parent) {
  const elem = `
  <div class="history-slider popup-slider__history-slider">
  <div class="history-slider__container swiper-container">
      <div class="history-slider__wrap swiper-wrapper">
      </div>
  </div>
</div>`;

  parent.insertAdjacentHTML('afterbegin', elem);
}

function addNavSubItemSlider(parent) {
  const subElem = `
  <div class="popup-slider__nav popup-slider__nav-prev"></div>
  <div class="popup-slider__nav popup-slider__nav-next"></div>`;
  parent.insertAdjacentHTML('afterbegin', subElem);
}

function addScrollBar(parent){
  const subElem = `
  <div class="swiper-scrollbar"></div>
  `
  parent.insertAdjacentHTML('afterbegin', subElem);
}

function editClass(elem, classOld, classNew, classSlider) {
  elem.classList.remove(classOld);
  elem.classList.add(classNew);

  if (classSlider) {
    elem.classList.add(classSlider);
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