// 配置编译环境和线上环境之间的切换

const env = process.env
const baseUrl = ''
// 图表库为avue和pig2套地址
// 数组中第三个元素为本项目的icon，后续如有更改，改变第三个
const iconfontVersion = ['567566_qo5lxgtishg', '667895_v7uduh4zui','2382229_a47nkc2qs5']
const iconfontUrl = `//at.alicdn.com/t/font_$key.css`
const codeUrl = `${window.location.origin}/code`

export {
  baseUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  env
}
