class Login extends BasePage {

    componentDidMount() {
        addEventById('btn-login', 'click', () => {
            alert(1);
        });
    }

    render() {
        return `
            <div id='login-container'>
                <div id='login-box'>
                    <div>
                        <label for='usuemail'>E-mail</label>
                        <input id='usuemail' type='text' placeholder='Digite o seu e-mail'>
                    </div>
                    <div>
                        <label for='ususenha'>Senha</label>
                        <input id='ususenha' type='password' placeholder='Digite a sua senha'>
                    </div>
                    <div>
                        <button id='btn-login' class='btn btn-primary'>Entrar</button>
                    </div>
                </div>
            </div>
        `;
    }

}

