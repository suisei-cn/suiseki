<div id="app">
  <header id="header">
    <span>Suiseki <small>/ 彗跡</small></span>
    <span class="urls">
      <a href="https://twitter.com/suisei_hosimati"><i class="icon-twitter"></i></a>
      <a href="https://www.youtube.com/channel/UC5CwaMl1eIgY8h02uZw7u8A"><i
          class="icon-youtube"
        ></i></a>
      <a href="https://github.com/suisei-cn/suiseki"><i
          class="icon-github1"
        ></i></a>
    </span>
  </header>
  <main id="container">
    <div id="timelines" bind:this="{timelines}">
      {#each starList as star, index}
        <Timeline title="{star[0]}" sounds="{star[1]}" index="{index}" />
      {/each}
    </div>
  </main>
  <Aplayer />
</div>

<script lang="ts">
  import { onMount, setContext } from 'svelte'
  import config from './config'
  import { categorizeSounds } from './components/soundProcessor'
  import type { Sound } from './types'
  import Timeline from './components/timeline.svelte'
  import Aplayer from './components/aplayer.svelte'

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
  @import './styles/fontface.scss';
  @import './styles/variables.scss';

  /* stylelint-disable */
  :global(body) {
    /* stylelint-enable */
    height: 100vh;
    margin: 0;
    overflow: hidden;
    background: $background-color;
  }

  #header {
    background: #9a9ccc;
    box-sizing: border-box;
    font-size: 2rem;
    height: $header-height;
    letter-spacing: 0.1rem;
    line-height: calc(#{$header-height} - 8px);
    padding: 4px 8px;
    text-transform: uppercase;
  }

  .urls a {
    color: #0e67b1;
    font-size: 0.7em;
    margin-left: 5px;
    text-decoration: none;
  }

  #container {
    box-sizing: border-box;
    height: calc(100vh - #{$header-height});
    overflow: scroll;
  }

  #timelines {
    display: flex;
    flex-direction: column;
    position: relative;
  }
</style>
