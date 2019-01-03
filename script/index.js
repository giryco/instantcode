createElementCode = () => {
    var file = document.getElementById("fileForUpload").files[0];
    if (file) {
        var reader = new FileReader(), response;
        reader.readAsText(file);
        reader.onload = function (evt) {
            let objectJson = evt.target.result;
            objectJson = JSON.parse(objectJson);

            setHTMLCode(objectJson.elements);
            setTSCode(objectJson);
        }
        reader.onerror = function (evt) {
            document.getElementById("htmlContent").innerHTML = "error reading file";
        }
    }
}

componentNameToCamelCase = (componentName) => {
    let componentNameArray = componentName.split('-'), camelCaseNameFirstUpper = '', camelCaseNameFirstLower = '';

    componentNameArray.forEach((element, i) => {
        if (i === 0) {
            camelCaseNameFirstUpper += element.charAt(0).toUpperCase() + element.slice(1);
            camelCaseNameFirstLower += element.charAt(0).toLowerCase() + element.slice(1);
        } else {
            camelCaseNameFirstUpper += element.charAt(0).toUpperCase() + element.slice(1);
            camelCaseNameFirstLower += element.charAt(0).toUpperCase() + element.slice(1);
        }
    });

    return {
        camelCaseNameFirstUpper: camelCaseNameFirstUpper,
        camelCaseNameFirstLower: camelCaseNameFirstLower
    }
}

setHTMLCode = (object) => {
    object.forEach(element => {
        if (!element.element) {
            console.log('element é um atributo obrigatório');
            return false;
        }

        switch (element.element) {
            case 'form':
                setHTMLFormCode(element);
                break;

            default:
            document.getElementById("htmlContent").innerHTML = "Elemento desconhecido";
                break;
        }
    });
}

setHTMLFormCode = (object) => {
    let htmlCode = '';
    if (!object.formGroup) {
        console.log('formGroup é um atributo obrigatório');
        return false;
    }

    if (!object.formatForm || object.formatForm.length < 1) {
        console.log('Array de formatForm é um atributo obrigatório');
        return false;
    }

    if (object['title']) {
        htmlCode += '<h1 mat-dialog-title>' + object['title'] + '</h1>';
    }
    htmlCode += '<div mat-dialog-content>';
    htmlCode += '<form [formGorup]="' + object.formGroup + '">';
    object.formatForm.forEach((element) => {
        if (!element.formGroupName) {
            console.log('formatForm[i].formGroupName é um atributo obrigatório');
            return false;
        }

        if (!element.element) {
            console.log('formatForm[i].element é um atributo obrigatório');
            return false;
        }

        if (!element.formControlName) {
            console.log('formatForm[i].formControlName é um atributo obrigatório');
            return false;
        }

        if (!element.placeholder) {
            console.log('formatForm[i].placeholder é um atributo obrigatório');
            return false;
        }

        if (element.element === "input") {
            htmlCode += setHTMLFormInputCode(element);
        }

        if (element.element === "select") {
            htmlCode += setHTMLFormSelectCode(element);
        }
    });

    htmlCode += '</form>';
    htmlCode += '</div>';
    document.getElementById("angularHTMLTitle").innerHTML = "HTML Code";
    document.getElementById("angularHTMLContent").innerText = htmlCode.toString();
}

setHTMLFormInputCode = (element) => {
    let htmlCode = '';

    htmlCode += '<mat-form-field> <input matInput formControlName="' + element['formControlName'] +'" placeholder="' + element['placeholder'] + '"';

    if (element.style) {
        htmlCode += ' style="' + element.style + '"';
    }

    if (element.classes && element.classes.length > 0) {
        htmlCode += ' class="';
        element.classes.forEach((classElement, i) => {
            if (i === 0) {
                htmlCode += classElement;
            } else {
                htmlCode += ' ,' + classElement;
            }
        });

        htmlCode += '"';
    }

    if (element.ids && element.ids.length > 0) {
        htmlCode += ' id="';
        element.ids.forEach((idElement, i) => {
            if (i === 0) {
                htmlCode += idElement;
            } else {
                htmlCode += ' ,' + idElement;
            }
        });

        htmlCode += '"';
    }

    if (element.events && element.events.length > 0) {
        element.events.forEach(event => {
            htmlCode += ' (' + event.event + ')="' + event.action + '"';
        });
    }

    htmlCode += '> </mat-form-field>';

    return htmlCode;
}

setHTMLFormSelectCode = (element) => {
    let htmlCode = '';

    htmlCode += '<mat-form-field> <mat-select formControlName="' + element['formControlName'] +'" placeholder="' + element['placeholder'] + '"';

    if (element.style) {
        htmlCode += ' style="' + element.style + '"';
    }

    if (element.classes && element.classes.length > 0) {
        htmlCode += ' class="';
        element.classes.forEach((classElement, i) => {
            if (i === 0) {
                htmlCode += classElement;
            } else {
                htmlCode += ' ,' + classElement;
            }
        });

        htmlCode += '"';
    }

    if (element.ids && element.ids.length > 0) {
        htmlCode += ' id="';
        element.ids.forEach((idElement, i) => {
            if (i === 0) {
                htmlCode += idElement;
            } else {
                htmlCode += ' ,' + idElement;
            }
        });

        htmlCode += '"';
    }

    if (element.events && element.events.length > 0) {
        element.events.forEach(event => {
            htmlCode += ' (' + event.event + ')="' + event.action + '"';
        });
    }

    htmlCode += '>';
    htmlCode += '</select> </mat-form-field>';

    return htmlCode;
}

