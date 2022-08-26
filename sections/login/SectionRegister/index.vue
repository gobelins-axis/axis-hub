<template>
    <section class="section-register">

        <div class="container">

            <FormRegister />

            <nuxt-link :to="localePath('/login')" class="button button-register">
                {{ $utils.localeCopy.login.toggleLogin }}
            </nuxt-link>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
