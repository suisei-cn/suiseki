<div class="timeline">
  <h2 class="title">
    <div class="name" bind:this="{titleDiv}">{title}</div>
    <small class="artist">{sounds[0].artist}</small>
  </h2>
  <div class="timelineBody">
    {#each sounds as sound, rowIndex}
      <TimelineItem
        soundIndex="{index}"
        revIndex="{rowIndex}"
        sound="{sound}"
      />
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
    background: #126b91;
    display: flex;
    height: $timeline-height;
  }

  .title {
    align-items: center;
    background: #1686b6;
    box-sizing: border-box;
    color: white;
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    justify-content: center;
    margin: 0;
    overflow: hidden;
    padding: 12px 6px 6px;
    position: sticky;
    text-align: center;
    width: $title-block-width;
    z-index: 5;

    .artist {
      color: #ccc;
    }
  }

  .timelineBody {
    display: flex;
    position: relative;
  }

  .timelineBody::after {
    background-color: #bbb;
    content: '';
    height: $line-height;
    left: $timeline-block-width / 2;
    position: absolute;
    right: $timeline-block-width / 2;
    top: ($timeline-height - $line-height) / 2;
  }
</style>
