<template>
    <section class="section-hero">

        <img src="~/assets/images/background.jpg" alt="" class="background-image">

        <button type="button" class="button button-scroll" @click="clickScrollHandler">

            <span class="label">{{ $utils.localeCopy.home.scroll }}</span>

            <ArrowBack class="arrow" />

        </button>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
