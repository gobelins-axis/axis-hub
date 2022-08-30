<template>
    <ul class="list-games">

        <li v-for="(item, index) in games" :key="index" class="list-item-games">

            <CardGame :game="item" />

        </li>

    </ul>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
