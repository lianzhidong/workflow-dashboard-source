<!--
 * @Description: 图标Icon
 * @Autor: Lizijie
 * @Date: 2020-05-09 09:52:58
 * @LastEditors: Lianzhidong
 * @LastEditTime: 2020-05-14 15:30:49
 -->
<template>
  <svg class="ctg-icon" aria-hidden="true">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>
<script>
export default {
  name: 'CtgIcon',
  props: {
    name: String
  }
}
</script>
<style lang="scss" scoped>
.ctg-icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.25em;
  fill: currentColor;
  overflow: hidden;
}
</style>
