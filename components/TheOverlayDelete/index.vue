<template>
    <div class="the-overlay-delete">

        <div class="background"></div>

        <div class="content">

            <div class="title">
                {{ $utils.localeCopy.create.deleteConfirmation[0] }}
            </div>

            <div class="subtitle">
                {{ $utils.localeCopy.create.deleteConfirmation[1] }}
            </div>

            <button class="button button-primary no" @click="clickNoHandler">
                {{ $utils.localeCopy.create.misc.no }}
            </button>

            <button class="button button-primary yes" @click="clickYesHandler">
                {{ $utils.localeCopy.create.misc.yes }}
            </button>

        </div>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
