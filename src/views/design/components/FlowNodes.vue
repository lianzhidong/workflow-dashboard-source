<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Lianzhidong
 * @Date: 2020-10-19 17:37:39
 * @LastEditors: Lianzhidong
 * @LastEditTime: 2021-06-29 16:10:36
-->
<template>
  <div>
    <div v-for="(item, index) in tools" :key="index">
      <div class="title">{{ item.group }}</div>
      <div class="buttons">
        <el-popover
          v-for="(btn, i) in item.children"
          :key="i"
          placement="right"
          width="200"
          trigger="hover"
          :content="tooltipTexts[btn.data.data.type]"
          :disabled="!tooltipTexts[btn.data.data.type]"
        >
          <a
            slot="reference"
            :draggable="btn.data"
            @dragstart="onDrag($event, btn)"
          >
            <!-- <i :class="`iconfont ${btn.icon}`"></i> -->
            <!-- <CtgIcon :name="btn.icon" class="icon"></CtgIcon> -->
            <i :class="btn.icon" class="iconfont"></i>
            <span v-text="btn.data.text"></span>
          </a>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
import { Tools, TooltipTexts } from "@/helper/flow";

export default {
  name: "FlowNodes",
  data() {
    return {
      tools: Tools,
      tooltipTexts: TooltipTexts,
    };
  },
  methods: {
    onDrag(event, node) {
      event.dataTransfer.setData("Text", JSON.stringify(node.data));
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-left: 10px;
}
.buttons {
  padding: 10px 0;
  a {
    display: block;
    width: 120px;
    height: 30px;
    padding: 0 8px;
    margin: 10px auto;
    text-align: center;
    text-decoration: none !important;
    font-size: 12px;
    line-height: 30px;
    background-color: rgba(#f0f0f0, 0.3);
    border: 1px solid transparent;
    cursor: move;
    .icon {
      font-size: 12px;
      color: #5078ff;
      margin-right: 8px;
    }
    &:hover {
      border: 1px dashed #5078ff;
    }
  }
}
</style>
