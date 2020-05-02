let nodeApiIp = 'http://106.12.103.25:8000'

import axios from 'axios'

// 查询账号时间

  function getTime(id){
    return axios.get(`${nodeApiIp}/searchGoods?goodsId=${id}`)
  }

// 执行购买操作

 function submitBuy(params) {
     return axios.post(`${nodeApiIp}/commitBuyService`,params)
 }

  export {getTime,submitBuy}