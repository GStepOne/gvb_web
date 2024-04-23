<script setup lang="ts">

</script>

<template>
  <div class="gvb_logo">
    <img src="/image/choppa.jpeg" alt="">
    <div class="logo_head">
      <div>晓之白虎</div>
      <div>赤砂之蝎</div>
    </div>
  </div>
</template>

<style lang="scss">
.gvb_logo {
  height: 90px;
  display: flex;
  padding: 20px;
  align-items: center;
  border-bottom: 1px solid var(--bg);
  transition: all .3s;

  img {
    width: 60px;
    height: 60px;
    transition: all .3s;
    border-radius: 50%;
  }

  .logo_head {
    margin-left: 20px;
    transition: all .3s;
    transform: scale(1);
    transform-origin: left;

    > div:nth-child(1) {
      font-weight: 600;
      margin-bottom: 2px;
      font-size: 22px;
    }

    > div:nth-child(2) {
      font-size: 12px;
    }
  }
}

.collapsed {
  padding: 2px;

  .gvb_logo {
    padding: 0; //不加这行 乔巴漏一半
    img {
      width: 42px;
      height: 42px;
    }

    .logo_head {
      //display: none;
      transform: scale(0);
    }
  }
}

</style>