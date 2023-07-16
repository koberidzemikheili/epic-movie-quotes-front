import instance from "@/api/index.js";

const getCSRFToken = () => {
  return instance
    .get("sanctum/csrf-cookie")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const login = (values) => {
  return instance
    .post("/api/login", values)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

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

const getUserData = () => {
  return instance
    .get("api/user")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const register = (values) => {
  return instance
    .post("api/register", values)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const forgotPassword = (values) => {
  return instance
    .post("/api/forgot-password", values)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const resetPassword = (values) => {
  return instance
    .post("/api/reset-password", values)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const unlike = (payload) => {
  return instance.delete(`/api/like`, { data: payload });
};

const fetchSingleQuote = (id) => {
  return instance.get(`/api/quote/${id}`);
};

const deleteQuote = (id) => {
  return instance.delete(`/api/quote/${id}`);
};

const editQuote = (id, values) => {
  return instance.post(`/api/quote/${id}`, values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const fetchGenres = () => {
  return instance.get("/api/genres");
};

const logout = () => {
  return instance.post("api/logout");
};

const markNotificationAsSeen = (notificationId) => {
  return instance.post(`/api/notifications/${notificationId}/mark-as-seen`);
};

const markAllNotificationsAsRead = (formData) => {
  return instance.post(`/api/notifications/mark-all-as-seen`, formData);
};

const fetchUserMovies = () => {
  return instance.get("/api/user/movies");
};

const addQuote = (values) => {
  return instance.post("/api/quote", values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getAllMovies = () => {
  return instance.get("/api/movie");
};

const addMovie = (values) => {
  return instance.post("/api/movie", values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const editMovie = (id, values) => {
  return instance.post(`/api/movie/${id}`, values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const fetchSingleMovie = (id) => {
  return instance.get(`/api/movie/${id}`);
};

const deleteMovie = (id) => {
  return instance.delete(`/api/movie/${id}`);
};

const fetchQuoteDetails = async (currentPage, searchTerm) => {
  try {
    let response = await instance.get("/api/quote", {
      params: {
        page: currentPage,
        searchBy: searchTerm,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const editUser = (values) => {
  return instance.post("/api/edit", values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export {
  getCSRFToken,
  login,
  makeApiPostRequest,
  getUserData,
  register,
  forgotPassword,
  resetPassword,
  unlike,
  fetchSingleQuote,
  deleteQuote,
  editQuote,
  fetchGenres,
  logout,
  markNotificationAsSeen,
  markAllNotificationsAsRead,
  fetchUserMovies,
  addQuote,
  getAllMovies,
  addMovie,
  editMovie,
  fetchSingleMovie,
  deleteMovie,
  fetchQuoteDetails,
  editUser,
};
