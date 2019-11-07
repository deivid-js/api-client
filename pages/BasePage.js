class BasePage {

    init() {
        if (LAST_PAGE) {
            LAST_PAGE.componentWillMount();
        }

        LAST_PAGE = this;

        this.componentWillMount();

        fillHtmlById('root', this.render());

        this.componentDidMount();

        console.log(LAST_PAGE);
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillMount() {}

    render() {
        return 'Método render não implementado na classe filha.';
    }

}
