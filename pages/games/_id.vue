<template>
    <div class="content">
        <img class="cover-image" alt="" :src="getSelectGameDatas.fields.mediumImage.url"/>
        <div class="page-wrapper">
            <ButtonLink class="back-button" link="/games" icon="arrow-left" text="Retour aux jeux" />
            <div class="game-infos">
                <div class="game-infos-text">
                    <p class="page-title">{{ getSelectGameDatas.fields.name }}</p>
                    <div class="tag-container">
                        <Gametag v-for="tag in getTags" :type="tag[0]"/>
                    </div>
                    <p class="text">{{ getSelectGameDatas.fields.description }}</p>
                    <p class="text credits">{{ getSelectGameDatas.fields.credits }}</p>
                    <p class="text year">Crée en {{ getSelectGameDatas.fields.year }}</p>
                </div>
                <img class="game-infos-image" :src="getSelectGameDatas.fields.largeImage.url" />
            </div>
        </div>
    </div>
</template>

<script src="./id/script.js"></script>
<style src="./id/style.scss" lang="scss" scoped></style>
