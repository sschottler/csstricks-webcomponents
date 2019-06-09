import { LitElement, html, css } from "lit-element";

const privateOpen = Symbol("open");

class OneDialog extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, attribute: "open", reflect: true }
    };
  }

  static get styles() {
    return [
      css`
        .wrapper {
          opacity: 0;
          transition: visibility 0s, opacity 0.25s ease-in;
        }
        .wrapper:not(.open) {
          visibility: hidden;
        }
        .wrapper.open {
          align-items: center;
          display: flex;
          justify-content: center;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 1;
          visibility: visible;
        }
        .overlay {
          background: rgba(0, 0, 0, 0.8);
          height: 100%;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
        }
        .dialog {
          background: #ffffff;
          max-width: 600px;
          padding: 1rem;
          position: fixed;
        }
        button {
          all: unset;
          cursor: pointer;
          font-size: 1.25rem;
          position: absolute;
          top: 1rem;
          right: 1rem;
        }
        button:focus {
          border: 2px solid blue;
        }
      `
    ];
  }

  firstUpdated() {
    this._watchEscape = this._watchEscape.bind(this);
  }

  render() {
    return html`
      <div
        class="wrapper ${this.open ? "open" : ""}"
        aria-hidden="${!this.open}"
      >
        <div class="overlay" @click="${this.close}"></div>
        <div
          class="dialog"
          role="dialog"
          aria-labelledby="title"
          aria-describedby="content"
        >
          <button class="close" aria-label="Close" @click=${this.close}>
            ✖️
          </button>
          <h1 id="title"><slot name="heading"></slot></h1>
          <div id="content" class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  get open() {
    return this[privateOpen];
  }
  set open(isOpen) {
    this[privateOpen] = isOpen;
    const { shadowRoot } = this;
    const { activeElement } = document;
    if (isOpen) {
      setTimeout(() => shadowRoot.querySelector("button").focus());
      if (activeElement) {
        this._wasFocused = activeElement;
      }
      document.addEventListener("keydown", this._watchEscape);
    } else {
      this._wasFocused && this._wasFocused.focus && this._wasFocused.focus();
      document.removeEventListener("keydown", this._watchEscape);
    }
  }

  close() {
    this.open = false;
    const closeEvent = new CustomEvent("dialog-closed");
    this.dispatchEvent(closeEvent);
  }

  _watchEscape(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}

customElements.define("one-dialog", OneDialog);
