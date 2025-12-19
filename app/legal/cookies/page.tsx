export default function CookiesPage() {
  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-8">
          Cookies Policy
        </h1>
        <div className="prose lg:prose-lg mx-auto text-gray-700">
          <p>
            This Cookies Policy explains what cookies are, how Kazi Agency uses cookies on kaziagency.es, and your choices regarding cookies.
          </p>

          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit a website. They help the website remember information about your visit, which can make your next visit easier and the site more useful to you.
          </p>

          <h2>How Kazi Agency uses cookies</h2>
          <p>
            We use cookies to:
          </p>
          <ul>
            <li>Ensure the website functions properly</li>
            <li>Understand how visitors use our website (analytics)</li>
            <li>Remember your language preference</li>
            <li>Improve user experience</li>
          </ul>

          <h2>Types of cookies we use</h2>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They cannot be switched off in our systems.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this information to improve our website.
            </li>
            <li>
              <strong>Functional Cookies:</strong> These cookies enable enhanced functionality and personalization, such as remembering your language preference.
            </li>
          </ul>

          <h2>Third-party services</h2>
          <p>
            We may use third-party services that set their own cookies:
          </p>
          <ul>
            <li>
              <strong>Analytics Services:</strong> We may use Google Analytics or similar services to understand website usage. You can opt out of Google Analytics cookies by visiting{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                Google Analytics Opt-out
              </a>
            </li>
          </ul>

          <h2>Your cookie choices</h2>
          <p>
            You can control and manage cookies in various ways:
          </p>
          <ul>
            <li>
              <strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience of our website.
            </li>
            <li>
              <strong>Opting Out:</strong> You can opt out of targeted advertising cookies by visiting{" "}
              <a href="http://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">
                Your Online Choices
              </a>
            </li>
          </ul>

          <p>
            Please note that if you choose to block all cookies, you may not be able to access all or parts of our site, or some functionality may be limited.
          </p>

          <h2>More information</h2>
          <p>
            To learn more about cookies and how they work, please visit:
          </p>
          <ul>
            <li>
              AllAboutCookies:{" "}
              <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">
                https://www.allaboutcookies.org/
              </a>
            </li>
          </ul>

          <h2>Contact us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at{" "}
            <a href="mailto:hello@kaziagency.es" className="text-primary hover:underline">hello@kaziagency.es</a>
          </p>
        </div>
      </div>
    </div>
  );
}