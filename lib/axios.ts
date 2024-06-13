import ax from "axios";

const axios = ax.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export default axios;
