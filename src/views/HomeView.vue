<template>
    <HeaderComp />
    <div class="container_hv">
        <div class="wrap_ch">
            <div class="section_start">
                <div class="card_profile">
                    <div class="user">
                        <div class="dot_user">
                            <span>{{ this.getUser?.name.charAt(0) }}</span>
                        </div>
                        <span class="name_profile">{{ this.getUser?.name }}</span>
                    </div>
                    <div class="row_container">
                        <div class="row">
                            <div class="head_row">Utente dal:</div>
                            <div class="body_row">{{ formattedCreatedAt }}</div>
                        </div>
                        <div class="row" v-if="numberOfActiveSubscriptions >= 1">
                            <div class="head_row">
                                <span class="body_row">{{ numberOfActiveSubscriptions }}</span>
                                <span v-if="numberOfActiveSubscriptions === 1"> Abbonamento attivo</span>
                                <span v-if="numberOfActiveSubscriptions >= 2 || numberOfActiveSubscriptions === 0">
                                    Abbonamenti attivi</span>
                            </div>
                        </div>
                        <div class="row" v-if="numberOfExpiredSubscriptions >= 1">
                            <div class="head_row">
                                <span class="body_row">{{ numberOfExpiredSubscriptions }}</span>
                                <span v-if="numberOfExpiredSubscriptions === 1"> Abbonamento scaduto</span>
                                <span v-if="numberOfExpiredSubscriptions >= 2 || numberOfActiveSubscriptions === 0">
                                    Abbonamenti scaduti</span>
                            </div>
                        </div>
                        <div class="row" v-if="userServices.length >= 1">
                            <div class="head_row">Spese mensili:</div>
                            <div class="body_row">&euro; {{ calculateMonthlyTotal }}</div>
                        </div>
                        <div class="row" v-if="userServices.length >= 1">
                            <div class="head_row">Spese annuali:</div>
                            <div class="body_row">&euro; {{ calculateAnnualTotal }}</div>
                        </div>
                    </div>
                </div>
                <ButtonComp type="primary" :hasIcon="false" icon="" :hasLabel="true" label="Aggiungi abbonamento"
                    @click="handleInAddSub" v-if="!isInCreateSub" />
                <div class="wrap_form_add_sub" v-if="isInCreateSub">
                    <div class="wrap_ct">
                        <ServiceCard type="preview" :bgColorCard="dataCreateService.bgColorCard"
                            :serviceSelect="serviceSelect" :dataCreateService="dataCreateService" />
                    </div>
                    <form @submit.prevent>
                        <div class="wrap_field">
                            <div class="btn_dpd" @click="handleMenuDpd('servicesMenu')">
                                <span class="label_btn">{{ serviceSelect.name }}</span>
                                <i class="ri-arrow-down-s-line"></i>
                                <div class="menu_dpd_btn" :class="{ show: servicesMenuIsOpen }"
                                    v-if="servicesMenuIsOpen">
                                    <div class="row_select" v-for="(serv, index) in services" :key="index"
                                        @click="handleSelectDpd('servicesMenu', serv)">{{ serv.name }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="wrap_field" @focusin="setFocus('description')"
                            @focusout="resetFocus('description')">
                            <input class="input_field" id="descriptionField" type="text"
                                v-model="dataCreateService.description" autocomplete="off">
                            <label class="label_field"
                                :class="{ focussed: isDescriptionFocused || dataCreateService.description }"
                                for="descriptionField">Descrizione</label>
                        </div>
                        <div class="wrap_field" @focusin="setFocus('startDate')" @focusout="resetFocus('startDate')">
                            <input class="input_field" id="startDateField" type="date"
                                v-model="dataCreateService.start_date" @input="updateEndDateOnStartDateChange"
                                autocomplete="off">
                            <label class="label_field"
                                :class="{ focussed: isStartDateFocused || dataCreateService.start_date }"
                                for="startDateField">Prima fattura</label>
                        </div>
                        <div class="wrap_field">
                            <div class="btn_dpd" @click="handleMenuDpd('cycleMenu')">
                                <span class="label_btn">{{ dataCreateService.billing_cycle }}</span>
                                <i class="ri-arrow-down-s-line"></i>
                                <div class="menu_dpd_btn" :class="{ show: cycleMenuIsOpen }" v-if="cycleMenuIsOpen">
                                    <div class="row_select" @click="handleSelectDpd('cycleMenu', 'day')">Giorno</div>
                                    <div class="row_select" @click="handleSelectDpd('cycleMenu', 'month')">Mese</div>
                                    <div class="row_select" @click="handleSelectDpd('cycleMenu', 'year')">Anno</div>
                                </div>
                            </div>
                        </div>
                        <div class="wrap_field" v-if="false" @focusin="setFocus('endDate')"
                            @focusout="resetFocus('endDate')">
                            <input class="input_field" id="endDateField" type="date"
                                v-model="dataCreateService.end_date" autocomplete="off">
                            <label class="label_field"
                                :class="{ focussed: isEndDateFocused || dataCreateService.end_date }"
                                for="endDateField">Termine abbonamento</label>
                        </div>
                        <div class="wrap_field" @focusin="setFocus('bill')" @focusout="resetFocus('bill')">
                            <input class="input_field" id="billField" type="text" v-model="dataCreateService.bill"
                                autocomplete="off">
                            <label class="label_field" :class="{ focussed: isBillFocused || dataCreateService.bill }"
                                for="billField">Prezzo</label>
                        </div>
                        <div class="wrap_field">
                            <div class="btn_dpd" @click="handleMenuDpd('currencyMenu')">
                                <span class="label_btn">{{ dataCreateService.currency }}</span>
                                <i class="ri-arrow-down-s-line"></i>
                                <div class="menu_dpd_btn" :class="{ show: currencyMenuIsOpen }"
                                    v-if="currencyMenuIsOpen">
                                    <div class="row_select" @click="handleSelectDpd('currencyMenu', '€')">€ - EUR</div>
                                    <div class="row_select" @click="handleSelectDpd('currencyMenu', '$')">$ - DOL</div>
                                </div>
                            </div>
                        </div>
                        <div class="wrap_field" v-if="false">
                            <input type="color" v-model="dataCreateService.bgColorCard">
                        </div>
                        <ButtonComp type="primary" :hasIcon="false" icon="" :hasLabel="true"
                            label="Aggiungi abbonamento" @click="fetchAddSub" />
                        <ButtonComp type="tertiary" :hasIcon="false" icon="" :hasLabel="true"
                            label="Non creare un abbonamento" @click="isInCreateSub = false" />
                    </form>
                </div>
                <div class="wrap_service_card on_mob" v-if="!isInCreateSub && userServices.length >= 1">
                    <div class="wrap_head">
                        <h2>Abbonamenti</h2>
                    </div>
                    <ServiceCard v-for="(elem, index) in userServices" :key="index" type="list" :userServices="elem" />
                </div>
            </div>
            <div class="section_end">
                <div class="wrap_service_card" v-if="userServices.length >= 1">
                    <div class="wrap_head">
                        <h2>Abbonamenti</h2>
                    </div>
                    <ServiceCard v-for="(elem, index) in userServices" :key="index" type="list" :userServices="elem" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { store } from '../data/store';
import { format } from 'date-fns'
import itLocale from 'date-fns/locale/it'
import axios from 'axios';

import HeaderComp from '../components/global/HeaderComp.vue';
import ButtonComp from '../components/button/ButtonComp.vue';
import ServiceCard from '../components/global/ServiceCard.vue';

export default {
    name: "HomeView",
    components: {
        HeaderComp,
        ButtonComp,
        ServiceCard
    },
    data() {
        return {
            store,

            services: [],
            userServices: [],

            isDescriptionFocused: false,
            isStartDateFocused: true,
            isEndDateFocused: true,
            isBillFocused: true,

            dataCreateService: {
                description: "",
                start_date: "",
                billing_cycle: "month",
                end_date: "",
                bill: "0.00",
                currency: "€",
                bgColorCard: "#e50914",
            },

            serviceSelect: [],

            servicesMenuIsOpen: false,
            cycleMenuIsOpen: false,
            currencyMenuIsOpen: false,

            isInCreateSub: false,
        }
    },
    computed: {
        // Usa mapGetters per ottenere lo stato dell'utente dallo store
        ...mapGetters(['getUser', 'isAuthenticated']),

        isAuthenticated() {
            return this.getUser !== null;
        },
        formattedCreatedAt() {
            return this.formatDate(this.getUser?.created_at)
        },
        numberOfExpiredSubscriptions() {
            return this.userServices.filter(service => service.pivot.status === 'cancelled').length;
        },
        numberOfActiveSubscriptions() {
            return this.userServices.filter(service => service.pivot.status === 'active').length;
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
        calculateMonthlyTotal() {
            let total = 0;
            for (const service of this.userServices) {
                if (service.pivot.billing_cycle === 'month') {
                    total += parseFloat(service.pivot.bill);
                } else if (service.pivot.billing_cycle === 'year') {
                    // Dividi il costo annuale per 12 per ottenere il costo mensile approssimato
                    total += parseFloat(service.pivot.bill) / 12;
                }
            }
            return total.toFixed(2);
        },
        calculateAnnualTotal() {
            let total = 0;
            for (const service of this.userServices) {
                total += parseFloat(service.pivot.bill);
            }
            return total.toFixed(2);
        }
    },
    methods: {
        setFocus(field) {
            if (field === 'description') {
                this.isDescriptionFocused = true;
            } else if (field === 'startDate') {
                this.isStartDateFocused = true;
            } else if (field === 'endDate') {
                this.isEndDateFocused = true;
            } else if (field === 'bill') {
                this.isBillFocused = true;
            }
        },
        resetFocus(field) {
            if (field === 'description') {
                this.isDescriptionFocused = false;
            } else if (field === 'bill') {
                this.isBillFocused = false;
            }
        },

        formatDate(dateString) {
            const date = new Date(dateString)
            return format(date, "d MMMM yyyy", { locale: itLocale })
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
        async fetchUserServices() {
            try {
                this.store.loadingUserServices = true;

                const tokenUser = this.getUser?.token;

                const res = await axios.get('http://localhost:8000/api/user-services', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${tokenUser}`
                    },
                });

                this.userServices = res.data;
            } catch (e) {
                console.error(e);
            } finally {
                setTimeout(() => {
                    this.store.loadingUserServices = false;
                }, 550)
            }
        },
        async fetchAddSub() {
            try {
                const tokenAUTH = this.getUser?.token;

                // Effettua una richiesta API al tuo backend Laravel per la registrazione
                const res = await fetch(`http://localhost:8000/api/subscriptions/service/${this.serviceSelect.uuid}`, {
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
                        bgColorCard: this.dataCreateService.bgColorCard,
                    }),
                });

                const responseData = await res.json();

                if (res.ok) {
                    this.fetchUserServices();
                    this.isInCreateSub = false;
                    this.dataCreateService = {
                        description: "",
                        start_date: "",
                        billing_cycle: "month",
                        end_date: "",
                        bill: "0.00",
                        currency: "€",
                        bgColorCard: "#e50914",
                    }
                }
            } catch (e) {
                console.error(e);
            }
        },

        updateEndDate() {
            const startDate = new Date(this.dataCreateService.start_date);
            let endDate = new Date(startDate);

            if (this.dataCreateService.billing_cycle === 'day') {
                // Aggiungi un giorno alla data di inizio
                endDate.setDate(startDate.getDate() + 1);
            } else if (this.dataCreateService.billing_cycle === 'month') {
                // Aggiungi un mese alla data di inizio
                endDate.setMonth(startDate.getMonth() + 1);
            } else if (this.dataCreateService.billing_cycle === 'year') {
                // Aggiungi un anno alla data di inizio
                endDate.setFullYear(startDate.getFullYear() + 1);
            }

            // Aggiorna la data di fine abbonamento nel formato corretto
            this.dataCreateService.end_date = endDate.toISOString().split('T')[0];
        },
        updateEndDateOnStartDateChange() {
            // Aggiorna automaticamente la data di fine abbonamento quando viene selezionata una nuova data di inizio
            this.updateEndDate();
        },

        handleMenuDpd(menuType) {
            if (menuType === 'servicesMenu') {
                this.servicesMenuIsOpen = !this.servicesMenuIsOpen;
            }

            if (menuType === 'cycleMenu') {
                this.cycleMenuIsOpen = !this.cycleMenuIsOpen;
            }

            if (menuType === 'currencyMenu') {
                this.currencyMenuIsOpen = !this.currencyMenuIsOpen;
            }
        },
        handleSelectDpd(menuType, select) {
            if (menuType === 'servicesMenu') {
                this.serviceSelect = select;
            }

            if (menuType === 'cycleMenu') {
                this.dataCreateService.billing_cycle = select;
                this.updateEndDate();
            }

            if (menuType === 'currencyMenu') {
                this.dataCreateService.currency = select;
            }
        },

        handleInAddSub() {
            if (!this.isInCreateSub) {
                this.isInCreateSub = true;
            }
        },
    },
    mounted() {
        this.fetchServices();
        this.fetchUserServices();
    }
}
</script>

