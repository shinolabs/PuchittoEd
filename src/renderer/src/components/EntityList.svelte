<script lang="ts">
  import { onMount } from 'svelte'
  import { editor } from '../editor/editorGame'
  import EntityListItem from './entities/EntityListItem.svelte'
  import type { GameObject } from 'puchitto/objects'
  import {
    getSelectedObjectId,
    resetSelection,
    setSelectedObject
  } from '../state/selectionState.svelte'

  let objects: GameObject[] = $state([])

  const selectedId = $derived(getSelectedObjectId())

  let onclicked = (id: number): void => {
    setSelectedObject(editor.getObjectById(id))
  }

  let reloadObjects = (): void => {
    objects = [...editor._objects.filter((obj) => !obj.isLocalObject)]
  }

  onMount(() => {
    editor.eventStream.on('objectAttached', () => {
      reloadObjects()
    })

    editor.eventStream.on('objectRemoved', () => {
      reloadObjects()
    })

    editor.eventStream.on('sceneCreated', () => {
      resetSelection()
      reloadObjects()
    })
  })
</script>

<div class="entity-list">
  {#each objects as object (object.id)}
    <EntityListItem
      name={object.name}
      id={object.id}
      onselect={onclicked}
      selected={selectedId === object.id}
    />
  {/each}
</div>

<style>
  .entity-list {
    padding-top: 5px;
    min-height: 0;
    flex: 1;
    overflow-y: auto;
  }
</style>
