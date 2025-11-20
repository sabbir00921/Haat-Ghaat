// export const BaseURL = "http://localhost:3000/api/v1";
export const BaseURL = "https://haat-ghaat.onrender.com/api/v1";

const SummaryApi = {
  register: {
    url: "/auth/create-user",
    method: "post",
  },
  login: {
    url: "/auth/user-login",
    method: "post",
  },
};

export default SummaryApi;
