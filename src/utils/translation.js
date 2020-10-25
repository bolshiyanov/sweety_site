import translates from "constants/translation.json";

let lang = null;

const supportedLanguages = [ "en", "ru", "es", "fr", "de", "it" ];

export const __ = (text, language) => {
    text = text.toLowerCase();
    const defaultLang = getDefaultLanguage();

    const items = translates.filter(e => e.code.toLowerCase() === text || e.ru.toLowerCase() === text || e.en.toLowerCase() === text);
    if (items.length === 0) {
        return "{{" + text + ":" + ((language ?? lang) ?? defaultLang) + "}}";
    }

    return items[0][(language ?? lang) ?? defaultLang] ?? items[0].en;
};

export const ___ = (props, propName, language) => {
    const defaultLang = (language ?? lang) ?? getDefaultLanguage();
    const localizedPropName = propName + defaultLang[0].toUpperCase() + defaultLang[1];
    let result = props[localizedPropName];
    if (result) {
        return result;
    }
    result = props[propName];
    if (result) {
        return result;
    }
    return "";
};

export const setLocalizationLang = (value) => {
    lang = value?.toLowerCase();
}

export const getLocalizationLang = () => {
    return lang;
}

export const getDefaultLanguage = () => {
    var language = (window.navigator.userLanguage || window.navigator.language)?.substring(0, 2)?.toLowerCase();

    if (supportedLanguages.indexOf(language) >= 0) {
        return language;
    }

    return supportedLanguages[0];
}
