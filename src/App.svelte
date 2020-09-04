<div id="app">
  <header id="header">Suiseki <small>/ 彗跡</small></header>
  <main id="container">
    <div id="timelines" bind:this="{timelines}">
      {#each starList as star, index}
        <Timeline title="{star[0]}" sounds="{star[1]}" index="{index}" />
      {/each}
    </div>
  </main>
</div>

<script lang="ts">
  import { onMount, setContext } from 'svelte'
  import config from './config'
  import { categorizeSounds } from './components/soundProcessor'
  import type { Sound } from './types'
  import Timeline from './components/timeline.svelte'

  let starList: [string, Sound[]][] = []
  let timelines: HTMLElement

  onMount(async () => {
    setContext('timelines', timelines)
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

  #header {
    height: 6vh;
    line-height: calc(6vh - 8px);
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    background: #9a9ccc;
    padding: 4px 8px;
    box-sizing: border-box;
  }

  #container {
    overflow: scroll;
    height: 94vh;
    box-sizing: border-box;
  }

  #timelines {
    display: flex;
    position: relative;
  }
</style>
