<template>
    <div class="container_onb">
        <div class="wrap_section">
            <div class="start_section">
                <h1 class="heading">Keep track of your subscriptions</h1>
                <p class="subHeading">Get insights in your fixed costs. Manage your subscriptions and get notified when
                    a bill is due.</p>
                <div class="wrap_links">
                    <router-link to="/login">
                        <ButtonComp class="btn_lg" type="primary" :hasIcon="false" icon="" :hasLabel="true"
                            label="Accedi" />
                    </router-link>
                    <router-link to="/register">
                        <ButtonComp class="btn_lg" type="primary" :hasIcon="false" icon="" :hasLabel="true"
                            label="Registrati ora" />
                    </router-link>
                </div>
                <ul class="footer_nav">
                    <li class="footer_item">
                        <a class="footer_link" href="#" target="_blank">Changelog</a>
                    </li>
                    <li class="footer_item">
                        <a class="footer_link" href="#" target="_blank">Support</a>
                    </li>
                    <li class="footer_item">
                        <a class="footer_link" href="#" target="_blank">Press</a>
                    </li>
                    <li class="footer_item">
                        <a class="footer_link" href="#" target="_blank">Legal</a>
                    </li>
                </ul>
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
    name: "LandingPage",
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
    position: relative;
    width: 40%;
    padding: 64px 40px;
    display: flex;
    flex-direction: column;
}

.heading {
    color: rgba(34, 34, 34, 1);
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 8px;
}

.subHeading {
    color: rgb(49, 49, 49);
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

.wrap_links a{
    width: 100%;
}

.footer_nav {
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
}

.footer_nav .footer_item {
    cursor: pointer;
}

.footer_nav .footer_item .footer_link {
    color: rgba(34, 34, 34, 1);
    font-size: .9rem;
    font-weight: 500;
    opacity: .5;
    transition: opacity 150ms ease;
}

.footer_nav .footer_item:hover .footer_link {
    opacity: 1;
}

.start_section,
.end_section {
    position: relative;
    z-index: 1;
    height: 100%;
}

.end_section {
    background-color: rgb(225, 225, 225);
    width: 60%;
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

    .end_section {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
    }

    .pattern_services {
        opacity: .2;
    }
}
</style>