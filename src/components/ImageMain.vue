<template>
  <el-main>
    <div class="top">
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
    </div>
    <div class="buttom">底部区域</div>
  </el-main>
</template>

<script setup></script>

<style lang="scss" scoped>
.aside-main {
  display: flex;

  .el-main {
    flex: 1;
    position: relative;
    .top {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 50px;
      overflow-y: auto;
    }
    .buttom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: pink;
      width: 100%;
      height: 50px;
    }
  }
}
</style>
