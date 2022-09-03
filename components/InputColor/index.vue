<template>
    <div class="input-color">

        <div class="input-container">

            <input
                spellcheck="false"
                :name="name"
                type="text"
                :value="value"
                required
                autocomplete="false"
                @input="inputHandler"
            >

        </div>

        <div class="color-preview-container">

            <div :style="`background-color: ${value}`" class="color-preview"></div>

        </div>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
