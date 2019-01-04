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
                        ${objectToFeedTS.constructor}) {}
                    ngOnInit() {
                        ${objectToFeedTS.ngOnInit}
                    }

                    /**
                     * Events functions area: start
                     */
                    ${objectToFeedTS.eventFunction}
                    /**
                     * Events functions area: end
                     */
                }
                `;

                document.getElementById("angularTSTitle").innerHTML = "TS Code";
                document.getElementById("angularTSContent").innerText = tsCode.toString();
}