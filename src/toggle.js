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
