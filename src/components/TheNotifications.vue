<template>
  <div class="relative">
    <button
      class="relative py-1 px-4 mx-2 text-white"
      @click="showNotifications = !showNotifications"
    >
      <IconBell class="w-6" />
      <div
        v-if="unseenNotifications"
        class="absolute top-1 right-2 w-5 h-5 rounded-full bg-orange-600 text-center text-white flex items-center justify-center"
      >
        {{ unseenNotifications }}
      </div>
    </button>

    <div
      class="absolute right-0 w-96 mt-2 py-2 px-6 bg-black rounded-lg shadow-xl text-white"
      v-show="showNotifications"
    >
      <div class="py-2 flex justify-between items-center">
        <span class="text-lg font-bold">Notifications</span>
        <button class="underline" @click="markAllAsRead">
          Mark all as read
        </button>
      </div>
      <div class="max-h-96 overflow-auto no-scrollbar">
        <div
          class="border border-gray-500 px-4 py-2 my-2 rounded"
          v-for="(notification, index) in notifications"
          :key="index"
        >
          <div
            @click="isQuoteSeen(notification.id, notification.quote_id)"
            class="flex items-center justify-between"
          >
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
            <div class="text-center">
              <div>{{ getTimeDifference(notification.created_at) }}</div>
              <div class="text-green-600" v-if="notification.is_seen === 0">
                New
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconBell from "@/components/icons/IconBell.vue";
import IconChatQuote from "@/components/icons/IconChatQuote.vue";
import IconHeartFill from "@/components/icons/IconHeartFill.vue";
import instance from "@/api/index.js";
import router from "@/router";
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();
const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

const showNotifications = ref(false);

const props = defineProps({
  notifications: { type: Array, required: true },
});

const isQuoteSeen = (notificationId, quoteId) => {
  instance
    .post(`/api/notifications/${notificationId}`)
    .then(() => {
      router.push({ name: "ViewQuote", params: { id: quoteId } });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const markAllAsRead = () => {
  const formData = { userId: userStore.userData.user.id };
  instance
    .post(`/api/notifications-mark-all-as-seen`, formData)
    .then(() => {
      userStore.fetchUserData();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const unseenNotifications = computed(() => {
  return props.notifications.filter(
    (notification) => notification.is_seen === 0
  ).length;
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
