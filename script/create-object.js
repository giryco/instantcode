addElementToObject = (element) => {
    switch (element) {
        case 'form':
            createFormElement();
            break;
    
        default:
            break;
    }
}

createFormElement = () => {
    let mainObject = {
        element: "form",
        formGroup: "",
        title: ""
    }

    for (const key in mainObject) {
        if (mainObject.hasOwnProperty(key) && mainObject[key] === '') {
            const element = mainObject[key];
            let newInput = document.createElement(key);
            document.getElementById('setObject').appendChild(newInput);
        }
    }
}