class MyComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hello World</h1>`;
  }
}

customElements.define("my-component", MyComponent);
