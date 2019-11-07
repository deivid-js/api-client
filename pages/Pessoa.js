class PessoaScreen extends Page {

    constructor() {
        super();

        this.setTitle('Pessoa');
        this.setRoute('pessoa');
        this.setFields([
            {
                name: 'psocodigo',
                alias: 'Código',
                type: Types.INTEGER,
                width: 10,
                isKey: true
            },
            {
                name: 'psonome',
                alias: 'Nome',
                type: Types.STRING,
                width: 50,
                min: 3,
                max: 100
            },
            {
                name: 'psocpfcnpj',
                alias: 'CPF/CNPJ',
                type: Types.CPFCNPJ,
                width: 15
            },
            {
                name: 'psotipo',
                alias: 'Tipo',
                type: Types.OPTIONS,
                width: 15,
                options: {
                    'F': 'Física',
                    'J': 'Jurídica'
                }
            }
        ]);
    }

    render() {
        return this.defaultLayout();
    }

}

const Pessoa = new PessoaScreen();
