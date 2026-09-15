<script setup>


</script>

<template>
    <header class="header">
       <nav class="menu">
            <RouterLink class="menu-link" to="/">Home</RouterLink>
            <RouterLink class="menu-link" to="/products">Products</RouterLink>
       </nav> 
    </header>
</template>

<style scoped>
    .header {
        background-color: #e0e0e0;
        height: 10vh;
    }

    .menu {
        display: flex;
        gap: 20px;
        justify-content: center;
        font-size: 32px;
        padding: 20px 0 20px 0;
    }

    .menu-link {
        text-decoration: none;
        color: #242424;
        font-weight: 700;
    }

    .menu-link:hover {
        color: #208255;
        cursor: pointer;
    }



</style>
