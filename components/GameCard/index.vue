<template>
    <NuxtLink v-if="!empty" class="game-card" :to="`games/edit/${ game.id }`" :style="backgroundImage">
        <div class="shadow-overlay"></div>
        <div class="game-card-content">
            <div v-if="!empty" class="game-title">
                {{ game.fields.name }}
            </div>
            <div class="play-btn"></div>
        </div>
    </NuxtLink>

    <div v-else class="game-card isEmpty"></div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss"></style>
