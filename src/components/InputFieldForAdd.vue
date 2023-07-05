<template>
  <div class="relative">
    <div
      class="absolute top-2 right-0 px-3 py-1 text-md text-gray-500 pointer-events-none"
    >
      <div>{{ langplaceholder }}</div>
    </div>
    <Field
      :name="name"
      :type="type"
      :rules="rules"
      :as="as"
      :placeholder="placeholder"
      :class="[
        'mt-2',
        'w-full',
        'py-1',
        'px-3',
        'border',
        'border-gray-300',
        'rounded',
        'outline-none',
        'bg-transparent',
        'text-white',
        'pr-10',
        addclass,
      ]"
    />
  </div>
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
  langplaceholder: { type: String, required: false },
});
</script>
