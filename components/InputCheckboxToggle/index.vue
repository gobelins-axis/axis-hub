<template>
    <div :class="`input-checkbox-toggle ${value ? 'checked': ''}`">

        <div class="toggle-score-value yes">
            {{ option1 }}
        </div>

        <div class="toggle-score-value no">
            {{ option2 }}
        </div>

        <div class="bullet-container">

            <div class="bullet"></div>

        </div>

        <input :id="name" type="checkbox" :name="name" :checked="value" @input="inputHandler">

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
