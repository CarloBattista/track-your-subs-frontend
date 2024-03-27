<template>
    <div class="btn" :class="{ primary: type === 'primary', secondary: type === 'secondary' }">
        <div class="wrap_icon" v-if="hasIcon">
            <i :class="icon"></i>
        </div>
        <span class="label" v-if="hasLabel && label.length >= 1">{{ label }}</span>
    </div>
</template>

<script>
export default {
    name: "ButtonComp",
    props: {
        type: String,
        hasIcon: Boolean,
        icon: String,
        hasLabel: Boolean,
        label: String,
    }
}
</script>

<style scoped>
.btn {
    position: relative;
    max-height: 44px;
    padding: 10px 16px;
    border-radius: 8px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition-property: background-color, transform;
    transition-duration: 100ms;
    transition-timing-function: ease;
}

.btn.btn_lg{
    width: 100%;
}

.btn::before{
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 8px;
    outline-offset: 2px;
    outline-width: 2px;
    outline-color: black;
    outline-style: solid;
    display: none;
}

.btn .label{
    font-size: 1rem;
    font-weight: 500;
}

.btn:active {
    transform: scale(.95);
}

.btn.primary{
    background-color: black;
}

.btn.primary:hover {
    background-color: rgba(0, 0, 0, .5);
}

.btn.primary .wrap_icon i,
.btn.primary .label{
    color: white;
}

.btn.secondary{
    background-color: white;
}

.btn.secondary:hover {
    background-color: rgba(255, 255, 255, .5);
}

.btn.secondary .wrap_icon i,
.btn.secondary .label{
    color: black;
}
</style>