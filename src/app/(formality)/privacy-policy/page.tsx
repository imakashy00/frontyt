import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const PrivacyPolicy = () => {
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

        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8 pb-4 border-b">
          Last Updated: {lastUpdated}
        </p>

        {/* Table of Contents */}
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <h2 className="text-lg font-medium mb-3">Contents</h2>
          <ol className="list-decimal list-inside space-y-1 text-[#5d3fd3]">
            <li>
              <a href="#introduction" className="hover:underline">
                Introduction
              </a>
            </li>
            <li>
              <a href="#information-collect" className="hover:underline">
                Information We Collect
              </a>
            </li>
            <li>
              <a href="#information-use" className="hover:underline">
                How We Use Your Information
              </a>
            </li>
            <li>
              <a href="#data-storage" className="hover:underline">
                Data Storage and Security
              </a>
            </li>
            <li>
              <a href="#information-sharing" className="hover:underline">
                Information Sharing
              </a>
            </li>
            <li>
              <a href="#cookies" className="hover:underline">
                Cookies and Tracking
              </a>
            </li>
            <li>
              <a href="#user-rights" className="hover:underline">
                Your Rights and Choices
              </a>
            </li>
            <li>
              <a href="#data-retention" className="hover:underline">
                Data Retention
              </a>
            </li>
            <li>
              <a href="#childrens-privacy" className="hover:underline">
                Children&apos;s Privacy
              </a>
            </li>
            <li>
              <a href="#policy-changes" className="hover:underline">
                Changes to Privacy Policy
              </a>
            </li>
            <li>
              <a href="#contact-us" className="hover:underline">
                Contact Information
              </a>
            </li>
          </ol>
        </div>

        <p className="my-6 text-gray-700">
          At <span className="font-semibold text-gray-800">YTNotes</span>, we
          respect your privacy and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you use our service.
        </p>

        <section id="introduction" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-3">
            This Privacy Policy applies to all information collected through our
            website at{" "}
            <a
              href="https://ytnotes.co"
              className="text-[#5d3fd3] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ytnotes.co
            </a>{" "}
            and related services, applications, and tools where this policy is
            referenced (collectively referred to as the &quot;ervices&quot;).
          </p>
          <p className="text-gray-700">
            By accessing or using our Services, you signify that you have read,
            understood, and agree to our collection, storage, use, and
            disclosure of your personal information as described in this Privacy
            Policy.
          </p>
        </section>

        <section id="information-collect" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>

          <h3 className="text-xl font-medium mb-3">
            2.1 Information You Provide to Us
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <span className="font-medium">Account Information:</span> When you
              register for an account, we collect your name, email address, and
              profile image.
            </li>
            <li>
              <span className="font-medium">User Content:</span> We collect and
              store the notes you create, YouTube video URLs you submit, and any
              images or text you upload to our platform.
            </li>
            <li>
              <span className="font-medium">Payment Information:</span> If you
              subscribe to our premium services, we collect billing details.
              However, full payment information is processed by our third-party
              payment processors.
            </li>
            <li>
              <span className="font-medium">Communications:</span> If you
              contact us directly, we may receive additional information about
              you, such as your name, email address, and the contents of your
              message.
            </li>
          </ul>

          <h3 className="text-xl font-medium mb-3">
            2.2 Information Collected Automatically
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-medium">Usage Information:</span> We collect
              information about your interactions with our Services, such as the
              pages you view, features you use, and time spent on the platform.
            </li>
            <li>
              <span className="font-medium">Device Information:</span> We
              collect information about your device, including IP address,
              browser type, operating system, and device identifiers.
            </li>
            <li>
              <span className="font-medium">
                Cookies and Similar Technologies:
              </span>{" "}
              We use cookies and similar tracking technologies to track activity
              on our Services and hold certain information.
            </li>
          </ul>
        </section>

        <section id="information-use" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>

          <p className="text-gray-700 mb-3">
            We use the information we collect for various purposes, including
            to:
          </p>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Provide, maintain, and improve our Services</li>
            <li>Process and complete transactions</li>
            <li>Generate AI-powered notes from YouTube videos</li>
            <li>
              Send you technical notices, updates, security alerts, and support
              messages
            </li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Develop new products and services</li>
            <li>Monitor and analyze usage trends and preferences</li>
            <li>
              Detect, investigate, and prevent fraudulent transactions and
              unauthorized access
            </li>
            <li>Personalize your experience on our Services</li>
          </ul>
        </section>

        <section id="data-storage" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Data Storage and Security
          </h2>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              We use Neon DB to store user data, including emails, names,
              profile images, and generated notes.
            </li>
            <li>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized or unlawful
              processing, accidental loss, destruction, or damage.
            </li>
            <li>
              While we strive to use commercially acceptable means to protect
              your personal information, no method of transmission over the
              Internet or electronic storage is 100% secure, and we cannot
              guarantee absolute security.
            </li>
            <li>
              We regularly review and update our security practices to enhance
              protection of your information.
            </li>
          </ul>
        </section>

        <section id="information-sharing" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Information Sharing
          </h2>

          <p className="text-gray-700 mb-3">
            We may share your information in the following situations:
          </p>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-medium">With Service Providers:</span> We
              share information with third-party vendors who provide services on
              our behalf, such as payment processing, data analysis, email
              delivery, and hosting services.
            </li>
            <li>
              <span className="font-medium">With Your Consent:</span> We may
              share your information for any other purpose disclosed to you with
              your consent.
            </li>
            <li>
              <span className="font-medium">For Legal Reasons:</span> We may
              disclose your information if we believe it is necessary to comply
              with a legal obligation, protect and defend our rights or
              property, prevent fraud, or protect the safety of our users.
            </li>
            <li>
              <span className="font-medium">Business Transfers:</span> In
              connection with any merger, sale of company assets, financing, or
              acquisition of all or a portion of our business, your information
              may be transferred as a business asset.
            </li>
          </ul>

          <p className="text-gray-700 mt-3">
            We do not sell or rent your personal information to third parties
            for their marketing purposes without your explicit consent.
          </p>
        </section>

        <section id="cookies" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Cookies and Tracking
          </h2>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              We use cookies and similar tracking technologies to track activity
              on our Services and store certain information.
            </li>
            <li>
              Cookies are files with a small amount of data that may include an
              anonymous unique identifier.
            </li>
            <li>
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our Services.
            </li>
            <li>
              We use both session cookies and persistent cookies. Session
              cookies expire when you close your browser, while persistent
              cookies remain on your device until they expire or are deleted.
            </li>
          </ul>
        </section>

        <section id="user-rights" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Your Rights and Choices
          </h2>

          <p className="text-gray-700 mb-3">
            Depending on your location, you may have certain rights regarding
            your personal information:
          </p>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-medium">Access:</span> You may request
              access to your personal information we hold about you.
            </li>
            <li>
              <span className="font-medium">Correction:</span> You may request
              that we correct inaccurate or incomplete information about you.
            </li>
            <li>
              <span className="font-medium">Deletion:</span> You may request
              that we delete your personal information in certain circumstances.
            </li>
            <li>
              <span className="font-medium">Data Portability:</span> You may
              request to receive a copy of your data in a structured,
              machine-readable format.
            </li>
            <li>
              <span className="font-medium">Withdraw Consent:</span> If we are
              processing your data based on your consent, you have the right to
              withdraw that consent at any time.
            </li>
            <li>
              <span className="font-medium">Object to Processing:</span> You may
              object to our processing of your personal information in certain
              circumstances.
            </li>
          </ul>

          <p className="text-gray-700 mt-3">
            To exercise these rights, please contact us using the information
            provided in the &quot;Contact Information&quot; section.
          </p>
        </section>

        <section id="data-retention" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy.
            </li>
            <li>
              We retain your account information and user content for as long as
              your account remains active.
            </li>
            <li>
              If you delete your account, we may retain certain information for
              a limited time to comply with legal obligations or for legitimate
              business purposes.
            </li>
            <li>
              We will delete your data 30 days after account termination unless
              required to retain it by law.
            </li>
          </ul>
        </section>

        <section id="childrens-privacy" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            9. Children&apos;s Privacy
          </h2>

          <p className="text-gray-700">
            Our Services are available for users of all ages. However, we do not
            knowingly collect personal information from children under the age
            of 13 without parental consent. If you are a parent or guardian and
            believe your child has provided us with personal information without
            your consent, please contact us immediately. If we become aware that
            we have collected personal information from a child under age 13
            without verification of parental consent, we will take steps to
            remove that information from our servers.
          </p>
        </section>

        <section id="policy-changes" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            10. Changes to Privacy Policy
          </h2>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons.
            </li>
            <li>
              We will notify you of any changes by posting the new Privacy
              Policy on this page and updating the &quot;Last Updated&quot;
              date.
            </li>
            <li>
              For significant changes, we will provide a more prominent notice,
              which may include an email notification.
            </li>
            <li>
              We encourage you to review this Privacy Policy periodically for
              any changes.
            </li>
          </ul>
        </section>

        <section id="contact-us" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            11. Contact Information
          </h2>

          <p className="text-gray-700">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please contact us at:
          </p>

          <div className="mt-4 text-gray-700">
            <p>
              Email:{" "}
              <a
                href="mailto:yakashadav26@gmail.com"
                className="text-[#5d3fd3] hover:underline"
              >
                yakashadav26@gmail.com
              </a>
            </p>
          </div>
        </section>

        <p className="mt-10 pt-6 border-t text-center text-gray-700">
          Thank you for trusting YTNotes with your personal information!
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
