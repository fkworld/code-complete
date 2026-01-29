/**
 * mqtt 数据交互类型定义
 */
export interface MqttDefines {
  "testTopic/helloWorld": {
    content: {
      id: string;
      message: string;
    };
  };
}
