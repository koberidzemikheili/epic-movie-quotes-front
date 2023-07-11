<template>
  <label class="text-white flex mb-2 mt-4"
    >{{ label }}
    <div class="text-red-600">*</div></label
  >
  <Field
    :name="name"
    :type="type"
    :rules="rules"
    :placeholder="placeholder"
    class="h-9 rounded px-3 py-2"
  />
  <div v-if="error" class="text-red-600 mt-1">{{ error }}</div>
  <ErrorMessage :name="name" class="text-red-600 mt-1" />
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import "@/Rules/rules";
defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true },
  rules: { type: String, required: false },
  placeholder: { type: String, required: false },
  error: { type: String, required: false },
});
</script>
