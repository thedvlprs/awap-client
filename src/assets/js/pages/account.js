import funcs from '../../../js/funcs'

export default {

	/* === === === === === */
	/* Data
	/* === === === === === */

	data() {
		return {

		}
	},

	/* === === === === === */
	/* Computed
	/* === === === === === */

	computed: {
		app() {return this.$parent},
		user() {return this.app.db.get('user').value() || this.$router.replace('/auth')}
	},

	/* === === === === === */
	/* Methods
	/* === === === === === */

	methods: {

		logout() {
			this.app.db.unset('user').write();

			this.$router.replace('/');
		}

	},

	filters: {

		toPrettyDate(ts) {

			let date = new Date(ts);

			return `${funcs.zero(date.getDate())}.${funcs.zero(date.getMonth()+1)}.${funcs.zero(date.getFullYear())} ${funcs.zero(date.getHours())}:${funcs.zero(date.getMinutes())}`

		}

	}
}