<div class="timelineItem">
  <svg
    class="svgIcon"
    on:mouseout="{(e) => moveOutHandler()}"
    on:mouseover="{moveInHandler}"
    on:click="{(e) => (pagePermDisplay = true)}"
    viewBox="0 0 16 16"
  >
    <path
      d="M 2,8 8,2 14,8 8,14 Z"
      style="fill:#23b7e0;stroke:#000000;stroke-width:0.18520833;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1;stroke-miterlimit:4;stroke-dasharray:none"
    ></path>
  </svg>

  <Portal>
    {#if pageTempDisplay || pagePermDisplay}
      <SoundBox
        rowIndex="{rowIndex}"
        colIndex="{colIndex}"
        sound="{sound}"
        on:keep="{moveInHandler}"
        on:close="{(e) => moveOutHandler(e?.detail?.force)}"
      />
    {/if}
  </Portal>
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import type { Sound } from '../types'
  import Portal from './portal.svelte'
  import SoundBox from './soundBox.svelte'

  export let sound: Sound
  export let colIndex: number
  export let rowIndex: number
  let pageTempDisplay: boolean = false
  let pagePermDisplay: boolean = false
  let pageTempDisplayOverriden: boolean
  let pageStyle = ''

  function moveInHandler() {
    pageTempDisplay = pageTempDisplayOverriden = true
  }

  function moveOutHandler(force: boolean = false) {
    if (force) {
      pageTempDisplay = pagePermDisplay = false
      return
    }
    pageTempDisplayOverriden = false
    setTimeout(() => {
      if (pageTempDisplayOverriden) return
      pageTempDisplay = false
    }, 200)
  }
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
    position: relative;
    margin-left: auto;
    margin-right: auto;
    z-index: 2;
  }
</style>
