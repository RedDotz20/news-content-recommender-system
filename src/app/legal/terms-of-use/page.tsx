const TermsOfService = () => {
	return (
		<div className="max-w-4xl mx-auto py-8 px-4">
			<h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
			<p className="mb-4">
				Welcome to <span className="font-bold">ArticleHorizon</span>,
				{/* a News Recommender System provided by{' '}<span className="font-bold">[Your Company Name]</span>. */}
				By using our application, you agree to these terms. Please read them
				carefully.
			</p>

			<section className="mb-6">
				<h2 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h2>
				<p>
					By accessing or using{' '}
					<span className="font-bold">ArticleHorizon</span>, you agree to be
					bound by these Terms of Service and our Privacy Policy. If you do not
					agree with any part of these terms, you may not use our app.
				</p>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold mb-2">
					2. Description of Service
				</h2>
				<p>
					<span className="font-bold">ArticleHorizon</span> provides a News
					Recommender System that recommends articles based on user preferences
					and behavior.
				</p>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold mb-2">3. User Responsibilities</h2>
				<ul className="list-disc pl-6">
					<li className="mb-2">
						Accuracy of Information: You agree that the information you provide
						to <span className="font-bold">ArticleHorizon</span> is accurate and
						complete.
					</li>
					<li className="mb-2">
						Acceptable Use: You agree to use{' '}
						<span className="font-bold">ArticleHorizon</span> solely for its
						intended purposes and not to misuse the service.
					</li>
					<li className="mb-2">
						Compliance: You agree to comply with all applicable laws and
						regulations.
					</li>
				</ul>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold mb-2">4. Privacy Policy</h2>
				<p>
					Our Privacy Policy explains how we collect, use, and protect your
					personal data. By using our app, you agree to our Privacy Policy.
				</p>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold mb-2">5. Intellectual Property</h2>
				<p>
					All content and materials available on{' '}
					<span className="font-bold">ArticleHorizon</span> are the property of{' '}
					<span className="font-bold">[Your Company Name]</span>. You may not
					use our trademarks or copyrighted materials without our prior written
					consent.
				</p>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold mb-2">
					6. Limitation of Liability
				</h2>
				<p>
					We are not liable for any indirect, incidental, or consequential
					damages arising out of your use of{' '}
					<span className="font-bold">ArticleHorizon</span>.
				</p>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold mb-2">7. Governing Law</h2>
				<p>
					These Terms of Service are governed by and construed in accordance
					with the laws of{' '}
					<span className="font-bold">[Your Jurisdiction]</span>.
				</p>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold mb-2">8. Changes to Terms</h2>
				<p>
					We reserve the right to update or modify these Terms of Service at any
					time. Changes will be effective immediately upon posting to our app.
				</p>
			</section>

			<footer className="text-sm text-gray-600">
				<p>**Effective Date:** September 2024</p>
				<p>
					**Educational Use:** Please note that these Terms of Service are for
					educational purposes only and do not represent legal obligations or
					rights associated with a commercial entity.
				</p>
				<p>
					If you have any questions about our Terms of Service, please contact
					us at [Your Contact Information].
				</p>
			</footer>
		</div>
	);
};

export default TermsOfService;
