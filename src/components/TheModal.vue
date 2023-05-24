<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <button @click="$emit('close-modal', closeModal)">Close</button>
      <router-view />
    </div>
  </div>
</template>
<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
}
</style>
