import styles './styles.css';

class SomeComponent extends HTMLElement {
    constructor() {
        super();
        this.adoptedStyleSheets = [styles];
    }
}