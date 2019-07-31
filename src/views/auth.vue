<template lang="pug">

	#authPage
		div

			//- === === === === ===
			//- Profile icon
			//- === === === === ===

			.profile-icon
				img(src="@/assets/images/icons/user.svg", alt="User")

			//- === === === === ===
			//- Page title
			//- === === === === ===

			.page-title
				div(v-if="mode === 'auth'").
					{{app.lang.authPage.title.signin}}

				div(v-else).
					{{app.lang.authPage.title.register}}

			//- === === === === ===
			//- Form Auth
			//- === === === === ===

			form(v-if="mode === 'auth'", @submit.prevent="submit")

				.form-field
					input(type="text", :placeholder="app.lang.authPage.inputs.username.placeholder + '...'", v-model="account.username", @input.prevent="validateUsername")

				.form-field
					input(type="text", :placeholder="app.lang.authPage.inputs.code.placeholder + '...'", v-model="account.code", @input.prevent="validateCode")

				transition(name="fade")
					.form-result(v-show="form.result")
						div {{form.result}}

				.form-button
					button {{app.lang.buttons.signin}}

			//- === === === === ===
			//- Form Register
			//- === === === === ===

			form(v-else, @submit.prevent="submit")

				.form-field
					input(type="text", @input="account.token = ''", :placeholder="app.lang.authPage.inputs.username.placeholder + '...'", v-model="account.username", @input.prevent="validateUsername", :readonly="account.otpCode === account.code")

				.form-field(v-if="account.token")
					input(type="text", :placeholder="app.lang.authPage.inputs.code.placeholder + '...'", v-model="account.code", @input.prevent="validateCode")

				transition(name="form-result")
					.form-result(v-show="form.result")
						div {{form.result}}

				.form-button
					button {{app.lang.buttons.register}}

			//- === === === === ===
			//- Auth tip
			//- === === === === ===

			.auth-tip
				div(v-if="mode === 'auth'").
					{{app.lang.authPage.authTips.register}} - <a @click.prevent="mode = 'register'" href="#">{{app.lang.buttons.register}}</a>

				div(v-else).
					{{app.lang.authPage.authTips.auth}} - <a @click.prevent="mode = 'auth'" href="#">{{app.lang.buttons.signin}}</a>

		//- === === === === ===
		//- Popup
		//- === === === === ===

		transition(name="fade")
			#authPage-popup(v-if="popup.shown")
				include ../assets/pug/pages/en/auth_popup.pug
				include ../assets/pug/pages/ru/auth_popup.pug


</template>

<script src="@/assets/js/pages/auth.js"></script>