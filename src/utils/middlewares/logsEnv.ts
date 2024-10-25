let hasLoggedDevelopmentMessage = false;
let hasLoggedProductionMessage = false;

export const logsEnvMiddleware = () => {
	if (process.env.NODE_ENV === 'development' && !hasLoggedDevelopmentMessage) {
		console.log('---------------------------------');
		console.log('🔧 Running in Development Mode');
		console.log('---------------------------------');
		hasLoggedDevelopmentMessage = true;
	} else if (
		process.env.NODE_ENV === 'production' &&
		!hasLoggedProductionMessage
	) {
		console.log('---------------------------------');
		console.log('🚀 Running in Production Mode');
		console.log('---------------------------------');
		hasLoggedProductionMessage = true;
	}
};
