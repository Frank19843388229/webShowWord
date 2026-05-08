import axios from "axios";
import { ElMessage } from "element-plus"
import { defineStore } from "pinia";

const backend = axios.create({
  baseURL: "http://localhost:8080"
});

const usePoemStore = defineStore("poem", {
  state: () => ({
    poem: "",
  }),

  actions: {
    async setPoemFromApi(file) {
      try {
        const response = await backend.post(
          "/poem/setpoem",
          file,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        this.poem = response.data;
        return response.data;

      } catch (error) {
        ElMessage.error("获取诗词失败");
      }
    }
  }
});

export default usePoemStore;
