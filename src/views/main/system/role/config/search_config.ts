export const RoleConfig = {
  colLayout: {
    span: 8
  },
  itemStyle: { padding: '10px 22px' },
  labelWidth: '120px', //单元控件label的大小
  form: [
    {
      field: 'name',
      label: '角色名称',
      type: 'input'
    },
    {
      field: 'intro',
      label: '权限介绍',
      type: 'input'
    },
    {
      field: 'createAt',
      label: '创建时间',
      type: 'datepicker',
      otherOptions: {
        type: 'daterange',
        startPlaceholder: 'Start Date',
        endPlaceholder: 'End Date'
      }
    }
  ]
}
