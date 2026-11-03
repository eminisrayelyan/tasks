<script setup>


</script>

<template>
    <footer class="footer">
        <div class="copyright">&copy; 2026</div>
        <div class="menu">
            <a class="menu-link" href="#">About</a>
            <a class="menu-link" href="#">Contact</a>
        </div>
    </footer>
</template>

<style scoped>
    .footer {
        background-color: #e0e0e0;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        height: 10vh;
    }

    .menu {
        display: flex;
        gap: 20px;
    }

    .copyright {
        font-weight: 600;   
        font-size: 20px;
    }

    .menu-link {
       text-decoration: none;
       color: #242424;
       font-weight: 600;
       font-size: 20px;
    }

    .menu-link:hover {
        color: #208255;
    }


</style>
