<template>
    <div class="card_service" :style="{ backgroundColor: serviceSelect.bgColorCard }">
        <div class="left_cd">
            <div class="wrap_logo_sv" :class="{ notLogo: !serviceSelect.logo }">
                <img class="logo_sv" :src="serviceSelect.logo" :alt="serviceSelect.name" v-if="serviceSelect.logo">
            </div>
            <span class="name_sv" :style="{ color: contrastTextColor(serviceSelect.bgColorCard) }">{{ serviceSelect.name
                }}</span>
        </div>
        <div class="right_cd">
            <span class="price_sv" :style="{ color: contrastTextColor(serviceSelect.bgColorCard) }">{{
        dataCreateService.currency }}{{ dataCreateService.bill }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "ServiceCard",
    props: {
        serviceSelect: Object,
        dataCreateService: Object
    },
    methods: {
        contrastTextColor(backgroundColor) {
            if (!backgroundColor) return ''; // Assicurati che backgroundColor sia definito

            const rgb = parseInt(backgroundColor.slice(1), 16);
            const r = (rgb >> 16) & 0xff;
            const g = (rgb >> 8) & 0xff;
            const b = (rgb >> 0) & 0xff;
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            return luminance > 0.5 ? '#000000' : '#ffffff';
        }

    }
}
</script>

<style scoped>
.card_service {
    background-color: red;
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

.wrap_logo_sv {
    height: 32px;
    width: auto;
    aspect-ratio: 1;
    border-radius: 8px;
}

.wrap_logo_sv.notLogo {
    border: 1px dashed black;
}

.wrap_logo_sv .logo_sv {
    height: 100%;
    width: 100%;
    object-fit: contain;
}

.name_sv {
    color: white;
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
}

.price_sv {
    color: white;
    font-size: 1rem;
    font-weight: 500;
}
</style>