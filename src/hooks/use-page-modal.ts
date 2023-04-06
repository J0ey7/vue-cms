import { pageModal } from '@/shared/components'
import { ref } from 'vue'

export function usePageModal(
  editCb?: (params?: any) => void,
  addCb?: () => void
) {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaultInfo = ref({})

  const handleAddSome = (payload: boolean) => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.visible = payload
    }
    addCb && addCb()
  }

  const handleeditSome = (payload: any) => {
    defaultInfo.value = { ...payload } as any
    if (pageModalRef.value) {
      pageModalRef.value.visible = true
    }
    editCb && editCb(payload)
  }

  return {
    handleeditSome,
    handleAddSome,
    pageModalRef,
    defaultInfo
  }
}
