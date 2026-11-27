<template>
    <section class="section-games">

        <div class="container container-small">

            <h2 class="title">
                {{ $utils.localeCopy.home.games.title }}
            </h2>

            <ListGames :games="games" />

            <div class="buttons-container">

                <nuxt-link class="button button-secondary" :to="localePath($utils.localeCopy.routes.games.path)">
                    {{ $utils.localeCopy.home.games.seeAll }}
                </nuxt-link>

                <nuxt-link class="button button-primary" :to="localePath($utils.localeCopy.routes.login.path)">
                    {{ $utils.localeCopy.home.games.createGame }}
                </nuxt-link>

            </div>

        </div>

    </section>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
