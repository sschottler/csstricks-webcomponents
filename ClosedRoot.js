const shadowRoots = new WeakMap();

class ClosedRoot extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoots.set(this, shadowRoot);
  }

  connectedCallback() {
    const shadowRoot = shadowRoots.get(this);
    shadowRoot.innerHTML = `<h1>Hello from a closed shadow root</h1>`;
  }
}
