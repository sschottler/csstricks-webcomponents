import { LitElement, html } from "lit-element";
import "./OneDialog";

class SomeComponent extends LitElement {
  static get properties() {
    return {
      now: { type: String }
    };
  }

  connectedCallback() {
    // Be sure to call the super
    super.connectedCallback();
    this.interval = window.setInterval(() => {
      this.now = Date.now();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.interval);
  }

  render() {
    return html`
      <h1>It is ${this.now}</h1>
    `;
  }
}

customElements.define("some-component", SomeComponent);
