import {mapGetters} from "vuex";
import slugify from "slugify";
import Gametag from '@/components/Gametag';
import ButtonLink from '@/components/ButtonLink';

export default {
    layout: 'single-game',

    name: 'single-game',

    components: {Gametag, ButtonLink},

    data() {
        return {
            formatedName: slugify(this.$route.params.id)
        }
    },


    computed: {
        ...mapGetters({
            games: 'games/games',
        }),

        getSelectGameDatas() {
            return this.games.find(r => r.id.includes(this.formatedName))
        },

        getSelectGameID() {
            return this.games.find(r => r.id.includes(this.formatedName).id)
        },

        getTags() {
            const game = this.games.find(r => r.id.includes(this.formatedName))
            const filtersArray = Object.entries(game.fields.filters);
            return filtersArray.filter(filter => filter[1] === true)
        },

        tagList() {
            return getSelectGameDatas()
        }
    }

}
