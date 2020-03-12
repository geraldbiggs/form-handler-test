import { watch, reactive, ref } from "@vue/composition-api";

export const editable = {
  type: Boolean,
  default: false
};

export const actionable = {
  type: Boolean,
  default: true
};

export const editEntry = {
  type: Object,
  default: () => {}
};

export const persistable = {
  type: Boolean,
  default: true
};

export const toggleVisible = visible => () => {
  visible.value = !visible.value;
};

export const toggleForm = (defaultState = false) => {
  const visible = ref(defaultState);
  const toggle = toggleVisible(visible);

  return {
    visible,
    toggle
  };
};

export const setForm = permissions => (fields, model) => {
  const passedFields = permissions.filterFields(fields, model.entity);
  const { inputs, data } = new model(passedFields);
  const { data: state, initialize } = makeFormState(data);
  return { inputs, state, model, data, initialize };
};

export const makeFormState = formData => {
  let dataCache = { ...formData };
  let data = reactive(formData);

  let initialize = () => {
    data = dataCache;
  };

  function makeEditable(watched) {
    return watched => (editableFn, initialFn = initialize) =>
      watch(
        watched,
        value => {
          if (value !== null) {
            if (value === true) {
              editableFn(data);
            } else {
              initialFn(data, dataCache);
            }
          }
        },
        {
          immediate: true
        }
      );
  }

  return { data, makeEditable, initialize };
};

export const makeFormGroup = (model, prefix = "form") => {
  const dataCache = model.data;
  const data = reactive(model.data);

  return {
    [prefix + "Entity"]: model.entity,
    [prefix + "Inputs"]: reactive(model.inputs),
    [prefix]: data
  };
};

export const makePersistable = (persist, method) => {
  return data => {
    if (persist) return method(data);
  };
};

export const formHandler = emit => {
  const saveable = (data = null) => {
    emit("saved", data);
    completeable();
  };

  const cancellable = (data = null) => {
    emit("cancelled", data);
    completeable();
  };

  const completeable = () => {
    emit("completed", true);
  };

  return {
    cancellable,
    completeable,
    saveable
  };
};
