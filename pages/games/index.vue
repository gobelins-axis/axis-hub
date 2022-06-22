<template>
    <div class="content gallery">
        <div class="filter-panel desktop-only">
            <Filters background @filter="setFilter"/>
        </div>
        <div class="boxed">
            <div class="big-title">Jeux</div>
            <Filters class="mobile-tablet-only" @filter="setFilter" />
            <div class="games">
                <GameCard v-for="(game, index) in gamesList" :key="index" :game="game"  />
                <GameCard class="desktop-tablet-only" v-for="index in getNumberOfEmpty" empty />
            </div>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
