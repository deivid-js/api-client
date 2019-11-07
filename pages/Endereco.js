class EnderecoScreen extends Page {

    constructor() {
        super();

        this.setTitle('Endereço');
        this.setRoute('endereco');
        this.setFields([
            {
                name: 'endcodigo',
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
                name: 'endestado',
                alias: 'Estado',
                type: Types.STRING,
                width: 10
            },
            {
                name: 'endcidade',
                alias: 'Cidade',
                type: Types.STRING,
                width: 10
            },
            {
                name: 'endbairro',
                alias: 'Bairro',
                type: Types.STRING,
                width: 10
            },
            {
                name: 'endlogradouro',
                alias: 'Logradouro',
                type: Types.STRING,
                width: 10
            },
            {
                name: 'endnumero',
                alias: 'Número',
                type: Types.INTEGER,
                width: 10
            },
            {
                name: 'endcomplemento',
                alias: 'Complemento',
                type: Types.STRING,
                width: 10
            },
            {
                name: 'endreferencia',
                alias: 'Referência',
                type: Types.STRING,
                width: 10
            },
            {
                name: 'endobservacao',
                alias: 'Observacao',
                type: Types.STRING,
                width: 10
            }
        ]);
    }

    render() {
        return this.defaultLayout();
    }

}

const Endereco = new EnderecoScreen();
