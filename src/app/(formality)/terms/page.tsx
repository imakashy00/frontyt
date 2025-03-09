import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const TermsAndConditions = () => {
  const lastUpdated = "March 8, 2025";

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center text-[#5d3fd3] hover:text-[#4d33ac] mb-8 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" /> Back to home
        </Link>

        <h1 className="text-3xl font-bold mb-2">Terms and Conditions</h1>
        <p className="text-gray-500 mb-8 pb-4 border-b">
          Last Updated: {lastUpdated}
        </p>

        {/* Table of Contents */}
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <h2 className="text-lg font-medium mb-3">Contents</h2>
          <ol className="list-decimal list-inside space-y-1 text-[#5d3fd3]">
            <li>
              <a href="#general" className="hover:underline">
                General Information
              </a>
            </li>
            <li>
              <a href="#accounts" className="hover:underline">
                User Accounts
              </a>
            </li>
            <li>
              <a href="#description" className="hover:underline">
                Service Description
              </a>
            </li>
            <li>
              <a href="#payment" className="hover:underline">
                Subscription and Payment
              </a>
            </li>
            <li>
              <a href="#content" className="hover:underline">
                User Content and Ownership
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:underline">
                Privacy and Data Storage
              </a>
            </li>
            <li>
              <a href="#ip" className="hover:underline">
                Intellectual Property
              </a>
            </li>
            <li>
              <a href="#availability" className="hover:underline">
                Service Availability and Liability
              </a>
            </li>
            <li>
              <a href="#termination" className="hover:underline">
                Account Suspension and Termination
              </a>
            </li>
            <li>
              <a href="#changes" className="hover:underline">
                Changes to Terms
              </a>
            </li>
            <li>
              <a href="#law" className="hover:underline">
                Governing Law
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact Information
              </a>
            </li>
          </ol>
        </div>

        <p className="my-6 text-gray-700">
          Welcome to{" "}
          <span className="font-semibold text-gray-800">YTNotes</span>{" "}
          (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By using our
          website (
          <a
            href="https://ytnotes.co"
            className="text-[#5d3fd3] hover:underline"
          >
            ytnotes.co
          </a>
          ) and services, you agree to comply with and be bound by the following
          Terms and Conditions. If you do not agree, please do not use our
          services.
        </p>

        <section id="general" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. General Information
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-medium">Business Name:</span> YTNotes
            </li>
            <li>
              <span className="font-medium">Website URL:</span>{" "}
              <a
                href="https://ytnotes.co"
                className="text-[#5d3fd3] hover:underline"
              >
                https://ytnotes.co
              </a>
            </li>
            <li>
              <span className="font-medium">Business Location:</span> India
            </li>
            <li>
              <span className="font-medium">No Age Restriction</span>
            </li>
          </ul>
        </section>

        <section id="accounts" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Users must create an account to access the service.</li>
            <li>
              Users must provide accurate information, including name, email,
              and profile image.
            </li>
            <li>
              We reserve the right to suspend or terminate accounts that violate
              these terms.
            </li>
          </ul>
        </section>

        <section id="description" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Service Description
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              YTNotes allows users to generate transcripts and notes from
              YouTube video URLs.
            </li>
            <li>Users can upload images and text to their notes.</li>
            <li>
              The generated notes, along with uploaded images, will be stored in
              our database.
            </li>
          </ul>
        </section>

        <section id="payment" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Subscription and Payment
          </h2>
          <div className="text-gray-700">
            <p className="mb-2">
              <span className="font-medium">Subscription Plans:</span>
            </p>
            <ul className="list-disc ml-6 space-y-1 mb-4">
              <li>
                <span className="font-medium">Monthly:</span> $19 (auto-renewal)
              </li>
              <li>
                <span className="font-medium">Yearly:</span> $199 (auto-renewal)
              </li>
            </ul>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Payments are processed through secure third-party services.
              </li>
              <li>
                Users can cancel their subscription at any time via a simple
                button in the application.
              </li>
              <li>
                <span className="font-medium">Refund Policy:</span> Refunds are
                only available if requested within{" "}
                <span className="font-medium">24 hours</span> of purchase.
              </li>
            </ul>
          </div>
        </section>

        <section id="content" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. User Content and Ownership
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              You retain ownership of your content, but grant us a license to
              use, store, and display your content in connection with providing
              our services.
            </li>
            <li>
              You are responsible for ensuring you have the necessary rights to
              any content you upload or create using our service.
            </li>
            <li>
              We do not claim ownership of your notes but reserve the right to
              use anonymized data for service improvements.
            </li>
            <li>
              You agree not to use our service to infringe upon others&apos;
              intellectual property rights.
            </li>
          </ul>
        </section>

        <section id="privacy" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Privacy and Data Storage
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              We collect and process personal information as outlined in our
              Privacy Policy.
            </li>
            <li>
              User data is stored securely in cloud storage services with
              industry-standard encryption.
            </li>
            <li>
              We retain your data for as long as your account is active or as
              needed to provide you services.
            </li>
            <li>
              You can request a copy of your data or account deletion as per
              applicable data protection laws.
            </li>
          </ul>
        </section>

        <section id="ip" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Intellectual Property
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              The YTNotes service, including all software, design, and content
              created by us, is owned by YTNotes.
            </li>
            <li>
              Our name, logo, and branding elements are our trademarks and may
              not be used without permission.
            </li>
            <li>
              The AI-generated notes are provided for your personal use only and
              should not be redistributed commercially.
            </li>
            <li>
              Our service leverages third-party content (YouTube videos) and
              users must comply with YouTube&apos;s Terms of Service when using
              our platform.
            </li>
          </ul>
        </section>

        <section id="availability" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Service Availability and Liability
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              We strive for 99.9% uptime but do not guarantee uninterrupted
              service.
            </li>
            <li>
              We are not liable for any damages arising from service
              interruptions, errors in note generation, or data loss.
            </li>
            <li>
              The service is provided &isquot;as is&quot; without warranties of
              any kind, either express or implied.
            </li>
            <li>
              Our maximum liability is limited to the amount you paid for the
              service in the past 12 months.
            </li>
            <li>
              We are not responsible for the content or accuracy of AI-generated
              notes.
            </li>
          </ul>
        </section>

        <section id="termination" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            9. Account Suspension and Termination
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              We reserve the right to suspend or terminate accounts that violate
              these Terms, engage in illegal activities, or abuse our service.
            </li>
            <li>
              Upon termination, your access to the service will be immediately
              revoked.
            </li>
            <li>
              You may request to download your data before account deletion.
            </li>
            <li>
              We may delete your data 30 days after account termination unless
              required to retain it by law.
            </li>
          </ul>
        </section>

        <section id="changes" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>We reserve the right to modify these Terms at any time.</li>
            <li>
              Changes will be effective immediately upon posting on our website.
            </li>
            <li>
              We will notify users of significant changes via email or in-app
              notification.
            </li>
            <li>
              Your continued use of the service after changes constitutes
              acceptance of the updated Terms.
            </li>
          </ul>
        </section>

        <section id="law" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>These Terms shall be governed by the laws of India.</li>
            <li>
              Any disputes arising from these Terms shall be subject to the
              exclusive jurisdiction of courts in India.
            </li>
            <li>
              If any provision of these Terms is found invalid, the remaining
              provisions will continue in full effect.
            </li>
          </ul>
        </section>

        <section id="contact" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            12. Contact Information
          </h2>
          <p className="text-gray-700">
            For any questions, please contact us at{" "}
            <a
              href="mailto:yakashadav26@gmail.com"
              className="text-[#5d3fd3] hover:underline"
            >
              yakashadav26@gmail.com
            </a>
            .
          </p>
        </section>

        <p className="mt-10 pt-6 border-t text-center text-gray-700">
          Thank you for using YTNotes!
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
