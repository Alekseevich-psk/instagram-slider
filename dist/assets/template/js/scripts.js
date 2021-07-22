"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var elemSlideTarget = document.querySelectorAll('.g-slider__slide');
var closePopupSlider = document.querySelector('.popup-slider__close');
var popupSliderBlock = document.querySelector('.popup-slider');
var popupSliderWrap = document.querySelector('.popup-slider__wrap');
var gSlider = new Swiper('.g-slider__container', {
  slidesPerView: 7,
  spaceBetween: 30,
  navigation: {
    nextEl: ".g-slider__arrow-next",
    prevEl: ".g-slider__arrow-prev"
  }
});
var popupSlider = new Swiper('.popup-slider__container', {
  slidesPerView: 3,
  slideToClickedSlide: true,
  spaceBetween: 60,
  centeredSlides: true,
  navigation: {
    nextEl: ".popup-slider__arrow-next",
    prevEl: ".popup-slider__arrow-prev"
  }
});

if (elemSlideTarget.length != 0) {
  var _iterator = _createForOfIteratorHelper(elemSlideTarget),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var elem = _step.value;
      elem.addEventListener('click', function () {
        var images = getImagesForSlider(this);

        if (images.length != 0) {
          setImagesForSlider(images, popupSliderWrap);
          updateSlider(popupSlider);
          showSlider(popupSliderBlock);
        }
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

if (closePopupSlider) {
  closePopupSlider.addEventListener('click', function () {
    hideSlider(popupSliderBlock);
    removeChild(popupSliderWrap);
  });
}

function getImagesForSlider(elem) {
  return elem.querySelectorAll('.g-slider__hide-wrap img');
}

function setImagesForSlider(arr, parent) {
  var _iterator2 = _createForOfIteratorHelper(arr),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _elem = _step2.value;
      var item = createElement('div', 'popup-slider__slide', 'swiper-slide');
      item.appendChild(_elem.cloneNode(true));
      parent.appendChild(item);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function removeChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
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