<style scoped>
.container_hv {
    position: relative;
    top: 80px;
    width: 100%;
    min-height: 100vh;
    margin-top: 4vw;
}

.container_hv .wrap_ch {
    width: 100%;
    height: 100%;
    max-width: 1024px;
    padding: 0 3%;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
}

.section_start {
    max-width: 390px;
    min-width: 390px;
    display: flex;
    gap: 32px;
    flex-direction: column;
}

.card_profile {
    position: relative;
    background-color: white;
    width: 100%;
    aspect-ratio: 16 / 8;
    border-radius: 12px;
    padding: 6%;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.user {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card_profile .dot_user {
    background-color: rgba(34, 34, 34, 1);
    height: 104px;
    aspect-ratio: 1;
    border-radius: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card_profile .dot_user span {
    color: white;
    font-size: 3rem;
    font-weight: 600;
}

.name_profile {
    color: black;
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 8px;
}

.row_container {
    display: flex;
    gap: 24px;
    flex-direction: column;
}

.row_container .row {
    display: flex;
    gap: 2px;
    flex-direction: column;
}

.row_container .row .head_row {
    color: black;
    font-size: 1rem;
    font-weight: 400;
}

.row_container .row .body_row {
    color: black;
    font-size: 1.1rem;
    font-weight: 600;
}

.wrap_form_add_sub {
    display: flex;
    gap: 16px;
    flex-direction: column;
}

.wrap_form_add_sub form {
    display: flex;
    gap: 16px;
    flex-direction: column;
}

.wrap_field {
    position: relative;
    width: 100%;
    height: 52px;
    max-height: 52px;
}

.wrap_field .btn_dpd {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    outline: none;
    padding: 0 1rem;
    border: 1px solid rgba(34, 34, 34, .5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    cursor: pointer;
    transition: border-color 150ms ease;
}

.wrap_field .btn_dpd i {
    color: rgba(34, 34, 34, 1);
    font-size: 1.3rem;
}

.btn_dpd .menu_dpd_btn {
    position: absolute;
    z-index: 10;
    top: 100%;
    left: 0;
    transform: translateY(10px) scale(1.01);
    width: 100%;
    max-height: calc(52px * 5);
    overflow-y: auto;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.btn_dpd .menu_dpd_btn.show {
    animation: appear 200ms ease 0s forwards;
}

@keyframes appear {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.btn_dpd .menu_dpd_btn .row_select {
    width: 100%;
    height: 52px;
    padding: 0 1rem;
    display: flex;
    align-items: center;
}

.btn_dpd .menu_dpd_btn .row_select:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.btn_dpd .menu_dpd_btn .row_select:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.btn_dpd .menu_dpd_btn .row_select:hover {
    background-color: rgb(248, 248, 248);
}

.wrap_field .input_field {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    outline: none;
    padding: 0 1rem;
    border: 1px solid rgba(34, 34, 34, .5);
    background-color: transparent;
    transition: border-color 150ms ease;
}

.wrap_field .input_field#passwordField {
    padding-right: calc(52px + 1rem);
}

.wrap_field .input_field:focus {
    border-color: rgba(34, 34, 34, 1);
}

.wrap_field .input_field.error {
    border-color: rgb(224, 41, 41);
}

.wrap_field .input_field.success {
    border-color: rgb(71 211 3);
}

.wrap_field .input_field[type=text],
.wrap_field .input_field[type=email],
.wrap_field .input_field[type=password] {
    color: rgba(34, 34, 34, 1);
    font-size: .9rem;
    font-weight: 400;
}

.wrap_field .label_field {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    padding: 1px 6px;
    border-radius: 2px;

    color: rgba(34, 34, 34, 1);
    font-size: .9rem;
    font-weight: 400;

    transition-property: all;
    transition-duration: .15s;
    transition-timing-function: ease-in-out;
}

.wrap_field .label_field.focussed {
    left: calc(1rem - 12px);
    top: 0%;
    transform: translateY(-50%) scale(.88);
    background-color: white;
}

.wrap_icon {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    aspect-ratio: 1;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.wrap_icon i {
    color: rgba(34, 34, 34, 1);
    font-size: 1rem;
    opacity: .6;
    transition: opacity 200ms ease;
}

.wrap_icon:hover i {
    opacity: 1;
}

.section_end {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
}

.wrap_service_card {
    display: flex;
    gap: 12px;
    flex-direction: column;
}

.wrap_service_card .wrap_head h2 {
    color: black;
    font-size: 1.1rem;
    font-weight: 500;
}

.wrap_service_card.on_mob {
    display: none;
}

.wrap_ct {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center
}

/* Media Query's */
@media only screen and (max-width: 1024px) {
    .container_hv .wrap_ch {
        max-width: 100%;
    }
}

@media only screen and (max-width: 980px) {
    .container_hv {
        top: 56px;
    }

    .wrap_service_card.on_mob {
        display: flex;
    }

    .wrap_service_card:not(.on_mob) {
        display: none;
    }
}

@media only screen and (max-width: 550px) {
    .section_start {
        width: 100%;
        max-width: 100%;
        min-width: 390px;
    }

    .section_end {
        display: none;
    }
}
</style>