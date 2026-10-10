<script lang="ts">
  import { editor } from '../../editor/editorGame'
  import type { ToolTreeNode } from '../../editor/systems/hotkey/hotkeyToolRegistrar'
  import DropdownButton from './DropdownButton.svelte'

  let { node }: { node: ToolTreeNode } = $props()

  const invokeTool = (toolName: string): void => {
    editor.invokeEditorTool(toolName)
  }
</script>

{#if 'children' in node}
  <DropdownButton clicked={() => undefined} name={node.name} children={node.children} />
{:else}
  <DropdownButton
    clicked={() => invokeTool(node.toolName)}
    icon={node.icon}
    hotkey={node.hotkey}
    name={node.name}
  />
{/if}
