<template>
    <div>

        <form class="update-form" @submit="updateHandler">

            <label for="nameU">Game to update</label>
            <input id="nameU" ref="inputNameU" name="name" type="text">

            <label for="nameU">New game name</label>
            <input id="nameU" ref="newNameU" name="name" type="text">

            <input type="submit" value="Submit">

        </form>

        <form class="delete-form" @submit="deleteHandler">

            <label for="nameD">Game to delete</label>
            <input id="nameD" ref="inputNameD" name="name" type="text">

            <input type="submit" value="Submit">

        </form>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
