
export default {
  enhancer: window.devToolsExtension ? window.devToolsExtension() : f => f
}
