import { getRouteSearchParams, navigateTo } from "@/router/router-utils";

export default function Page() {
  const { argString, argNumber, argBoolean } = getRouteSearchParams("/debug/debug-route-params");

  async function onClick() {
    await navigateTo("/debug/debug-route-params", {
      argString: "answer-of-universe",
      argNumber: 42,
      argBoolean: true,
    });
    window.location.reload();
  }

  return (
    <div>
      <div onClick={onClick}>点击写入参数</div>
      <div>参数 String: {argString}</div>
      <div>参数 Number: {argNumber}</div>
      <div>参数 Boolean: {argBoolean?.toString()}</div>
    </div>
  );
}
