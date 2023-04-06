export const UserConfig = {
  colLayout: {
    span: 8
  },
  itemStyle: { padding: '10px 22px' },
  labelWidth: '120px', //单元控件label的大小
  form: [
    {
      field: 'id',
      label: 'id',
      type: 'input',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名'
    },

    {
      field: 'realname',
      label: '真实姓名',
      type: 'input',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      label: '电话号码',
      type: 'input',
      placeholder: '请输入真实电话号码'
    },
    {
      field: 'enable',
      label: '用户状态',
      type: 'select',
      placeholder: '请选择用户状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    {
      field: 'createAt',
      label: '创建事件',
      type: 'datepicker',
      otherOptions: {
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      }
    }
  ]
}
