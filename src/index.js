function app() {
    document.getElementById('modal-title-button').addEventListener('click', onCloseModal);
    document.getElementById('modal-close-zone').addEventListener('click', onCloseModal);

    if (!hasValidToken()) {        
        load(Login);

        return;
    }

    load(Home);
}

app();
