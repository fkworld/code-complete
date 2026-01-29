/* eslint-disable no-console */

import { lockPromise } from "@fkworld/utils";

import { MqttClient } from "../mqtt-client/mqtt-client";

interface Returns {
  /**
   * 安全获取 mqttClient 实例
   * - 用 success 字段标记
   * - 常用于页面进入时发起订阅
   */
  safeGetMqttClientIns: () => Promise<
    | {
        success: true;
        mqttClient: MqttClient;
      }
    | {
        success: false;
        error: Error;
      }
  >;
  /**
   * 强制获取 mqttClient 实例
   * - 常用于页面离开时取消订阅
   */
  forceGetMqttClientIns: () => {
    mqttClient: MqttClient | undefined;
  };
}

export function createMqttClientIns(): Returns {
  let cachedMqttClient: MqttClient | undefined;

  const safeGetMqttClientIns: Returns["safeGetMqttClientIns"] = lockPromise(async () => {
    try {
      if (!cachedMqttClient) {
        cachedMqttClient = new MqttClient(
          {
            protocol: "wss",
            host: "broker.emqx.io",
            path: "/mqtt",
            port: 8084,
            /** 心跳间隔 */
            keepalive: 10,
            /** 连接超时时间 */
            connectTimeout: 5 * 1000,
            /** 自动重连间隔 */
            reconnectPeriod: 2 * 1000,
          },
          {},
        );

        await cachedMqttClient.customConnect();
      }

      if (!cachedMqttClient.getIsConnected()) {
        throw new Error("连接异常");
      }

      console.log("[MqttClientIns] MQTT 客户端获取成功");
      return {
        success: true,
        mqttClient: cachedMqttClient,
      };
    } catch (error) {
      console.error("[MqttClientIns] MQTT 客户端获取失败", error);
      return {
        success: false,
        error: error as Error,
      };
    }
  });

  function forceGetMqttClientIns(): {
    mqttClient: MqttClient | undefined;
  } {
    return {
      mqttClient: cachedMqttClient,
    };
  }

  return { safeGetMqttClientIns, forceGetMqttClientIns };
}
