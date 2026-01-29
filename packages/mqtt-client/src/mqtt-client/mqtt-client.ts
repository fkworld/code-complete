/* eslint-disable no-console */

import type { MqttConnectConfigs, MqttExtraConfigs, MqttKey, MqttMessage } from "./mqtt-client-types";

import { tryGet } from "@fkworld/utils";
import mqtt from "mqtt";

const MQTT_TOPIC_SUBSCRIBE_QOS = 0;

/** 最大重试次数 */
const MQTT_RECONNECT_MAX_COUNT = 3;

export class MqttClient {
  /** mqtt 客户端 */
  private client: mqtt.MqttClient | undefined;
  /** mqtt 连接配置 */
  private connectConfigs: MqttConnectConfigs;
  /** mqtt 额外配置 */
  private extraConfigs: MqttExtraConfigs;

  /** 重连计数 */
  private reconnectCount = 0;

  /** 回调缓存 */
  private clientCachedSubscribeCallback: Record<
    string,
    // eslint-disable-next-line ts/no-explicit-any
    (data: any) => void
  > = {};

  constructor(connectConfigs: MqttConnectConfigs, extraConfigs: MqttExtraConfigs) {
    this.connectConfigs = connectConfigs;
    this.extraConfigs = extraConfigs;

    console.log("[MqttClient] MQTT 配置", { connectConfigs: this.connectConfigs, extraConfigs: this.extraConfigs });
  }

  async customConnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client = mqtt
        .connect({
          ...this.connectConfigs,
        })
        .on("connect", () => {
          console.log("[MqttClient] onConnect");

          // 连接成功，重置重连错误计数
          this.reconnectCount = 0;

          resolve(undefined);
        })
        .on("reconnect", () => {
          console.log("[MqttClient] onReconnect");

          // 判断重连错误计数
          this.reconnectCount += 1;
          if (this.reconnectCount >= MQTT_RECONNECT_MAX_COUNT) {
            if (this.client) {
              console.log("[MqttClient] 达到最大重连错误次数，停止重连");
              this.client.options.reconnectPeriod = 0;
            }
          }
        })
        .on("close", () => {
          console.log("[MqttClient] onClose");
          reject(new Error("[MqttClient] onClose"));
        })
        .on("error", (error) => {
          console.error("[MqttClient] onError", error);
          reject(new Error(`[MqttClient] onError ${error.message}`));
        })
        .on("message", (topic, payload) => {
          // 日志
          console.log("[MqttClient] onMessage", payload.toString());

          // 解析数据
          const payloadObject = tryGet(() => JSON.parse(payload.toString()));

          // 判断数据合法性，非法数据直接丢弃
          if (!payloadObject || !payloadObject.id) {
            console.error("[MqttClient] onMessage invalid", payload.toString());
            return;
          }

          // 调用回调缓存
          try {
            this.clientCachedSubscribeCallback[topic]?.(payloadObject);
          } catch {
            // DO NOTHING
          }
        });
    });
  }

  getIsConnected(): boolean {
    return this.client?.connected || false;
  }

  customSubscribe<TKey extends MqttKey>(key: TKey, onMessage: (data: MqttMessage<TKey>) => void): void {
    this.client?.subscribe(key, { qos: MQTT_TOPIC_SUBSCRIBE_QOS });
    this.clientCachedSubscribeCallback[key] = onMessage;
  }

  customUnsubscribe<TKey extends MqttKey>(key: TKey): void {
    this.client?.unsubscribe(key);
    delete this.clientCachedSubscribeCallback[key];
  }

  customPublish<TKey extends MqttKey>(key: TKey, message: MqttMessage<TKey>): void {
    this.client?.publish(key, JSON.stringify(message), { qos: MQTT_TOPIC_SUBSCRIBE_QOS });
  }
}
