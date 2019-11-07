const Types = {
    INTEGER: 1,
    STRING: 2,
    NUMERIC: 3,
    DATE: 4,
    DATETIME: 5,
    CPFCNPJ: 6,
    OPTIONS: 7,
    FOREIGN: 8
};

let CURRENT_PAGE = null;

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

function byClass(className) {
    return Array.from(document.getElementsByClassName(className));
}

function addEventByClass(className, event, call) {
    byClass(className).forEach(item => item.addEventListener(event, call));
}

function load(PageClass) {
    if (CURRENT_PAGE) {
        CURRENT_PAGE.componentWillMount();
    }

    CURRENT_PAGE = PageClass;

    PageClass.init();
}

function loadingStart() {
    byId('loading').style.display = 'flex';
}

function loadingDestroy(_timeout) {
    const timeout = _timeout || 0;

    setTimeout(() => byId('loading').style.display = 'none', timeout);
}

function makeAlert(message) {
    alert(message);
}

function applyCnpjMask(value) {
    return value.padStart(14, '0').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
}

function applyCpfMask(value) {
    return value.padStart(11, '0').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
}

function openModal(title, content) {
    document.getElementById('modal-title-text').innerHTML = title;
    document.getElementById('modal-content').innerHTML = content;

    document.getElementById('modal-wrapper').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('modal').style.opacity = '1';
        document.getElementById('modal').style.marginTop = '0';
    }, 100);
}

function onCloseModal() {
    document.getElementById('modal').style.opacity = '.15';
    document.getElementById('modal').style.marginTop = '50vh';

    setTimeout(() => {
        document.getElementById('modal-wrapper').style.display = 'none';

        document.getElementById('modal-title-text').innerHTML = null;
        document.getElementById('modal-content').innerHTML = null;
    }, 100);
}

function toast(message, type) {
    fillHtmlById('topbar-status', `<span>${currentDateTime()}</span> ${message}`);
}

function fillData(n) {
    return ('0' + n).slice(-2);
}

function currentDateTime() {
    const now = new Date();

    return fillData(now.getUTCDate()) + '/' + fillData((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + fillData(now.getHours()) + ':' + fillData(now.getMinutes()) + ':' + fillData(now.getSeconds());
}