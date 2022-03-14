<div class="timeline">
  <h2 class="title">
    <div class="name">{title}</div>
    <small class="sub">{sounds[0].artist}</small>
    <small class="sub">Since {debutDate}</small>
  </h2>
  <div class="timelineBodyContainer">
    <div class="timelineBody" bind:this="{bodyElement}">
      {#each sounds as sound, rowIndex}
        <TimelineItem
          soundIndex="{index}"
          revIndex="{rowIndex}"
          sound="{sound}"
          parentScroller="{bodyElement}"
        />
        {#if rowIndex > 0}
          {#if getDateFormat(sounds[rowIndex]) !== getDateFormat(sounds[rowIndex - 1])}
            <Notation rowIndex="{rowIndex}">
              {getDateFormat(sounds[rowIndex])}
            </Notation>
          {/if}
        {:else}
          <Notation rowIndex="{rowIndex}">
            {getDateFormat(sounds[rowIndex])}
          </Notation>
        {/if}
      {/each}
    </div>
  </div>
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import TimelineItem from './timelineItem.svelte'
  import Notation from './notation.svelte'
  import type { Sound } from '../types'
  import dayjs from 'dayjs'

  export let sounds: Sound[]
  export let title: string
  export let index: number

  $: debutDate = dayjs(sounds[0].datetime).format('YYYY/MM/DD')
  let bodyElement: HTMLElement

  function getDateFormat(s: Sound): string {
    return dayjs(s.datetime).format('YYYY/MM')
  }
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .timeline {
    background: $background-color;
    display: flex;
    height: $timeline-height;
  }

  .title {
    align-items: center;
    background: $title-bar-color;
    box-sizing: border-box;
    color: $title-text-color;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    font-size: 1.3rem;
    justify-content: center;
    left: 0;
    margin: 0;
    overflow: hidden auto;
    padding: 12px 6px 6px;
    position: sticky;
    text-align: center;
    width: $title-block-width;
    z-index: 5;

    .sub {
      color: $title-text-sub-color;
    }
  }

  .timelineBodyContainer {
    display: flex;
    overflow: auto hidden;
    width: calc(100vw - #{$title-block-width});
  }

  .timelineBody {
    display: flex;
    position: relative;
  }

  .timelineBody::after {
    background-color: $connection-line-color;
    content: '';
    height: $line-height;
    left: calc($timeline-block-width / 2);
    position: absolute;
    right: calc($timeline-block-width / 2);
    top: calc(($timeline-height - $line-height) / 2);
  }
</style>
