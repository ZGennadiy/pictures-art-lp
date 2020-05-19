const sliders = (slides, direction, prevBtnSelector, nextBtnSelector) => {
    let slideIndex = 1;
    let autoScrollPaused = false;
    const items = document.querySelectorAll(slides);
    
    const showSlides = (n) => {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach((item) => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        items[slideIndex - 1].style.display = 'block';
    };

    showSlides(slideIndex);

    const scrollToNextSlide = (n) => {
        showSlides(slideIndex += n);
    };

    const scrollToPrevSlide = (n) => {
        showSlides(slideIndex -= n);
    };

    try {
        const prevBtn = document.querySelector(prevBtnSelector);
        const nextBtn = document.querySelector(nextBtnSelector);

        prevBtn.addEventListener('click', () => {
            scrollToPrevSlide(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });

        nextBtn.addEventListener('click', () => {
            scrollToNextSlide(1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });
    } catch(error){}

    const activateAutoScroll = () => {
        if (direction === 'vertical') {
            autoScrollPaused = setInterval(() => {
                scrollToNextSlide(1);
                items[slideIndex - 1].classList.add('fadeIn');
            }, 3000);
        } else {
            autoScrollPaused = setInterval(() => {
                scrollToNextSlide(1);
                items[slideIndex - 1].classList.remove('slideInLeft');
                items[slideIndex - 1].classList.add('slideInRight');
            }, 3000);
        }
    };

    activateAutoScroll();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(autoScrollPaused);
    });

    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAutoScroll();
    });
    
};

export default sliders;