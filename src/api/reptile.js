import axios from 'axios'

//let  base='http://localhost:9090';
let base= 'http://106.12.103.25:9090'

// 访问数
export const visitAdd=function () {
    var today = new Date();
    var month = (today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1);
    var day = today.getDate() > 9 ? today.getDate() : "0" + today.getDate();
    var todayId = today.getFullYear() + "" + month + day;
    var url = `${base}/home/add/${todayId}`;
    axios.get(url).then(function () {
        sessionStorage.setItem('id',todayId);
    })
}

// 注册
export const regist = (fields)=>{
    return new Promise((resolve,reject)=>{
        let url = `${base}/home/adduser`;
        axios.post(
            url,
            fields
        ).then(function (res) {
            resolve(res)
        }).catch(function (err) {
            reject(err)
        })
    })
}

// 查询信息
export const queryUser = (fields)=>{
    return new Promise((resolve,reject)=>{
        let url = `${base}/home/queryuser`;
        axios.post(
            url,
            fields
        ).then(function (res) {
            resolve(res)
        }).catch(function (err) {
            reject(err)
        })
    })
}


// 充值
export const recharge = (fields)=>{
    return new Promise((resolve,reject)=>{
        let url = `${base}/home/recharge`;
        axios.post(
            url,
            fields
        ).then(function (res) {
            resolve(res)
        }).catch(function (err) {
            reject(err)
        })
    })
}

//登录
export const login = (fields)=>{
    return new Promise((resolve,reject)=>{
        let url = `${base}/home/login`;
        axios.post(
            url,
            fields
        ).then(function (res) {
            resolve(res)
        }).catch(function (err) {
            reject(err)
        })
    })
}