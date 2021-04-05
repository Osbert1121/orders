<template>
    <div>
        <div class="box">
            <div class="logo" :class="{finish: isFinshOrder}">
                <img :src="item.logo">
            </div>
            <div class="cont">
                <div class="type" :class="isFinshOrder ? 'finish' : 'ing'">{{ item.status.type}}</div>
                <div class="date"> <span v-if="!isFinshOrder">出貨時間: {{item.date}}</span></div>
                <div class="name">{{ item.name}}</div>
            </div>
            <div class="icon">
                <Button v-if="!isFinshOrder" @click="switchBtn()" icon="ios-arrow-forward" />
            </div>
            <div v-show="cancelBtn">
                <Checkbox style="width: 150px;text-align: center;" @on-change="cancelOrderID(item.id)">取消</Checkbox>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'box',
    props: ["item"],
    data() {
        return {
            cancelBtn: false
        }
    },
    computed: {
       isFinshOrder: function(){
           let flag = false
           if(this.item.status.code == 3 || this.item.status.code == 4) {
               flag = true
           }
           return flag
       }
    },
    created: function() {

    },
    methods: {
        switchBtn: function(){
            this.cancelBtn = !this.cancelBtn
        },
        cancelOrderID: function(id){
            this.$emit('cancelOrderID', id)
        }
    }
}
</script>
<style scoped>
.box {
    display: flex;
    align-items: center;
    padding: 12px 0;
    justify-content: space-around;
    flex-wrap: wrap;
    border-bottom: 1px solid #c5c8ce;
}
.box .logo img{
    display: block;
    width: 100%;
    max-width: 80px;
}
.box .logo.finish img{
    -webkit-filter:grayscale(1);
}
.box .cont{
    display: block;
    width: 100%;
    max-width: 370px;
}
.box .cont .type{
    width:30%;
    display:inline-block;
    font-weight: 600;
    font-size: 15px;
}
.box .cont .type.ing{
    color: #45ca87;
}
.box .cont .type.finish{
    color: #333;
}
.box .cont .date{
    width:70%;
    display:inline-block;
}
</style>