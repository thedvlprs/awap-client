<template lang="pug">

	#homePage

		//- === === === === ===
		//- Header
		//- === === === === ===

		header

			//- === === === === ===
			//- Header left
			//- === === === === ===

			.left

				.logo
					img(src="@/assets/images/logo.svg", alt="AWAP Project")

				h1 AWAP Project

			//- === === === === ===
			//- Header right
			//- === === === === ===

			.right
				.buttons
					router-link(to="/register", tag="button").transparent {{app.lang.buttons.register}}
					router-link(to="/auth", tag="button") {{app.lang.buttons.signin}}

		//- === === === === ===
		//- Main contents
		//- === === === === ===

		include ../assets/pug/pages/en/home.pug
		include ../assets/pug/pages/ru/home.pug

		//- === === === === ===
		//- Footer
		//- === === === === ===

		footer
			div Aleoheen &copy; 2019
			div
				div
					a(href="https://github.com/aleoheen/awap-client") {{app.lang.sourceCode}}

</template>

<script src="@/assets/js/pages/home.js"></script>