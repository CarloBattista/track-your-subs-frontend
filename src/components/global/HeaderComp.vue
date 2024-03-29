<template>
    <div class="header">
        <div class="start_region"></div>
        <div class="end_region">
            <div class="profile_menu" :class="{ active: menuProfileIsOpen }" @click="handleMenuProfile">
                <div class="dot dot_menu">
                    <i class="ri-menu-line"></i>
                </div>
                <div class="dot dot_avatar">
                    <span class="first_letter_of_name">{{ this.getUser?.name.charAt(0) }}</span>
                </div>
                <div class="menu_dpd" :class="{ show: menuProfileIsOpen }" ref="menuProfile" v-if="menuProfileIsOpen">
                    <ul class="list_dpd_menu">
                        <router-link to="/login" v-if="!this.getUser">
                            <li class="item_dpd_menu">Accedi</li>
                        </router-link>
                        <router-link to="/register" v-if="!this.getUser">
                            <li class="item_dpd_menu">Registrati ora</li>
                        </router-link>
                        <router-link to="/account" v-if="this.getUser">
                            <li class="item_dpd_menu">Account</li>
                        </router-link>
                        <div class="line_divisor"></div>
                        <li class="item_dpd_menu" v-if="this.getUser">Centro Assistenza</li>
                        <li class="item_dpd_menu" @click="handleLogout" v-if="this.getUser">Esci</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ButtonComp from '../button/ButtonComp.vue';

export default {
    name: "HeaderComp",
    components: {
        ButtonComp
    },
    data() {
        return {
            menuProfileIsOpen: false,
        }
    },
    computed: {
        // Usa mapGetters per ottenere lo stato dell'utente dallo store
        ...mapGetters(['getUser', 'isAuthenticated']),

        isAuthenticated() {
            return this.getUser !== null;
        },
    },
    methods: {
        // Usa mapActions per chiamare l'azione di logout dallo store Vuex
        ...mapActions(['logout']),

        handleLogout() {
            if (this.isAuthenticated && this.getUser) {
                localStorage.removeItem('tys-ky-cb-a83037wq')
                setTimeout(() => {
                    window.location.reload();
                }, 250)
            }
        },
        handleMenuProfile() {
            this.menuProfileIsOpen = !this.menuProfileIsOpen;
        },
    },
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
    box-shadow: inset 0 -1px 0 #e8e9ed;
    background-color: #fff;
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

.profile_menu {
    background-color: white;
    border: 1px solid #ddd;
    position: relative;
    height: 48px;
    max-height: 48px;
    border-radius: 30px;
    padding: 8px;
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.profile_menu:hover,
.profile_menu.active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
}

.profile_menu .dot {
    width: 32px;
    aspect-ratio: 1;
    border-radius: 50%;
}

.profile_menu .dot_menu,
.profile_menu .dot_avatar {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.profile_menu .dot_menu i {
    color: rgba(34, 34, 34, 1);
    font-size: 1rem;
}

.profile_menu .dot_avatar {
    background-color: rgba(34, 34, 34, 1);
}

.profile_menu .dot_avatar .first_letter_of_name {
    color: white;
    font-size: .8rem;
    font-weight: 600;
}

.menu_dpd {
    position: absolute;
    top: 100%;
    transform: translateY(10px);
    right: 0;
    width: 250px;
    max-width: 250px;
    min-width: 150px;
    border-radius: 12px;
    padding: 12px 0;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
}

.menu_dpd.show {
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

.menu_dpd .list_dpd_menu {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.menu_dpd .list_dpd_menu .item_dpd_menu {
    color: rgba(34, 34, 34, 1);
    font-size: .9rem;
    font-weight: 500;
    width: 100%;
    height: 42px;
    max-height: 42px;
    padding: 0 1rem;
    text-align: left;
    display: flex;
    align-items: center;
    background-color: transparent;
}

.menu_dpd .list_dpd_menu .item_dpd_menu:hover {
    background-color: rgb(248, 248, 248);
}

.line_divisor {
    background-color: rgb(220, 220, 220);
    width: 100%;
    height: 1px;
    margin: 8px 0;
}

/* Media Query's */
@media only screen and (max-width: 980px) {
    .header {
        height: 56px;
        padding: 0 3%;
    }

    .profile_menu {
        height: 36px;
        max-height: 48px;
        border-radius: 30px;
        padding: 6px;
        gap: 6px;
    }

    .profile_menu .dot {
        width: 22px;
    }

    .profile_menu .dot_menu i {
        font-size: .8rem;
    }
}
</style>