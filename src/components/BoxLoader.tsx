export function BoxLoader() {
	return (
		<div className={`relative w-16 h-16 animate-loader bg-current`}>
			<div className="absolute inset-0 rounded-full animation-loader-inner"></div>
		</div>
	);
}
