<template>
    <div class="card-game">

        <div class="content">

            <div class="label">
                <span>{{ $utils.localeCopy.hub.callToAction }}</span>
                <span class="icon">+</span>
            </div>

            <nuxt-link class="link" :to="localePath(`/games/create`)">
                {{ $utils.localeCopy.hub.callToAction }}
            </nuxt-link>

        </div>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
