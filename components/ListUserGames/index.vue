<template>
    <ul class="list-user-games">

        <li v-for="(item, index) in cards" :key="index" class="list-item-games">

            <CardCreateGame v-if="item.isCardCreateGame" />

            <CardGameEmpty v-else-if="item.isCardEmpty" />

            <CardUserGame v-else :game="item" />

        </li>

    </ul>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
