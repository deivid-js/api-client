class LoginPage extends BasePage {

    componentDidMount() {
        addEventById('btn-login', 'click', () => {
            const usuemail = byId('usuemail').value;
            const ususenha = byId('ususenha').value;

            if (!usuemail.length || !ususenha.length) {
                makeAlert('Preencha os campos corretamente!');

                return;
            }

            loadingStart();

            api.post('auth/login', { usuemail, ususenha })
                .then(({ data }) => {
                    localStorage.setItem(JWT_TOKEN_NAME, data.access_token);

                    api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;

                    loadingDestroy();
                })
                .catch(err => {
                    loadingDestroy();

                    makeAlert('Usuário e/ou senha inválidos');
                });
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

const Login = new LoginPage();
