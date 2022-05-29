<template>
    <div>
        Mon Hub
        <div class="my-games">
            <!--            <AddGame />-->
            <NuxtLink to="/games/create" class="">
                Ajouter un jeu
            </NuxtLink>
            <GameCard v-for="(game, index) in games" :key="index" :game="game" :empty="false" />
            <!--            <GameCard v-for="index in 16 - games.length" :empty="true" />-->
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
