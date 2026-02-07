import { defineComponent } from "vue";

export const Route404 = defineComponent({
  setup() {
    return () => <div>404 Not Found</div>;
  },
});
