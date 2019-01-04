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