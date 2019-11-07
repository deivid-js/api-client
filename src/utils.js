const JWT_TOKEN_NAME = '@APP/token';
let LAST_PAGE = null;

function hasValidToken() {
    const token = localStorage.getItem(JWT_TOKEN_NAME);

    return !!token;
}

function byId(id) {
    return document.getElementById(id);
}

function fillHtmlById(id, html) {
    byId(id).innerHTML = html;
}

function addEventById(id, event, call) {
    byId(id).addEventListener(event, call);
}

function redirect(PageClass) {
    PageClass.init();
}
