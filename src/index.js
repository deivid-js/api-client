function app() {
    if (!hasValidToken()) {        
        redirect(new Login());

        return;
    }

    redirect(Home);
}

app();
