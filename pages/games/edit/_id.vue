<template>
    <div>

        <form class="update-form" @submit="submitHandler">
            <h1>{{ getSelectGameDatas.fields.name }}</h1>

            <div>
                <label for="nameU">New game</label>
                <input id="nameU" ref="newNameU" name="name" type="text" :value="`${getSelectGameDatas.fields.name}`">
            </div>

            <div>
                <label for="description">Description</label>
                <input id="description" ref="inputDescription" name="description" type="text" :value="`${getSelectGameDatas.fields.description}`" >
            </div>

            <div>
                <label for="url">URL</label>
                <input id="url" ref="inputUrl" name="url" type="text" :value="`${getSelectGameDatas.fields.url}`">
            </div>

            <div>
                <label for="url">Players</label>
                <input id="players" ref="players" name="players" type="number" :value="`${getSelectGameDatas.fields.players}`">
            </div>

            <div>
                <label for="url">Credits</label>
                <input id="credits" ref="credits" name="credits" type="textarea" maxlength="300" :value="`${getSelectGameDatas.fields.credits}`">
            </div>

            <div>
                <label for="url">Active leaderboard</label>
                <input id="leaderboard" ref="leaderboard" name="leaderboard" type="checkbox" :value="`${getSelectGameDatas.fields.leaderboardActive}`">
            </div>

            <div>
                <label for="mediumImage">Medium image</label>
                <input
                    id="mediumImage"
                    ref="mediumImage"
                    type="file"
                    name="mediumImage"
                    accept="image/png, image/jpeg"
                >
            </div>

            <div>

                <label for="largeImage">Large image</label>
                <input
                    id="largeImage"
                    ref="largeImage"
                    type="file"
                    name="largeImage"
                    accept="image/png, image/jpeg"
                >
            </div>

            <div>
                <label for="filters">Filters</label>
                <fieldset>
                    <input ref="onePlayer" type="checkbox" name="filter" value="Solo" checked="`${getSelectGameDatas.fields.onePlayer}`" >Solo<br>
                    <input ref="multiPlayer" type="checkbox" name="filter" value="Multijoueur" checked="`${getSelectGameDatas.fields.multiPlayer}`">Multijoueurs<br>
                    <input ref="experience" type="checkbox" name="filter" value="Experience" checked="`${getSelectGameDatas.fields.experience}`">Experience<br>
                    <input ref="game" type="checkbox" name="filter" value="Jeu" checked="`${getSelectGameDatas.fields.game}`">Jeu<br>
                </fieldset>
            </div>

            <div>
                <label for="filters">Colors</label>
                <input ref="color1" type="color" value="#ff0000">
                <input ref="color2" type="color" value="#ff0000">
            </div>

            <input type="submit" value="Submit">



        </form>

        <button @click="deleteHandler" >DELETE</button>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
