import axios from 'axios';
import { defineStore } from 'pinia'
import { send } from 'vite';
export default defineStore('user', {
    state: () => ({
        username: '',
        password: '',
    }),
    actions: {
        // 添加参数，接收实际的值
        setData(username, password) {
            this.username = username;
            this.password = password;
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        },
        sendData() {
            axios.post('http://127.0.0.1:5000/login', {
                username: this.username,
                password: this.password
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        },   
        // 添加清除数据的方法
        clearData() {
            this.username = '';
            this.password = '';
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }
    }
})