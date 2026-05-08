<template>
    <div class="main">
        <div class="container">
            <h1>修改用户信息</h1>
            <input type="text" placeholder="请输入修改后的账号" v-model="user.username">
            <input type="text" placeholder="请输入修改后的密码" v-model="user.password">
            <button @click="update">修改</button>
            <span v-if="isShowError">修改失败</span>
        </div>       
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    import userStore from '../store/userStore'
    const user = userStore()
    const isShowError = ref(false)


    function update(){
        if(user.username === '' || user.password === ''){
            isShowError.value = true
            return
        }
        user.setData()
    }

</script>
<style scoped>
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    input{
        margin-top:20px;
        width: 300px;
        height: 40px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding-left: 10px;
    }
    button{
        width: 300px;
        height: 40px;
        background-color: #333;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>