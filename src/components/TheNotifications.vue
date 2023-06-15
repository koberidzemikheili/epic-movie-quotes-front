<template>
  <div class="relative">
    <button
      class="py-1 px-4 mx-2 text-white"
      @click="showNotifications = !showNotifications"
    >
      <IconBell />
    </button>
    <div
      class="absolute right-0 w-96 mt-2 py-2 px-4 bg-black rounded-lg shadow-xl text-white"
      v-show="showNotifications"
    >
      <div class="px-4 py-2 flex justify-between items-center">
        <span class="text-lg font-bold">Notifications</span>
        <button class="underline">Mark all as read</button>
      </div>
      <div class="border border-gray-500 px-4 py-2 my-2 rounded">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full bg-gray-300 mr-2"></div>
            <div>
              <div>Name Lastname</div>
              <div class="text-sm text-gray-400">
                Example text for notification type
              </div>
            </div>
          </div>
          <div>5 min</div>
        </div>
      </div>
      <!-- add more notifications as needed -->
    </div>
  </div>
</template>

<script setup>
import IconBell from "@/components/icons/IconBell.vue";
import { ref } from "vue";

const showNotifications = ref(false);
</script>
