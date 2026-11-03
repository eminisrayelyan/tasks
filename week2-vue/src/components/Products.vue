<script setup>
import { onMounted, ref } from 'vue';

const products = ref([]);

async function fetchData() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        products.value = data.products;
        console.log(data.products)


    } catch (err) {
        alert(`Something went wrong ${err}`);
    }
}

onMounted(fetchData)
</script>

<template>
    <div class="home">
         <h2 class="main-heading">Our Products</h2>
         <h3 class="sub-heading">Explor Our Latest Collection</h3>
    </div>
       
    <div class="products">
        <div v-for="product in products" :key="product.id" class="product">
            <div class="image-wrapper">
                <img :src='product.images[0]' :alt="product.title" class="product-image">
            </div>

            <div class="product-info">
                <p>{{ product.category }}</p>
                <h3>{{ product.title }}</h3>
                <h3>{{ Math.trunc(product.price) }} $</h3>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 30px;
}

.main-heading {
    letter-spacing: 4px;
    text-align: center;
    font-size: 40px;
    font-weight: 800;
}

.sub-heading {
    font-size: 20px;
    letter-spacing: 4px;
    font-weight: 500;
    color: #5B6A83;
}

.products {
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
}

.product {
    width: 300px;
    height: 500px;
    border: 2px solid #F2F4F5;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.image-wrapper {
    background-color: #E5E5E6;
    width: 100%;
    height: 80%;
}

.product-image {
    width: 100%;
    height: 100%;
}

.product-info {
    width: 100%;
    padding: 20px;
    background-color: #FEFEFE;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>