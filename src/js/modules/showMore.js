import { getResource } from '../services/requests';

const showMore = (triger, wrapper) => {
    const showMoreBtn = document.querySelector(triger);

    // cards.forEach((card) => {
    //     card.classList.add('animted', 'fadeInUp');
    // });

    // showMoreBtn.addEventListener('click', () => {
    //     cards.forEach((card) => {
    //         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });
    //     showMoreBtn.remove();
    // });
    
    const createCard = (response) => {
        response.forEach(({ src, title, link }) => {
            const card = document.createElement('div');
            card.classList.add('animted', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
            const stylesBlock = document.createElement('div');
            stylesBlock.classList.add('styles-block');
            card.appendChild(stylesBlock);
            const img = document.createElement('img');
            img.setAttribute('src', src);
            stylesBlock.appendChild(img);
            const h4 = document.createElement('h4');
            h4.textContent = title;
            stylesBlock.appendChild(h4);
            const moreLink = document.createElement('a');
            moreLink.setAttribute('href', link);
            moreLink.textContent = 'Подробнее';
            stylesBlock.appendChild(moreLink);

            document.querySelector(wrapper).appendChild(card);
        });
    };
    
    
    showMoreBtn.addEventListener('click', function() {
        getResource('assets/db.json')
            .then((res) => createCard(res.styles))
            .then(this.remove())
            .catch((error) => console.error(error));
    }); 
};

export default showMore;
