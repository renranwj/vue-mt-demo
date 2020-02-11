<template>
    <div class="nav">
        <router-link class="nav-item" to="/goods">
            点餐
            <i class="line"></i>
        </router-link>
        <router-link class="nav-item" to="/ratings">
            评价({{commentNum}})
            <i class="line"></i>
        </router-link>
        <router-link class="nav-item" to="/seller">
            商家
            <i class="line"></i>
        </router-link>
    </div>
</template>

<script>
    export default {
        props: {
            commentNum: {
                type: Number
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .nav {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e4e4e4;
    }

    .nav-item {
        flex: 1;
        text-align: center;
        font-size: 13px;
        text-decoration: none;
        color: #666;
        position: relative;
        font-weight: 400;
    }

    /* 选中的样式 */
    .nav .active {
        color: #ffbb22;
    }

    .nav .active .line {
        display: inline-block;
        width: 20px;
        height: 2px;
        background: #ffbb22;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }
</style>