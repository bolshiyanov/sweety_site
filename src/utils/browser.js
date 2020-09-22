const webviewRules = [
    // if it says it's a webview, let's go with that
    'WebView',
    // iOS webview will be the same as safari but missing "Safari"
    '(iPhone|iPod|iPad)(?!.*Safari)',
    // Android Lollipop and Above: webview will be the same as native but it will contain "wv"
    // Android KitKat to lollipop webview will put {version}.0.0.0
    'Android.*(wv|.0.0.0)',
    // old chrome android webview agent
    'Linux; U; Android'
];

const webviewRegExp = new RegExp('(' + webviewRules.join('|') + ')', 'ig');

export const isWebView = () => {
    return !!window.navigator.userAgent.match(webviewRegExp)
}

export const isMobile = () => {
    const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i]; 
    return toMatch.some((toMatchItem) => { 
        return window.navigator.userAgent.match(toMatchItem); });
}