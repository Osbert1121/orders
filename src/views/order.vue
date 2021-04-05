<template>
    <div class="order">
       <div class="sky">
            <img style="display: block;width: 100%;max-width: 40px;border: 1px solid #b2b1b0;border-radius: 50%;" src="@/img/default-profile.png">
            <Button type="text" @click="logout">登出</Button>
       </div>
       <Row>
           <Col span="4">
                <Menu>
                    <Submenu name="1">
                        <template slot="title">
                            訂單管理
                        </template>
                        <MenuItem name="1-1" :to="{name: 'query'}">訂單查詢</MenuItem>
                        <MenuItem name="1-2" :to="{name: 'addorder'}">新增訂單</MenuItem>
                    </Submenu>
                </Menu>
           </Col>
           <Col span="20">
                <router-view/>
           </Col>
       </Row>
    </div>
</template>

<script>

export default {
    name: 'order',
    data() {
        return {
            loading: false
        }
    },
    computed: {
       
    },
    created: function() {
    },
    methods: {
        logout: function() {
            this.$store.dispatch('logout')
            this.$router.push({ name: 'login'})
        }
    }
}
</script>
<style scoped>
.sky{
    height: 60px;
    width: 100%;
    margin-bottom: 20px;
    border-bottom: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 16px;
}
</style>
