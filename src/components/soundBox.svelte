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
  import { createEventDispatcher, getContext, onMount } from 'svelte'
  import type { Sound } from '../types'
  import dayjs from 'dayjs'

  export let rowIndex: number
  export let colIndex: number
  export let sound: Sound
  let pageStyle = ''
  const dispatch = createEventDispatcher()
  const targetBase: HTMLElement = getContext('timelines')

  function calculateAndSetLocation() {
    // Also update vairables.scss!
    const height = 200
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

  function pushSong() {
    const evt = new CustomEvent('player', {
      detail: sound,
    })
    window.dispatchEvent(evt)
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
