<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

import { forceGetMqttClientIns, safeGetMqttClientIns } from "@/services/mqtt";

const topicMessage = ref("");

onMounted(async () => {
  const resMqtt = await safeGetMqttClientIns();

  if (!resMqtt.success) {
    return;
  }

  resMqtt.mqttClient.customSubscribe("testTopic/helloWorld", (data) => {
    topicMessage.value = JSON.stringify(data, null, 2);
  });
});

onUnmounted(() => {
  const resMqtt = forceGetMqttClientIns();
  resMqtt.mqttClient?.customUnsubscribe("testTopic/helloWorld");
});

async function onClickPublish() {
  const resMqtt = await safeGetMqttClientIns();

  if (!resMqtt.success) {
    return;
  }

  resMqtt.mqttClient.customPublish("testTopic/helloWorld", {
    id: Date.now().toString(),
    message: "Hello World",
  });
}
</script>

<template>
  <button @click="onClickPublish">
    点击推送消息
  </button>
  <div>进页面开始订阅，离开页面取消订阅</div>
  <pre>{{ topicMessage }}</pre>
</template>
