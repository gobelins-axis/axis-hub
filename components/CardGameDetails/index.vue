<template>
    <div class="card-game-details">

        <div class="image-container">

            <img :src="game.fields.mediumImage.url" alt="" class="image">

        </div>

        <div class="content-container">

            <div class="content">

                <h1 class="name">
                    {{ game.fields.name }}
                </h1>

                <div class="tags-container">
                    <Tags :filters="game.fields.filters" />
                </div>

                <p class="description">
                    {{ game.fields.description }}
                </p>

                <p class="credits">
                    <span>{{ $utils.localeCopy.game.credits }}</span> {{ game.fields.credits }}
                </p>

                <p class="year">
                    <span>{{ $utils.localeCopy.game.year }}</span> {{ game.fields.year }}
                </p>

            </div>

        </div>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
