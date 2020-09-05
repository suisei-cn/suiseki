<div class="timeline">
  <h2 class="title">
    <div class="name" bind:this="{titleDiv}">{title}</div>
    <small class="artist">{sounds[0].artist}</small>
  </h2>
  <div class="timelineBody">
    {#each sounds as sound, rowIndex}
      <TimelineItem colIndex="{index}" rowIndex="{rowIndex}" sound="{sound}" />
    {/each}
  </div>
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import TimelineItem from './timelineItem.svelte'
  import type { Sound } from '../types'

  export let sounds: Sound[]
  export let title: string
  export let index: number

  let titleDiv: HTMLElement
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .timeline {
    height: $timeline-height;
    background: #126b91;
    display: flex;
  }

  .title {
    color: white;
    background: #1686b6;
    margin: 0;
    padding: 12px 6px 6px;
    font-size: 1.3rem;
    text-align: center;
    position: sticky;
    width: 200px;
    z-index: 5;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    .artist {
      color: #ccc;
    }
  }

  .timelineBody {
    position: relative;
    display: flex;
  }

  .timelineBody:after {
    content: '';
    position: absolute;
    height: $line-height;
    background-color: #bbb;
    left: $timeline-block-width / 2;
    right: $timeline-block-width / 2;
    top: ($timeline-height - $line-height) / 2;
  }
</style>
