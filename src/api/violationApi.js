import axiosClient from "./axiosClient";

const deviceApi = {
  getDeviceList: (params) => {
    const url = "/device/list";
    return axiosClient.get(url, { params });
  }
};

export default deviceApi;
