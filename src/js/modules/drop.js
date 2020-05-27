const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');
    
    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
        fileInputs.forEach((input) => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    const highlight = (item) => {
        item.closest('.file_upload').style.border = '5px dotted black';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    };

    const unhighlight = (item) => {
        item.closest('.file_upload').style.border = 'none';
        item.closest('.file_upload').style.backgroundColor = 'inherit';
    };

    ['dragenter', 'dragover'].forEach((eventName) => {
        fileInputs.forEach((input) => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
        fileInputs.forEach((input) => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach((input) => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;

            const nameAndTypeFile = input.files[0].name.split('.');
            const [ name, type ] = nameAndTypeFile;
            const dots = name.length > 6 ? '...' : '.';
            const showenName = `${name.substring(0, 6)}${dots}${type}`;
            input.previousElementSibling.textContent = showenName;
        });
    });
};

export default drop;