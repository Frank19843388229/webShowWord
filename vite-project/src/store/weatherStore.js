import axios from 'axios'
import { defineStore } from 'pinia'

export default defineStore('weather', {
    state() {
        return {
            data: {},
            lat: null,  // 初始化为null，将由地理位置API填充
            lon: null,  // 初始化为null，将由地理位置API填充
            isLoading: false,
            error: null
        }
    },
    actions: {
        // 获取用户地理位置
        async getUserLocation() {
            // 检查浏览器是否支持地理位置API
            if (!navigator.geolocation) {
                this.error = "您的浏览器不支持地理位置服务"
                return false
            }

            this.isLoading = true
            this.error = null

            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    // 成功回调
                    (position) => {
                        this.lat = position.coords.latitude
                        this.lon = position.coords.longitude
                        this.isLoading = false
                        resolve(true)
                    },
                    // 失败回调
                    (error) => {
                        this.isLoading = false
                        switch(error.code) {
                            case error.PERMISSION_DENIED:
                                this.error = "您拒绝了位置请求，请允许位置权限以获取当地天气"
                                break
                            case error.POSITION_UNAVAILABLE:
                                this.error = "位置信息不可用"
                                break
                            case error.TIMEOUT:
                                this.error = "获取位置超时"
                                break
                            case error.UNKNOWN_ERROR:
                                this.error = "发生未知错误"
                                break
                        }
                        reject(this.error)
                    },
                    // 选项：设置超时和最高精度
                    {
                        timeout: 10000,  // 10秒超时
                        maximumAge: 0,   // 不使用缓存位置
                        enableHighAccuracy: false  // 不要求高精度，更快获取
                    }
                )
            })
        },

        // 获取天气数据，先确保有地理位置
        async getWeather() {
            // 如果还没有经纬度，先获取地理位置
            if (!this.lat || !this.lon) {
                try {
                    await this.getUserLocation()
                } catch (err) {
                    console.log("无法获取地理位置，使用默认位置", err)
                    // 如果获取失败，使用默认位置
                    this.lat = 39.9037
                    this.lon = 116.3915
                }
            }

            try {
                this.isLoading = true
                const response = await axios.get(`http://124.220.49.230/api/tianqi/tqybjw.php?id=10007480&key=77a29a5200bac7519f40568c6714ed51&lat=${this.lat}&lon=${this.lon}`)
                this.data = response.data
                this.error = null
            } catch (err) {
                this.error = "获取天气数据失败"
                console.log(err)
            } finally {
                this.isLoading = false
            }
        }
    }
})
