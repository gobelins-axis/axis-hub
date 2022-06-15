<template>
    <div class="navbar">
        <div class="logo-container">
            <img class="logo-image" src="~/assets/images/logo.svg" alt="">
        </div>

        <div class="buttons-container desktop-only">
            <div v-if="!isUserLoggedIn">
                <ButtonLink :link="`/login`" class="btn btn-login" text="Connexion" type="blank" />
            </div>
            <div v-else class="logged-btns">
                <ButtonLink :link="`/hub`" class="btn btn-myspace" text="Espace créateur" type="blank" />
                <ButtonLink :link="`/`" class="btn btn-myspace" text="Documentation" type="blank" />
                <ButtonLink :link="`/`" class="btn btn-myspace" text="Jeux" type="blank" />
                <ButtonLink :link="`/logout`" class="btn btn-logout" type="styled" text="Déconnexion" />
            </div>
        </div>

        <div class="hamburger-icon mobile-only">
            <img class="mobile-menu" src="~/assets/images/mobile-menu.svg" alt="">
        </div>
    </div>
</template>

<style src="./style.scss" lang="scss" scoped></style>
<script src="./script.js"></script>
