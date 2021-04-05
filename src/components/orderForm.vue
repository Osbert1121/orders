<template>
    <div class="orderForm">
        <Form :label-width="80" ref="addOrderForm" :model="item" :rules="addOrderRule">
            <FormItem class="ItemPadding" prop="name" label="商品名稱">
                <Input v-model="item.name"></Input>
            </FormItem>
            <FormItem class="ItemPadding" prop="logo" label="圖片連結">
                <Input v-model="item.logo" ></Input>
            </FormItem>
            <FormItem class="ItemPadding" prop="code" label="訂單狀態">
                <Select v-model="item.code" >
                    <Option value="1">處理中</Option>
                    <Option value="2">已成立</Option>
                    <Option value="3">已取消</Option>
                    <Option value="4">已送達</Option>
                </Select>
            </FormItem>
        </Form>
    </div>
</template>

<script>

export default {
    name: 'orderForm',
    props: {
        item: {
            type: Object,
            default: function () {
                return {  
                    name: '',
                    logo: '',
                    code: ''
                }
            }
        }
    },
    data() {
        return {
            addOrderRule:{
                name: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                logo: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '必填', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
       
    },
    created: function() {

    },
    methods: {
        validForm () {
            this.$refs['addOrderForm'].validate((valid) => {
                this.$emit('validFlag', valid)
            })
        }        
    }
}
</script>
<style scoped>
    .orderForm{
        width: 100%;
        max-width: 350px;
        border: 1px solid #c5c8ce;
        padding: 12px;
        border-radius: 5px;
        margin: 5px;
    }
    .ItemPadding {
        padding: 0 12px;
        margin-bottom: 18px;
    }
</style>