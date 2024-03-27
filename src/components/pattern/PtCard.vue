<template>
    <div class="card_service" :style="{ backgroundColor: ptInfoCard.bgColor }">
        <div class="left_cd">
            <div class="wrap_logo_sv">
                <img class="logo_sv" :src="ptInfoCard?.logo" :alt="ptInfoCard?.name">
            </div>
            <span class="name_sv" :style="{ color: ptInfoCard.color }">{{ ptInfoCard.name }}</span>
        </div>
        <div class="right_cd">
            <span class="price_sv" :style="{ color: ptInfoCard.color }">{{ ptInfoCard?.price }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "PtCard",
    props: {
        ptInfoCard: Object
    }
}
</script>

<style scoped>
.card_service{
    background-color: white;
    position: relative;
    width: 100%;
    height: 65px;
    max-width: 400px;
    min-width: 350px;
    max-height: 65px;
    border-radius: 8px;
    padding: 20px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.left_cd,
.right_cd {
    height: 100%;
    display: flex;
    gap: 1rem;
    align-items: center;
}

.wrap_logo_sv{
    height: 32px;
    width: auto;
    aspect-ratio: 1;
}

.wrap_logo_sv .logo_sv{
    height: 100%;
    width: 100%;
    object-fit: contain;
}

.name_sv{
    color: black;
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
}

.price_sv{
    color: black;
    font-size: 1rem;
    font-weight: 500;
}
</style>