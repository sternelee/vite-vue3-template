<template>
  <nav class="file-tab">
    <span>下载中</span>
    <span class="on">已完成</span>
    <a href="javascript:void;">会员加速</a>
  </nav>
</template>
<style lang="stylus" scoped>
@import "../assets/px2rem.styl"
.file-tab {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  span {
    color: #A2A8B1;
    margin-right: 26px;
    &.on {
      color: #26292D;
    }
  }
  a {
    background: #FEE09B;
    width: 60px;
    height: 18px;
    line-height: 18px;
    margin-left: auto;
    border-radius: 20px;
  }
}
</style>