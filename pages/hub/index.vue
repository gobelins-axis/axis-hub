<template>
    <div class="content">
        <div class="filter-panel desktop-only">
            <Filters @filter="setFilter"/>
        </div>
        <div class="boxed">
            <div class="big-title">Espace créateur</div>

            <Filters class="mobile-tablet-only" @filter="setFilter"/>
            <div class="my-games">
                <NuxtLink to="/games/create" class="game-card add-game-button">
                    Ajouter un jeu
                    <span>+</span>
                </NuxtLink>
                <GameCard v-for="(game, index) in gamesList" :key="index" :game="game" edit/>
                <GameCard class="desktop-tablet-only" v-for="index in getNumberOfEmpty" empty />
            </div>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
