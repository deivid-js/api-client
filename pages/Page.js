class Page extends BasePage {

    constructor() {
        super();

        this.route = null;
        this.title = '';
        this.fields = [];

        this.setContainer('main-container');
    }

    setTitle(title) {
        this.title = title;
    }

    setRoute(route) {
        this.route = route;
    }

    setFields(fields) {
        this.fields = fields;
    }

    componentDidMount() {
        this.load();

        addEventById('btn-consultar', 'click', () => this.load());

        addEventById('btn-new', 'click', () => {
            openModal(`Cadastro de ${this.title}`, `<div class='form' id='form-handler'></div>`);

            this.makeForm('form-handler');

            addEventById('btn-onsendform', 'click', () => {
                loadingStart();

                let values = {};

                this.fields.forEach(field => {
                    if (!field.isKey) {
                        values[field.name] = byId(`f-${field.name}`).value;
                    }
                });
                
                api.post(`${this.route}/store`, values)
                    .then(response => {
                        toast('Registro cadastrado com sucesso!', 'error');

                        onCloseModal();

                        loadingDestroy();

                        this.load();
                    })
                    .catch(err => {
                        toast('Erro cadastrar o registro!', 'error');
        
                        onCloseModal();

                        loadingDestroy();
                    });
            });
        });
    }

    makeForm(id) {
        let form = '';
        let fkeys = [];

        this.fields.forEach(field => {
            if (!field.isKey) {
                form += `
                    <div class='form-row'>
                        <div><label for='f-${field.name}'>${field.alias}</label></div>
                        ${this.generateFormField(field)}
                    </div>
                `;

                if (field.type === Types.FOREIGN) {
                    fkeys.push(field);
                }
            }
        });

        fillHtmlById(id, form + `
            <br>
            <div class='form-buttons'>
                <button class='btn btn-primary' id='btn-onsendform'>Confirmar</button>
                <button class='btn btn-primary' id='btn-close-modal'>Cancelar</button>
            </div>
        `);

        if (fkeys.length) {
            loadingStart();

            fkeys.forEach(fkey => {
                api.get(`${fkey.route}/index`)
                    .then(response => {
                        const { data } = response.data;

                        let options = '';

                        data.forEach(item => options += `<option value='${item[fkey.name]}'>${item[fkey.get]}</option>`);

                        fillHtmlById(`f-${fkey.name}`, options);

                        loadingDestroy();
                    })
                    .catch(err => {
                        toast(`Erro ao carregar os dados da chave ${fkey.name}`, 'error');

                        loadingDestroy();
                    });
            });
        }
    }

    generateFormField(field) {
        let html = '';

        switch (field.type) {
            case Types.OPTIONS: {
                let options = '';

                Object.keys(field.options).forEach(key => options += `<option value='${key}'>${field.options[key]}</option>`);

                html = `<select style='width: 100%' id='f-${field.name}'>${options}</select>`;
                break;
            }
            case Types.FOREIGN: {
                html = `<select style='width: 100%' id='f-${field.name}'></select>`;
                break;
            }
            default: {
                html = `<input style='width: 100%' type='text' id='f-${field.name}' />`;
                break;
            }
        }

        return html;
    }

    load() {
        loadingStart();

        api.get(`${this.route}/index`)
            .then(response => {
                const { data } = response.data;

                fillHtmlById('table-total', data.length);

                let rows = '';

                data.forEach(row => {
                    let cells = '';
                    let key = null;

                    this.fields.forEach(field => {
                        if (field.isKey) {
                            key = row[field.name];
                        }

                        cells += `
                            <div style='width: ${field.width}%;'>
                                ${this.dressing(field, row[field.name])}
                            </div>
                        `;
                    });

                    rows += `
                        <div class='table-row'>
                            ${cells}
                            <div style='width: 10%;' class='actions'>
                                <img class='act-edit' key='${key}' src='icons/edit.svg' height='18px' width='18px'>
                                <img class='act-remove' key='${key}' src='icons/remove.svg' height='18px' width='18px'>
                            </div>
                        </div>
                    `;
                });

                fillHtmlById('table-body', rows);

                addEventByClass('act-edit', 'click', ({ target }) => this.onEdit(target));

                addEventByClass('act-remove', 'click', ({ target }) => this.onRemove(target));

                loadingDestroy();
            })
            .catch(err => {
                toast('Erro ao processar a requisição', 'error');

                loadingDestroy();
            });
    }

    onEdit(target) {
        const key = target.getAttribute('key');

        openModal(`Alteração de ${this.title}`, `<div class='form' id='form-handler'></div>`);

        this.makeForm('form-handler');

        this.fillFormByKey(key);

        addEventById('btn-onsendform', 'click', () => {
            loadingStart();

            let values = {};

            this.fields.forEach(field => {
                if (!field.isKey) {
                    values[field.name] = byId(`f-${field.name}`).value;
                }
            });
            
            api.put(`${this.route}/update/${key}`, values)
                .then(response => {
                    toast('Registro alterado com sucesso!', 'error');

                    onCloseModal();

                    loadingDestroy();

                    this.load();
                })
                .catch(err => {
                    toast('Erro alterado o registro!', 'error');
    
                    onCloseModal();

                    loadingDestroy();
                });
        });
    }

    fillFormByKey(key) {
        loadingStart();

        api.get(`${this.route}/show/${key}`)
            .then(response => {
                const { data } = response.data;

                this.fields.forEach(field => {
                    if (!field.isKey) {
                        byId(`f-${field.name}`).value = data[field.name];
                    }
                });

                loadingDestroy();
            })
            .catch(err => {
                toast('Erro obter os dados do registro!', 'error');

                onCloseModal();

                loadingDestroy();
            });
    }

    onRemove(target) {
        const key = target.getAttribute('key');

        openModal('Atenção', `
            <div>Você confirma a exclusão do registro ${key}?</div>
            <br>
            <div>
                <button class='btn btn-primary' id='btn-onremove'>Sim</button>
                <button class='btn btn-primary' id='btn-close-modal'>Não</button>
            </div>
        `);

        addEventById('btn-close-modal', 'click', onCloseModal);
        addEventById('btn-onremove', 'click', () => {
            loadingStart();

            api.delete(`${this.route}/destroy/${key}`)
                .then(response => {
                    target.parentElement.parentElement.remove();

                    loadingDestroy();
                    
                    onCloseModal();

                    toast('Registro excluido com sucesso!', 'success');

                    this.load();
                })
                .catch(err => {
                    console.log(err);
                    loadingDestroy();

                    onCloseModal();

                    toast('Não foi possível excluir o registro!', 'error');
                });
        });
    }

    dressing(field, value) {
        switch (field.type) {
            case Types.CPFCNPJ: {
                value = value.length === 14 ? applyCnpjMask(value) : applyCpfMask(value);
                break;
            }
            case Types.OPTIONS: {
                value = field.options[value];
                break;
            }
            default: {
                break;
            }
        }

        return value;
    }

    defaultLayout() {
        let headers = '';

        this.fields.forEach(field => headers += `<div style='width: ${field.width}%;'>${field.alias}</div>`);

        return `
            <div class='title-container'>
                <h3>Manutenção de ${this.title}</h3>
            </div>

            <div class='table-filters'>
                <button class='btn btn-primary' id='btn-new'>Cadastrar</button>
                <button class='btn btn-primary' id='btn-consultar'>Consultar</button>
            </div>
            
            <div class='table'>
                <div class='table-header'>${headers}<div style='width: 10%'>&nbsp;</div></div>
                <div id='table-body'></div>
                <div class='table-footer'>
                    <div>
                        <span id='table-total'>0</span> registro(s) encontrado(s)
                    </div>
                </div>
            </div>
        `;
    }

}
