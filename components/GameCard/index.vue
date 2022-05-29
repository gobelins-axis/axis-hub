<template>
    <NuxtLink class="game-card" :class="{isEmpty: empty }" :to="`games/edit/${ game.id }`">
        <div class="game-image">
            <div v-if="!empty" class="game-title">
                {{ game.fields.name }}
            </div>
            <div class="play-btn"></div>
        </div>
    </NuxtLink>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
