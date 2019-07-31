<template lang="pug">

	#app
		transition(name="page-change", appear, mode="out-in", @after-enter="onAllPagesMounted")
			router-view

		//- === === === === ===
		//- Language button
		//- === === === === ===

		#language-button
			button.transparent(@click="currentLang = currentLang === 'en' ? 'ru' : 'en'") {{currentLang === 'en' ? 'ru' : 'en'}}

</template>

<style>
	@import '/fonts/ProductSans/stylesheet.css';
</style>

<style lang="less">
	@import "./assets/less/main";
</style>

<script src="./assets/js/app.js"></script>