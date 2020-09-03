import {
  addMessages,
  init,
  getLocaleFromNavigator,
  getLocaleFromQueryString,
} from 'svelte-i18n'

import en from '../lang/en'
import zh from '../lang/zh'

export default () => {
  addMessages('en', en)
  addMessages('zh', zh)

  init({
    fallbackLocale: 'en',
    initialLocale: (
      getLocaleFromQueryString('lang') || getLocaleFromNavigator()
    ).split('-')[0],
  })
}
