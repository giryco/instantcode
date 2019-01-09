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

camelCaseIdentifierToPhrasal = (camelCaseIdentifier) => {
    phrasalFirstUpperOnEachWord = '', phrasalAllUpper = '', phrasalOnlyFirstUpper = '', phrasalAllLower = '';

    for (let i = 0; i < camelCaseIdentifier.length; i++) {
        const char = camelCaseIdentifier[i];

        if (i > 0 && (char.toUpperCase() === char)) {
            phrasalFirstUpperOnEachWord += ' ' + char.toUpperCase();
            phrasalAllUpper += ' ' + char.toUpperCase();
            phrasalOnlyFirstUpper += ' ' + char.toLowerCase();
            phrasalAllLower += ' ' + char.toLowerCase();
        } else {
            if (i === 0) {
                phrasalFirstUpperOnEachWord += char.toUpperCase();
                phrasalAllUpper += char.toUpperCase();
                phrasalOnlyFirstUpper += char.toUpperCase();
                phrasalAllLower += char.toLowerCase();
            } else {
                phrasalFirstUpperOnEachWord += char.toLowerCase();
                phrasalAllUpper += char.toLowerCase();
                phrasalOnlyFirstUpper += char.toLowerCase();
                phrasalAllLower += char.toLowerCase();
            }
        }
    }

    return {
        phrasalFirstUpperOnEachWord: phrasalFirstUpperOnEachWord,
        phrasalAllUpper: phrasalAllUpper,
        phrasalOnlyFirstUpper: phrasalOnlyFirstUpper,
        phrasalAllLower: phrasalAllLower
    }
}