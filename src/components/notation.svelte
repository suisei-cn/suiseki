<div class="notation" style="left: {leftWidth}px;" bind:this="{pageElement}">
  <slot />
</div>

<script lang="ts">
  import { onMount } from 'svelte'

  import { generateExportVarFunction, pxify } from '../utils/utils'

  export let rowIndex: number
  let pageElement: HTMLElement
  let leftWidth = 0

  onMount(() => {
    const getExportableVariableFromCSS = generateExportVarFunction(pageElement)
    leftWidth =
      rowIndex * pxify(getExportableVariableFromCSS('$timeline-block-width'))
  })
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .notation {
    color: $notation-text-color;
    font-size: 0.9rem;
    margin-left: 32px;
    margin-top: 10px;
    position: absolute;

    --timeline-block-width: #{$timeline-block-width};
  }
</style>
