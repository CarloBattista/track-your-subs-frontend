<template>
    <div class="container_onb">
        <div class="wrap_section">
            <div class="start_section">
                <h1 class="heading">Keep track of your subscriptions</h1>
                <p class="subHeading">Get insights in your fixed costs. Manage your subscriptions and get notified when
                    a bill is due.</p>
                <div class="wrap_links">
                    <ButtonComp class="btn_lg" type="secondary" :hasIcon="false" icon="" :hasLabel="true"
                        label="Accedi" />
                    <ButtonComp class="btn_lg" type="secondary" :hasIcon="false" icon="" :hasLabel="true"
                        label="Registrati ora" />
                </div>
            </div>
            <div class="end_section">
                <div class="pattern_services">
                    <div class="row" v-for="index in 4">
                        <template v-for="cardIndex in 30">
                            <PtCard :ptInfoCard="getRandomPattern()" />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../data/store';

import ButtonComp from '../components/button/ButtonComp.vue';
import PtCard from '../components/pattern/PtCard.vue';

export default {
    name: "HomeView",
    components: {
        ButtonComp,
        PtCard
    },
    data() {
        return {
            store
        }
    },
    methods: {
        getRandomPattern() {
            const randomIndex = Math.floor(Math.random() * this.store.pattern.length);
            return this.store.pattern[randomIndex];
        }
    }
}
</script>

<style scoped>
.container_onb {
    width: 100%;
    height: 100vh;
}

.wrap_section {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.start_section {
    padding: 64px 40px;
    display: flex;
    flex-direction: column;
}

.heading {
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 8px;
}

.subHeading {
    color: #aab0bc;
    font-size: 1rem;
    font-weight: 500;
}

.wrap_links {
    width: 100%;
    height: 50%;
    display: flex;
    gap: 24px;
    align-items: center;
}

.start_section,
.end_section {
    width: 50%;
    height: 100%;
}

.end_section {
    overflow: hidden;
}

.pattern_services {
    width: 100%;
    display: flex;
    gap: 16px;
    flex-direction: row;
    flex-wrap: nowrap;
    transform: rotate(16deg) scale(0.8) translate(-550px, -400px);
}

.pattern_services .row {
    display: flex;
    gap: 24px;
    flex-direction: column;
}

.pattern_services .row:nth-child(1) {
    animation: loopSlide 40s linear 0s infinite forwards;
}

.pattern_services .row:nth-child(2) {
    animation: loopSlide 55s linear 0s infinite forwards;
}

.pattern_services .row:nth-child(3) {
    animation: loopSlide 35s linear 0s infinite forwards;
}

.pattern_services .row:nth-child(4) {
    animation: loopSlide 65s linear 0s infinite forwards;
}


@keyframes loopSlide {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-50%)
    }
}

/* Media Query's */
@media only screen and (max-width: 960px) {
    .container_onb {
        height: auto;
    }

    .wrap_section {
        flex-direction: column;
    }

    .start_section,
    .end_section {
        width: 100%;
        height: 100vh;
    }

    .heading {
        font-size: 1.5rem;
    }

    .subHeading {
        font-size: .8rem;
    }
}
</style>