import { getResource } from '../services/requests';

const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size);
    const materialBlock = document.querySelector(material);
    const optionsBlock = document.querySelectorAll(options);
    const promoBlock = document.querySelector(promocode);
    const resultBlock = document.querySelector(result);
    
    const order = {};

    let sum = 0;

    const getCost = async (param, select) => {
        await getResource('assets/db.json')
        .then((result) => {
            if (result.price[param][select]) {
                const props = param === 'options' ? select : param;
                order[props] = Number(result.price[param][select]);
            } else {
                order[param] = param === 'promocode' ? 1 : 0;
            }
        })
        .catch((error) => console.error(error));
    };

    const showResult = () => {
        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
        } else {
            getCost('size', sizeBlock.value);
            getCost('material', materialBlock.value);
            optionsBlock.forEach((option) => {
                if (option.checked) {
                    getCost('options', option.value);
                } else {
                    order[option.value] = 0;
                }
            });
            getCost('promocode', promoBlock.value.toLowerCase());
            setTimeout(() => {
                const { size, material, gelCover, express, delivery, promocode } = order;
                sum = Math.round((size * material + gelCover + express + delivery) * promocode);

                resultBlock.textContent = `${sum} руб.`;
            }, 300);
            
        }
    };

    [sizeBlock, materialBlock, ...optionsBlock].forEach((item) => item.addEventListener('change', showResult));
    promoBlock.addEventListener('input', showResult);
};

export default calc;
