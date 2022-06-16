<template>
     <form class="form-container">
            <div>
                <div v-if="signupPage" class="section-title">Créer un compte</div>
                <div v-else class="section-title">Se connecter</div>

                <div class="field">
                    <input ref="email" required type="email" placeholder="Votre email"/>
                </div>
                <div class="field">
                    <input ref="password" required type="password" placeholder="Mot de passe"/>
                </div>

                <div v-if="signupPage" class="field">
                    <input ref="passwordConfirm" required type="password" placeholder="Confirmez votre mot de passe"/>
                </div>

                <div class="field">
                    <div v-if="!signupPage" class="reset-password" ref="resetPassword" @click="resetPassword">Mot de passe oublié</div>
                </div>

                <div>
                    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                </div>


                <div class="connectionButtons">
                    <ButtonSubmit class="submit-button" type="styled" text="Valider" @click.native="submitLoginForm"/>
                    <div class="or">ou</div>
                    <div ref="firebaseLoginContainer" class="firebase-login-container"></div>
                </div>
            </div>
            <div class="toggleLabel" @click="toggleLoginMode" v-if="signupPage">Se connecter</div>
            <div class="toggleLabel" @click="toggleLoginMode" v-else>Créer un compte</div>
        </form>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
