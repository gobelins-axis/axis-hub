<template>
    <div class="navigation-games">

        <!-- Previous -->
        <nuxt-link class="button previous" :to="localePath(`/games/${previous.id}`)">

            <ArrowBack />

            <span class="label">{{ previous.fields.name }}</span>

        </nuxt-link>

        <!-- Next -->
        <nuxt-link class="button next" :to="localePath(`/games/${next.id}`)">

            <ArrowBack />

            <span class="label">{{ next.fields.name }}</span>

        </nuxt-link>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
