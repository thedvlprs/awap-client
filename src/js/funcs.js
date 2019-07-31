export default {

	rand(min = 0, max = 1) {
		return Math.round(Math.random() * (max-min) + min);
	},

	onAllPagesMounted() {

		this.$nextTick(() => {

			/* === === === === === */
			/* Remove dragation from images
			/* === === === === === */

			for(let img of document.getElementsByTagName('img')) {
				img.setAttribute('draggable', false);
			}

			/* === === === === === */
			/* Open extended links in new tab
			/* === === === === === */

			for(let a of document.querySelectorAll('a[href^="http"]')) {
				a.setAttribute('target', '_blank');
			}

		})
		
	},

	authRedirects() {

		let onlyAuthed = ['account'];
		let onlyNotAuthed = ['auth', 'register'];

		let authed = this.db.get('user').value() && !!this.db.get('user').value().token;

		if(authed && onlyNotAuthed.includes(this.$route.path.slice(1))) this.$router.replace('/account');
		if(!authed && onlyAuthed.includes(this.$route.path.slice(1))) this.$router.replace('/auth');

	},

	zero(int) {return (int < 10 ? '0' : '') + int}

}