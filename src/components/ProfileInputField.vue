<template>
  <div class="my-2">
    <label class="text-white flex mb-2 mt-4">
      {{ label }}
    </label>
    <div class="flex justify-between items-center">
      <input
        class="p-2 rounded bg-white outline-none flex-grow mr-2"
        :value="value"
        disabled
      />
      <button
        class="text-blue-500 py-1 px-2 rounded bg-transparent"
        :style="{ visibility: editable ? 'visible' : 'hidden' }"
        @click.prevent="editField"
      >
        {{ $t("profilepage.buttons.edit") }}
      </button>
      <ProfileInputModal
        v-if="isSmaill"
        v-model:isOpen="isModalOpen"
        @save-field="saveModalField"
      >
        <label class="text-white flex mb-2 mt-4">
          {{ label }}
        </label>
        <Field
          :name="name"
          :type="type"
          :rules="rules"
          :placeholder="placeholder"
          class="h-9 rounded w-full"
          v-model="newValue"
        />
        <div v-if="error" class="text-red-600 mt-1">{{ error }}</div>
        <ErrorMessage :name="name" class="text-red-600 mt-1" />
      </ProfileInputModal>
    </div>
    <div v-if="editing & !isSmaill" class="mt-2">
      <label class="text-white flex mb-2 mt-4">
        {{ $t("profilepage.labels.enternew") }} {{ label }}
      </label>
      <Field
        :name="name"
        :type="type"
        :rules="rules"
        :placeholder="placeholder"
        class="h-10 p-2 rounded outline-none flex-grow"
        v-model="newValue"
      />
      <div v-if="error" class="text-red-600 mt-1">{{ error }}</div>
      <ErrorMessage :name="name" class="text-red-600 mt-1" />
    </div>
    <SuccessModal v-model:isOpen="isSuccessModalOpen">{{
      $t("profilepage.labels.successmessage")
    }}</SuccessModal>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import "@/Rules/rules";
import { ref } from "vue";
import ProfileInputModal from "@/components/Modals/ProfileInputModal.vue";
import SuccessModal from "@/components/Modals/SuccessModal.vue";

const emit = defineEmits(["edit-started"], ["save-field"]);

const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, default: "text" },
  value: { type: String, required: true },
  rules: { type: String, required: false },
  placeholder: { type: String, required: false },
  editable: { type: Boolean, default: false },
  editing: { type: Boolean, default: false },
  error: { type: String, required: false },
});

let isModalOpen = ref(false);
let isSuccessModalOpen = ref(false);
let newValue = ref(props.value);
let isSmaill = ref();

const editField = () => {
  if (window.innerWidth < 640) {
    isModalOpen.value = true;
    isSmaill.value = true;
  } else {
    emit("edit-started", props.name);
    isSmaill.value = false;
  }
};

const saveModalField = () => {
  emit("save-field", { [props.name]: newValue.value });
  isModalOpen.value = false;
  isSuccessModalOpen.value = true;
};
</script>
