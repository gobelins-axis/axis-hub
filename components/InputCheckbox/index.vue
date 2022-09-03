<template>
    <div :class="`input-checkbox ${value ? 'checked': ''}`">

        <div class="bullet"></div>
        <input :id="name" type="checkbox" :name="name" @input="inputHandler">
        <label :for="name">{{ label }}</label>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
