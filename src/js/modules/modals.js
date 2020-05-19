const modals = () => {
    let btnPressed = false;

    const calcScrollWidth = () => {
        const div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        const scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    };

    const bindModal = (triggerSelector, modalSelector, closeSelector, destroy = false) => {
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const windows = document.querySelectorAll('[data-modal]');

        
        
        const scrollWidth = calcScrollWidth();
        
        trigger.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }
                
                windows.forEach((item) => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');

                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scrollWidth}px`;
            });
        });

        close.addEventListener('click', () => {
            windows.forEach((item) => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach((item) => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            }
        });
    };

    const showModalByTime = (selector, time) => {
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-mpdal]').forEach((item) => {
                if(getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if(!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
                const scroll = calcScrollWidth();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    };

    const openByScroll = (selector) => {
        function isEndOfPage() {
            const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            return window.pageYOffset + document.documentElement.clientHeight >= scrollHeight;
        }
        
        window.addEventListener('scroll', () => {
            if (!btnPressed && isEndOfPage()) {
                document.querySelector(selector).click();
            }
        });
    };

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    
    // showModalByTime('.popup-consultation', 60000);
};

export default modals;