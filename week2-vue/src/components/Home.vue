<script setup>



</script>

<template>
    <div class="home">
        <h1 class="main-heading">Every essentials, <br> simply better
        </h1>
        <h2 class="sub-heading">Discover Products for your everyday life</h2>
        <RouterLink class="products-btn" to="/products">Explore Products</RouterLink>
    </div>

</template>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    height: 80vh;
}

.main-heading {
    letter-spacing: 4px;
    text-align: center;
    font-size: 60px;
    font-weight: 900;
}

.sub-heading {
    font-size: 20px;
    letter-spacing: 4px;
    font-weight: 500;
    color: #5B6A83;
}

.products-btn {
    text-decoration: none;
    background-color: #208255;
    color: #FEFEFE;
    font-weight: 700;
    width: 200px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.products-btn:hover {
    background-color: #6d6464;
}
</style>
