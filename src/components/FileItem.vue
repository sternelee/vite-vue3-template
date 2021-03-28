<template>
  <div class="file-item">
    <img class="file-item__pic" src="https://via.placeholder.com/50" alt="图片">
    <article>
      <p class="file-item__name">传说中的传说中的传说中的传说中的传说中的传说中的传说中的传说中的传说中的传说中的传说中的传说中的传说中的传说中的传说中的</p>
      <section>
        <p class="file-item__speed">
          <span>73.9MB / 约30分钟</span>
          <span>245KB/s</span>
        </p>
        <p class="file-item__process">
          <b style="width: 30%;"></b>
        </p>
      </section>
    </article>
    <a href="javascript:void;" class="iconfont icon-pause"></a>
  </div>
</template>

<style lang="stylus" scoped>
@import "../assets/px2rem.styl"
.file-item {
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 14px;
  box-sizing: border-box;
  &.on {
    background: #F3F9FF;
  }
  article {
    width: 200px;
    section {
      margin-top: 8px;
      font-size: 10px;
    }
  }
  &__pic {
    width: 26px;
    height: 26px;
  }
  &__name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  &__process {
    width: 100%;
    height: 4px;
    background: #EAEBED;
    border-radius: 2px;
    overflow: hidden;
    margin-top: 6px;
    b {
      display: block;
      height: 100%;
      background: red;
    }
  }
  .iconfont {
    width: 20px;
    height: 20px;
    text-align: center;
    font-size: 14px;
    color: #6A707C;
  }
}
</style>