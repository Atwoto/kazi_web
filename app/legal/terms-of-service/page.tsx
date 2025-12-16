export default function TermsOfServicePage() {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 text-gray-900">
          Terms of Service
        </h1>
        <div className="prose lg:prose-lg mx-auto text-gray-600">
          <p>
            Welcome to Kazi. By using our services, you agree to the following terms.
          </p>

          <h3>1. Core Business Rules</h3>
          <p><strong>Communication Rule:</strong> All client communication must go through Kazi. Direct contact with freelancers is prohibited to ensure quality control.</p>
          <p><strong>Off-Platform Rule:</strong> You agree not to request or share contact details to move communication or payment off the Kazi platform. Doing so will result in immediate service termination.</p>
          <p><strong>Anonymity Rule:</strong> Freelancers are not provided with your personal details beyond what is strictly necessary to complete the job.</p>

          <h3>2. Delivery & Revisions</h3>
          <p>
            Deliverables are released in stages. You may receive watermarked previews for video or design work.
            Final files are released only after full payment is confirmed.
            Revisions are limited to the rounds specified in your quote.
          </p>

          <h3>3. Payments & Refunds</h3>
          <p>
            Payments are milestone-based. We offer a free refund up to 5 days after completion if a freelancer error is proven.
            If you disappear mid-project (unresponsive for 14+ days), we reserve the right to close the project and retain the deposit.
          </p>

          <h3>4. Academic Support Compliance</h3>
          <p>
            Kazi provides editing, proofreading, formatting, and coaching. <strong>We do not market ghostwriting for student assignments, exams, or graded submissions.</strong>
            Clients engaging us for academic support agree that:
          </p>
          <ul>
            <li>They must review the work themselves.</li>
            <li>They are solely responsible for the final submission.</li>
            <li>Any academic repercussions are their sole responsibility, not Kazi's.</li>
          </ul>

          <h3>5. Intellectual Property</h3>
          <p>
            Upon final payment, full intellectual property rights for the completed work (excluding academic support coaching materials) are transferred to the client.
          </p>
        </div>
      </div>
    </div>
  );
}
