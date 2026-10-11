<script lang="ts">
  import type { GameObject } from 'puchitto/objects'
  import { getSelectedAsset, getSelectedObjectId, selectionState } from '../state/selectionState.svelte'
  import { editor } from '../editor/editorGame'
  import InspectorPartHeader from './inspector/InspectorPartHeader.svelte'
  import Move from '@lucide/svelte/icons/move'
  import Vector3Property from './inspector/properties/Vector3Property.svelte'
  import Scroll from '@lucide/svelte/icons/scroll'
  import ObjectAntics from './inspector/miniantics/ObjectAntics.svelte'
  import ObjectInspector from './inspector/ObjectInspector.svelte'
  import InspectorPart from './inspector/InspectorPart.svelte'
  import ObjectProperties from './inspector/ObjectProperties.svelte'

  const selectionType = $derived(selectionState.value.type)

  const obj: GameObject | undefined = $derived(editor.getObjectById(getSelectedObjectId()))
</script>

<div class="container">
  {#if selectionType === 'entity' && obj !== undefined}
    <ObjectProperties {obj} />
    <InspectorPartHeader>
      <div slot="icon">
        <Move />
      </div>
      <div slot="name">Transform</div>
    </InspectorPartHeader>
    <InspectorPart>
      <Vector3Property
        name="Position"
        accessor={() => obj.transform.position}
        setter={(x, y, z) => obj.transform.position.set(x, y, z)}
      />
      <Vector3Property
        name="Rotation"
        accessor={() => obj.transform.eulerDeg}
        setter={(x, y, z) => obj.transform.setRotationFromDegrees(x, y, z)}
      />
      <Vector3Property
        name="Scale"
        accessor={() => obj.transform.scale}
        setter={(x, y, z) => obj.transform.scale.set(x, y, z)}
      />
    </InspectorPart>
    <ObjectInspector {obj} />
    <InspectorPartHeader>
      <div slot="icon">
        <Scroll />
      </div>
      <div slot="name">MiniAntics</div>
    </InspectorPartHeader>
    <InspectorPart>
      <ObjectAntics id={obj.id} />
    </InspectorPart>
  {:else if selectionType === 'asset'}
    <div>selected asset {getSelectedAsset().path}</div>
  {:else}
    <div class="empty">
      <div>No entity selected.</div>
      <div class="hint">Select an entity to edit it here!</div>
    </div>
  {/if}
</div>

<style>
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .empty {
    flex: 1;
    min-width: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: var(--text-muted);

    font-size: 12px;
  }

  .empty .hint {
    font-size: 10px;
    text-align: center;

    font-style: italic;
  }

  .empty .icon {
    opacity: 0.3;
  }
</style>
