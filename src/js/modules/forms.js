// import checkNumInput from './checkNumImput';

const forms = () => {
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    const upload = document.querySelectorAll('[name="upload"]');
    
    // checkNumInput('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка',
        success:  'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так :(',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php',
    };

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach((item) => {
            item.value = '';
        });
        upload.forEach((item) => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };

    upload.forEach((item) => {
        item.addEventListener('input', () => {
            const nameAndTypeFile = item.files[0].name.split('.');
            const [ name, type ] = nameAndTypeFile;
            const dots = name.length > 6 ? '...' : '.';
            const showenName = `${name.substring(0, 6)}${dots}${type}`;
            item.previousElementSibling.textContent = showenName;
        });
    });

    form.forEach((item) => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            const statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            const textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            const api = item.closest('.popup-design') || item.classList.contains('calc-form') ? path.designer : path.question;
            console.log(api);

            postData(api, formData)
                .then((result) => {
                    console.log(result);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
};

export default forms;