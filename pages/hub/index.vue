<template>
    <div class="template">
        <div class="page-title">Espace créateur</div>
        <div class="my-games">
            <!--            <AddGame />-->
            <NuxtLink to="/games/create" class="game-card add-game-button">
                Ajouter un jeu
                <span>+</span>
            </NuxtLink>
            <GameCard v-for="(game, index) in games" :key="index" :game="game" :empty="false" />
            <GameCard v-for="index in 8 - games.length" :empty="true" />
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
