<template>
    <nuxt-link :to="route" class="button button-back">
        <ArrowBack />
        <span>{{ label }}</span>
    </nuxt-link>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
