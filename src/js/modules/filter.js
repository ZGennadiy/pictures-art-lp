const filter = () => {
    const menu = document.querySelector('.portfolio-menu');
    const items = menu.querySelectorAll('li');
    const wrapper = document.querySelector('.portfolio-wrapper');
    const markAll = wrapper.querySelectorAll('.all');
    const no = document.querySelector('.container .portfolio-no');

    [...markAll, no].forEach((item) => item.classList.add('animated', 'fadeIn'));

    const typeFilter = (markType) => {
        markAll.forEach((mark) => {
            mark.style.display = 'none';
        });
        no.style.display = 'none';
        
        if (markType) {
            markType.forEach((mark) => {
                mark.style.display = 'block';
            });
        } else {
            no.style.display = 'block';
        }
    };

    menu.addEventListener('click', ({ target }) => {
        if (target && target.tagName == 'LI') {
            items.forEach((btn) => btn.classList.remove('active'));
            target.classList.add('active');
            const classTarget = target.classList[0];
            console.log(classTarget);
            if (classTarget == '.grandmother' || classTarget == '.granddad') {
                typeFilter();
            } else {
                typeFilter(wrapper.querySelectorAll(`.${classTarget}`));
            }
        }
    });
};

export default filter;