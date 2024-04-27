<script setup lang="ts">

</script>

<template>
  <div class="gvb_footer">
    <div class="gvb_footer_container">
      <div class="left">
        <div class="version">
          <span>version</span>
          <span> 1.0.1</span>
        </div>
        <div class="date">
          <div class="create_site_date">
            建站日期
            2024年04月27日
          </div>
          <div class="site_running_date">
            网站已运行:30天1时2分3秒
          </div>
        </div>
        <div class="beian">
          <img src="/image/icon/beian.png" alt="备案数据">
          <a href="https://beian.miit.gov.cn/" target="_blank">备案号:沪ICP备20008188号-1</a>
        </div>
      </div>
      <div class="right">
        <a href="javascript:void (9)" target="_blank">
          <img src="/public/image/icon/bilibili.png" alt="bilibili">
        </a>
        <a href="javascript:void (9)">
          <img src="/public/image/icon/github.png" alt="github">
        </a>
        <a href="javascript:void (9)">
          <img src="/public/image/icon/qq.png" alt="qq">
        </a>
        <a href="javascript:void (9)">
          <img src="/public/image/icon/wechat.png" alt="wechat">
        </a>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
.gvb_footer {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--color-bg-1);
  padding: 40px 0;
  color: var(--color-text-2);

  .gvb_footer_container {
    width: var(--container_width);
    display: flex;

    .left {
      width: 60%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .version {
        margin-bottom: 20px;

        span {
          padding: 8px 15px;
          background-color: var(--color-fill-2);

        }

        span:nth-child(1) {
          background-color: var(--active);
          color: white;
          border-radius: 5px 0 0 5px;
        }

        span:nth-child(2) {
          //background-color: var(--active);
          //color: white;
          border-radius: 5px 0 0 5px;
        }

      }

      .date {
        margin-bottom: 10px;

        .create_site_date {
          margin-right: 10px;
        }
      }

      .beian {
        display: flex;
        align-items: center;

        a {
          color: var(--color-text-2);
          text-decoration: none;
          margin-left: 5px;
        }
      }
    }

    .right {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 40px;
        height: 40px;
      }

      a {
        margin-right: 40px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>