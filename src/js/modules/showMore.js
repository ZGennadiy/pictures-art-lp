const showMore = (triger, styles) => {
    const cards = document.querySelectorAll(styles);
    const showMoreBtn = document.querySelector(triger);

    cards.forEach((card) => {
        card.classList.add('animted', 'fadeInUp');
    });

    showMoreBtn.addEventListener('click', () => {
        cards.forEach((card) => {
            card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });
        showMoreBtn.remove();
    });
    
};

export default showMore;
