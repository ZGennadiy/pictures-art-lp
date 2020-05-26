import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMore from './modules/showMore';
import calc from './modules/calc';
import filter from './modules/filter';
import picturesInterior from './modules/picturesInterior';
import collapse from './modules/collapse';
import burger from './modules/burger';
import scrolling from './modules/scrolling';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    modals();
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms();
    mask('input[name="phone"]');
    checkTextInputs('input[name="name"]');
    checkTextInputs('input[name="message"]');
    showMore('.button-styles', '#styles .row');
    calc('#size', '#material', '.calc-label > input[type="checkbox"]', '.promocode', '.calc-price');
    filter();
    picturesInterior('.sizes-block');
    collapse('.accordion-heading');
    burger('.burger-menu', '.burger');
    scrolling('.pageup');
});