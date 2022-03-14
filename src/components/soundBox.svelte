<div
  class="page"
  class:lb="{boxLB}"
  class:rt="{boxRT}"
  on:mouseout="{(e) => {
    dispatch('close')
  }}"
  on:blur="{(e) => {
    dispatch('close')
  }}"
  on:mouseover="{(e) => {
    dispatch('keep')
  }}"
  on:focus="{(e) => {
    dispatch('keep')
  }}"
  style="left: {commitLeft}px; top: {commitTop}px;"
  bind:this="{pageElement}"
>
  <p>Date: {dayjs(sound.datetime).format('YYYY/MM/DD HH:mm:ss')}</p>
  <p>Performed by: {sound.performer}</p>
  <div class="btns">
    <div class="btn" on:click="{pushSong}">Add</div>
    <div class="btn" on:click="{(e) => dispatch('close', { force: true })}">
      Close
    </div>
  </div>
</div>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import type { Sound } from '../types'
  import dayjs from 'dayjs'
  import { getTimelines, pxify } from '../utils/utils'

  export let soundIndex: number
  export let revIndex: number
  export let sound: Sound
  export let parentScroller: HTMLElement
  let pageElement: HTMLElement
  let pageStyle = ''
  const dispatch = createEventDispatcher()
  let commitTop = 0
  let commitLeft = 0
  let boxLB = false
  let boxRT = false

  function calculateAndSetLocation() {
    boxLB = boxRT = false
    const titleHeight = pxify(getExportableVariableFromCSS('$header-height'))
    const timelineHeight = pxify(
      getExportableVariableFromCSS('$timeline-height')
    )
    const timelineBlockWidth = pxify(
      getExportableVariableFromCSS('$timeline-block-width')
    )
    const height = pageElement.getBoundingClientRect().height
    const width = pageElement.getBoundingClientRect().width
    const titleBlockWidth = pxify(
      getExportableVariableFromCSS('$title-block-width')
    )

    const innerHeight = window.innerHeight - titleHeight
    const innerWidth = parentScroller.parentElement.getBoundingClientRect()
      .width
    const xLenBeforeViewport = parentScroller.getBoundingClientRect().x
    const yLenBeforeViewport =
      titleHeight - getTimelines().getBoundingClientRect().y
    const xDiffDistance = 10
    const yDiffDistance = 10

    // targetTop and targetLeft should be related to .timelines
    let targetTop = (soundIndex + 0.5) * timelineHeight + yDiffDistance
    let targetLeft =
      (revIndex + 0.5) * timelineBlockWidth + xLenBeforeViewport + xDiffDistance

    // Right overflow
    if (targetLeft + width - titleBlockWidth > innerWidth) {
      targetLeft -= width + 2 * xDiffDistance
      boxRT = true
    }

    // Bottom overflow
    if (targetTop + height - yLenBeforeViewport > innerHeight) {
      targetTop -= height + 2 * yDiffDistance
      boxLB = true
    }

    commitTop = targetTop
    commitLeft = targetLeft
  }

  function pushSong() {
    const evt = new CustomEvent('player', {
      detail: sound,
    })
    window.dispatchEvent(evt)
  }

  // C o m p l e t e  V i c t o r y
  function getExportableVariableFromCSS(name: string) {
    return getComputedStyle(pageElement).getPropertyValue(
      '--' + name.replace('$', '')
    )
  }
  onMount(() => {
    calculateAndSetLocation()
  })
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .page {
    background: $box-background-color;
    border-radius: 20px;
    box-sizing: border-box;
    color: $box-text-color;
    padding: 8px;
    position: absolute;
    z-index: 3;

    // Exported styles
    // I know it's weird but...

    --header-height: #{$header-height};
    --timeline-height: #{$timeline-height};
    --timeline-block-width: #{$timeline-block-width};
    --icon-height: #{$icon-height};
    --line-height: #{$line-height};
    --title-block-width: #{$title-block-width};
  }

  // Indicator on the box
  .page::after {
    background: $box-indicator-color;
    content: '';
    height: $indicator-size;
    left: 0;
    position: absolute;
    top: 0;
    width: $indicator-size;
  }

  .page.rt::after {
    left: unset;
    right: 0;
  }

  .page.lb::after {
    bottom: 0;
    top: unset;
  }

  .btns {
    display: flex;
  }

  .btn {
    background: $box-button-background-color;
    cursor: pointer;
    flex-grow: 1;
    margin: 10px 10px;
    padding: 15px;
    text-align: center;
  }
</style>
