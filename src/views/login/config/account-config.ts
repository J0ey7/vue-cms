export const rules = {
  password: [
    {
      // validator: validatePass,
      trigger: 'blur',
      required: true,
      message: '密码是必填项'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '密码必须是5~10个字母或者数字',
      trigger: 'blur'
    }
  ],
  name: [
    {
      // validator: validatePass,
      trigger: 'blur',
      required: true,
      message: '账号是必填项'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '账号必须是5~10个字母或者数字',
      trigger: 'blur'
    }
  ],
  phoneNum: [
    {
      // validator: validatePass,
      trigger: 'blur',
      required: true,
      message: '手机号是必填项'
    },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  exactly: [
    {
      // validator: validatePass,
      trigger: 'blur',
      required: true,
      message: '验证码是必填项'
    }
  ]
}
