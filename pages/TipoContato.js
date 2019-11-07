class TipoContatoScreen extends Page {

    constructor() {
        super();

        this.setTitle('Tipo Contato');
        this.setRoute('tipo-contato');
        this.setFields([
            {
                name: 'tcocodigo',
                alias: 'Código',
                type: Types.INTEGER,
                width: 20,
                isKey: true
            },
            {
                name: 'tcodescricao',
                alias: 'Descrição',
                type: Types.STRING,
                width: 70,
                min: 3,
                max: 100
            }
        ]);
    }

    render() {
        return this.defaultLayout();
    }

}

const TipoContato = new TipoContatoScreen();
