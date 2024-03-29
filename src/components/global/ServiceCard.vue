<template>
    <div class="card_service" :style="{ backgroundColor: serviceSelect.bgColorCard }" v-if="type === 'preview'">
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
    <div class="card_service list" :class="{ load: store.loadingUserServices, large: popOverIsVisible }"
        :style="{ backgroundColor: userServices.bgColorCard }" v-if="type === 'list'"
        @mouseenter="popoverEnterInfoService" @mouseleave="popoverLeaveInfoService">
        <div class="top_region">
            <div class="left_cd" v-if="!store.loadingUserServices">
                <div class="wrap_logo_sv" :class="{ notLogo: !userServices.logo }">
                    <img class="logo_sv" :src="userServices.logo" :alt="userServices.name" v-if="userServices.logo">
                </div>
                <span class="name_sv" :style="{ color: contrastTextColor(userServices.bgColorCard) }">{{
        userServices.name
    }}</span>
            </div>
            <div class="right_cd" v-if="!store.loadingUserServices">
                <span class="price_sv" :style="{ color: contrastTextColor(userServices.bgColorCard) }">{{
        userServices.pivot.currency }}{{ userServices.pivot.bill }}</span>
            </div>
        </div>
        <div class="bottom_region">
            <div class="row_info_list" :style="{ color: contrastTextColor(userServices.bgColorCard) }">
                <div class="row_info">
                    <span class="hd">Ciclo del pagamento</span>
                    <span class="bdd" v-if="userServices.pivot.billing_cycle === 'day'">Giornaliero</span>
                    <span class="bdd" v-if="userServices.pivot.billing_cycle === 'month'">Mensile</span>
                    <span class="bdd" v-if="userServices.pivot.billing_cycle === 'year'">Annuale</span>
                </div>
                <div class="row_info">
                    <span class="hd">Stato</span>
                    <span class="bdd" v-if="userServices.pivot.status === 'active'">Attivo</span>
                    <span class="bdd" v-if="userServices.pivot.status === 'cancelled'">Scaduto</span>
                </div>
                <div class="row_info">
                    <span class="hd">Attivo dal</span>
                    <span class="bdd">{{ formattedStartDate }}</span>
                </div>
            </div>
        </div>
        <div class="cta_btn">
            <div class="row_cta delete" @click="handleRemoveService(userServices)">
                <div class="wrap_icon">
                    <i class="ri-delete-bin-line"></i>
                </div>
            </div>
            <div class="row_cta modify" v-if="false">
                <div class="wrap_icon">
                    <i class="ri-pencil-line"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { store } from '../../data/store';
import { format } from 'date-fns'
import itLocale from 'date-fns/locale/it'

export default {
    name: "ServiceCard",
    props: {
        type: String,
        serviceSelect: Object,
        dataCreateService: Object,
        userServices: Object
    },
    data() {
        return {
            store,
            popOverIsVisible: false,
        }
    },
    computed: {
        // Usa mapGetters per ottenere lo stato dell'utente dallo store
        ...mapGetters(['getUser', 'isAuthenticated']),

        formattedStartDate() {
            return this.formatDate(this.userServices?.pivot.start_date)
        },
    },
    methods: {
        contrastTextColor(backgroundColor) {
            if (!backgroundColor) return ''; // Assicurati che backgroundColor sia definito

            const rgb = parseInt(backgroundColor.slice(1), 16);
            const r = (rgb >> 16) & 0xff;
            const g = (rgb >> 8) & 0xff;
            const b = (rgb >> 0) & 0xff;
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            return luminance > 0.5 ? '#000' : '#fff';
        },
        formatDate(dateString) {
            const date = new Date(dateString)
            return format(date, "d MMMM yyyy", { locale: itLocale })
        },
        popoverEnterInfoService() {
            this.popOverIsVisible = true;
        },
        popoverLeaveInfoService() {
            this.popOverIsVisible = false;
        },
        async handleRemoveService(service) {
            try {
                const tokenAUTH = this.getUser?.token;

                // Effettua una richiesta API al tuo backend Laravel per la registrazione
                const res = await fetch(`http://localhost:8000/api/user-services/${service.uuid}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${tokenAUTH}`
                    },
                });

                if (res.ok) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 250)
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
}
</script>

<style scoped>
.card_service {
    background-color: black;
    position: relative;
    width: 100%;
    height: 65px;
    /* max-width: 400px; */
    min-width: 350px;
    max-height: 65px;
    border-radius: 8px;
    padding: 20px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card_service.load {
    animation: pulse 5s ease 0s infinite forwards;
}

@keyframes pulse {
    0% {
        background-color: black;
    }

    50% {
        background-color: grey;
    }

    100% {
        background-color: black;
    }
}

.card_service.on_mob {
    width: 100%;
    max-width: 100%;
}

.card_service.bt {
    margin-bottom: 2rem;
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
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
}

.price_sv {
    font-size: 1rem;
    font-weight: 500;
}

.card_service.list {
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    cursor: pointer;
    transition: all 250ms ease;
}

.card_service.list .top_region {
    transform: translateY(-5%);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card_service.list.large {
    height: 260px;
    max-height: 260px;
}

.bottom_region {
    width: 100%;
    margin-top: 1.5rem
}

.row_info_list {
    display: flex;
    gap: 8px;
    flex-direction: column;
}

.row_info_list .row_info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.row_info_list .row_info .hd {
    font-size: 1rem;
    font-weight: 400;
}

.row_info_list .row_info .bdd {
    font-size: 1rem;
    font-weight: 600;
}

.cta_btn {
    position: relative;
    width: 100%;
    /* padding: 0 30px; */
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
}

.row_cta {
    width: 42px;
    height: auto;
    aspect-ratio: 1;
    border-radius: 8px;
    padding: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .4);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    transition-property: background-color, box-shadow;
    transition-duration: 200ms;
    transition-timing-function: ease;
}

.row_cta:hover {
    background-color: rgba(255, 255, 255, .8);
    border: 1px solid white;
}

.row_cta.delete {
    background-color: rgba(255, 43, 43, 0.4);
}

.row_cta.delete:hover {
    background-color: rgba(255, 43, 43, 0.8);
    border: 1px solid rgba(255, 43, 43, 1);
}

.row_cta.modify {
    background-color: rgba(255, 181, 43, 0.4);
}

.row_cta.modify:hover {
    background-color: rgba(255, 181, 43, 0.8);
    border: 1px solid rgba(255, 181, 43, 1);
}

.row_cta .wrap_icon {
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.row_cta .wrap_icon i {
    color: white;
    font-size: 1.4rem;
    font-weight: 500;
}
</style>