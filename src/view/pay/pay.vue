<template>
    <div style="margin-top: 30px">
        <div style="width: 980px;margin: 0 auto">
            <div style="display: flex;justify-content: space-around">
                <img :src="pay" width="240px"/>
                <img :src="payResult" width="240px"/>
            </div>
            <div>
                <p>
                    第一步，扫码支付，15元，天卡，30元，周卡，60元，月卡。
                </p>
                <p>
                    第二步，获取转账单号的最后六位数，就是相应的卡密，大概五分钟后，输入此卡密即可充值。
                </p>
                <p>
                     提示：购卡需谨慎，非常热门，关注度很高的不保证100%抢购到，建议先阅读帮助，了解。
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import pay from './../../assets/img/pay.jpg'
    import result from './../../assets/img/payResult.png'
    export default {
        name: "pay",
        data(){
            return{
                pay:pay,
                payResult:result
            }
        }
    }
</script>

<style scoped>

</style>