<div
  class="page"
  on:mouseout="{(e) => {
    dispatch('close')
  }}"
  on:mouseover="{(e) => {
    dispatch('keep')
  }}"
  style="{pageStyle}"
  bind:this="{pageElement}"
>
  <p>Date: {dayjs(sound.datetime).format('YYYY/MM/DD HH:mm:ss')}</p>
  <p>Performed by: {sound.performer}</p>
  <div class="btns">
    <div class="btn" on:click="{pushSong}">PUSH</div>
    <div class="btn" on:click="{(e) => dispatch('close', { force: true })}">
      CLOSE
    </div>
  </div>
</div>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import type { Sound } from '../types'
  import dayjs from 'dayjs'
  import { getTimelines } from '../utils/utils'

  export let soundIndex: number
  export let revIndex: number
  export let sound: Sound
  let pageElement: HTMLElement
  let pageStyle = ''
  const dispatch = createEventDispatcher()
  const targetBase: HTMLElement = getContext('timelines')

  function calculateAndSetLocation() {
    const titleHeight = pxify(getExportableVariableFromCSS('$header-height'))
    const timelineHeight = pxify(
      getExportableVariableFromCSS('$timeline-height')
    )
    const timelineBlockWidth = pxify(
      getExportableVariableFromCSS('$timeline-block-width')
    )
    const height = pxify(getExportableVariableFromCSS('$dialog-height'))
    const width = pxify(getExportableVariableFromCSS('$dialog-width'))
    const titleBlockWidth = pxify(
      getExportableVariableFromCSS('$title-block-width')
    )

    const bounding = getTimelines().getBoundingClientRect()
    const innerHeight = window.innerHeight - titleHeight
    const innerWidth = window.innerWidth - titleBlockWidth
    const xLenBeforeViewport = -1 * bounding.x
    const yLenBeforeViewport = titleHeight - bounding.y
    const xDiffDistance = -0.44 * width
    const yDiffDistance = 20
    const edgeDistance = 15

    // targetTop and targetLeft should be related to .timelines
    let targetTop = (soundIndex + 0.5) * timelineHeight + yDiffDistance
    let targetLeft =
      titleBlockWidth + (revIndex + 0.5) * timelineBlockWidth + xDiffDistance

    // Right overflow
    if (targetLeft + width - xLenBeforeViewport > innerWidth) {
      targetLeft = innerWidth + xLenBeforeViewport - width - edgeDistance
    }

    // Left overflow
    if (targetLeft - xLenBeforeViewport < titleBlockWidth) {
      targetLeft = xLenBeforeViewport + edgeDistance + titleBlockWidth
    }

    // Top overflow (No!)

    // Bottom overflow
    if (targetTop + height - yLenBeforeViewport > innerHeight) {
      targetTop = targetTop - 2 * yDiffDistance - height
    }
    pageStyle = `left: ${targetLeft}px; top: ${targetTop}px`
  }

  function pushSong() {
    const evt = new CustomEvent('player', {
      detail: sound,
    })
    window.dispatchEvent(evt)
  }

  // C o m p l e t e  V i c t o r y
  function getExportableVariableFromCSS(name: string): string {
    return getComputedStyle(pageElement).getPropertyValue(
      '--' + name.replace('$', '')
    )
  }

  function pxify(px: string): number {
    return Number(px.replace('px', ''))
  }

  onMount(() => {
    calculateAndSetLocation()
  })
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .page {
    background: #1f8ece;
    border-radius: 5px;
    box-sizing: border-box;
    color: white;
    height: $dialog-height;
    overflow-y: scroll;
    padding: 3px 5px;
    position: absolute;
    width: $dialog-width;
    z-index: 3;

    // Exported styles
    // I know it's weird but...

    --header-height: #{$header-height};
    --timeline-height: #{$timeline-height};
    --timeline-block-width: #{$timeline-block-width};
    --icon-height: #{$icon-height};
    --line-height: #{$line-height};
    --dialog-height: #{$dialog-height};
    --dialog-width: #{$dialog-width};
    --title-block-width: #{$title-block-width};
  }

  .btns {
    display: flex;
  }

  .btn {
    background: #60a8d2;
    cursor: pointer;
    flex-grow: 1;
    margin: 10px 10px;
    padding: 15px;
    text-align: center;
  }
</style>
