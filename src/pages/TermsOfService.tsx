import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-darker-bg via-dark-bg to-darker-bg">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-gray-400 mb-8">Last Updated: October 29, 2025</p>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  By accessing and using Function Call's services, you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to these Terms of Service, 
                  please do not use our services.
                </p>
                <p>
                  These terms apply to all visitors, users, and others who access or use our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  Function Call provides web development, mobile app development, custom software solutions, 
                  and related technology services. Our services include but are not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Custom web application development</li>
                  <li>Mobile application development (iOS and Android)</li>
                  <li>E-commerce platform development</li>
                  <li>API development and integration</li>
                  <li>UI/UX design services</li>
                  <li>Maintenance and support services</li>
                  <li>Consulting and technical advisory</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  When you create an account with us, you must provide accurate, complete, and current 
                  information. Failure to do so constitutes a breach of the Terms.
                </p>
                <p>You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Safeguarding your account password</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Ensuring your account information remains accurate and up-to-date</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Project Agreements and Payments</h2>
              <div className="text-gray-300 space-y-3">
                <p><strong>4.1 Project Scope:</strong></p>
                <p>
                  Each project will be governed by a separate project agreement that outlines the scope, 
                  deliverables, timeline, and payment terms. The project agreement will be provided before 
                  work commences.
                </p>
                
                <p className="mt-4"><strong>4.2 Payment Terms:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Payment schedules will be specified in the project agreement</li>
                  <li>Typical payment structure: 50% upfront, 50% upon completion</li>
                  <li>Payments are due within 7 days of invoice date unless otherwise specified</li>
                  <li>Late payments may incur interest charges of 1.5% per month</li>
                  <li>We reserve the right to suspend work for non-payment</li>
                </ul>

                <p className="mt-4"><strong>4.3 Refund Policy:</strong></p>
                <p>
                  Refunds are handled on a case-by-case basis. Work completed prior to cancellation is 
                  non-refundable. Deposits are non-refundable once work has commenced.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property Rights</h2>
              <div className="text-gray-300 space-y-3">
                <p><strong>5.1 Client Ownership:</strong></p>
                <p>
                  Upon full payment, clients own the final deliverables and custom code created specifically 
                  for their project. This includes designs, source code, and documentation.
                </p>

                <p className="mt-4"><strong>5.2 Function Call Ownership:</strong></p>
                <p>We retain ownership of:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Pre-existing code, frameworks, and libraries</li>
                  <li>Reusable components and tools</li>
                  <li>General methodologies and processes</li>
                  <li>Portfolio rights to showcase completed work</li>
                </ul>

                <p className="mt-4"><strong>5.3 Third-Party Components:</strong></p>
                <p>
                  Projects may include third-party libraries and components subject to their own licenses. 
                  Clients are responsible for complying with these licenses.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Confidentiality</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We respect the confidentiality of your business information and will not disclose any 
                  confidential information to third parties without your consent, except as required by law.
                </p>
                <p>
                  Both parties agree to maintain confidentiality of proprietary information shared during 
                  the course of the project.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Warranties and Disclaimers</h2>
              <div className="text-gray-300 space-y-3">
                <p><strong>7.1 Service Warranty:</strong></p>
                <p>
                  We warrant that services will be performed in a professional and workmanlike manner. 
                  We will correct any defects in our work at no additional charge for a period specified 
                  in the project agreement (typically 30-90 days).
                </p>

                <p className="mt-4"><strong>7.2 Disclaimer:</strong></p>
                <p>
                  Except as expressly stated, our services are provided "as is" without warranties of any 
                  kind, either express or implied. We do not warrant that our services will be uninterrupted, 
                  error-free, or completely secure.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  To the maximum extent permitted by law, Function Call shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
                  whether incurred directly or indirectly.
                </p>
                <p>
                  Our total liability for any claims arising from or related to our services shall not exceed 
                  the amount paid by you for the specific service giving rise to the claim.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Client Responsibilities</h2>
              <div className="text-gray-300 space-y-3">
                <p>Clients agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide timely feedback and approvals</li>
                  <li>Supply necessary content, materials, and access</li>
                  <li>Respond to requests for information within reasonable timeframes</li>
                  <li>Ensure they have rights to all materials provided</li>
                  <li>Make timely payments as agreed</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Project Timeline and Delays</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  Project timelines are estimates based on the agreed scope. Delays may occur due to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Client delays in providing feedback or materials</li>
                  <li>Scope changes or additions</li>
                  <li>Technical challenges or third-party dependencies</li>
                  <li>Force majeure events</li>
                </ul>
                <p className="mt-4">
                  We will communicate any anticipated delays promptly and work to minimize their impact.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  Either party may terminate a project agreement with written notice. Upon termination:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Client must pay for all work completed to date</li>
                  <li>Function Call will deliver all completed work</li>
                  <li>Confidentiality obligations continue</li>
                  <li>Intellectual property rights transfer only for paid work</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Dispute Resolution</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  In the event of any dispute arising from these terms or our services, both parties agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>First attempt to resolve the dispute through good faith negotiation</li>
                  <li>Consider mediation before pursuing litigation</li>
                  <li>Submit to the jurisdiction of courts in our operating location</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Changes to Terms</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of any 
                  material changes via email or through our website. Continued use of our services after 
                  changes constitutes acceptance of the new terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
              <div className="text-gray-300 space-y-3">
                <p>For questions about these Terms of Service, please contact us:</p>
                <ul className="list-none space-y-2 ml-4">
                  <li><strong>Email:</strong> legal@functioncall.com</li>
                  <li><strong>Phone:</strong> +1 (754) 242-7030</li>
                  <li><strong>Address:</strong> Function Call Development Agency</li>
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

export default TermsOfService;
