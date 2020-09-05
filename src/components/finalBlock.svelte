<div class="block">
  <div class="part">
    {#if cnt !== originalCnt}
      {cnt} / {originalCnt} song(s) found.
    {:else}{originalCnt} song(s) in total.{/if}
  </div>
  <div class="part suki">好きなことで、生きていく</div>
</div>

<script lang="ts">
  export let cnt: number
  export let originalCnt: number
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .block {
    background: $background-color;
    color: white;
    display: flex;
    font-size: 1.3rem;
    height: $timeline-height;
    justify-content: center;
    text-align: center;
  }

  .part {
    align-items: center;
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }

  .suki {
    color: #ccc;
  }
</style>
