class HomePage extends BasePage {

    componentDidMount() {
        addEventById('btn-logout', 'click', () => {
            localStorage.removeItem(JWT_TOKEN_NAME);

            window.location.reload();
        });

         addEventByClass('menu-item', 'click', ({ target }) => {
            switch (target.getAttribute('page')) {
                case 'pessoa': {
                    Pessoa.init();
                    break;
                }
                case 'contato': {
                    Contato.init();
                    break;
                }
                case 'tipo_contato': {
                    TipoContato.init();
                    break;
                }
                case 'endereco': {
                    Endereco.init();
                    break;
                }
                default: {
                    makeAlert('Página não definida!');
                    break;
                }
            }
         });
    }

    render() {
        return `
            <div id='home-container'>
                <div id='home-left'>
                    <div id='menu-header'></div>
                    <div style='flex: 1; border-right: 1px solid rgba(0, 0, 0, .1); height: 100vh;'>
                        <div id='menu'>
                            <div class='menu-item' page='pessoa'>Pessoa</div>
                            <div class='menu-item' page='contato'>Contato</div>
                            <div class='menu-item' page='tipo_contato'>Tipo Contato</div>
                            <div class='menu-item' page='endereco'>Endereço</div>
                        </div>
                    </div>
                </div>
                <div id='home-right'>
                    <div id='topbar'>
                        <div id='topbar-status'>&nbsp;</div>
                        <button class='btn-link' id='btn-logout'>Sair</button>
                    </div>
                    <div id='main-container'>Home</div>
                </div>
            </div>
        `;
    }

}

const Home = new HomePage();
