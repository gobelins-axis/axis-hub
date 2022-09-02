<template>
    <nav :class="`the-navigation theme-${theme}`">

        <ButtonHome class="button-home" :theme="theme" />

        <!-- Authentificated Nav -->
        <div v-if="isLoggedIn" class="buttons-container">

            <nuxt-link class="button button-navigation" :to="localePath($utils.localeCopy.routes.hub.path)">
                {{ $utils.localeCopy.routes.hub.name }}
            </nuxt-link>

            <nuxt-link class="button button-navigation" :to="localePath($utils.localeCopy.routes.documentation.path)">
                {{ $utils.localeCopy.routes.documentation.name }}
            </nuxt-link>

            <nuxt-link class="button button-navigation" :to="localePath($utils.localeCopy.routes.games.path)">
                {{ $utils.localeCopy.routes.games.name }}
            </nuxt-link>

            <nuxt-link class="button button-primary" :to="localePath($utils.localeCopy.routes.logout.path)">
                {{ $utils.localeCopy.routes.logout.name }}
            </nuxt-link>

        </div>

        <!-- Not authentificated Nav -->
        <div v-else class="buttons-container">

            <nuxt-link class="button button-navigation" :to="localePath($utils.localeCopy.routes.documentation.path)">
                {{ $utils.localeCopy.routes.documentation.name }}
            </nuxt-link>

            <nuxt-link class="button button-navigation" :to="localePath($utils.localeCopy.routes.games.path)">
                {{ $utils.localeCopy.routes.games.name }}
            </nuxt-link>

            <nuxt-link class="button button-primary" :to="localePath($utils.localeCopy.routes.login.path)">
                {{ $utils.localeCopy.routes.login.name }}
            </nuxt-link>

        </div>

    </nav>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
