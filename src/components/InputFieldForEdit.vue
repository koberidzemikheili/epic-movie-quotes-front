<template>
  <Field
    :name="props.name"
    :type="props.type"
    :rules="props.rules"
    :as="props.as"
    :placeholder="props.placeholder"
    v-model="internalValue"
    :class="[
      'mt-2',
      'py-1',
      'px-3',
      'border',
      'border-gray-300',
      'rounded',
      'outline-none',
      'bg-transparent',
      'h-9',
      'text-white',
      props.addclass,
    ]"
  />
  <div v-if="error" class="text-red-600 mt-1">{{ error }}</div>
  <ErrorMessage :name="props.name" class="text-red-600 mt-1" />
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import "@/Rules/rules";
const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  rules: { type: String, required: false },
  placeholder: { type: String, required: false },
  as: { type: String, required: false },
  addclass: { type: String, required: false },
  modelValue: { type: [String, Number], required: false },
  error: { type: String, required: false },
});

const internalValue = ref(props.modelValue);

watchEffect(() => {
  internalValue.value = props.modelValue;
});

const emit = defineEmits({
  "update:modelValue": null,
});

watchEffect(() => {
  emit("update:modelValue", internalValue.value);
});
</script>
