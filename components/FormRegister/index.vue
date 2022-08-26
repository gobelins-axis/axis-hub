<template>
    <form :class="`form-register ${showErrors ? 'show-errors' : ''}`" novalidate @submit.prevent="submitHandler">

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
            autocomplete="password"
            type="password"
            class="password"
            :value="password"
            :placeholder="$utils.localeCopy.login.passwordInputPlaceholder"
            required
            @input="passwordInputHandler"
        >

        <input
            ref="inputPasswordConfirmation"
            name="password-confirmation"
            autocomplete="password"
            type="password"
            class="password confirmation"
            :value="passwordConfirmation"
            :placeholder="$utils.localeCopy.login.passwordConfirmationInputPlaceholder"
            required
            @input="passwordConfirmationInputHandler"
        >

        <input type="submit" class="button submit" :value="$utils.localeCopy.login.submitLabel">

        <button class="button" @click="googleSignInClickHandler">
            Sign in with google
        </button>

        <div v-if="showErrors && error" class="error">
            {{ error }}
        </div>

    </form>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
