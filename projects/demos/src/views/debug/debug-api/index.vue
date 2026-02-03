<script setup lang="ts">

import { useRequest } from "vue-request";

import { apiPetStore } from "@/services/api";

const { data, refreshAsync } = useRequest(async () => {
  const res = await apiPetStore.request("/pet-store-service/pet/findByStatus get", {
    status: ["available"],
  });
  return res.data;
});

</script>

<template>
  <div class="container">
    <button @click="refreshAsync">
      刷新数据
    </button>
    <div
      v-for="item in data"
      :key="item.id"
      class="line"
    >
      <div>{{ item.id }}</div>
      <div>{{ item.name }}</div>
      <div>{{ item.status }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  .line {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}
</style>
