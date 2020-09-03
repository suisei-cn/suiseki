<div class="timelineItem">
  <svg
    class="svgIcon"
    on:mouseout="{mouHandler}"
    on:mouseover="{movHandler}"
    on:click="{(e) => (pagePermDisplay = true)}"
    viewBox="0 0 16 16"
  >
    <path
      d="M 2,8 8,2 14,8 8,14 Z"
      style="fill:#0089be;stroke:#000000;stroke-width:0.18520833;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1;stroke-miterlimit:4;stroke-dasharray:none"
    ></path>
  </svg>

  <Portal>
    {#if pageTempDisplay || pagePermDisplay}
      <div
        class="page"
        on:mouseout="{mouHandler}"
        on:mouseover="{movHandler}"
        style="{pageStyle}"
      >
        <p>Date: {sound.datetime}</p>
        <p>Performed by: {sound.performer}</p>
        <!-- svelte-ignore a11y-media-has-caption -->
        <audio controls>
          <source src="{sound.url}" />
        </audio>
        <div
          class="close"
          on:click="{(e) => (pageTempDisplay = pagePermDisplay = false)}"
        >
          CLOSE
        </div>
      </div>
    {/if}
  </Portal>
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import type { Sound } from '../types'
  import Portal from './portal.svelte'

  export let sound: Sound
  export let colIndex: number
  export let rowIndex: number
  let pageTempDisplay: boolean = false
  let pagePermDisplay: boolean = false
  let pageTempDisplayOverriden: boolean
  let pageStyle = ''

  function movHandler() {
    pageTempDisplay = pageTempDisplayOverriden = true
  }

  function mouHandler() {
    pageTempDisplayOverriden = false
    setTimeout(() => {
      if (pageTempDisplayOverriden) return
      pageTempDisplay = false
    }, 200)
  }

  onMount(() => {
    // Also update vairables.scss!
    const height = 180
    const width = 300
    const innerHeight = window.innerHeight
    const innerWidth = window.innerWidth
    const targetTop = 60 + rowIndex * 140
    const targetLeft = 140 + colIndex * 260
    pageStyle = `left: ${targetLeft}px; top: ${
      targetTop + height < innerHeight ? targetTop : innerHeight - height - 70
    }px`
  })
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .timelineItem {
    height: $timeline-height;
  }

  .svgIcon {
    height: $icon-height;
    width: $icon-height;
    display: block;
    margin-left: auto;
    margin-right: auto;
    z-index: 2;
  }

  .page {
    position: absolute;
    height: $dialog-height;
    width: $dialog-width;
    background: aqua;
    z-index: 1;
    padding: 3px 5px;
  }
</style>
