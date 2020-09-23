import App from './App.svelte'
import initi18n from './utils/i18n'
import * as Sentry from '@sentry/browser'

initi18n()

Sentry.init({
  dsn:
    'https://96cc0ec9a8e54ce2b4599eb4ef5f1df3@o407537.ingest.sentry.io/5438158',
  release: 'NULL_RELEASE',
})

const app = new App({
  target: document.body,
})

export default app
