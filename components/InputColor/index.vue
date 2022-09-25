<template>
    <div class="input-color">
        <div class="input-container">
            <input
                spellcheck="false"
                :name="name"
                type="text"
                pattern="^#([0-9a-f]{3}){1,2}"
                :value="value"
                required
                autocomplete="off"
                @input="inputHandler"
            />
        </div>

        <div class="color-preview-container">
            <div
                :style="`background-color: ${value}`"
                class="color-preview"
            ></div>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
