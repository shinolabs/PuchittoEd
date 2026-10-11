import type { GameObject } from 'puchitto/objects'
import { editor } from '../editor/editorGame'
import type { AssetNode } from './assetState.svelte'

export type SelectionStateType =
  | {
      type: 'entity'
      id: number
    }
  | {
      type: 'asset'
      node: AssetNode
    }
  | {
      type: 'none'
    }

export const selectionState = $state({
  value: {
    type: 'none'
  }
} as {
  value: SelectionStateType
})

const selectedObjectId = $derived(
  selectionState.value.type === 'entity' ? selectionState.value.id : undefined
)

const selectedAssetNode = $derived(
  selectionState.value.type === 'asset' ? selectionState.value.node : undefined
)

export const isObjectSelected = (): boolean => {
  return selectionState.value.type === 'entity'
}

export const isSpecificObjectSelected = (id: number): boolean => {
  return selectionState.value.type === 'entity' && selectionState.value.id === id
}

export const getSelectedObjectId = (): number | undefined => {
  return selectedObjectId
}

export const setSelectedObject = (go: GameObject): void => {
  selectionState.value = {
    type: 'entity',
    id: go.id
  }

  editor?.handles?.setObject(go)
}

export const setSelectedAsset = (asset: AssetNode): void => {
  selectionState.value = {
    type: 'asset',
    node: asset
  }
}

export const getSelectedAsset = (): AssetNode | undefined => {
  return selectedAssetNode
}

export const resetSelection = (): void => {
  selectionState.value = {
    type: 'none'
  }

  editor?.handles?.setObject(undefined)
}
