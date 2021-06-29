/*
 * @Description:自定义图形，基础节点
 * @Version: 2.0
 * @Autor: Lianzhidong
 * @Date: 2020-10-19 17:39:27
 * @LastEditors: Lianzhidong
 * @LastEditTime: 2020-10-27 16:04:19
 */
export function base(ctx, node) {
  var wr = node.rect.width * node.borderRadius
  var hr = node.rect.height * node.borderRadius
  var r = wr < hr ? wr : hr
  if (node.rect.width < 2 * r) {
    r = node.rect.width / 2
  }
  if (node.rect.height < 2 * r) {
    r = node.rect.height / 2
  }
  ctx.beginPath()
  ctx.moveTo(node.rect.x + r, node.rect.y)
  ctx.arcTo(
    node.rect.x + node.rect.width,
    node.rect.y,
    node.rect.x + node.rect.width,
    node.rect.y + node.rect.height,
    r
  )
  ctx.arcTo(
    node.rect.x + node.rect.width,
    node.rect.y + node.rect.height,
    node.rect.x,
    node.rect.y + node.rect.height,
    r
  )
  ctx.arcTo(
    node.rect.x,
    node.rect.y + node.rect.height,
    node.rect.x,
    node.rect.y,
    r
  )
  ctx.arcTo(
    node.rect.x,
    node.rect.y,
    node.rect.x + node.rect.width,
    node.rect.y,
    r
  )
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}
