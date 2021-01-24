//let nodeApiIp = 'http://106.12.103.25:8000'
let nodeApiIp = 'http://127.0.0.1:8000'
import axios from 'axios'

// 查询账号时间

  function getTime(id){
    return axios.get(`${nodeApiIp}/searchGoods?goodsId=${id}`)
  }

// 执行购买操作

 function submitBuy(params) {
     return axios.post(`${nodeApiIp}/commitBuyService`,params)
 }

// 执行充值操作

function recharge(params) {
    return axios.post(`${nodeApiIp}/recharge`,params)
}

  export {getTime,submitBuy,recharge}