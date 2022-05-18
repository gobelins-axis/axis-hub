import ButtonLink from '@/components/ButtonLink';
import { mapGetters } from 'vuex';

export default {
    components: {
        ButtonLink,
    },

    computed: {
        ...mapGetters({
            isUserLoggedIn: 'user/isLoggedIn',
        }),
    },
};
