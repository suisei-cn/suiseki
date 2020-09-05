<div
  class="page"
  class:lb="{boxLB}"
  class:rt="{boxRT}"
  on:mouseout="{(e) => {
    dispatch('close')
  }}"
  on:mouseover="{(e) => {
    dispatch('keep')
  }}"
  style="left: {commitLeft}px; top: {commitTop}px;"
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
    const height = pxify(getExportableVariableFromCSS('$dialog-height'))
    const width = pxify(getExportableVariableFromCSS('$dialog-width'))
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

  // Indicator on the box
  .page::after {
    background: #9cc8d9;
    content: '';
    height: $indicator-size;
    left: -1 * $indicator-size / 2;
    position: absolute;
    top: -1 * $indicator-size / 2;
    width: $indicator-size;
  }

  .page.rt::after {
    left: unset;
    right: -1 * $indicator-size / 2;
  }

  .page.lb::after {
    bottom: -1 * $indicator-size / 2;
    top: unset;
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
