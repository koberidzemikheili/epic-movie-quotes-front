<template>
  <div class="flex border border-gray-300 rounded mt-2">
    <div
      class="pl-2 py-1 text-md text-gray-500 pointer-events-none whitespace-nowrap"
    >
      <div class="">{{ props.placeholder }}:</div>
    </div>
    <Field
      :name="props.name"
      :type="props.type"
      :rules="props.rules"
      :as="props.as"
      v-model="internalValue"
      :class="[
        'ml-2',
        'w-full',
        'py-1',
        'outline-none',
        'bg-transparent',
        'text-white',
        addclass,
      ]"
    />
    <div class="px-2 py-1 text-md text-gray-500 pointer-events-none">
      <div>{{ langplaceholder }}</div>
    </div>
  </div>
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
  langplaceholder: { type: String, required: false },
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
