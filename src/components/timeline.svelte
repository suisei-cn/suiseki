<div class="timeline">
  <h2 class="title">
    <span>{title}</span>
    <br />
    <small class="artist">{sounds[0].artist}</small>
  </h2>
  <div class="timelineBody">
    {#each sounds as sound}
      <TimelineItem sound="{sound}" />
    {/each}
  </div>
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import TimelineItem from './timelineItem.svelte'
  import type { Sound } from '../types'

  export let sounds: Sound[]
  export let title: string

  onMount(async () => {})
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .timeline {
    min-width: max(12vw, 260px);
    background: #126b91;
  }

  .title {
    color: white;
    background: #1686b6;
    margin: 0;
    padding-top: 0.4vh;
    height: 9vh;
    font-size: 1.3rem;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 3;

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
</style>
