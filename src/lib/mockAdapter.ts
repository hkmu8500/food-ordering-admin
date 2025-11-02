import axiosInstance from "./axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axiosInstance, {
  delayResponse: 500,
  onNoMatch: "passthrough",
});
export default mock;
