<!--
 * @Description: 流程设计右侧配置项
 * @Version: 2.0
 * @Autor: Lianzhidong
 * @Date: 2020-10-19 17:37:54
 * @LastEditors: Lianzhidong
 * @LastEditTime: 2021-06-29 15:06:42
-->
<template>
  <div class="props-container">
    <el-tabs v-model="tabName">
      <el-tab-pane name="node">
        <span slot="label" class="tab-title"> 节点属性</span>
        <template v-if="!props.node && !props.line && !props.multi">
          <span class="is-empty">请选择节点或线</span>
        </template>
        <template v-else>
          <el-form size="mini" label-position="top">
            <template v-if="props.node">
              <el-form-item label="节点编码">
                <el-input v-model.trim="props.node.id" disabled />
              </el-form-item>
              <el-form-item label="节点名称">
                <el-input @input="onChange" v-model.trim="props.node.text" />
              </el-form-item>
              <el-form-item label="审批人" v-if="isShowApproveBtn">
                <el-button
                  size="mini"
                  class="approve-btn"
                  @click="onSetApproveUser"
                  >点击设置审批人</el-button
                >
              </el-form-item>
              <el-form-item label="字段权限"> </el-form-item>
            </template>
            <template v-if="props.line">
              <el-form-item label="连接线编码">
                <el-input v-model.trim="props.line.id" disabled />
              </el-form-item>
              <el-form-item label="连接线名称">
                <el-input @input="onChange" v-model.trim="props.line.text" />
              </el-form-item>
            </template>
          </el-form> </template
      ></el-tab-pane>
      <el-tab-pane name="flow">
        <span slot="label" class="tab-title"> 流程属性</span>
        <el-form size="mini" label-position="top">
          <el-form-item label="流程编码">
            <el-input v-model.trim="flowCode" disabled />
          </el-form-item>
          <el-form-item label="流程名称">
            <el-input v-model.trim="flowName" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="isNotifyStartUser"
              >流程结束后通知发起人</el-checkbox
            >
          </el-form-item>
        </el-form>
        <el-button type="danger" size="mini" class="close-flow-btn"
          >关闭流程</el-button
        >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Utils from "@/helper/utilForFlow.js";
export default {
  data() {
    return {
      tabName: "node",
      //流程编码
      flowCode: Utils.guid(),
      //流程名称
      flowName: Utils.guid(),
      //流程结束后通知发起人
      isNotifyStartUser: false,
      //审批人弹窗是否可见
      appoveUserVisiable: false,
    };
  },
  components: {},
  props: {
    props: {
      type: Object,
      require: true,
    },
    appId: {
      type: String,
      require: true,
    },
  },
  computed: {
    //是否显示设置审批人按钮
    isShowApproveBtn() {
      return this.props.node && this.props.node.data.type === "Approve";
    },
  },
  watch: {
    props() {
      // console.log(this.props)
      this.tabName = "node";
    },
  },
  methods: {
    onChange() {
      this.$emit("change", this.props.node);
    },
    //点击设置审批人弹窗
    onSetApproveUser() {
      this.appoveUserVisiable = true;
    },
    //关闭审批人弹窗
    closeApproveUserDialog() {
      this.appoveUserVisiable = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.props-container {
  padding: 10px;
  padding-top: 0;
  height: calc(100vh - 120px);
  ::v-deep.el-form-item__label {
    font-weight: 700;
  }
  ::v-deep.el-tabs {
    height: 100%;
  }
  ::v-deep.el-tabs__content {
    height: 100%;
  }
  ::v-deep.el-tab-pane {
    height: 100%;
  }
  .tab-title {
    display: inline-block;
    width: 100px;
    text-align: center;
  }
  .close-flow-btn {
    width: 100%;
    margin-top: 30px;
  }
  .approve-btn {
    width: 90%;
  }
}
</style>
