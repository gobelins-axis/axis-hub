<template>
    <form :class="`form form-login ${showErrors ? 'show-errors' : ''}`" novalidate @submit.prevent="submitHandler">

        <div class="inputs-container">

            <input
                ref="inputEmail"
                name="email"
                autocomplete="email"
                type="email"
                class="email"
                :value="email"
                :placeholder="$utils.localeCopy.login.emailInputPlaceholder"
                required
                autofocus
                @input="emailInputHandler"
            >

            <input
                ref="inputPassword"
                name="password"
                autocomplete="current-password"
                type="password"
                class="password"
                :value="password"
                :placeholder="$utils.localeCopy.login.passwordInputPlaceholder"
                required
                @input="passwordInputHandler"
            >

        </div>

        <nuxt-link class="button button-third forgot-password" :to="localePath('/reset-password')">
            {{ $utils.localeCopy.login.forgotPasswordLabel }}
        </nuxt-link>

        <div class="container-buttons">

            <button type="submit" class="button button-primary submit">
                {{ $utils.localeCopy.login.submitLabel }}
            </button>

            <ButtonGoogleLogin @click.native="googleSignInClickHandler" />

        </div>

        <div v-if="showErrors && error" class="error">
            {{ error }}
        </div>

        <div v-else class="error-placeholder">
            error
        </div>

    </form>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
