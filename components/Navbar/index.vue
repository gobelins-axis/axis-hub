<template>
    <div class="navbar">
        <div class="logo-container">
            <img class="logo-image" src="~/assets/images/logo.svg" alt="">
        </div>

        <div class="buttons-container desktop-only">
            <div v-if="!isUserLoggedIn">
                <ButtonLink :link="`/login`" class="btn btn-login">
                    Connexion
                </ButtonLink>
            </div>
            <div v-else>
                <ButtonLink :link="`/hub`" class="btn btn-myspace">
                    Mon espace
                </ButtonLink>
                <ButtonLink :link="`/logout`" class="btn btn-logout">
                    Déconnexion
                </ButtonLink>
            </div>
        </div>

        <div class="hamburger-icon mobile-only">
            <img class="mobile-menu" src="~/assets/images/mobile-menu.svg" alt="">
        </div>
    </div>
</template>

<style src="./style.scss" lang="scss" scoped></style>
<script src="./script.js"></script>
