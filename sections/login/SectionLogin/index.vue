<template>
    <section class="section-login">

        <div class="container">

            <FormLogin />

            <nuxt-link :to="localePath('/register')" class="button button-register">
                {{ $utils.localeCopy.login.toggleRegister }}
            </nuxt-link>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
