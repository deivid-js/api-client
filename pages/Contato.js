class ContatoScreen extends Page {

    constructor() {
        super();

        this.setTitle('Contato');
        this.setRoute('contato');
        this.setFields([
            {
                name: 'concodigo',
                alias: 'Código',
                type: Types.INTEGER,
                width: 10,
                isKey: true
            },
            {
                name: 'psocodigo',
                alias: 'Pessoa',
                type: Types.FOREIGN,
                width: 10,
                route: 'pessoa',
                get: 'psonome'
            },
            {
                name: 'tcocodigo',
                alias: 'Tipo',
                type: Types.FOREIGN,
                width: 10,
                route: 'tipo-contato',
                get: 'tcodescricao'
            },
            {
                name: 'condescricao',
                alias: 'Descrição',
                type: Types.STRING,
                width: 60
            }
        ]);
    }

    render() {
        return this.defaultLayout();
    }

}

const Contato = new ContatoScreen();
