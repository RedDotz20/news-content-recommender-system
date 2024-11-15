export function BoxLoader() {
	return (
		<div className="flex justify-center w-full h-[calc(100vh-140px)]">
			<div className="flex flex-col justify-center items-center gap-6">
				<div className="relative w-16 h-16 animate-loader bg-current">
					<div className="absolute inset-0 rounded-full animation-loader-inner"></div>
				</div>
				<h1>L O A D I N G</h1>
			</div>
		</div>
	);
}
