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
            attributes: '',
            componentName: '',
            constructor: '',
            eventFunction: '',
            formImport: '',
            materialImport: '',
            ngOnInit: '',
            serviceImport: '',
            validatorImport: '',
        };

    objectToFeedTS.formImport += `import { FormGroup, Validators, FormBuilder } from '@angular/forms';\n`;

    objectToFeedTS.attributes += `${elementFromObject.formGroup}DialogForm: FormGroup;\n`;

    /**
     * constructor: start
     */
    elementFromObject.formatForm.forEach(element => {
        if (element.element === 'select' && element.options && element.options.api && element.options.api.route) {
            objectToFeedTS.constructor += `private _auth: AuthenticationService,
            private _crud: CrudService,\n`;
            objectToFeedTS.serviceImport += `import { AuthenticationService } from './../../../../shared/services/loopback/authentication.service';
            import { CrudService } from './../../../../shared/services/loopback/crud.service';\n`;
        }
    });

    objectToFeedTS.constructor += `private fb: FormBuilder,\n`;
    /**
     * constructor: end
     */

    /**
     * ngOnInit: start
     */
    objectToFeedTS.ngOnInit += `this.${componentNameObject.camelCaseNameFirstLower}DialogForm = this.fb.group({\n`;

    elementFromObject.formatForm.forEach((element, index) => {
        // Setting validators to FormGroup: start
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
        // Setting validators to FormGroup: end

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
    /**
     * ngOnInit: end
     */

    /**
     * readFromRoute: start
     */
    elementFromObject.formatForm.forEach((element) => {
        if (element.element === 'select' && element.options && element.options.api && element.options.api.route) {
            objectToFeedTS.ngOnInit += this.setReadFromRoute(element.options.api, element.formControlName + 'Response');
            objectToFeedTS.attributes += `${element.formControlName + 'Response'}: any;\n`;
        }
    });
    /**
     * readFromRoute: end
     */

    /**
     * events: start
     */
    elementFromObject.formatForm.forEach((element) => {
        if (element.events) {
            let eventsString = '';
            var object = setTSEvents(element.events);

            object.forEach(e => {
                eventsString += e;
            });

            objectToFeedTS.eventFunction += eventsString;
        }
    });
    /**
     * events: end
     */

    return objectToFeedTS;
}

setTSEvents = (events) => {
    let eventsReturn = [], params = '', argument = '// Your arguments here';

    events.forEach(element => {
        if (element.params) {
            element.params.forEach(e => {
                params += e;
            });
        }

        if (element.argument) {
            argument = element.argument;
        }

        eventsReturn.push(`
        ${element.name} = (${params}) => {
            ${argument}
        }
        `)
    });

    return eventsReturn;
}

setTSFormValidators = (validators) => {
    var validatorsReturn = [];
    for (const key in validators) {
        console.log(validators);
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

setReadFromRoute = (api, resolveIdentifier = 'returning') => { console.log(176);
    let apiReturn = '', apiProperties = '';
    switch (api) {
        case api.order:
            apiProperties += `,\norder: ${api.order}`;
            break;

        case api.where:
            apiProperties += `,\nwhere: ${api.where}`;
            break;

        default:
            break;
    }
    apiReturn += `
    this._crud.readFromRoute({
        route: '${api.route}${apiProperties}'
    }).then(res => {
        this.${resolveIdentifier} = res['response'][0]['attributes'];
    }, err => {
        this._auth.handleError(err, '');
    });
    `;
console.log(apiReturn);
    return apiReturn;
}