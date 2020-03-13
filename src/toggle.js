import Vue from "vue";
import API, { watch, reactive, ref, computed } from "@vue/composition-api";
Vue.use(API);

export const toggleForm = () => {
  const visible = ref(false);

  const toggle = () => {
    visible.value = !visible.value;
  };

  return {
    visible,
    toggle
  };
};
