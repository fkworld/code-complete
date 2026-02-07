import { defineComponent } from "vue";

import { getRouteParams, navigateToReplace } from "@/router/router-utils";

export default defineComponent({
  setup() {
    const { argA, argB, argC } = getRouteParams("/debug/debug-route-params");

    async function onClick() {
      await navigateToReplace("/debug/debug-route-params", {
        argA: "somethingA",
        argB: "somethingB",
        argC: "somethingC",
      });
      window.location.reload();
    }

    return () => (
      <div>
        <div onClick={onClick}>点击写入参数</div>
        <div>参数 A: {argA}</div>
        <div>参数 B: {argB}</div>
        <div>参数 C: {argC}</div>
      </div>
    );
  },
});
