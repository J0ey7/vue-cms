import jhRequest from '@/service'
// CRUD
export function getPageListData(url: string, params: any) {
  return jhRequest.post<any>({
    url: url,
    data: params
  })
}

export function delepageItem(url: string) {
  return jhRequest.delete<any>({
    url: url
  })
}

export function createPageData(url: string, params: any) {
  return jhRequest.post<any>({
    url: url,
    data: params
  })
}
export function editPageData(url: string, params: any) {
  return jhRequest.patch<any>({
    url: url,
    data: params
  })
}
