<template>
  <div class="relative">
    <button
      class="py-1 px-4 mx-2 text-white"
      @click="showNotifications = !showNotifications"
    >
      <IconBell class="w-6" />
    </button>
    <div
      class="absolute right-0 w-96 mt-2 py-2 px-6 bg-black rounded-lg shadow-xl text-white"
      v-show="showNotifications"
    >
      <div class="py-2 flex justify-between items-center">
        <span class="text-lg font-bold">Notifications</span>
        <button class="underline">Mark all as read</button>
      </div>
      <div
        class="border border-gray-500 px-4 py-2 my-2 rounded"
        v-for="(notification, index) in notifications"
        :key="index"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img
              class="w-12 h-12 rounded-full bg-gray-300 mr-2"
              :src="
                backendurl + '/storage/' + notification.actor.profile_pictures
              "
            />
            <div>
              <div>{{ notification.actor.username }}</div>
              <div class="text-sm text-gray-400">
                <div v-if="notification.action === 'like'">
                  <IconHeartFill />
                </div>
                <div v-if="notification.action === 'comment'">
                  <IconChatQuote />
                </div>
              </div>
            </div>
          </div>
          <div>{{ getTimeDifference(notification.created_at) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconBell from "@/components/icons/IconBell.vue";
import IconChatQuote from "@/components/icons/IconChatQuote.vue";
import IconHeartFill from "@/components/icons/IconHeartFill.vue";
import { ref } from "vue";
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

const showNotifications = ref(false);

defineProps({
  notifications: { type: Array, required: true },
});
function getTimeDifference(date) {
  const currentDate = new Date();
  const notificationDate = new Date(date);

  const diffInSeconds = Math.abs(currentDate - notificationDate) / 1000;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return diffInDays + " days ago";
  } else if (diffInHours > 0) {
    return diffInHours + " hr ago";
  } else if (diffInMinutes > 0) {
    return diffInMinutes + " min ago";
  } else {
    return "Just now";
  }
}
</script>
