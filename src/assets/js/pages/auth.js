import axios from 'axios';

import funcs from '../../../js/funcs.js';

export default {

	/* === === === === === */
	/* Data
	/* === === === === === */

	data() {
		let mode = this.$route.path.slice(1);

		return {
			mode,

			account: {
				username: '',
				code: '',
				token: '',
				OTPURI: ''
			},

			form: {
				result: '',
				ready: false
			},

			popup: {
				shown: mode === 'register',
				step: 1
			}
		}
	},

	/* === === === === === */
	/* Computed
	/* === === === === === */

	computed: {

		app() {return this.$parent}

	},

	/* === === === === === */
	/* Watch
	/* === === === === === */

	watch: {
		mode(from, to) {
			this.$router.replace(`/${
				to === 'auth' ? 'register' : 'auth'
			}`);
		}
	},

	/* === === === === === */
	/* Methods
	/* === === === === === */

	methods: {

		prevStep() {

			if(this.popup.step <= 1) return;

			this.popup.step !== 1 && --this.popup.step;

		},

		nextStep() {

			if(this.popup.step >= 3) {
				this.popup.shown = false;
			};

			/* === === === === === */
			/* Get token from server
			/* === === === === === */

			if(this.popup.step === 2) {
				return axios.get(`${this.app.baseURL}/createToken`, {
					params: this.account
				}).then((res) => {
					
					this.account.token = res.data.token;
					this.account.OTPURI = res.data.OTPURI;

					++this.popup.step;

					this.form.result = '';

				}).catch((error) => {
					this.form.result = onHTTPError.apply(this, [error]);
				});
			}

			this.popup.step !== 3 && ++this.popup.step;

		},

		validateUsername(e) {

			e.target.maxLength = 15;

			this.account.username = this.account.username
				.replace(/[^\w]$/gi, '');

		},

		validateCode(e) {

			e.target.maxLength = 6;

			this.account.code = this.account.code
				.replace(/[^\d]$/gi, '');

		},

		submit(e) {

			let {results} = this.app.lang.authPage.inputs;

			/* === === === === === */
			/* Open popup if needed
			/* === === === === === */

			if(this.mode === 'register' && !this.account.token) {

				this.form.result = '';

				this.popup.step = 1;
				this.popup.shown = true;

				return;
			}

			/* === === === === === */
			/* Check all fields filled
			/* === === === === === */

			if(!this.account.username || !this.account.code) {
				return this.form.result = results.notFilled;
			}

			/* === === === === === */
			/* Validate fields
			/* === === === === === */

			if(!(/[\w]{4,15}/).test(this.account.username)) {
				return this.form.result = results.invalidUsername;
			}

			if(!(/[\d]{6}/).test(this.account.code)) {
				return this.form.result = results.invalidCode;
			}

			/* === === === === === */
			/* Do action
			/* === === === === === */

			this.form.result = '';

			axios[this.mode === 'auth' ? 'get' : 'post'](`${this.app.baseURL}/${this.mode}`, (this.mode === 'auth' ? {params: this.account} : this.account)).then((res) => {

				this.form.result = '';

				/* === === === === === */
				/* When done
				/* === === === === === */

				this.app.db
					.set('user.username', res.data.user.username)
					.set('user.token', res.data.user.token)
					.set('user.displayName', res.data.user.displayName)
					.set('user.regTS', res.data.user.regTS)
						.write();

				this.$router.push('/account');

			}).catch((error) => {
				this.form.result = onHTTPError.apply(this, [error]);
			});

		}

	},

	/* === === === === === */
	/* Mounted
	/* === === === === === */

	mounted() {



	}

}

function onHTTPError(error) {

	console.error(error.response || error.message);

	let {results} = this.app.lang.authPage.inputs;

	if(!error.response) return;

	/* === === === === === */
	/* Not authed
	/* === === === === === */
	
	if(error.response.status === 401) {
		return results.notAuthed;
	}

	/* === === === === === */
	/* When same user exists
	/* === === === === === */
	
	if(error.response.status === 409) {
		return results.userExists;
	}

	/* === === === === === */
	/* Bad request
	/* === === === === === */
	
	if(error.response.status === 400) {
		return results.e400;
	}

	/* === === === === === */
	/* Otherwise
	/* === === === === === */

	return error.response.data && error.response.data.details.message || error.message;

}