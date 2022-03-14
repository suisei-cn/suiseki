<div class="timelineItem">
  <svg
    class="svgIcon"
    on:mouseout="{(e) => moveOutHandler()}"
    on:blur="{(e) => moveOutHandler()}"
    on:mouseover="{(e) => moveInHandler()}"
    on:focus="{(e) => moveInHandler()}"
    on:click="{(e) => (pagePermDisplayByUser = true)}"
    viewBox="0 0 16 16"
  >
    <path d="M 2,8 8,2 14,8 8,14 Z"></path>
  </svg>

  <Portal>
    {#if pageDisplay}
      <SoundBox
        soundIndex="{soundIndex}"
        revIndex="{revIndex}"
        sound="{sound}"
        on:keep="{(e) => moveInHandler()}"
        on:close="{(e) => moveOutHandler(e?.detail?.force)}"
        parentScroller="{parentScroller}"
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
  export let soundIndex: number
  export let revIndex: number
  export let parentScroller: HTMLElement
  let pageTempDisplay: boolean = false
  let pagePermDisplayByUser: boolean = false
  let pageTempDisplayOverriden: boolean
  let pageStyle = ''

  $: pageDisplay = pageTempDisplay || pagePermDisplayByUser

  function moveInHandler() {
    pageTempDisplay = pageTempDisplayOverriden = true
  }

  function moveOutHandler(force: boolean = false) {
    if (force) {
      pageTempDisplay = pagePermDisplayByUser = false
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
    width: $timeline-block-width;
  }

  .svgIcon {
    display: block;
    height: $icon-height;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: calc(($timeline-height / 2) - ($icon-height / 2));
    position: relative;
    width: $icon-height;
    z-index: 2;

    path {
      fill: $connection-dot-color;
      fill-opacity: 1;
      stroke: #000;
      stroke-dasharray: none;
      stroke-linecap: butt;
      stroke-linejoin: miter;
      stroke-miterlimit: 4;
      stroke-opacity: 1;
      stroke-width: 0.19;
    }
  }
</style>
