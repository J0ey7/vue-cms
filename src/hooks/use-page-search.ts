import { pageContent } from '@/shared/components'
import { ref } from 'vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()

  const handleResetBtn = () => {
    pageContentRef.value?.getList()
  }
  const handleQueryBtn = (params: any) => {
    pageContentRef.value?.getList(params)
  }

  return { pageContentRef, handleResetBtn, handleQueryBtn }
}
