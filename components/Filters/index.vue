<template>
    <div class="filter-container">
        <div class="desktop-only">
            <div v-if="background" class="background"></div>
            <div class="filters">
                <div class="filter" @click="clickFilterHandler(0)" :class="{active: activeFilter === 'all' }">Tout</div>
                <div class="filter" @click="clickFilterHandler(1)" :class="{active: activeFilter === 'games' }">Jeux
                </div>
                <div class="filter" @click="clickFilterHandler(2)" :class="{active: activeFilter === 'experiences' }">
                    Experience
                </div>
                <div class="filter" @click="clickFilterHandler(3)" :class="{active: activeFilter === 'solo' }">Solo
                </div>
                <div class="filter" @click="clickFilterHandler(4)" :class="{active: activeFilter === 'multi' }">Multi
                </div>
            </div>
        </div>

        <div class="mobile-tablet-only">
            <fieldset ref="tags">
                <div class="checkbox" @click="clickFilterHandler(0)" :class="{active: activeFilter === 'all' }">
                    <label>
                        <span class="checkbox-title">Tout</span>
                        <span class="custom__check"></span>
                    </label>
                </div>
                <div class="checkbox" @click="clickFilterHandler(1)" :class="{active: activeFilter === 'games' }">
                    <label>
                        <span class="checkbox-title">Jeu</span>
                        <span class="custom__check"></span>
                    </label>
                </div>
                <div class="checkbox" @click="clickFilterHandler(2)" :class="{active: activeFilter === 'experiences' }">
                    <label>
                        <span class="checkbox-title">XP</span>
                        <span class="custom__check"></span>
                    </label>
                </div>
                <div class="checkbox" @click="clickFilterHandler(3)" :class="{active: activeFilter === 'solo' }">
                    <label>
                        <span class="checkbox-title">Solo</span>
                        <span class="custom__check"></span>
                    </label>
                </div>
                <div class="checkbox" @click="clickFilterHandler(4)" :class="{active: activeFilter === 'multi' }">
                    <label>
                        <span class="checkbox-title">Multi</span>
                        <span class="custom__check"></span>
                    </label>
                </div>


            </fieldset>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
