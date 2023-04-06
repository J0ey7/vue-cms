export const UserContentConfig = {
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实姓名', minWidth: '100' },
    { prop: 'cellphone', label: '手机号码', minWidth: '100' },
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
  type: 'User',
  pageName: 'users'
}
