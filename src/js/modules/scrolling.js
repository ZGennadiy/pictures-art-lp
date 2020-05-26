const scrolling = (upSelector) => {
    const upItem = document.querySelector(upSelector);
    upItem.classList.add('animated');

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upItem.classList.add('fadeIn');
            upItem.classList.remove('fadeOut');
        } else {
            upItem.classList.remove('fadeIn');
            upItem.classList.add('fadeOut');
        }
    });

        // Scrolling with raf

    const links = document.querySelectorAll('[href^="#"]'),
    speed = 0.3;
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const widthTop = document.documentElement.scrollTop;
            const hash = this.hash;
            const toBlock = document.querySelector(hash).getBoundingClientRect().top;
            let start = null;

            const step = (time) => {
                if (start === null) {
                    start = time;
                }

                const progress = time - start;
                let r;
                if (toBlock < 0) {
                    r = Math.max(widthTop - progress/speed, widthTop + toBlock);
                } else {
                    r = Math.min(widthTop + progress/speed, widthTop + toBlock);
                }

                    document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            };

            requestAnimationFrame(step);
        });
    });

    
    // Pure js scrolling
    
    // const element = document.documentElement;
    // const body = document.body;

    // const calcScroll = () => {
    //     upItem.addEventListener('click', function(event) {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);
    //         console.log(this.hash);
    //         if (this.hash !== '') {
                
    //             event.preventDefault();
    //             let hashElement = document.querySelector(this.hash),
    //                 hashElementTop = 0;

    //             while (hashElement.offsetParent) {
    //                 hashElementTop += hashElement.offsetTop;
    //                 hashElement = hashElement.offsetParent;
    //             }

    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1,
    //         prevScrollTop,
    //         speed;

    //     if (to > from) {
    //         speed = 30;
    //     } else {
    //         speed = -30;
    //     }
        
    //     let move = setInterval(function() {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         if (
    //             prevScrollTop === scrollTop ||
    //             (to > from && scrollTop >= to) ||
    //             (to < from && scrollTop <= to)
    //         ) {
    //             clearInterval(move);
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //         } else {
    //             body.scrollTop += speed;
    //             element.scrollTop += speed;
    //             prevScrollTop = scrollTop;
    //         }
    //     }, timeInterval);
    // };

    // calcScroll();
};

export default scrolling;