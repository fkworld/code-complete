import { getRouteParams, navigateTo } from "@/router/router-utils";

export default function Page() {
  const { argA, argB, argC } = getRouteParams("/debug/debug-route-params");

  async function onClick() {
    await navigateTo("/debug/debug-route-params", {
      argA: "somethingA",
      argB: "somethingB",
      argC: "somethingC",
    });
    window.location.reload();
  }

  return (
    <div>
      <div onClick={onClick}>点击写入参数</div>
      <div>参数 A: {argA}</div>
      <div>参数 B: {argB}</div>
      <div>参数 C: {argC}</div>
    </div>
  );
}
