<div id="app">
  <Header on:changed="{searchHandler}" />
  {#if loadOK}
    <main id="container">
      <div id="timelines" bind:this="{timelines}">
        {#each filteredStarList as star, index}
          <Timeline title="{star[0]}" sounds="{star[1]}" index="{index}" />
        {/each}
        <FinalBlock
          cnt="{filteredStarList.length}"
          originalCnt="{starList.length}"
        />
      </div>
    </main>
    <Aplayer />
  {:else}
    <div id="loading">Loading...</div>
  {/if}
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import config from './config'
  import { categorizeSounds } from './components/soundProcessor'
  import type { Sound } from './types'
  import Timeline from './components/timeline.svelte'
  import Aplayer from './components/aplayer.svelte'
  import Header from './components/header.svelte'
  import FinalBlock from './components/finalBlock.svelte'

  let starList: [string, Sound[]][] = []
  let filteredStarList: [string, Sound[]][] = []
  let timelines: HTMLElement
  let currentFilterText = ''
  let loadOK = false

  function searchHandler(event: CustomEvent<any>) {
    let text = (event?.detail?.filter as string) || ''
    starListFilter(text)
  }

  function starListFilter(text: string) {
    currentFilterText = text
    text = text.replace(/^\s/, '').replace(/\s$/, '')
    if (text.length > 0) {
      text = text.toLowerCase()
      filteredStarList = starList.filter((x) => {
        const firstItem = x[1][0]
        return (
          firstItem.title.toLowerCase().includes(text) ||
          firstItem.artist.toLowerCase().includes(text)
        )
      })
    } else {
      filteredStarList = starList
    }
  }

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
        starList = Object.entries(stars).map(([_, entries]) => [
          entries[0].title,
          entries,
        ])
      })
      .catch((e) => {
        console.error(e)
      })
    filteredStarList = starList
    console.log(starList)
    starListFilter(currentFilterText)
    loadOK = true
  })
</script>

<style lang="scss">
  @import './styles/variables.scss';

  /* stylelint-disable */
  :global(body) {
    /* stylelint-enable */
    background: $background-color;
    height: 100vh;
    margin: 0;
    overflow: hidden;
  }

  #container {
    box-sizing: border-box;
    height: calc(100vh - #{$header-height});
    overflow-y: auto;
  }

  #timelines {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  #loading {
    color: #fff8;
    font-size: 3rem;
    left: 50%;
    position: fixed;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
</style>
