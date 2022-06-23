import ButtonLink from '@/components/ButtonLink';
import { mapGetters } from 'vuex';

export default {
    components: {
        ButtonLink,
    },

    props: ['theme'],

    computed: {
        ...mapGetters({
            isUserLoggedIn: 'user/isLoggedIn',
        }),
    },
};
