import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | LeadFlow",
  description:
    "Learn how LeadFlow collects, uses, stores, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="This Privacy Policy explains what information LeadFlow handles, how it is used, and what choices you have when using the service."
    >
      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          1. Introduction
        </h2>
        <p>
          LeadFlow is a personal CRM application that helps users organize
          contacts, notes, activities, and contact pipeline stages. This policy
          applies to information processed when you access or use LeadFlow.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          2. Information We Collect
        </h2>

        <h3 className="mb-2 mt-5 font-semibold text-foreground">
          Account information
        </h3>
        <p>
          When you sign in using Google or GitHub, we receive basic profile
          information made available by the provider, such as your name and
          email address. We use this information to create or identify your
          LeadFlow account.
        </p>

        <h3 className="mb-2 mt-5 font-semibold text-foreground">
          CRM information you provide
        </h3>
        <p>
          LeadFlow stores information you choose to enter, which may include:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Contact names, email addresses, phone numbers, and companies.</li>
          <li>Contact positions, sources, and pipeline statuses.</li>
          <li>Notes and other text you add to contacts.</li>
          <li>Activities such as calls, emails, meetings, and tasks.</li>
          <li>
            Activity titles, descriptions, due dates, and completion status.
          </li>
          <li>Your profile display name and application preferences.</li>
        </ul>
        <p className="mt-3">
          Please avoid entering passwords, payment details, or other highly
          sensitive information into contact notes or other free-text fields.
        </p>

        <h3 className="mb-2 mt-5 font-semibold text-foreground">
          Technical and usage information
        </h3>
        <p>
          LeadFlow uses Vercel Analytics and Vercel Speed Insights components.
          These services may process technical or usage information to help
          understand application performance and usage. The exact information
          collected and its retention are governed by the relevant provider
          configurations and policies.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          3. How We Use Information
        </h2>
        <p>We use information to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Create and maintain your account.</li>
          <li>Authenticate you through Google or GitHub.</li>
          <li>Save and display your contacts, notes, and activities.</li>
          <li>Provide contact organization and pipeline features.</li>
          <li>Maintain, troubleshoot, and improve the application.</li>
          <li>Respond to support, privacy, and account-related requests.</li>
          <li>Protect the service and investigate suspected misuse.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          4. Authentication Providers
        </h2>
        <p>
          LeadFlow supports sign-in through Google and GitHub. When you use
          either provider, your authentication is handled through that
          provider&apos;s services and is also subject to its privacy policy.
          LeadFlow does not ask you to provide your Google or GitHub password
          directly to the application.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              Google Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              GitHub Privacy Statement
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          5. Storage and Data Security
        </h2>
        <p>
          Account and CRM information is stored in a PostgreSQL database.
          Authentication is handled by Auth.js, which uses session cookies to
          support sign-in and maintain your session.
        </p>
        <p className="mt-3">
          We use application-level protections such as authenticated access,
          ownership checks, input validation, and database access controls.
          However, no online service or method of electronic storage can be
          guaranteed to be completely secure.
        </p>
        <p className="mt-3">
          The infrastructure providers used to operate the application may
          process or retain technical records as part of their services. We do
          not specify a fixed retention period for those provider records in
          this policy.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          6. Cookies and Sessions
        </h2>
        <p>
          LeadFlow uses authentication-related cookies to support secure sign-in
          flows and maintain your session. These cookies are necessary for core
          application functionality. Blocking them may prevent you from signing
          in or using protected features.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          7. Sharing of Information
        </h2>
        <p>
          LeadFlow is designed for individual use. Your CRM records are
          associated with your account and are not presented as a shared team
          workspace.
        </p>
        <p className="mt-3">
          Information may be processed by service providers that support
          authentication, hosting, database storage, analytics, and application
          performance. Those providers process information under their own terms
          and privacy practices.
        </p>
        <p className="mt-3">
          We do not sell your personal information. Information may also be
          disclosed when required by applicable law or when reasonably necessary
          to protect the service, its users, or others.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          8. Your Choices and Data Requests
        </h2>
        <p>
          You can edit your profile display name and delete individual contacts,
          notes, and activities through the available application features.
          Deleting a contact also removes its associated notes and activities.
        </p>
        <p className="mt-3">
          LeadFlow does not currently provide an automatic account deletion or
          data export feature. To request access to, correction of, or deletion
          of your account information, email us at:
        </p>
        <p className="mt-3">
          <a
            href="mailto:m63866157@gmail.com?subject=LeadFlow%20Privacy%20Request"
            className="font-semibold text-foreground underline underline-offset-4"
          >
            m63866157@gmail.com
          </a>
        </p>
        <p className="mt-3">
          For an account deletion request, use the subject line
          <strong className="text-foreground"> LeadFlow Account Deletion </strong> 
          and send the request from the email address associated with your
          account. We may ask for reasonable information to verify that you
          control the account before processing the request. Account deletion
          requests are handled manually.
        </p>
        <p className="mt-3">
          Some information may remain temporarily in backups, security records,
          or service-provider systems where retention is necessary for
          legitimate operational, legal, or security purposes.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          9. Information About Other People
        </h2>
        <p>
          You may enter information about contacts or other individuals into
          LeadFlow. You are responsible for having an appropriate legal basis to
          collect and use that information and for respecting applicable privacy
          and data protection laws.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          10. Children&apos;s Privacy
        </h2>
        <p>
          LeadFlow is not designed for children. If you believe a child has
          provided personal information through the service, contact us so we
          can review the request.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          11. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy when the application or its data
          practices change. The updated version will be published on this page
          with a revised “Last updated” date.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          12. Contact
        </h2>
        <p>For questions or requests about this Privacy Policy, contact:</p>
        <p className="mt-3">
          <a
            href="mailto:m63866157@gmail.com"
            className="font-semibold text-foreground underline underline-offset-4"
          >
            m63866157@gmail.com
          </a>
        </p>
      </section>

      <p className="border-t border-border pt-6">
        You can also read our{" "}
        <Link
          href="/terms"
          className="font-semibold text-foreground underline underline-offset-4"
        >
          Terms of Service
        </Link>
        .
      </p>
    </LegalPageLayout>
  );
}
