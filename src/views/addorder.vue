<template>
    <div class="addorder">
        <Button @click="addOrder()">增加訂單</Button>
        <Button style="margin-left: 6px;" @click="sendOrder()">送出訂單</Button>
        <div style="display: flex;flex-wrap: wrap;">
            <OrderForm :ref="'child'+index" :item="item" v-for="(item, index) in data" :key="index" @validFlag="checkValid" />       
        </div>
    </div>
</template>

<script>
import OrderForm from '@/components/orderForm.vue'
export default {
    name: 'addorder',
    components:{
        OrderForm
    },
    data() {
        return {
           data: [
                { 
                    name: '',
                    logo: '',
                    code: ''
                }
           ],
           errorCount: 0
        }
    },
    computed: {
       
    },
    created: function() {
    },
    methods: {
        addOrder: function() {
            this.data.push({
                name: '',
                logo: '',
                code: ''
            })
        },
        checkValid: function(flag){
            this.errorCount = 0
            if(!flag){
                this.errorCount++
            }
        },
        sendOrder: function(){
            let length = this.data.length
            if(length > 0){
                for(let i = 0; i < length; i++){
                    let name = 'child'+i
                    this.$refs[name][0].validForm()
                }
                if(this.errorCount == 0){
                    this.$Spin.show()
                    this.$store.dispatch('addOrders', this.data).then( ()=>{
                        this.data = [
                            { 
                                name: '',
                                logo: '',
                                code: ''
                            }
                        ]
                        this.errorCount = 0
                    }).finally(()=>{
                        this.$Spin.hide()
                    })
                }
            }
        }
    }
}
</script>
<style scoped>

</style>
