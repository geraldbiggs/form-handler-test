import { watch, reactive, ref, computed } from "@vue/composition-api";

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

export const setForm = permissions => (fields, model) => {
  const passedFields = permissions.filterFields(fields, model.entity);
  const { inputs, data } = new model(passedFields);
  const { data: formState, initialize } = makeFormState(data);
  return { inputs, formState, model, data, initialize };
};

export const makeFormState = formData => {
  let dataCache = { ...formData };
  let data = reactive(formData);

  let initialize = () => {
    data = dataCache;
  };

  return { data, initialize };
};

export const makeEditable = (watched, editableFn, initialFn = initialize) => {
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
};

export const makePersistable = (persist, method) => {
  return data => {
    if (persist) {
      return method(data);
    } else {
      return data;
    }
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

export const listHandler = submittedEntries => {
  const state = reactive({
    currentEntry: null,
    isFormVisible: false,
    isEditing: false,
    index: null,
    indexEntries: computed(() =>
      submittedEntries.map((x, i) => {
        return { ...x, ...{ index: i } };
      })
    )
  });

  let mapReplace = (entry, entries, index) =>
    entries.map((x, i) => {
      if (i === index) {
        return entry;
      } else {
        return x;
      }
    });

  let getIndex = (name, value) => entries.findIndex(x => x[name] === value);

  let add = () => {
    emit("request-add");
  };

  let insert = entry => {
    let newEntries = entries.concat(entry);
    emit("inserted", newEntries);
    emit("inserted-entry", entry);
  };

  let select = index => {
    index = index;
    isEditing = true;
    currentEntry = entries[index];
    emit("selected");
  };

  let clear = () => {
    index = null;
    isEditing = false;
    currentEntry = {};
    emit("cleared");
  };

  let save = data => {
    if (isEditing === true) {
      update(data);
    } else {
      insert(data);
    }
  };

  let update = entry => {
    if (index === null) return false;
    let newData = mapReplace(entries, entry, index);

    emit("updated", newData);
    emit("updated-entry", entry);
  };

  let updateByIndex = (index, entry) => {
    if (index === null) return false;
    let newData = mapReplace(entries, entry, index);

    emit("updated", newData);
    emit("updated-entry", entry);
  };

  let selectByProperty = (name, value) => {
    let index = getIndex(name, value);
    select(index);
  };

  let removeByProperty = (name, value) => {
    let index = getIndex(name, value);
    removeEntity(index);
  };

  let removeEntity = index => {
    let remainingEntries = entries.filter((x, key) => index !== key);
    emit("removed", remainingEntries);
    clear;
  };

  return {
    entries: state,
    removeEntity,
    removeByProperty,
    selectByProperty,
    updateByIndex,
    update,
    save,
    clear,
    select,
    insert,
    add
  };
};