setTSCode = (object) => {
    let tsCode = "";

    if (!object.componentName) {
        console.log('componentName é um atributo obrigatório');
        return false;
    }

    object.elements.forEach(element => {
        if (!element.element) {
            console.log('element é um atributo obrigatório');
            return false;
        }

        switch (element.element) {
            case 'form':
                objectToFeedTS = setTSFormCode(object, element); //must return an object
                break;

            default:
            document.getElementById("tsContents").innerHTML = "Elemento desconhecido";
                break;
        }
    });

    componentNameObject = componentNameToCamelCase(object.componentName);

    tsCode +=   `import { Component, OnInit, Inject } from '@angular/core';
                ${objectToFeedTS.formImport}
                ${objectToFeedTS.materialImport}
                /**
                 * Services
                 */
                ${objectToFeedTS.serviceImport}
                /**
                 * Validators
                 */
                ${objectToFeedTS.validatorImport}
                @Component({
                    selector: 'app-${object.componentName}',
                    templateUrl: './${object.componentName}.component.html',
                    styleUrls: ['./${object.componentName}.component.css']
                })
                export class ${componentNameObject.camelCaseNameFirstUpper}Component implements OnInit {
                    ${objectToFeedTS.attributes}

                    constructor (
                        ${objectToFeedTS.constructor}
                    ) {}
                    ngOnInit() {
                        ${objectToFeedTS.ngOnInit}
                    }
                }`;

                document.getElementById("angularTSTitle").innerHTML = "TS Code";
                document.getElementById("angularTSContent").innerText = tsCode.toString();
            }

setTSFormCode = (object, elementFromObject) => {
    console.log(object);
    if (!elementFromObject.formGroup) {
        console.log('formGroup é um atributo obrigatório');
        return false;
    }

    if (!elementFromObject.formatForm || elementFromObject.formatForm.length < 1) {
        console.log('Array de formatForm é um atributo obrigatório');
        return false;
    }
    const componentNameObject = componentNameToCamelCase(object.componentName);
    let checkGroup = '',
    objectToFeedTS = {
        componentName: '',
        formImport: '',
        serviceImport: '',
        materialImport: '',
        validatorImport: '',
        attributes: '',
        constructor: '',
        ngOnInit: '',
    };
    objectToFeedTS.formImport += `import { FormGroup, Validators, FormBuilder } from '@angular/forms';\n`;

    objectToFeedTS.attributes += `${elementFromObject.formGroup}DialogForm: FormGroup;\n`;

    objectToFeedTS.constructor += `private fb: FormBuilder,\n`;

    objectToFeedTS.ngOnInit += `this.${componentNameObject.camelCaseNameFirstLower}DialogForm = this.fb.group({\n`;

    elementFromObject.formatForm.forEach((element, index) => {
        var validatorsString = '';
        if (element.validators) {
            var object = setTSFormValidators(element.validators);

            object.forEach(e => {
                validatorsString += ', ' + e.string;
                if (e.import) {
                    objectToFeedTS.validatorImport += e.import + '\n';
                }
            });
        }

        if (index === 0) {
            objectToFeedTS.ngOnInit += "'" + element.formGroupName + "': this.fb.group({\n";
        }

        if ((checkGroup != element.formGroupName) && index !== 0) {
            objectToFeedTS.ngOnInit += "}),'" + element.formGroupName + "': this.fb.group({\n";
            objectToFeedTS.ngOnInit += `'${element.formControlName}': [${element.formControlNameDefaultValue ? element.formControlNameDefaultValue : null}${validatorsString}], \n`;
        } else {
            objectToFeedTS.ngOnInit += `'${element.formControlName}': [${element.formControlNameDefaultValue ? element.formControlNameDefaultValue : null}${validatorsString}], \n`;
        }

        checkGroup = element.formGroupName;
    });
    
    objectToFeedTS.ngOnInit += "})\n });\n";

    return objectToFeedTS;
    // document.getElementById("fileContents").innerText = tsCode.toString();
}

setTSFormValidators = (validators) => {
    var validatorsReturn = [];
    for (const key in validators) { console.log(validators);
        if (validators.hasOwnProperty(key)) {
            switch (key) {
                case 'required':
                    validatorsReturn.push({
                        string: 'Validators.required'
                    })
                break;

                case 'maxLength':
                    validatorsReturn.push({
                        string: `Validators.maxLength(${validators[key]})`
                    })
                break;

                case 'minLength':
                    validatorsReturn.push({
                        string: `Validators.minLength(${validators[key]})`
                    })
                break;

                case 'cpf':
                    validatorsReturn.push({
                        string: 'ValidateCpf',
                        import: 'import { ValidateCpf } from \'src/app/modules/shared/validators/cpf.validator\';'
                    })
                break;
            
                default:
                break;
            }
        }
    }

    return validatorsReturn;
}