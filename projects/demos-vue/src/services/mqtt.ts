import { createMqttClientIns } from "@fkworld/mqtt-client";

export const { safeGetMqttClientIns, forceGetMqttClientIns } = createMqttClientIns();
