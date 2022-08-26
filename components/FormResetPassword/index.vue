<template>
    <form v-if="!isSuccess" :class="`form-reset-password ${showErrors ? 'show-errors' : ''}`" novalidate @submit.prevent="submitHandler">

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

        <input type="submit" class="button submit" :value="$utils.localeCopy.login.submitLabel">

        <div v-if="showErrors && error" class="error">
            {{ error }}
        </div>

    </form>

    <div v-else class="success-message-container">

        <div class="success-message">
            {{ $utils.localeCopy.login.resetPasswordSuccessMessage }}
        </div>

        <nuxt-link class="button success-button" :to="localePath('/login')">
            {{ $utils.localeCopy.login.resetPasswordSuccessButtonLabel }}
        </nuxt-link>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
