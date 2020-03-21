<template>
  <div class="zl-userManage">
    <input type="file" @change="onChange" ref="fileInput" />
  </div>
</template>
<script>
export default {
  name: "userManage",
  data() {
    return {};
  },
  methods: {
    onChange() {
      let self = this;
      let file = this.$refs.fileInput.files[0];
      if (!file) return;
      // 这里我们将切片固定成六分，也可以固定大小上传
      let axiosArray = [];
      let chunkList = [];
      let chunkSize = file.size / 6;
      let current = 0;
      let i = 0;
      let fileName = Date().getTime() + "_" + file.name;
      while (current < 6) {
        chunkList.push({
          chunk: file.slice(current * chunkSize, (current + 1) * chunkSize),
          fileName: current + "_" + fileName
        });
        current++;
      }
      // 切片并发传给后端，这里我们要注意切片上传时请求头是 multipart/form-data 合并切片时请求头是x-www-form-urlencoded，只能上传键值对。
      chunkList.map(function(item) {
        let form = new FormData();
        form.append("file", item.chunk);
        form.append("fileName", item.fileName);
        axiosArray.push(
          self.$axios.post("/api/album/upload", form, {
            headers: { "Content-Type": "multipart/form-data" }
          })
        );
      });
      // 所有切片上传成功后合并
      Promise.all(axiosArray).then(res => {
        self.$axios.post("/api/album/uploadMerge", `fileName=${fileName}`);
      });
    }
  }
};
</script>

<style lang="scss">
.zl-userManage {
  height: 100%;
  padding: 25px;
}
</style>
