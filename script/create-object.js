let componentObject = {
    componentName: '',
    elements: []
}

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
    let elementObject = {
        element: 'form',
        formGroup: '',
        title: ''
    }, count = 1;

    for (const key in elementObject) {
        if (elementObject.hasOwnProperty(key) && elementObject[key] === '') {
            let newLabel = document.createElement('label');
            newLabel.innerHTML = key + ': ';
            
            let newInput = document.createElement('input');
            newInput.setAttribute('id', key);

            let newDiv = document.createElement('div');
            newDiv.appendChild(newLabel);
            newDiv.appendChild(newInput);

            switch (key) {
                case 'formGroup':
                    let formGroupNameSuggestion = componentNameToCamelCase(document.getElementById('component').value);

                    newInput.value = formGroupNameSuggestion.camelCaseNameFirstLower + 'Form';
                    break;

                case 'title':
                    let titleSuggestion = componentNameToCamelCase(document.getElementById('component').value);

                    newInput.value = titleSuggestion.camelCaseNameFirstUpper;
                    break;
            
                default:
                    break;
            }

            if (count === Object.keys(elementObject).length) {
                newInput.setAttribute('onkeydown', 'displayOverComponent(\'setForm\')');
            }
            
            document.getElementById('setObject').appendChild(newDiv);
        }

        count ++;
    }
}

setFormElement = (element) => {
    switch (element) {
        case 'input':
            setFormInput();
            break;

        case 'select':
            setFormSelect();
            break;
    
        default:
            break;
    }
}

setFormInput = () => {
    let elementObject = {
        formGroupName: '',
        element: 'input',
        type: '',
        formControlName: '',
        placeholder: '',
        validators: {}, //required: true, cpf: true - document it all
        mask: '',
        style: '',
        classes: [],
        ids: [],
        events: [],
        attributes: [],
        ngIf: ''
    }

    let count = 1;

    for (const key in elementObject) {
        if (
            (elementObject.hasOwnProperty(key) && (elementObject[key] === ''))
            || (typeof elementObject[key] === 'object')
        ) {
            if (count == 1) {                
                let newH3 = document.createElement('h3');
                newH3.innerHTML = 'Input inside ' + document.getElementById('formGroup').value + ' form group';
                document.getElementById('setObject').appendChild(newH3);
            }
            
            let newLabel = document.createElement('label');
            newLabel.innerHTML = key + ': ';

            let newInput;

            switch (key) {
                case 'type':
                    typesArray = ['text', 'color','date','datetime-local','email','month','number','range','search','tel','time','url','week'];
                    
                    newInput = document.createElement('select');
                    
                    typesArray.forEach(element => {
                        let newOption = document.createElement('option');
                        newOption.setAttribute('value', element);
                        newOption.innerHTML = element;
                        newInput.appendChild(newOption);
                    });

                    newDiv.appendChild(newInput);
                    break;
                
                case 'validators':
                    typesArray = ['', 'required', 'maxLength','minLength','cpf','cnpj','email'];
                    
                    newInput = document.createElement('select');
                    
                    typesArray.forEach(element => {
                        let newOption = document.createElement('option');
                        newOption.setAttribute('value', element);
                        newOption.innerHTML = element;
                        newInput.appendChild(newOption);
                    });

                    newDiv.appendChild(newInput);
                    break;
                    
                default:
                    newInput = document.createElement('input');
                    newInput.setAttribute('id', key);
                    break;
            }
            
            var newDiv = document.createElement('div');
            newDiv.appendChild(newLabel);
            newDiv.appendChild(newInput);

            document.getElementById('setObject').appendChild(newDiv);
        }

        count ++;
    }
}

submitFormElement = () => {
    let elementObject = {
        element: 'form',
        formGroup: '',
        title: ''
    }, formatFormObject = {};

    for (const key in elementObject) {
        if (elementObject.hasOwnProperty(key) && elementObject[key] === '') {
            elementObject[key] = document.getElementById(key).value;
        }
    }

    let elementObjectWithFormatForm = {
        ...elementObject,
        formatForm: formatFormObject
    };

    componentObject.elements.push(elementObjectWithFormatForm);
}