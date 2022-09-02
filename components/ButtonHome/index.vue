<template>
    <nuxt-link :to="localePath('/')" class="button button-home">

        <LogoWhite v-if="theme === 'white'" />
        <LogoBlack v-else />

    </nuxt-link>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
