<template>
  <div class="fd-flow-design">
    <div class="head">
      <HeaderTool
        @onDelete="onDelete"
        @onUndo="onUndo"
        @onRedo="onRedo"
        @onAlignCenter="onAlignNode('middle')"
        @onAliginVer="onAlignNode('center')"
        @onResetSize="onResetSize"
        @onLock="onLock"
        @onUnlock="onUnlock"
        @onSave="onSave"
      ></HeaderTool>
    </div>
    <div class="container">
      <div class="sidebar">
        <FlowNodes />
      </div>
      <div class="main">
        <div id="topology-canvas" class="full"></div>
      </div>
      <div class="panel">
        <FlowProps :props.sync="props" @change="onUpdateProps" />
      </div>
    </div>
  </div>
</template>
<script>
import { Topology, registerNode } from "@topology/core";
import { alignNodes, layout } from "@topology/layout";
import { Tools, TooltipTexts } from "@/helper/flow";
import { base, baseIconRect, baseTextRect } from "./nodes/index";
// import { LineSetting } from "./lines/index";
import FlowNodes from "./components/FlowNodes";
import FlowProps from "./components/FlowProps";
import HeaderTool from "./components/HeaderTool";

export default {
  name: "FdFlowDesign",
  components: {
    FlowNodes,
    FlowProps,
    HeaderTool,
  },
  data() {
    return {
      tools: Tools,
      tooltipTexts: TooltipTexts,
      canvas: {},
      canvasOptions: {
        //是否禁止连线终点为空
        // disableEmptyLine: true,
        // 鼠标移动到右/下底部时自动扩展画布大小
        autoExpandDistance: 100,
        options: {
          //隐藏旋转轴
          hideRotateCP: true,
          //隐藏大小控制
          hideSizeCP: true,
        },
        data: {
          //初始化开始和结束节点
          nodes: [],
          lines: [],
          // ...LineSetting,
          // lineName: "curve",
          // borderColor: "#5078ff",
        },
      },
      props: {
        node: null,
        line: null,
        nodes: null,
        multi: false,
        locked: false,
      },
    };
  },
  created() {
    this.canvasRegister();
  },
  mounted() {
    this.canvasOptions.on = this.onMessage;
    this.canvas = new Topology("topology-canvas", this.canvasOptions);
    //bug：保存后的数据，type为1则是连线，canvasoption里配置的是polyline,保存后缺变成默认值
    setTimeout(() => {
      this.canvas.render();
    }, 0);
    window.addEventListener("resize", () => {
      this.canvas.resize();
    });
  },
  methods: {
    //注册左侧栏节点
    canvasRegister() {
      registerNode("baseNode", base, null, baseIconRect, baseTextRect);
    },
    onSave() {
      console.log(JSON.stringify(this.canvas.data));
    },
    async open(d) {
      this.canvas.open(d);
    },
    onMessage(event, data) {
      switch (event) {
        case "delete": //删除节点/连线
          break;
        case "node": //选中节点
        case "addNode": //添加节点
          this.props = {
            node: data,
            line: null,
            multi: false,
            nodes: null,
            locked: data.locked,
          };
          break;
        case "line": //选中了一条连线
        case "addLine": //	添加连线
          //如果连线的终点是空白，则删除该连线
          if (!data.to.id) {
            this.canvas.delete();
          } else {
            this.props = {
              node: null,
              line: data,
              multi: false,
              nodes: null,
              locked: data.locked,
            };
          }

          this.canvas.render();
          break;
        case "multi": //选中多个节点/连线
          this.props = {
            node: null,
            line: null,
            multi: true,
            nodes: data.length > 1 ? data.nodes : null,
            locked: this.getLocked(data),
          };
          break;
        case "space": //点击空白，清空选中对象
          this.props = {
            node: null,
            line: null,
            multi: false,
            nodes: null,
            locked: false,
          };
          break;
        case "moveOut":
          break;
        case "moveNodes": //	鼠标移出节点
        case "resizeNodes": //节点大小改变
          if (data.length > 1) {
            this.props = {
              node: null,
              line: null,
              multi: true,
              nodes: data,
              locked: this.getLocked({ nodes: data }),
            };
          } else {
            this.props = {
              node: data[0],
              line: null,
              multi: false,
              nodes: null,
              locked: false,
            };
          }
          break;
        case "resize": //	画布大小改变
        case "scale": //缩放画布
        case "locked": //	锁定画布：
          // if (this.canvas && this.canvas.data) {
          //   this.$store.commit('canvas/data', {
          //     scale: this.canvas.data.scale || 1,
          //     lineName: this.canvas.data.lineName,
          //     fromArrowType: this.canvas.data.fromArrowType,
          //     toArrowType: this.canvas.data.toArrowType,
          //     fromArrowlockedType: this.canvas.data.locked
          //   })
          // }
          break;
        case "moveInLine": //鼠标移动到连线
          break;
        case "moveOutLine": //鼠标移出线
          //如果鼠标拖拽连线离开锚点 则删除该条线
          if (typeof data.from.anchorIndex == "undefined") {
            this.canvas.delete();
          }
          if (typeof data.to.anchorIndex == "undefined") {
            this.canvas.delete();
          }
          this.canvas.render();
          break;
      }
    },
    getLocked(data) {
      let locked = true;
      if (data.nodes && data.nodes.length) {
        for (const item of data.nodes) {
          if (!item.locked) {
            locked = false;
            break;
          }
        }
      }
      if (locked && data.lines) {
        for (const item of data.lines) {
          if (!item.locked) {
            locked = false;
            break;
          }
        }
      }

      return locked;
    },
    onUpdateProps(node) {
      // 如果是node属性改变，需要传入node，重新计算node相关属性值
      // 如果是line属性改变，无需传参
      this.canvas.updateProps(node);
    },
    //删除操作
    onDelete() {
      this.canvas.delete();
    },
    //撤销
    onUndo() {
      this.canvas.undo();
    },
    //前进一步
    onRedo() {
      this.canvas.redo();
    },
    onLock() {
      this.canvas.lock(1);
    },
    onUnlock() {
      this.canvas.lock(0);
    },
    //对齐
    onAlignNode(type) {
      alignNodes(
        this.canvas.activeLayer.pens,
        this.canvas.activeLayer.rect,
        type
      );
      // updateLines节点变化后，重新计算默认连线
      this.canvas.activeLayer.updateLines();
      // 新增历史记录，方便undo
      this.canvas.cache();
      this.canvas.render();
    },
    //等大小
    onResetSize() {
      layout(this.canvas.activeLayer.pens, {
        nodeWidth: 120,
        nodeHeight: 40,
      });
      this.canvas.render();
      // updateLines节点变化后，重新计算默认连线
      this.canvas.activeLayer.updateLines();
      // 新增历史记录，方便undo
      this.canvas.cache();
    },
  },
};
</script>
<style lang="scss" scoped>
.fd-flow-design {
  position: absolute;
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  align-items: center;
  justify-content: center;
  .head {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 54px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    background-color: #fff;
    z-index: 4;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    &-left {
      i {
        margin-right: 8px;
        cursor: pointer;
      }
    }
    &-right {
      min-width: 240px;
      text-align: right;
    }
    ::v-deep {
      .el-radio-button__inner {
        border-radius: 0;
      }
      .is-active {
        /* .el-radio-button__inner {
          color: #fff;
          background-color: $--color-primary;
        } */
      }
    }
  }
  .container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 54px;
    background-color: #fff;
    height: calc(100vh - 120px);
    .sidebar {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      width: 150px;
      border-right: 1px solid #e3e3e3;
      padding: 15px 0;
      overflow-y: auto;
    }
    .main {
      position: absolute;
      overflow: auto;
      top: 0;
      left: 150px;
      right: 0;
      bottom: 0;
      height: calc(100vh - 370px);
      border: 1px dashed;
      // margin-bottom: 80px;
      box-sizing: border-box;
    }
    .panel {
      position: absolute;
      width: calc(100% - 150px);
      bottom: 0;
      height: 250px;
      right: 0;
      // top: 0;
      background: #e3e3e3;
      border-left: 1px solid #e3e3e3;
      overflow: auto;
    }
  }
}
.full {
  height: 100%;
  background-color: #fff;
}
</style>
