import WindowNavigatorWrapper from './WindowNavigatorWrapper';

/**
 * Checks if Geolocation is available in the browser
 *
 * @returns {boolean}
 */
export function canGeolocate() {
    return 'geolocation' in WindowNavigatorWrapper;
}

/**
 * Prepends an array or single string of CSS classes with a BEM modifier
 *
 * @param {array|string} classNames - List or string of classes to prepend
 * @param {string|null} modifier - Modifier class string (with trailing double dash --v)
 *
 * @returns {string}
 */
export function collateModifierClasses(classNames, modifier = null) {
    let classes;
    if (classNames) {
        classes = Array.isArray(classNames)
            ? classNames.map((_class) => {
                return `${modifier}${_class}`;
            })
            : `${modifier}${classNames}`;
    }

    return classes;
}
