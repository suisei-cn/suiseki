<div class="timeline">
  <h2 class="title">{title}</h2>
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
    overflow: hidden;
  }

  .title {
    height: 5vh;
    text-align: center;
    position: sticky;
  }

  .timelineBody {
    height: 89vh;
    overflow-x: scroll;
    position: relative;
  }

  .timelineBody:after {
    content: '';
    position: absolute;
    width: 4px;
    background-color: #6cf;
    top: $icon-height / 2;
    bottom: $timeline-height - ($icon-height / 2);
    left: 50%;
    margin-left: -2px;
    z-index: -1;
  }
</style>
