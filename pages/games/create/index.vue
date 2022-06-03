<template>
    <div>
        <h1>Create game</h1>

        <form class="form-container" @submit="submitHandler">
            <div>
                <label for="name">Name</label>
                <input id="name" ref="inputName" name="name" type="text">
            </div>

            <div>
                <label for="description">Description</label>
                <input id="description" ref="inputDescription" name="description" type="text">
            </div>

            <div>
                <label for="url">URL</label>
                <input id="url" ref="inputUrl" name="url" type="text">
            </div>

            <div>
                <label for="url">Players</label>
                <input id="players" ref="players" name="players" type="number">
            </div>

            <div>
                <label for="url">Credits</label>
                <input id="credits" ref="credits" name="credits" type="textarea" maxlength="300">
            </div>

            <div>
                <label for="url">Active leaderboard</label>
                <input id="leaderboard" ref="leaderboard" name="leaderboard" type="checkbox">
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
                    <input ref="onePlayer" type="checkbox" name="filter" value="Solo">Solo<br>
                    <input ref="multiPlayer" type="checkbox" name="filter" value="Multijoueur">Multijoueurs<br>
                    <input ref="experience" type="checkbox" name="filter" value="Experience">Experience<br>
                    <input ref="game" type="checkbox" name="filter" value="Jeu">Jeu<br>
                </fieldset>
            </div>

            <div>

                <label for="filters">Colors</label>
                <input ref="color1" value="#ffffff">
                <input ref="color2" value="#ffffff">
            </div>

            <input type="submit" value="Submit">

        </form>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
