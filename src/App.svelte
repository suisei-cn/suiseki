<main></main>

<script lang="ts">
  import { onMount } from 'svelte'
  import config from './config'
  import { categorizeSounds } from './components/soundProcessor'
  import type { StarList } from './types'

  let starList: StarList = {}

  onMount(async () => {
    await fetch(config.SOUNDS_URL)
      .then((x) => x.json())
      .then((x) => {
        const stars = categorizeSounds(x)
        for (const i of Object.keys(stars)) {
          if (stars[i].length <= 1) {
            delete stars[i]
          }
        }
        starList = stars
      })
      .catch((e) => {
        console.error(e)
      })
    console.log(starList)
  })
</script>

<style lang="scss">

</style>
