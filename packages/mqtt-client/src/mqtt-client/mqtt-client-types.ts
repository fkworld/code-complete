import type { IClientOptions } from "mqtt";
import type { Get } from "type-fest";

import type { MqttDefines } from "./mqtt-client-defines";

/** 连接配置：用于直接启动 mqtt 客户端 */
export type MqttConnectConfigs = IClientOptions;

/** 额外配置：用于额外的判定条件 */
export interface MqttExtraConfigs {}

/**
 * 订阅的 key
 */
export type MqttKey = {
  [Topic in keyof MqttDefines]: Topic & string;
}[keyof MqttDefines];

/**
 * 订阅的 key 对应的消息内容
 */
export type MqttMessage<TKey extends MqttKey> = Get<MqttDefines, [TKey, "content"]>;
