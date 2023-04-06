export const GoodsContentConfig = {
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价格', minWidth: '80', slotName: 'newPrice' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'img' },
    { prop: 'enable', label: '状态', minWidth: '250', slotName: 'status' },
    {
      prop: 'name',
      label: '创建日期',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新日期',
      minWidth: '250',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '100',
      slotName: 'handler'
    }
  ],

  title: '用户列表',
  idShowIndex: true,
  type: 'Goods'
}
