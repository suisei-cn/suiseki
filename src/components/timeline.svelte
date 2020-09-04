<div class="timeline">
  <h2 class="title">
    <div class="name" class:nameMarquee bind:this="{titleDiv}">{title}</div>
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

  let nameMarquee = false
  let titleDiv: HTMLElement

  function giveMarquee() {
    nameMarquee = true
  }

  onMount(() => {
    if (titleDiv.offsetWidth < titleDiv.scrollWidth) giveMarquee()
  })
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .timeline {
    min-width: 260px;
    background: #126b91;
  }

  .title {
    color: white;
    background: #1686b6;
    margin: 0;
    padding: 12px 6px 6px;
    height: 70px;
    font-size: 1.3rem;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 3;
    overflow: hidden;

    .name {
      white-space: nowrap;
    }
    .artist {
      color: #ccc;
    }
  }

  .timelineBody {
    position: relative;
  }

  .timelineBody:after {
    content: '';
    position: absolute;
    width: 4px;
    background-color: #bbb;
    top: $icon-height / 2;
    bottom: $timeline-height - ($icon-height / 2);
    left: 50%;
    margin-left: -2px;
  }

  .nameMarquee {
    animation: marquee 6s linear infinite;
  }

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
