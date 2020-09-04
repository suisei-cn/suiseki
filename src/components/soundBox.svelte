<div
  class="page"
  on:mouseout="{(e) => {
    dispatch('close')
  }}"
  on:mouseover="{(e) => {
    dispatch('keep')
  }}"
  style="{pageStyle}"
>
  <p>Date: {sound.datetime}</p>
  <p>Performed by: {sound.performer}</p>
  <!-- svelte-ignore a11y-media-has-caption -->
  <audio
    controls
    on:playing="{(e) => {
      dispatch('musicstatchange', { status: true })
    }}"
    on:pause="{(e) => {
      console.log('CLOSE')
      dispatch('musicstatchange', { status: false })
    }}"
  >
    <source src="{sound.url}" />
  </audio>
  <div class="close" on:click="{(e) => dispatch('close', { force: true })}">
    CLOSE
  </div>
</div>

<script lang="ts">
  import { createEventDispatcher, getContext, onMount } from 'svelte'
  import type { Sound } from '../types'

  export let rowIndex: number
  export let colIndex: number
  export let sound: Sound
  let pageStyle = ''
  const dispatch = createEventDispatcher()
  const targetBase: HTMLElement = getContext('timelines')

  function calculateAndSetLocation() {
    // Also update vairables.scss!
    const height = 180
    const width = 300
    const songInfoHeight = 88
    const titleHeight = 50

    const bounding = targetBase.getBoundingClientRect()
    const innerHeight = window.innerHeight - titleHeight
    const innerWidth = window.innerWidth
    const xLenBeforeViewport = -1 * bounding.x
    const yLenBeforeViewport = titleHeight - bounding.y
    const xDiffDistance = 20
    const yDiffDistance = -30
    const edgeDistance = 15

    // Optimized targetTop
    let targetTop = songInfoHeight + rowIndex * 140 + yDiffDistance
    if (targetTop + height > yLenBeforeViewport + innerHeight) {
      targetTop = yLenBeforeViewport + innerHeight - edgeDistance - height
    } else if (targetTop - yLenBeforeViewport < songInfoHeight) {
      targetTop = songInfoHeight + yLenBeforeViewport + edgeDistance
    }

    // Optimized targetLeft
    let targetLeft = 140 + colIndex * 260
    if (targetLeft - xLenBeforeViewport + width > innerWidth) {
      targetLeft = 140 + colIndex * 260 - xDiffDistance - width
    }
    pageStyle = `left: ${targetLeft}px; top: ${targetTop}px`
  }

  onMount(() => {
    calculateAndSetLocation()
  })
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .page {
    position: absolute;
    height: $dialog-height;
    width: $dialog-width;
    color: white;
    background: #1f8ece;
    z-index: 3;
    padding: 3px 5px;
    border-radius: 5px;
    box-sizing: border-box;
  }
</style>
