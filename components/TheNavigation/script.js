// Vendor
import { mapGetters } from 'vuex';

// Components
import ButtonHome from '@/components/ButtonHome';

export default {
    computed: {
        ...mapGetters({
            isLoggedIn: 'user/isLoggedIn',
        }),
    },

    components: {
        ButtonHome,
    },
};
