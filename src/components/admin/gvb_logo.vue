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
  padding: 0 20px;
  border-bottom: 1px solid var(--bg);

  img {
    width: 60px;
    height: 60px
  }

  .logo_head {
    margin-left: 20px;

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

</style>