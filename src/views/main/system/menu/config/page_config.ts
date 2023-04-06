export const MenuContentConfig = {
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '菜单icon', minWidth: '100' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },
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
  // 需要展开的数据
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  title: '菜单列表',
  idShowIndex: false,
  isShowSelection: false,
  type: 'Menu'
}
