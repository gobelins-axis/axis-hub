<template>
    <div class="page-home">

        <SectionHero />

        <!-- Slides over the sticky hero on scroll -->
        <div class="content">

            <SectionGames :games="games" />

            <Footer />

        </div>

    </div>
</template>

<script src="./home/script.js"></script>
<style src="./home/style.scss" lang="scss" scoped></style>
