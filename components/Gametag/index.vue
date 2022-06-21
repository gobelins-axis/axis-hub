<template>
    <div class="tag">
        <div v-if="type === 'onePlayer'" class="tag-item solo">
            <img src="~/assets/images/tag/solo.svg">
            <p class="text">Solo</p>
        </div>
        <div v-if="type === 'multiPlayer'" class="tag-item multi">
            <img src="~/assets/images/tag/multi.svg">
            <p class="text">Multi</p>
        </div>
        <div v-if="type === 'game'" class="tag-item game">
            <img src="~/assets/images/tag/game.svg">
            <p class="text">Jeu</p>
        </div>
        <div v-if="type === 'experience'" class="tag-item experience">
            <img src="~/assets/images/tag/experience.svg">
            <p class="text">Experience</p>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
