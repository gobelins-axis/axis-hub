<template>
    <div class="page-game">

        <div class="banner">

            <img :src="game.fields.largeImage.url" alt="" class="banner-img">

            <div class="banner-overlay"></div>

        </div>

        <div class="container container-small">

            <ButtonBack :label="$utils.localeCopy.game.buttonBackLabel" :route="'/games'" />

            <CardGameDetails :game="game" />

        </div>

        <Footer />

    </div>
</template>

<script src="./id/script.js"></script>
<style src="./id/style.scss" lang="scss" scoped></style>
