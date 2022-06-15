<template>
    <div class="template">
        <div class="page-title">Espace créateur</div>
        <fieldset ref="tags" class="mobile-only">
            <div class="checkbox">
                <label>
                    <span class="checkbox-title">Solo</span>
                    <input ref="onePlayer" type="checkbox" name="filter" class="default__check"
                           value="Solo" v-model="onePlayer">
                    <span class="custom__check"></span>
                </label>
            </div>
            <div class="checkbox">
                <label>
                    <span class="checkbox-title">Multijoueurs</span>
                    <input ref="multiPlayer" type="checkbox" name="filter" class="default__check"
                           value="Multijoueur" v-model="multiplayer">
                    <span class="custom__check"></span>
                </label>
            </div>
            <div class="checkbox">
                <label>
                    <span class="checkbox-title">Experience</span>
                    <input ref="experience" type="checkbox" name="filter" class="default__check"
                           value="Experience" v-model="experience">
                    <span class="custom__check"></span>
                </label>
            </div>
            <div class="checkbox">
                <label>
                    <span class="checkbox-title">Jeu</span>
                    <input ref="game" type="checkbox" name="filter" class="default__check" value="Jeu" v-model="game">
                    <span class="custom__check"></span>
                </label>
            </div>
        </fieldset>
        <div class="my-games">
            <!--            <AddGame />-->
            <NuxtLink to="/games/create" class="game-card add-game-button">
                Ajouter un jeu
                <span>+</span>
            </NuxtLink>
            <GameCard v-for="(game, index) in games" :key="index" :game="game" :empty="false"/>
            <GameCard class="desktop-only" v-for="index in 8 - games.length" :empty="true"/>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
