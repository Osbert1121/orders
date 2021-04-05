<template>
    <div class="query">
        <Row>
            <Col span="4">
                <Select clearable v-model="type" style="width:200px">
                    <Option value="working">進行中</Option>
                    <Option value="finish">已完成</Option>
                </Select>
            </Col>
            <Col span="20">
                <Button style="margin-bottom: 20px;" :disabled="cancelIDs.length == 0" @click="decideCancel()">取消以下勾選訂單</Button>
                <div v-if="type == 'working' || !type" class="order">
                    <div class="title">
                        <span>進行中</span>
                    </div>
                    <div class="detail">
                        <Box v-for="(item,index) in filterOrderList.working" :key="index"
                            :item = item
                            @cancelOrderID="cancelOrder"
                        />
                    </div>
                </div>
                <div v-if="type == 'finish' || !type" class="order">
                    <div class="title">
                        <span>已完成</span>
                    </div>
                    <div class="detail">
                        <Box v-for="(item,index) in filterOrderList.finish" :key="index"
                            :item = item
                            @cancelOrderID="cancelOrder"
                        />
                    </div>
                </div>   
            </Col>
        </Row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Box from '@/components/box.vue'
export default {
    name: 'query',
    components:{
        Box
    },
    data() {
        return {
            type: '',
            workingSwitch: [],
            finishSwitch: [],
            cancelIDs: []
        }
    },
    computed: {
        ...mapGetters({
            orders: 'getVuexOrders'
        }),
        filterOrderList: function() {
            let res = []
            if(this.orders) {
                let working = this.orders.filter( (item) => {
                    return item.status.code == 1 || item.status.code == 2
                })
                working.sort(function(a, b) {
                    return a.data > b.data ? -1 : 1;
                });

                let finish = this.orders.filter( (item) => {
                    return item.status.code == 3 || item.status.code == 4
                })

                finish.sort(function(a, b) {
                    return a.data > b.data ? -1 : 1;
                });

                res = {
                    working: working,
                    finish: finish
                }
            }
            return res
        }
    },
    created: function() {
        this.init()
    },
    methods: {
        init: function() {
            this.$store.dispatch('getOrders')
        },
        openSetting: function(type, index){
            switch (type) {
                case 'working':
                    if(this.workingSwitch.indexOf(index) >= 0){
                        this.workingSwitch.splice(this.workingSwitch.indexOf(index), 1)
                    } else {
                        this.workingSwitch.push(index)
                    }
                    break;
            
                case 'finish':
                    if(this.finishSwitch.indexOf(index) >= 0){
                        this.finishSwitch.splice(this.finishSwitch.indexOf(index), 1)
                    } else {
                        this.finishSwitch.push(index)
                    }
                    break;
            }
        },
        cancelOrder: function(id){
            if(this.cancelIDs.indexOf(id) >= 0){
                this.cancelIDs.splice(this.cancelIDs.indexOf(id), 1)
            } else {
                this.cancelIDs.push(id)
            }
        },
        decideCancel: function(){
            this.$Spin.show()
            this.$store.dispatch('cancelOrder', this.cancelIDs).then( ()=>{
                this.cancelIDs = []
            }).finally(()=>{
                this.$Spin.hide()
            })
        }
    }
}
</script>
<style scoped>
.order{
    border: 1px solid #c5c8ce;
    max-height: 500px;
    width: 100%;
    max-width: 560px;
    overflow: auto;
}
.order .title{    
    padding: 6px 12px;
    font-weight: 700;
    border-bottom: 1px solid #c5c8ce;
    background-color: #f2f2f2;
}
.order .title span{
    border-left: 3px solid #19be6b;
    margin-left: 9px;
    padding: 3px 6px;
}
</style>
