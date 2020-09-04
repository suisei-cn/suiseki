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
  <audio controls>
    <source src="{sound.url}" />
  </audio>
  <div class="close" on:click="{(e) => dispatch('close', { force: true })}">
    CLOSE
  </div>
</div>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import type { Sound } from '../types'

  export let rowIndex: number
  export let colIndex: number
  export let sound: Sound
  let pageStyle = ''
  const dispatch = createEventDispatcher()

  onMount(() => {
    // Also update vairables.scss!
    const height = 180
    const width = 300
    const titleHeight = 70

    const innerHeight = window.innerHeight
    const innerWidth = window.innerWidth
    // Optimized targetTop
    let targetTop = 60 + rowIndex * 140
    if (targetTop + height > innerHeight) {
      targetTop = innerHeight - height - 70
    }
    if (targetTop < titleHeight) {
      targetTop = titleHeight + 30
    }
    // Optimized targetLeft
    let targetLeft = 140 + colIndex * 260
    if (targetLeft + width > innerWidth) {
      targetLeft = targetLeft - width - 30
    }
    pageStyle = `left: ${targetLeft}px; top: ${targetTop}px`
  })
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .page {
    position: absolute;
    height: $dialog-height;
    width: $dialog-width;
    background: aqua;
    z-index: 1;
    padding: 3px 5px;
  }
</style>
