import { createSafeActionClient } from 'next-safe-action';

export const actionClient = createSafeActionClient({
	// Can also be an async function.
	handleServerError(e, utils) {
		// You can access these properties inside the `utils` object.
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { clientInput, bindArgsClientInputs, metadata, ctx } = utils;

		// Log to console.
		console.error('Action error:', e.message);

		// Return generic message
		return 'Something Went Wrong!';
	},
});
