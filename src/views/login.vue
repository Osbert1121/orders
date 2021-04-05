<template>
    <div class="home">
        <div class="box">
            <span class="title ">{{ '登入' }}</span>

            <Form ref="loginForm" :model="loginForm" :rules="loginRule" class="loginform" @keydown.enter.native="loginSubmit('loginForm')">
                <FormItem class="ItemPadding" prop="loginId" style="text-align: left;margin-bottom: 5px;">
                    <Input v-model="loginForm.loginId" placeholder="輸入帳號"></Input>
                </FormItem>
                <FormItem class="ItemPadding" prop="password" style="text-align: left;margin-bottom: 10px;">
                    <Input password type="password" v-model="loginForm.password" placeholder="輸入密碼" ></Input>
                </FormItem>
                <FormItem class="ItemPadding" style="text-align: right;">
                    <Button :loading="loading" type="primary" style="width: 100px;font-size: 14px;margin-top: 20px;" @click="loginSubmit('loginForm')">{{'登入' }}</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import { jsFn } from '@/utils/js-fn'

export default {
    name: 'home',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('必填'))
            } else if (!jsFn.isEmail(value)) {
                callback(new Error('Email 格式錯誤'))
            } else {
                callback()
            }
        }
        const validatePasswordCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('必填'))
            } else if (!jsFn.isDigit(value)) {
                callback(new Error('只能輸入數字'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                loginId: '',
                password: ''
            },
            loginRule: {
                loginId: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                password: [
                        { validator: validatePasswordCheck, trigger: 'blur' }
                    ]
            },
            loading: false
        }
    },
    created: function() {
    },
    methods: {
        // 登入檢查
        loginSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Spin.show() // 開啟加載畫面
                    this.loading = true
                    this.$store.dispatch('login', {
                        id: this.loginForm.loginId,
                        pass: this.loginForm.password
                    }).then(res => {
                        this.$store.dispatch('loginState', res)
                        this.$router.push({ name: 'order'})
                    }).catch((e) => {
                        let str = '帳號或密碼錯誤'
                        switch (e.error) {
                            case 10001:
                                str = '尚未註冊'
                                break
                        }
                        this.$Message.warning({
                            content: str,
                            duration: 5,
                            closable: true
                        })
                    }).finally(() => {
                        this.loading = false
                        this.$Spin.hide()
                    })
                }
            })
        }        
    },
    mounted() {
    }
}
</script>
<style>
.box .ivu-form-item-error-tip{
    position: relative!important;
}
</style>
<style scoped>
    .home{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        padding: 0 15px;
    }

    .box {
        margin-top: 100px;
        border: 1px solid #333;
        width: 100%;
        max-width: 380px;
        max-height: 270px;
        border-radius: 15px;
    }

    /* @media only screen and (min-width: 767px) {
        .loginform {
            width: 360px;
        }
    }

    @media only screen and (max-width: 767px) {
        .home {
            margin-top: 0;
        }
    } */

    .box .title {
        font-size: 16px;
        width: 100%;
        background: #c5c8ce;
        display: block;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        padding: 5px 16px;
    }

    .box .loginform {
        margin-top: 25px;        
    }

    .ItemPadding {
        padding: 0 12px;
        margin-bottom: 18px;
    }
</style>
