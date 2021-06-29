/*
 * @Description:
 * @Version: 2.0
 * @Autor: Lianzhidong
 * @Date: 2020-10-19 17:39:27
 * @LastEditors: Lianzhidong
 * @LastEditTime: 2021-06-29 15:13:08
 */
// import { Rect } from 'topology-core/models/rect'
// import { Point } from 'topology-core/models/point'
// import { Direction } from 'topology-core/models/direction'
// import { AnchorMode } from 'topology-core/models/status'
import { Rect, Point, Direction, AnchorMode } from "@topology/core";
// 计算图标/图片位置
export function baseIconRect(node) {
  node.iconRect = new Rect(
    node.rect.x + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum,
    node.rect.height - node.paddingTopNum - node.paddingBottomNum,
    node.rect.height - node.paddingTopNum - node.paddingBottomNum
  );
  node.fullIconRect = new Rect(
    node.rect.x + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum,
    node.rect.width - node.paddingLeftNum - node.paddingRightNum,
    node.rect.height - node.paddingTopNum - node.paddingBottomNum
  );
}

// 文字位置
export function baseTextRect(node) {
  var height = node.rect.height - node.paddingTopNum - node.paddingBottomNum;
  node.textRect = new Rect(
    node.rect.x + node.paddingLeftNum + height - 5,
    node.rect.y + node.paddingTopNum,
    node.rect.width - node.paddingLeftNum - node.paddingRightNum - height,
    height
  );
  node.fullTextRect = new Rect(
    node.rect.x + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum,
    node.rect.width - node.paddingLeftNum - node.paddingRightNum,
    height
  );
}

//计算锚点,尚未用上
export function baseAnchors(node) {
  node.anchors.push(
    new Point(node.rect.x, node.rect.y + node.rect.height / 2, Direction.Left)
  );
  node.anchors.push(
    new Point(node.rect.x + node.rect.width / 2, node.rect.y, Direction.Up)
  );
  node.anchors.push(
    new Point(
      node.rect.x + node.rect.width,
      node.rect.y + node.rect.height / 2,
      Direction.Right
    )
  );
  node.anchors.push(
    new Point(
      node.rect.x + node.rect.width / 2,
      node.rect.y + node.rect.height,
      Direction.Bottom
    )
  );
  // 例子：锚点节点只允许in（作为终点）；上面锚点只允许out
  node.anchors[0].mode = AnchorMode.In;
  node.anchors[1].mode = AnchorMode.Out;
}
