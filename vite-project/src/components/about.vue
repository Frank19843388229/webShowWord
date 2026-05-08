<template>
  <div class="page">

    <el-card class="upload-card" shadow="hover">
      <h2>📄 Word 文件上传</h2>
      <p class="desc">
        请选择 .doc 或 .docx 文件上传，单文件大小不超过 10MB
      </p>

      <el-upload
        :show-file-list="false"
        :auto-upload="false"
        accept=".doc,.docx"
        :on-change="handleFile"
      >
        <el-button type="primary" size="large">
          选择并上传文件
        </el-button>
      </el-upload>

      <p v-if="fileName" class="filename">
        已选择：{{ fileName }}
      </p>

    </el-card>

  </div>
</template>

<script setup>
import { ref } from "vue"
import poem from "../store/poem.js"
const fileName = ref("")
import { useRouter } from 'vue-router'
const router = useRouter()
const poemStore = poem()

const handleFile = async (file) => {
  const rawFile = file.raw
  fileName.value = rawFile.name

  const formData = new FormData()
  formData.append("file", rawFile)

  try {
    await poemStore.setPoemFromApi(formData)
    router.push('/index/home')
    
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.page{
  width: 100%;
  height: calc(100vh - 130px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f2f4f8;
}

.upload-card{
  width: 480px;
  text-align: center;
  padding: 20px;
  height:calc(100vh - 130px);
}

.desc{
  color: #666;
  margin-bottom: 20px;
}

.filename{
  margin-top: 12px;
  color: #409eff;
}
</style>
