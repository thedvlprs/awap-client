import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

import funcs from '@/js/funcs'

/* === === === === === */
/* Initialize local db
/* === === === === === */

const adapter = new LocalStorage('db');
const db = low(adapter);

db.defaults({user: {}, lang: ''}).write();

/* === === === === === */
/* Action
/* === === === === === */

export default {

	/* === === === === === */
	/* Data
	/* === === === === === */

	data() {
		return {
			currentLang: db.get('lang').value() || 'en',
			baseURL: process.env.NODE_ENV === 'production' ? 'https://api.awap.pw' : 'http://192.168.43.116:8002',
			db
		}
	},

	/* === === === === === */
	/* Computed
	/* === === === === === */

	computed: {

		lang() {return require(`../json/lang/${this.currentLang}.json`)}

	},

	/* === === === === === */
	/* Watch
	/* === === === === === */

	watch: {

		$route() {
			funcs.onAllPagesMounted.call(this);
			funcs.authRedirects.call(this);
		},

		currentLang(lang) {
			db.set('lang', lang).write();
		}
	},

	/* === === === === === */
	/* Methods
	/* === === === === === */

	methods: {

		onAllPagesMounted() {funcs.onAllPagesMounted.call(this)}

	},

	/* === === === === === */
	/* Mounted
	/* === === === === === */

	mounted() {
		funcs.onAllPagesMounted.call(this);

		/* === === === === === */
		/* Auth redirects
		/* === === === === === */

		funcs.authRedirects.call(this);

		/* === === === === === */
		/* Detect browser language
		/* === === === === === */

		if(!db.get('lang').value()) {
			let lang = navigator.language && navigator.language.match(/\w+/)[0];

			if(!['en', 'ru'].includes(lang)) lang = 'en';

			this.currentLang = lang;
		}
	}
}