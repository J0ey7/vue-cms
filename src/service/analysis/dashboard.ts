import jhRequest from '..'
enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount(): Promise<any> {
  return jhRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale(): Promise<any> {
  return jhRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor(): Promise<any> {
  return jhRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsSale(): Promise<any> {
  return jhRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
