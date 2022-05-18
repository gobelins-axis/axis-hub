<template>
    <div class="navbar">
        <div class="logo-container">
            <img class="logo-image" src="~/assets/images/logo.jpg" alt="">
            <span class="logo-tagline">Hub</span>
        </div>

        <div class="buttons-container">
            <ButtonLink :link="`/games/create`" class="btn btn-login">
                Connexion
            </ButtonLink>
            <ButtonLink :link="`/games/create`" class="btn btn-signin">
                Commencer à créer
            </ButtonLink>
        </div>
    </div>
</template>

<style src="./style.scss" lang="scss" scoped></style>
<script src="./script.js"></script>
