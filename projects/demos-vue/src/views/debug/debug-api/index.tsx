import { defineComponent } from "vue";
import { useRequest } from "vue-request";

import { apiPetStore } from "@/services/api";

export default defineComponent({
  setup() {
    const { data, refreshAsync } = useRequest(async () => {
      const res = await apiPetStore.request("/pet-store-service/pet/findByStatus get", {
        status: ["available"],
      });
      return res.data;
    });

    return () => (
      <div class="container">
        <button onClick={() => refreshAsync()}>刷新数据</button>
        {data.value?.map((item) => {
          return (
            <div class="grid grid-cols-3 gap-4">
              <div>{item.id}</div>
              <div>{item.name}</div>
              <div>{item.status}</div>
            </div>
          );
        })}
      </div>
    );
  },
});
