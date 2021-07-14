<!--
 * @Description: 绘制流程图的顶部工具栏
 * @Version: 2.0
 * @Autor: Lianzhidong
 * @Date: 2020-10-13 15:42:06
 * @LastEditors: Lianzhidong
 * @LastEditTime: 2021-07-14 18:02:16
-->
<template>
  <div class="header-container">
    <div class="tool-btn" @click="onUndo">
      <CtgIcon name="iconLshangyibu"></CtgIcon>
    </div>
    <div class="tool-btn" @click="onRedo">
      <CtgIcon name="iconLxiayibu"></CtgIcon>
      <el-divider direction="vertical"></el-divider>
    </div>
    <div class="tool-btn" @click="onResetSize">
      <span>等大小</span>
      <el-divider direction="vertical"></el-divider>
    </div>
    <div class="tool-btn" @click="onAlignCenter">
      <span>水平对齐</span>
      <el-divider direction="vertical"></el-divider>
    </div>
    <div class="tool-btn" @click="onAlignVer">
      <span>垂直对齐</span>
      <el-divider direction="vertical"></el-divider>
    </div>
    <!-- <div class="tool-btn" @click="onSpaceBetween">
      <span>水平等距</span>
      <el-divider direction="vertical"></el-divider>
    </div>
    <div class="tool-btn" @click="onVerBetween">
      <span>垂直等距</span>
      <el-divider direction="vertical"></el-divider>
    </div> -->
    <div class="tool-btn">
      <span @click="onDelete">删除</span>
    </div>
    <div class="tool-btn" v-if="!isLock" @click="onLock">
      <!-- <i class="el-icon-lock"></i> -->
      <span>锁</span>
    </div>
    <div class="tool-btn" v-else @click="onUnlock">
      <!-- <i class="el-icon-unlock"></i> -->
      <span>解锁</span>
    </div>
    <div class="save-btn tool-btn">
      <el-button type="primary" size="mini" @click="onSave">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderTool",
  data() {
    return {
      isLock: false,
    };
  },
  methods: {
    //删除操作，包括节点、连接线
    onDelete() {
      this.$emit("onDelete");
    },
    //撤销操作
    onUndo() {
      this.$emit("onUndo");
    },
    //重做操作
    onRedo() {
      this.$emit("onRedo");
    },
    //水平对齐
    onAlignCenter() {
      this.$emit("onAlignCenter");
    },
    //垂直对齐
    onAlignVer() {
      this.$emit("onAliginVer");
    },
    //等大小
    onResetSize() {
      this.$emit("onResetSize");
    },
    //锁
    onLock() {
      this.$emit("onLock");
      this.isLock = !this.isLock;
    },
    //解锁
    onUnlock() {
      this.$emit("onUnlock");
      this.isLock = !this.isLock;
    },
    //保存
    onSave() {
      this.$emit("onSave");
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  height: 44px;
  padding: 5px;
  padding-left: 40px;
  line-height: 34px;
  width: 100%;
  // background: $--color-grey-5;
  .tool-btn {
    user-select: none;
    cursor: pointer;
    margin-left: 6px;
    margin-right: 6px;
    &:hover {
      color: #5078ff;
    }
  }
  .save-btn {
    flex: 1;
    text-align: right;
  }
  .delete-icon {
    color: #f05050;
  }
}
</style>
