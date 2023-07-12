import instance from "@/api/index.js";

const makeApiPostRequest = (endpoint, payload) => {
  return instance
    .post(endpoint, payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default makeApiPostRequest;
