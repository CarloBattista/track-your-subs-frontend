<template>
    <div class="header">
        <div class="start_region"></div>
        <div class="end_region">
            <router-link to="/login">Accedi</router-link>
            <router-link to="/register">Registrati ora</router-link>
        </div>
    </div>
</template>

<script>
import ButtonComp from '../button/ButtonComp.vue';

export default {
    name: "HeaderComp",
    components: {
        ButtonComp
    }
}
</script>

<style scoped>
.header {
    position: fixed;
    z-index: 500;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    max-height: 80px;
    padding: 0 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: inset 0 -1px 0 #1b1b1b;
    background-color: #0A0A0A;
}

.start_region {
    justify-content: flex-start;
}

.end_region {
    justify-content: flex-end;
}

.start_region,
.end_region {
    height: 100%;
    display: flex;
    gap: 24px;
    align-items: center;
}

/* Media Query's */
@media only screen and (max-width: 980px) {
    .header {
        height: 56px;
        padding: 0 3%;
    }
}
</style>