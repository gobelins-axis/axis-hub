<template>
    <div class="page-games">

        <div class="container container-small">

            <h1 class="title">
                {{ $utils.localeCopy.games.title }}
            </h1>

            <ListGames :games="games" />

        </div>

        <Footer />
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
