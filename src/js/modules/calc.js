import { getResource } from '../services/requests';

const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size);
    const materialBlock = document.querySelector(material);
    const optionsBlock = document.querySelectorAll(options);
    const promoBlock = document.querySelector(promocode);
    const resultBlock = document.querySelector(result);
    
    const orderState = {
        size: 'empty',
        material: 'empty',
        options: {
            gelCover: false,
            express: false,
            delivery: false,
        },
        promocode: {
            iwantpopart: false,
        }
    };

    let sum = 0;

    const renderSumOfOrder = (pricelist) => {
        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
        } else {
        const { size, material, options, promocode } = orderState;
        const { gelCover, express, delivery } = options;
        console.log(gelCover, express, delivery);
        const { iwantpopart } = promocode;

        const sizeCost = pricelist.size[size];
        const materialCost = pricelist.material[material];
        const gelCoverCost = gelCover ? +pricelist.options.gelCover : 0;
        const expressCost = express ? +pricelist.options.express : 0;
        const deliveryCost = delivery ? +pricelist.options.delivery : 0;
        const optionsCost = gelCoverCost + expressCost + deliveryCost;
        const hasPromo = iwantpopart ? +pricelist.promocode.iwantpopart : 1;
        
        sum = Math.round((sizeCost * materialCost + optionsCost) * hasPromo);

        resultBlock.textContent = `${sum} руб.`;
        }
    };

    const getCost = async () => {
        await getResource('assets/db.json')
        .then((result) => renderSumOfOrder(result.price))
        .catch((error) => console.error(error));
    };

    const showResult = () => {
        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
        } else {
            getCost();
        }
    };

    [sizeBlock, materialBlock, ...optionsBlock].forEach((item) => item.addEventListener('change', ({ target }) => {
        const param = target.parentElement.getAttribute('data-param');
        if (param == 'options') {
            orderState[param][target.value] = target.checked;
        } else {
            orderState[param] = target.value;
        }
        showResult();
    }));
    promoBlock.addEventListener('input', ({ target }) => {
        const param = target.parentElement.getAttribute('data-param');
        const customerPromo = target.value.toLowerCase();
        if (orderState[param].hasOwnProperty(customerPromo)) {
            orderState[param][customerPromo] = true;
        } else {
            for (const promo in orderState[param]) {
                orderState[param][promo] = false;
            }
        }
        showResult();
    });
};

export default calc;
