<template>
    <section class="section-login">

        <div class="container">

            <h1 class="title">
                {{ $utils.localeCopy.login.titleLogin }}
            </h1>

            <FormLogin />

            <div class="separator"></div>

            <div class="button-container">

                <nuxt-link :to="localePath('/register')" class="button button-register">
                    {{ $utils.localeCopy.login.toggleRegister }}
                </nuxt-link>

            </div>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
