class BasePage {

    constructor() {
        this.container = 'root';
    }

    init() {
        this.componentWillMount();

        fillHtmlById(this.container, this.render());

        this.componentDidMount();
    }

    setContainer(container) {
        this.container = container;
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillMount() {}

    render() {
        return 'Método render não implementado na classe filha.';
    }

}
