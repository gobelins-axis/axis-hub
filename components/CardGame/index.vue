<template>
    <div class="card-game">

        <img class="background" :src="game.fields.mediumImage.url" alt="">

        <div class="overlay"></div>

        <div class="content">

            <nuxt-link class="link" :to="`games/${game.fields.id}`">
                {{ game.fields.name }}
            </nuxt-link>

            <p class="name">
                {{ game.fields.name }}
            </p>

        </div>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
