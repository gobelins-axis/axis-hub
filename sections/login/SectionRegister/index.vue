<template>
    <section class="section-register">

        <div class="container">

            <h1 class="title">
                {{ $utils.localeCopy.login.titleRegister }}
            </h1>

            <FormRegister />

            <div class="separator"></div>

            <div class="button-container">

                <nuxt-link :to="localePath('/login')" class="button button-register">
                    {{ $utils.localeCopy.login.toggleLogin }}
                </nuxt-link>

            </div>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
