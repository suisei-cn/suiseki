<div id="app">
  <header id="header">Suiseiki</header>
  <main id="timelines">
    {#each starList as star}
      <h2>{star[0]}</h2>
      <div>
        <Timeline sounds="{star[1]}" />
      </div>
    {/each}
  </main>
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import config from './config'
  import { categorizeSounds } from './components/soundProcessor'
  import type { Sound } from './types'
  import Timeline from './components/timeline.svelte'

  let starList: [string, Sound[]][] = []

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
        starList = Object.entries(stars)
      })
      .catch((e) => {
        console.error(e)
      })
    console.log(starList)
  })
</script>

<style lang="scss">
  :global(body) {
    height: 100vh;
    overflow: hidden;
    margin: 0;
  }

  #timelines {
    display: flex;
  }

  #header {
    line-height: 3vw;
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    background: #9a9ccc;
    padding: 4px 8px;
  }
</style>
