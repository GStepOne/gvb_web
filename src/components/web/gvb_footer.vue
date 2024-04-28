<script setup lang="ts">
import {useStore} from "@/stores";
import {dateFormat} from "@/utils/date";
import {onUnmounted, ref} from "vue";

const store = useStore();
let timer: number | null = null;

const countDown = ref()

onUnmounted(() => {
  clearInterval(timer)
})

function countDownFunc() {
  let date = store.siteInfo.created_at
  let oldTime = new Date(date).getTime()
  let nowTime = new Date().getTime()
  //距离之前的时间
  // let diff = (nowTime - oldTime) / 1000 / (60 * 60 * 24)
  // let day = ~~(diff) //取整
  // let hour = ~~((diff - day) * 24)
  // let min = ~~(diff - day - (hour / 24)) * 24 * 60
  // let sec = ~~(diff - day - (hour / 24) - (min / 24 / 60)) * 24 * 60 * 60

  let diff = (nowTime - oldTime) / 1000; // 将时间差转换为秒
  let day = Math.floor(diff / (60 * 60 * 24)); // 计算天数
  let hour = Math.floor((diff % (60 * 60 * 24)) / (60 * 60)); // 计算小时数
  let minute = Math.floor((diff % (60 * 60)) / 60); // 计算分钟数
  let second = Math.floor(diff % 60); // 计算秒数

  countDown.value = `${day}天${hour}时${minute}分${second}秒`
}

function getData() {
  countDownFunc()
  timer = setInterval(countDownFunc as TimerHandler, 1000) as number
}

getData()

</script>

<template>
  <div class="gvb_footer">
    <div class="gvb_footer_container">
      <div class="left">
        <div class="version">
          <span>version</span>
          <span>1.0.1</span>
        </div>
        <div class="date">
          <div class="create_site_date">
            建站日期: 2024年04月27日
          </div>
          <div class="site_running_date">
            网站已运行:{{ countDown }}
          </div>
        </div>
        <div class="beian">
          <img src="/image/icon/beian.png" alt="备案数据">
          <a href="https://beian.miit.gov.cn/" target="_blank">{{ store.siteInfo.bei_an }}</a>
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
          //background-color: orange;
          //color: white;
          border-radius: 0 5px 5px 0;
        }

      }

      .date {
        display: inherit;
        margin-bottom: 10px;

        .create_site_date {
          margin-right: 10px;
          width: 100%;
        }

        .site_running_date {
          min-width: 200px;
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