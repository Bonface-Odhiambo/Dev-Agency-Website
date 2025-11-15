import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-darker-bg via-dark-bg to-darker-bg">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-gray-400 mb-8">Last Updated: October 29, 2025</p>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  At Kalocode, we collect information that you provide directly to us when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create an account or register for our services</li>
                  <li>Submit a service request or contact form</li>
                  <li>Subscribe to our newsletter or communications</li>
                  <li>Participate in surveys or promotions</li>
                  <li>Communicate with our support team</li>
                </ul>
                <p className="mt-4">
                  The types of information we may collect include your name, email address, phone number, 
                  company name, project details, and any other information you choose to provide.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <div className="text-gray-300 space-y-3">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and complete transactions</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Communicate with you about products, services, and events</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues and security threats</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing and Disclosure</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>With your consent:</strong> We may share your information when you give us permission</li>
                  <li><strong>Service providers:</strong> We may share information with vendors and service providers who perform services on our behalf</li>
                  <li><strong>Legal requirements:</strong> We may disclose information if required by law or in response to legal process</li>
                  <li><strong>Business transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We take reasonable measures to help protect your personal information from loss, theft, 
                  misuse, unauthorized access, disclosure, alteration, and destruction. We use industry-standard 
                  security measures including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Secure data storage and backup systems</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Cookies and Tracking Technologies</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We use cookies and similar tracking technologies to collect and track information about your 
                  use of our services. Cookies are small data files stored on your device. You can instruct 
                  your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights and Choices</h2>
              <div className="text-gray-300 space-y-3">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct or update your personal information</li>
                  <li>Delete your personal information</li>
                  <li>Object to or restrict the processing of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at privacy@functioncall.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  Our services are not directed to children under the age of 13. We do not knowingly collect 
                  personal information from children under 13. If you become aware that a child has provided 
                  us with personal information, please contact us.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  Your information may be transferred to and maintained on computers located outside of your 
                  state, province, country, or other governmental jurisdiction where data protection laws may 
                  differ. We will take appropriate measures to ensure your data receives adequate protection.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Privacy Policy</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last Updated" date. You are 
                  advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
              <div className="text-gray-300 space-y-3">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul className="list-none space-y-2 ml-4">
                  <li><strong>Email:</strong> privacy@kalocode.com</li>
                  <li><strong>Phone:</strong> +1 (754) 242-7030</li>
                  <li><strong>Address:</strong> Kalocode Development Agency</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
