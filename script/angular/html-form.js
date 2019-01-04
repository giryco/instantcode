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