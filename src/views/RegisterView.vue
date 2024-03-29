<template>
    <div class="form_container">
        <div class="wrap_form">
            <div class="container_heading">
                <h2 class="head_copy">Crea il tuo account</h2>
                <p class="body_copy">Registrati per iniziare ad usare Control.</p>
            </div>
            <form @submit.prevent>
                <div class="wrap_field" @focusin="setFocus('name')" @focusout="resetFocus('name')">
                    <input class="input_field" id="nameField" type="text" v-model="userData.name" autocomplete="off"
                        required>
                    <label class="label_field" :class="{ focussed: isNameFocused || userData.name }"
                        for="nameField">Nome</label>
                </div>
                <div class="wrap_field" @focusin="setFocus('email')" @focusout="validateEmail">
                    <input class="input_field"
                        :class="{ error: isEmailNotValid, success: !isEmailNotValid && userData.email.length >= 1 }"
                        id="emailField" type="email" v-model="userData.email" autocomplete="off" required>
                    <label class="label_field" :class="{ focussed: isEmailFocused || userData.email }"
                        for="emailField">Indirizzo e-mail</label>
                </div>
                <div class="wrap_field" @focusin="setFocus('password')" @focusout="resetFocus('password')"
                    v-if="phase === 1">
                    <input class="input_field" id="passwordField" :type="passwordFieldType" v-model="userData.password"
                        autocomplete="off" required>
                    <label class="label_field" :class="{ focussed: isPasswordFocused || userData.password }"
                        for="passwordField">Password</label>
                    <div class="wrap_icon" @click="handleSeePassword">
                        <i :class="passwordIcon"></i>
                    </div>
                </div>
                <div class="wrap_check_password" v-if="phase === 1">
                    <h2 class="head_check">La password deve contenere:</h2>
                    <ul class="list_check">
                        <li class="item_check"
                            :class="{ success: isPasswordLengthValid, error: isPasswordLengthExceeded }">
                            <i :class="passwordCheckIcon"></i>
                            Lunghezza di almeno 6 caratteri
                        </li>
                        <li class="item_check"
                            :class="{ success: isPasswordLengthValid, error: isPasswordLengthExceeded }">
                            <i :class="passwordCheckIcon"></i>
                            Lunghezza massima di 64 caratteri
                        </li>
                    </ul>
                </div>
                <div class="wrap_btn">
                    <button class="btn_submit" :class="{ error: !isEmailNotValid }"
                        :type="phase === 0 ? 'button' : 'submit'" @click="continuaPhase">Continua</button>
                </div>
            </form>
            <div class="container_footer">
                <p class="body_copy">Hai già un account? <router-link to="/login">Accedi</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import axios from 'axios';

export default {
    name: "RegisterView",
    data() {
        return {
            userData: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },

            phase: 0,

            isEmailFocused: false,
            isPasswordFocused: false,
            isNameFocused: false,

            showPassword: false,
            isEmailNotValid: false
        }
    },
    computed: {
        passwordFieldType() {
            return this.showPassword ? 'text' : 'password';
        },
        passwordIcon() {
            return this.showPassword ? 'ri-eye-off-line' : 'ri-eye-line';
        },
        isPasswordLengthValid() {
            return this.userData.password.length >= 6;
        },
        isPasswordLengthExceeded() {
            return this.userData.password.length > 64;
        },
        passwordCheckIcon() {
            if (this.isPasswordLengthExceeded) {
                return 'ri-close-fill';
            } else if (this.isPasswordLengthValid) {
                return 'ri-check-fill';
            } else {
                return ''; // Rimuovi l'icona se non sono soddisfatte le condizioni
            }
        },
    },
    methods: {
        // Utilizza mapMutations per chiamare la mutazione setUser
        ...mapMutations(['setUser']),

        setFocus(field) {
            if (field === 'password') {
                this.isPasswordFocused = true;
            }
        },
        resetFocus(field) {
            if (field === 'password') {
                this.isPasswordFocused = false;
            }
        },
        handleSeePassword() {
            this.showPassword = !this.showPassword;
        },
        continuaPhase() {
            if (this.phase === 0 && !this.isEmailNotValid) {
                this.phase = 1;
            } else {
                this.fetchRegister();
            }
        },
        validateEmail() {
            const emailParts = this.userData.email.split('@');

            if (this.userData.email.length === 0) {
                this.isEmailNotValid = true;
                return;
            }

            if (emailParts.length === 2) {
                const domain = emailParts[1].toLowerCase();
                this.isEmailNotValid = domain !== 'gmail.com' && domain !== 'hotmail.com';
            } else {
                this.isEmailNotValid = true;
            }
        },
        async fetchRegister() {
            try {
                // Effettua una richiesta API al tuo backend Laravel per la registrazione
                const res = await fetch('http://localhost:8000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(this.userData),
                });

                const responseData = await res.json();

                if (res.ok) {
                    this.userData = { name: "", email: "", password: "", password_confirmation: "" };
                    this.$router.push('/login');
                }

                this.isEmailNotValid = false;
            } catch (e) {
                console.error(e);
            }
        }
    },
    watch: {
        'userData.password'(newValue) {
            this.userData.password_confirmation = newValue;
        }
    }
}
</script>

<style scoped>
.form_container {
    width: 100%;
    height: 100vh;
}

.form_container .wrap_form {
    max-width: 320px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.container_heading {
    margin-bottom: 24px;
}

.container_heading,
.container_footer {
    text-align: center;
}

.container_heading .head_copy {
    color: rgba(34, 34, 34, 1);
    font-size: 2rem;
    font-weight: 700;
}

.container_heading .body_copy,
.container_footer .body_copy {
    color: rgba(34, 34, 34, 1);
    font-size: .8rem;
    font-weight: 500;
    margin-top: 6px;
}

.container_footer .body_copy {
    margin-top: 1rem;
}

.container_footer .body_copy a {
    color: orange;
}

.form_container .wrap_form form {
    width: 100%;
    display: flex;
    gap: 12px;
    flex-direction: column;
}

.wrap_field {
    position: relative;
    width: 100%;
    height: 52px;
    max-height: 52px;
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

.wrap_btn {
    position: relative;
    width: 100%;
    height: 52px;
    max-height: 52px;
    margin-top: 12px
}

.wrap_btn .btn_submit {
    background-color: orange;
    color: rgba(34, 34, 34, 1);
    font-size: 1rem;
    font-weight: 500;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: 4px 1rem;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 200ms ease;
}

/* .wrap_btn .btn_submit.error{
    pointer-events: none;
} */

.wrap_btn .btn_submit:hover {
    background-color: rgb(190, 123, 0)
}

.wrap_check_password {
    position: relative;
    width: 100%;
    padding: 14px 16px;
    border-radius: 8px;
    border: 1px solid rgba(34, 34, 34, .5);
}

.wrap_check_password .head_check {
    color: black;
    font-size: .8rem;
    font-weight: 500;
}

.wrap_check_password .list_check {
    margin-top: 8px;
    display: flex;
    gap: 4px;
    flex-direction: column;
}

.wrap_check_password .list_check .item_check {
    position: relative;
    color: rgba(34, 34, 34, 1);
    font-size: .7rem;
    font-weight: 500;
}

.wrap_check_password .list_check .item_check.success {
    color: orange;
}

.wrap_check_password .list_check .item_check.error {
    color: rgb(224, 41, 41);
}

.wrap_check_password .list_check .item_check i {
    font-size: 1rem;
    margin-right: .2rem;
}
</style>