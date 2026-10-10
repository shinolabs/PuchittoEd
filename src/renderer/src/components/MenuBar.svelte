<script lang="ts">
  import { onMount } from 'svelte'
  import { editor } from '../editor/editorGame'
  import DropdownButton from './menu/DropdownButton.svelte'
  import DropdownSeparator from './menu/DropdownSeparator.svelte'
  import MenuBarItem from './menu/MenuBarItem.svelte'
  import { projectState } from '../state/projectState.svelte'
  import { afterEditorReady } from '../editor/helpers/loadHelpers'
  import { getToolTree, type ToolTreeNode } from '../editor/systems/hotkey/hotkeyToolRegistrar'
  import RecursiveMenuButton from './menu/RecursiveMenuButton.svelte'
  import { openModal } from '../state/modalState.svelte'
  import AboutDialogModal from './modals/AboutDialogModal.svelte'

  let tree: ToolTreeNode = $state()

  const newLevel = async (): Promise<void> => {
    const selected = await window.puchittoAPI.selectNewProjectFolder()

    if (selected) {
      afterEditorReady(async () => {
        editor.newScene()
      })
    }
  }

  const loadLevel = async (): Promise<void> => {
    const selected = await window.puchittoAPI.selectProject()
    if (selected) {
      afterEditorReady(async () => {
        await editor.loadLevel()
      })
    }
  }

  const saveLevel = (): void => {
    editor.invokeEditorTool('tool.save')
  }

  const exportLevel = async (): Promise<void> => {
    await editor.exportLevel()
  }

  const about = (): void => {
    openModal(AboutDialogModal)
  }

  const exit = (): void => {
    window.close()
  }

  onMount(() => {
    window.puchittoAPI.onProjectSelected((path) => {
      projectState.project = path
      projectState.viewMode = 'editor'
    })

    tree = getToolTree()
  })

  $effect(() => {
    if (projectState.project.length > 0) {
      let branding = 'PuchittoEd'
      if (projectState.modified) {
        branding += '*'
      }

      document.title = `${branding} - ${projectState.project}`
    }
  })
</script>

<header class="menu-bar">
  <MenuBarItem label="File">
    <DropdownButton clicked={newLevel} name="New realm" />
    <DropdownButton clicked={loadLevel} name="Load realm" />
    <DropdownButton clicked={saveLevel} name="Save realm" />
    <DropdownSeparator />
    <DropdownButton clicked={exportLevel} name="Export realm as ALF" />
    <DropdownSeparator />
    <DropdownButton clicked={exit} name="Exit" />
  </MenuBarItem>

  {#if tree !== undefined && 'children' in tree}
    {#each tree.children as node (node.name)}
      {#if 'children' in node}
        <MenuBarItem label={node.name}>
          {#each node.children as button (button.name)}
            <RecursiveMenuButton node={button} />
          {/each}
        </MenuBarItem>
      {/if}
    {/each}
  {/if}

  <MenuBarItem label="About">
    <DropdownButton clicked={about} name="About PuchittoEd" />
  </MenuBarItem>
</header>

<style>
  .menu-bar {
    height: 30px;
    flex-shrink: 0;
    background-color: var(--bg-header);
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--bg-deep);
    padding: 0 6px;
  }
</style>
