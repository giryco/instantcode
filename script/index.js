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
                objectToFeedTS = setTSFormCode(element); //must return an object
                break;

            default:
            document.getElementById("tsContents").innerHTML = "Elemento desconhecido";
                break;
        }
    });

    componentNameObject = componentNameToCamelCase(object.componentName);

    tsCode += "import { Component, OnInit, Inject } from '@angular/core';\
    " + objectToFeedTS.formImport + "\
    " + objectToFeedTS.materialImport + "\
    /**\
     * Services\
     */\
     " + objectToFeedTS.serviceImport + "\
    /**\
     * Validators\
     */\
     " + objectToFeedTS.materialImport + "\
     @Component({\
        selector: 'app-" + object.componentName + "',\
        templateUrl: './" + object.componentName + ".component.html',\
        styleUrls: ['./" + object.componentName + ".component.css']\
      })\
      export class " + componentNameObject.camelCaseNameFirstUpper + "Component implements OnInit {\
        \
      }";

      document.getElementById("angularTSTitle").innerHTML = "TS Code";
      document.getElementById("angularTSContent").innerText = tsCode.toString();
}

setTSFormCode = (object) => {
    let tsCode = '',
    objectToFeedTS = {
        componentName: '',
        formImport: '',
        serviceImport: '',
        materialImport: '',
    };
    if (!object.formGroup) {
        console.log('formGroup é um atributo obrigatório');
        return false;
    }

    if (!object.formatForm || object.formatForm.length < 1) {
        console.log('Array de formatForm é um atributo obrigatório');
        return false;
    }

    tsCode += object.formGroup + ': FormGroup;';

    return objectToFeedTS;
    // document.getElementById("fileContents").innerText = tsCode.toString();
}
//     <form [formGroup]="materialDialogForm">
//         <fieldset formGroupName="materialGroup">
//         </fieldset>
//     </form>

// <div mat-dialog-actions>
//     <button mat-raised-button (click)="onAccountDialogSubmit()" [disabled]="materialDialogForm.invalid">{{this.submitButton}}</button>
// </div>
// `;