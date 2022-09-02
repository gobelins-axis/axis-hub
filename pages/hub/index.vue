<template>
    <div class="page-hub">

        <div class="container container-small">

            <h1 class="title">
                {{ $utils.localeCopy.hub.title }}
            </h1>

            <ListUserGames :games="games" />

        </div>

        <Footer />
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
