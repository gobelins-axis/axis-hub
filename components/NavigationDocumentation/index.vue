<template>
    <nav class="navigation-documentation">

        <p class="summary">
            {{ $utils.localeCopy.documentation.summary }}
        </p>

        <ul class="list">

            <li v-for="item in items" :key="item.id" class="item">

                <a
                    :href="`#${item.id}`"
                    :class="['link', 'link-primary', { 'is-active': isActive(item) }]"
                    @click.prevent="$emit('select', item.id)"
                >
                    {{ item.label }}
                </a>

                <ul v-if="item.children.length" class="sublist">

                    <li v-for="child in item.children" :key="child.id" class="subitem">

                        <a
                            :href="`#${child.id}`"
                            :class="['link', 'link-secondary', { 'is-active': child.id === activeId }]"
                            @click.prevent="$emit('select', child.id)"
                        >
                            {{ child.label }}
                        </a>

                    </li>

                </ul>

            </li>

        </ul>

    </nav>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
