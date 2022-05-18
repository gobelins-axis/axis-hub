<template>
    <div>
        <h1>Create game</h1>

        <form @submit="submitHandler">

            <label for="name">Name</label>
            <input id="name" ref="inputName" name="name" type="text">

            <label for="description">Description</label>
            <input id="description" ref="inputDescription" name="description" type="text">

            <label for="url">URL</label>
            <input id="url" ref="inputUrl" name="url" type="text">

            <label for="image">Image</label>
            <input
                id="image"
                ref="inputImage"
                type="file"
                name="image"
                accept="image/png, image/jpeg"
            >

            <input type="submit" value="Submit">

        </form>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
