<template lang="pug">
	
	#accountPage
		header

		#accountPage-info
			.avatar
				img(src="@/assets/images/icons/user.svg", alt="User")

			include ../assets/pug/pages/en/account_info.pug
			include ../assets/pug/pages/ru/account_info.pug

</template>

<script src="@/assets/js/pages/account.js"></script>