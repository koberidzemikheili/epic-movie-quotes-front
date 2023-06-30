<template>
  <Field
    :name="name"
    :type="type"
    :rules="rules"
    :as="as"
    :placeholder="placeholder"
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
      addclass,
    ]"
  />
  <div v-if="error" class="text-red-600 mt-1">{{ error }}</div>

  <ErrorMessage :name="name" class="text-red-600 mt-1" />
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import "@/Rules/rules";
defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  rules: { type: String, required: false },
  placeholder: { type: String, required: false },
  as: { type: String, required: false },
  addclass: { type: String, required: false },
  error: { type: String, required: false },
});
</script>
