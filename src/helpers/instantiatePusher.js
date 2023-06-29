import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";
axios.defaults.withCredentials = true;
export default function instantiatePusher() {
  window.Pusher = Pusher;
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    Host: import.meta.env.VITE_PUSHER_HOST,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    disableStats: true,
    encrypted: true,
    authorizer: (channel) => {
      return {
        authorize: (socketId, callback) => {
          axios
            .post(`${import.meta.env.VITE_PUSHER_HOST}/broadcasting/auth`, {
              socket_id: socketId,
              channel_name: channel.name,
            })
            .then((response) => {
              callback(false, response.data);
            })
            .catch((error) => {
              callback(true, error);
            });
        },
      };
    },
    withCredentials: true,
  });

  return true;
}
