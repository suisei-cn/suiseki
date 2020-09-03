import App from './App.svelte'
import initi18n from './utils/i18n'

initi18n()

const app = new App({
  target: document.body,
})

export default app
