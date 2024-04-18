<template>
  <div class="gvb_tabs">
    <!-- 只有超过这部分才会滑动-->
    <swiper
        :slide-per-view="slidePerView"
        class="mySwiper"
    >
        <swiper-slide v-for="(item,index) in tabList" :key="item.name"
        >
          <!--active 代表默认选中 -->
          <span
              :class="{gvb_tab:true,active:route.name === item.name}" :key="item.name"
              @click="clickTab(item)"
          >
            {{
              item.title
            }}
            <!--阻止事件冒泡.stop| middle 鼠标中间的键关闭-->
          <IconClose @click.stop="closeTab(item)" v-if="item.name!== 'home'"></IconClose>
        </span>
        </swiper-slide>
      <span class="gvb_tab close_all_tab" @click="closeAllTab()">全部关闭<IconClose></IconClose></span>
    </swiper>
  </div>

</template>

<script setup lang="ts">
import {IconClose} from "@arco-design/web-vue/es/icon";
import type {Ref} from "vue"
import {onMounted, ref, watch, nextTick} from "vue"
import {useRoute, useRouter} from "vue-router";
import {Swiper, SwiperSlide} from "swiper/vue";
// import type {tabType} from "@/types";
const slidePerView = ref(12);
//获取路由参数、名字、params参数 从这里拿，router 是路由器 push replace
const route = useRoute()
const router = useRouter()

interface tabType {
  name: string
  title: string
}

//算出总宽度
onMounted(() => {
  nextTick(() => {
    // 在下一个 DOM 更新周期中获取宽度,指明为元素不报错了
    let mySwiperWidth = (document.querySelector(".mySwiper") as Element).clientWidth;
    let actualWidth = (document.querySelector(".swiper-wrapper") as Element).scrollWidth;

    if (actualWidth <= mySwiperWidth) {
      return;
    }

    let swiperSlideList = document.querySelectorAll('.swiper-wrapper .swiper-slide');
    let sum = 0;
    let count = 0;
    for (const slide of swiperSlideList) {
      sum += slide.clientWidth;
      if (sum > mySwiperWidth) {
        break;
      }
      count++;
    }
  });
})

const tabList: Ref<tabType[]> = ref([
  {name: "home", title: "首页"},
])

function closeAllTab() {
  tabList.value = [
    {name: "home", title: "首页"},
  ]
  router.push({
    name: "home"
  })
}

//持久化存储
function persistence() {
  localStorage.setItem("tabList", JSON.stringify(tabList.value))
}

//监听tabList 发生变化改变
watch(() => tabList.value.length, () => {
  persistence()
})

function loadTabs() {
  let val = localStorage.getItem("tabList")
  if (val === null) {
    return
  }
  let tabs = []
  try {
    tabs = JSON.parse(val)
  } catch (e) {
    return;
  }
  tabList.value = tabs
}

function closeTab(item: tabType) {
  //点的是home 不管
  if (item.name === "home") {
    return
  }
  //点的是当前的tab 关掉 添加到push
  let index = tabList.value.findIndex((tab) => item.name === tab.name)
  tabList.value.splice(index, 1)
  //判断删除的路由的name是不是和当前的路由是一样的
  if (route.name === item.name) {
    let beforeIndex = index - 1 //因为首页一定会有
    let beforeItem = tabList.value[beforeIndex]
    clickTab(beforeItem)
  }

}

function clickTab(item: tabType) {
  console.log("clickTab",item.name)
  router.push({name: item.name})
}

watch(() => route.name, () => {
  // console.log(route.name)
  if (!inList(route.name as string)) {
    //当前路由添加到里面
    tabList.value.push({
      name: route.name as string,
      title: route.meta.title as string
    })
  }
}, {immediate: true}) //一开始就执行


// 判断名称是否在列表里面
function inList(name: string): boolean {
  for (const tab of tabList.value) {
    if (tab.name === name) {
      return true
    }
  }

  return false
}

// 调用一下
loadTabs()
</script>

<style lang="scss">
.gvb_tabs {
  height: 30px;
  width: 100%;
  border-bottom: 1px solid var(--bg);
  padding: 0 20px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: var(--color-bg-1);


  .mySwiper {
    width: calc(100% - 94px);
    overflow: hidden;
    white-space: nowrap; //不加会乱
    height: 100%;
    display: flex;
    align-items: center;

    .swiper-wrapper {
      display: flex;
      justify-content: start;
      width: 100%;

      .swiper-slide {
        width: auto !important; //当一个样式规则使用了 !important 时，它将会覆盖其他同样规则但没有使用 !important 的样式。
      }
    }
  }

  .gvb_tab {
    border-radius: 5px;
    border: 1px solid var(--bg);
    padding: 2px 8px;
    margin-right: 10px;
    cursor: pointer;
    background-color: var(--color-bg-1);

    &.active {
      background-color: var(--active);
      color: white;
      border: none;

      &:hover {
        background-color: rgb(var(--arcoblue-4));
      }
    }

    svg {
      font-size: 12px;
      border-radius: 50%;

      &:hover {
        background-color: var(--bg);
      }
    }
  }

  .close_all_tab {
    position: absolute;
    right: 50px;
    margin-right: 0;
  }
}
</style>