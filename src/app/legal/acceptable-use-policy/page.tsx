const AcceptableUsePolicy = () => {
	return (
		<div className="max-w-4xl mx-auto py-8 px-4">
			<h1 className="text-2xl font-bold mb-4">Acceptable Use Policy</h1>
			<p className="mb-4">
				This Acceptable Use Policy outlines the rules and guidelines for using{' '}
				<span className="font-bold">ArticleHorizon</span>. By using our
				application, you agree to abide by these policies. Please read them
				carefully.
			</p>

			<section className="mb-6">
				<h2 className="text-lg font-semibold mb-2">1. Prohibited Activities</h2>
				<p>
					Users of <span className="font-bold">ArticleHorizon</span> must not
					engage in any of the following activities:
				</p>
				<ul className="list-disc pl-6">
					<li className="mb-2">
						Violating any applicable laws or regulations.
					</li>
					<li className="mb-2">
						Misusing the app, including but not limited to hacking, phishing, or
						distributing malware.
					</li>
					<li className="mb-2">
						Interfering with the operation of the app or others&apos; use of the app.
					</li>
					<li className="mb-2">
						Posting or transmitting any content that is unlawful, defamatory, or
						infringes on intellectual property rights.
					</li>
				</ul>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold mb-2">2. Reporting Violations</h2>
				<p>
					If you believe a user has violated this Acceptable Use Policy, please
					contact us immediately at [Your Contact Information].
				</p>
			</section>

			<footer className="text-sm text-gray-600">
				<p>**Effective Date:** September 2024</p>
				<p>
					**Educational Use:** Please note that this Acceptable Use Policy is
					for educational purposes only and does not represent legal obligations
					or rights associated with a commercial entity.
				</p>
				<p>
					If you have any questions about our Acceptable Use Policy, please
					contact us at [Your Contact Information].
				</p>
			</footer>
		</div>
	);
};

export default AcceptableUsePolicy;
