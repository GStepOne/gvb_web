<script setup lang="ts">
import {useStore} from "@/stores";
import {reactive, ref, watch} from "vue";
import Login_charts from "@/components/charts/login_charts.vue";
import {dataLoginApi, type LoginDataType} from "@/api/data_api";

const store = useStore();
const isShow = ref<boolean>(false);
const data = reactive({
  date_list: [],
  login_data: [],
  sign_data: [],
})


const dateFilterOptions = [
  {
    label: "7D", value: 1
  },
  {
    label: "1M", value: 2
  },
  {
    label: "2M", value: 3
  },
  {
    label: "3M", value: 4
  },
]


const params = reactive<loginDataRequest>({
  date: 1
})

// LoginDataType
async function dateFilterChange() {
  let res = await dataLoginApi(params)
  Object.assign(data, res.data)
  isShow.value = true
}

dateFilterChange()

</script>

<template>
  <div class="login_data_charts">
    <div class="select">
      <a-select placeholder="时间过滤"
                :options="dateFilterOptions"
                @change="dateFilterChange"
      >
      </a-select>
    </div>
    <login_charts
        v-if="isShow"
        :height="300"
        :sign-list="data.sign_data"
        :date-list="data.date_list"
        :login-list="data.login_data"
    ></login_charts>
  </div>
</template>

<style lang="scss">
.login_data_charts {
  position: relative;

  .select {
    position: absolute;
    right: 90px;
    top: 10px;
    z-index: 1;
    width: 160px;
  }
}
</style>