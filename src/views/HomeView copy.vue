<template>
    <HeaderComp />

    <div style="margin-top: 9rem;">
        <div style="margin-bottom: 4rem;">
            {{ getUser?.name }} ha questo servizi
            <div v-for="(elem, index) in userServices" :key="index">
                <span>{{ elem.name }}</span>
            </div>
        </div>

        <div>
            <select name="" id="" style="margin-bottom: 1rem;" v-model="serviceSelectCreator">
                <option v-for="(service, index) in services" :key="index" :value="service.uuid">{{ service.name }}</option>
            </select>
        </div>
        <form @submit.prevent>
            <input type="text" placeholder="description" v-model="dataCreateService.description">
            <input type="date" placeholder="Start date" v-model="dataCreateService.start_date">
            <input type="date" placeholder="End date" v-model="dataCreateService.end_date">
            <input type="text" placeholder="price" v-model="dataCreateService.bill">
            <select name="billing_cycle" id="" v-model="dataCreateService.billing_cycle">
                <option value="day">day</option>
                <option value="month">Mese</option>
                <option value="year">Anno</option>
            </select>
            <select name="currency" id="" v-model="dataCreateService.currency">
                <option value="€">€</option>
                <option value="$">$</option>
            </select>
            <button type="submit" @click="fetchAddSub">Aggiungi abbonamento</button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

import HeaderComp from '../components/global/HeaderComp.vue';

export default {
    name: "HomeView",
    components: {
        HeaderComp
    },
    data() {
        return {
            userServices: [],
            services: [],

            serviceSelectCreator: "",

            dataCreateService: {
                description: "",
                start_date: "",
                billing_cycle: "month",
                end_date: "",
                bill: "0.00",
                currency: "€",
            }
        }
    },
    computed: {
        // Usa mapGetters per ottenere lo stato dell'utente dallo store
        ...mapGetters(['getUser', 'isAuthenticated']),

        isAuthenticated() {
            return this.getUser !== null;
        },

        formattedStartDate() {
            // Check if dateValue is not empty
            if (this.dataCreateService.start_date) {
                const [year, month, day] = this.dataCreateService.start_date.split('-');

                return `${day}-${month}-${year}`;
            }
            return '';
        },
        formattedEndDate() {
            // Check if dateValue is not empty
            if (this.dataCreateService.end_date) {
                const [year, month, day] = this.dataCreateService.end_date.split('-');

                return `${day}-${month}-${year}`;
            }
            return '';
        },
    },
    methods: {
        async fetchUserServices() {
            try {
                const res = await axios.get('http://localhost:8000/api/user-services', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.getUser?.token}`
                    },
                });

                this.userServices = res.data;
            } catch (e) {
                console.error(e);
            }
        },
        async fetchServices() {
            try {
                // Effettua una richiesta API al tuo backend Laravel per la registrazione
                const res = await axios.get('http://localhost:8000/api/services', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                this.services = res.data;
            } catch (e) {
                console.error(e);
            }
        },
        async fetchAddSub() {
            try {
                const tokenAUTH = this.getUser?.token;

                // Effettua una richiesta API al tuo backend Laravel per la registrazione
                const res = await fetch(`http://localhost:8000/api/subscriptions/service/${this.serviceSelectCreator}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${tokenAUTH}`
                    },
                    body: JSON.stringify({
                        description: this.dataCreateService.description,
                        start_date: this.formattedStartDate,
                        billing_cycle: this.dataCreateService.billing_cycle,
                        end_date: this.formattedEndDate,
                        bill: this.dataCreateService.bill,
                        currency: this.dataCreateService.currency,
                    }),
                });

                const responseData = await res.json();

                console.log(responseData);
                this.fetchUserServices();
            } catch (e) {
                console.error(e);
            }
        },
    },
    mounted() {
        this.fetchUserServices();
        this.fetchServices();
    }
}
</script>

<style scoped></style>