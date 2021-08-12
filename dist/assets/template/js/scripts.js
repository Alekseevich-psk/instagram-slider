"use strict";

var $elemSlideTarget = document.querySelectorAll('.g-slider__slide');
var $closePopupSlider = document.querySelector('.popup-slider__close');
var $popupSliderBlock = document.querySelector('.popup-slider');
var $popupSliderWrap = document.querySelector('.popup-slider__wrap');
var $popupSliderContainer = document.querySelector('.popup-slider__container');
var $gSlider = new Swiper('.g-slider__container', {
  slideToClickedSlide: true,
  slidesPerView: 'auto',
  preloadImages: false,
  lazy: {
    loadPrevNext: false
  },
  spaceBetween: 30,
  navigation: {
    nextEl: ".g-slider__arrow-next",
    prevEl: ".g-slider__arrow-prev"
  },
  breakpoints: {
    320: {
      spaceBetween: 15
    },
    728: {
      spaceBetween: 30
    }
  }
});
var $popupSlider = new Swiper('.popup-slider__container', {
  slideToClickedSlide: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  preloadImages: false,
  lazy: true
});

if ($popupSliderContainer) {
  $popupSliderContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup-slider__container') || e.target.classList.contains('popup-slider__wrap')) {
      closeSlider();
    }
  });
}

if ($closePopupSlider) {
  $closePopupSlider.addEventListener('click', function () {
    closeSlider();
  });
}

if ($elemSlideTarget.length != 0) {
  $elemSlideTarget.forEach(function (elem) {
    var $elemChildPreview = elem.querySelector('.g-slider__preview');
    var $elemChildHeaderSlide = elem.querySelector('.g-slider__slide-header');

    if ($elemChildPreview) {
      var elemSlide = createElement('div', 'popup-slider__slide', 'swiper-slide');
      createPreviewSlide(elemSlide, $elemChildPreview);
      createHeaderSlide(elemSlide, $elemChildHeaderSlide);
    }

    elem.addEventListener('click', function () {
      $popupSlider.activeIndex = $gSlider.activeIndex;
      $popupSlider.update();
      showSlider($popupSliderBlock);
      startHistorySlider($popupSlider.slides[$popupSlider.activeIndex]);
    });
  });
}

$popupSlider.on('slideChange', function () {
  deleteSlider($popupSlider.slides[$popupSlider.previousIndex]);
  startHistorySlider($popupSlider.slides[$popupSlider.activeIndex]);
});

function deleteSlider(beforeTargetItem) {
  var $elemSlider = beforeTargetItem.querySelector('.history-slider');

  if ($elemSlider) {
    $elemSlider.remove();
  }

  beforeTargetItem.querySelector('.popup-slider__preview').style.display = "block";
}

function startHistorySlider(targetItem) {
  createSlider(targetItem);
  var $imagesForslider = getImagesForSlider($gSlider.slides[$popupSlider.activeIndex], '.g-slider__hide-item');
  var $parentContainerSlider = targetItem.querySelector('.history-slider__container');
  addNavSubItemSlider($parentContainerSlider);
  addScrollBar($parentContainerSlider);
  addHederSlide($parentContainerSlider);
  setImagesForslider($imagesForslider, targetItem);
  targetItem.querySelector('.popup-slider__preview').style.display = "none";
  new Swiper('.history-slider__container', {
    allowTouchMove: false,
    slideActiveClass: 'swiper-slide-active-history',
    autoplay: {
      delay: 3000
    },
    navigation: {
      nextEl: '.popup-slider__nav-next',
      prevEl: '.popup-slider__nav-prev'
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true
    },
    slidesPerView: 1,
    nested: true
  });
}

function closeSlider() {
  hideSlider($popupSliderBlock);
  deleteSlider($popupSlider.slides[$popupSlider.activeIndex]);
}

function setImagesForslider(images, elemTarget) {
  images.forEach(function (el) {
    var elemClone = el.cloneNode(true);
    editClass(elemClone, 'g-slider__hide-item', 'history-slider__slide', 'swiper-slide');
    elemTarget.querySelector('.history-slider__wrap').appendChild(elemClone);
  });
}

function createPreviewSlide(slide, elem) {
  var $elemChildPreviewClone = elem.cloneNode(true);
  editClass($elemChildPreviewClone, 'g-slider__preview', 'popup-slider__preview');
  slide.appendChild($elemChildPreviewClone);
  $popupSliderWrap.appendChild(slide);
}

function createHeaderSlide(slide, elem) {
  var $elemChildHeaderSlide = elem.cloneNode(true);
  editClass($elemChildHeaderSlide, 'g-slider__slide-header', 'popup-slider__slide-header');
  slide.appendChild($elemChildHeaderSlide);
  $popupSliderWrap.appendChild(slide);
  $popupSlider.update();
}

function getImagesForSlider(elem, searchClass) {
  return elem.querySelectorAll(searchClass);
}

function createSlider(parent) {
  var $elem = "\n  <div class=\"history-slider popup-slider__history-slider\">\n  <div class=\"history-slider__container swiper-container\">\n      <div class=\"history-slider__wrap swiper-wrapper\">\n      </div>\n  </div>\n</div>";
  parent.insertAdjacentHTML('afterbegin', $elem);
}

function addHederSlide(parent) {
  var $subElem = "\n  <div class=\"popup-slider__slide-header\">\n  </div>";
  parent.insertAdjacentHTML('afterbegin', $subElem);
}

function addNavSubItemSlider(parent) {
  var $subElem = "\n  <div class=\"popup-slider__nav popup-slider__nav-prev\"></div>\n  <div class=\"popup-slider__nav popup-slider__nav-next\"></div>";
  parent.insertAdjacentHTML('afterbegin', $subElem);
}

function addScrollBar(parent) {
  var $subElem = "\n  <div class=\"swiper-scrollbar\"></div>\n  ";
  parent.insertAdjacentHTML('afterbegin', $subElem);
}

function editClass(elem, classOld, classNew, classSlider) {
  elem.classList.remove(classOld);
  elem.classList.add(classNew);

  if (classSlider) {
    elem.classList.add(classSlider);
  }
}

function createElement(div, class1, class2) {
  var el = document.createElement(div);
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

;