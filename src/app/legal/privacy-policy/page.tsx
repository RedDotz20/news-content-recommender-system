export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Privacy Policy</h1>
      <p className="mb-4">
        Welcome to <span className="font-bold">ArticleHorizon</span>,
        {/* providedby <span className="font-bold">[Your Company Name]</span>. */}
        This Privacy Policy explains how we collect, use, and protect your personal information.
        Please read it carefully.
      </p>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">1. Information We Collect</h2>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            Personal Information: We may collect personal information such as your name, email
            address, and preferences when you register or use our app.
          </li>
          <li className="mb-2">
            Usage Data: We collect information about your interactions with our app, including
            articles viewed and preferences.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">2. Use of Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6">
          <li className="mb-2">Provide and improve our News Recommender System.</li>
          <li className="mb-2">Personalize content recommendations based on your preferences.</li>
          <li className="mb-2">Communicate with you, including for customer support purposes.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">3. Data Sharing</h2>
        <p>
          We do not share your personal information with third parties except as necessary for the
          functioning of our app or as required by law.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal
          information from unauthorized access, use, or disclosure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">5. Your Choices</h2>
        <p>You can:</p>
        <ul className="list-disc pl-6">
          <li className="mb-2">Update or correct your personal information.</li>
          <li className="mb-2">Opt-out of certain data collection or processing activities.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">6. Children&apos;s Privacy</h2>
        <p>
          Our app is not intended for children under the age of 13. We do not knowingly collect
          personal information from children under 13.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">7. Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on our app.
        </p>
      </section>

      <footer className="text-sm text-gray-600">
        <p>**Effective Date: September 2024</p>
        <p>
          **Educational Use:** Please note that this Privacy Policy is for educational purposes only
          and does not represent legal obligations or rights associated with a commercial entity.
        </p>
        <p>
          If you have any questions about our Privacy Policy, please contact us at [Contact
          Information].
        </p>
      </footer>
    </div>
  );
}
