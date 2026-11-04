import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service | LeadFlow",
  description:
    "Read the terms and conditions for accessing and using LeadFlow.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      description="These Terms explain the rules for accessing and using LeadFlow. By using the service, you agree to these Terms."
    >
      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          1. Acceptance of These Terms
        </h2>
        <p>
          By accessing or using LeadFlow, you agree to these Terms of Service
          and our{" "}
          <Link
            href="/privacy"
            className="text-foreground underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          . If you do not agree, do not use the service.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          2. About LeadFlow
        </h2>
        <p>
          LeadFlow is a personal CRM application that allows users to organize
          contacts, maintain notes, track activities, and manage contact
          pipeline statuses. Features may change as the application develops.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          3. Accounts and Sign-In
        </h2>
        <p>
          You can access LeadFlow using supported third-party authentication
          providers, currently Google and GitHub. You are responsible for
          maintaining access to the account you use to sign in and for
          activities performed through your LeadFlow account.
        </p>
        <p className="mt-3">
          You must provide accurate information and must not impersonate another
          person or attempt to access another user&apos;s account or data.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          4. Acceptable Use
        </h2>
        <p>You agree to use LeadFlow only for lawful purposes. You must not:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Use the service to violate any applicable law or regulation.</li>
          <li>
            Upload or store information that you do not have the right to use.
          </li>
          <li>
            Use LeadFlow to harass, threaten, defraud, or harm another person.
          </li>
          <li>
            Attempt to access accounts, systems, or data without authorization.
          </li>
          <li>
            Interfere with the operation, availability, or security of the
            service.
          </li>
          <li>
            Distribute malware or use the service for spam or other abusive
            activity.
          </li>
          <li>
            Reverse engineer or attempt to exploit the service except where
            applicable law permits it.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          5. Your Content and Responsibilities
        </h2>
        <p>
          You retain responsibility for the contacts, notes, activities, and
          other information you enter into LeadFlow. You must ensure that you
          have the necessary rights and permissions to collect, store, and use
          that information.
        </p>
        <p className="mt-3">
          You are responsible for the accuracy and lawfulness of your content
          and for avoiding unnecessary sensitive personal information in
          free-text fields.
        </p>
        <p className="mt-3">
          You grant us permission to process your content only as necessary to
          operate, maintain, secure, and provide the LeadFlow service, in
          accordance with the Privacy Policy.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          6. Third-Party Services
        </h2>
        <p>
          LeadFlow relies on third-party services, including Google and GitHub
          for authentication and infrastructure or analytics providers for
          application operation. Their services are subject to their own terms
          and policies. We are not responsible for services or policies
          controlled by those third parties.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          7. Availability and Changes
        </h2>
        <p>
          We aim to keep LeadFlow available and functioning, but we do not
          guarantee uninterrupted access, error-free operation, or that every
          feature will always be available.
        </p>
        <p className="mt-3">
          We may modify, suspend, or discontinue features when necessary for
          maintenance, security, operational, or development reasons.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          8. Data and Backups
        </h2>
        <p>
          You are responsible for keeping any separate copies of information
          that is important to you. Although LeadFlow stores account and CRM
          information, we do not guarantee that data will always be recoverable
          or that backups will be available in every situation.
        </p>
        <p className="mt-3">
          You can delete individual contacts, notes, and activities using
          available features. Account deletion requests must currently be
          submitted by email and are handled manually. See the{" "}
          <Link
            href="/privacy"
            className="text-foreground underline underline-offset-4"
          >
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          9. Intellectual Property
        </h2>
        <p>
          The LeadFlow application, including its design, branding, software,
          and original materials, is owned by or licensed to the service
          operator and is protected by applicable intellectual property laws.
          These Terms do not transfer ownership of the application to you.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          10. Suspension or Termination
        </h2>
        <p>
          We may restrict or suspend access if we reasonably believe that an
          account is being used unlawfully, in violation of these Terms, or in a
          way that threatens the service or other users.
        </p>
        <p className="mt-3">
          You may stop using LeadFlow at any time. To request deletion of your
          account and associated data, contact us using the details in the
          Privacy Policy.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          11. Disclaimer
        </h2>
        <p>
          To the extent permitted by applicable law, LeadFlow is provided on an
          “as is” and “as available” basis. We do not guarantee that the service
          will meet every requirement, remain available without interruption, or
          be free of errors.
        </p>
        <p className="mt-3">
          LeadFlow is an organizational tool. You are responsible for decisions
          you make based on information stored in the application.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          12. Limitation of Liability
        </h2>
        <p>
          To the extent permitted by applicable law, the service operator will
          not be liable for indirect, incidental, special, consequential, or
          punitive damages, or for loss of data, profits, or business
          opportunities arising from your use of or inability to use LeadFlow.
        </p>
        <p className="mt-3">
          Nothing in these Terms excludes or limits liability that cannot
          legally be excluded or limited under applicable law.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          13. Changes to These Terms
        </h2>
        <p>
          We may update these Terms as LeadFlow changes. Updated Terms will be
          published on this page with a revised “Last updated” date. Continued
          use of the service after an update means you accept the revised Terms,
          to the extent permitted by applicable law.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          14. Applicable Law
        </h2>
        <p>
          These Terms are subject to applicable laws. Any disputes will be
          handled by the competent authorities or courts as determined by
          applicable law.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          15. Contact
        </h2>
        <p>If you have questions about these Terms, contact:</p>
        <p className="mt-3">
          <a
            href="mailto:m63866157@gmail.com?subject=LeadFlow%20Terms%20Question"
            className="font-semibold text-foreground underline underline-offset-4"
          >
            m63866157@gmail.com
          </a>
        </p>
      </section>

      <p className="border-t border-border pt-6">
        You can also read our{" "}
        <Link
          href="/privacy"
          className="font-semibold text-foreground underline underline-offset-4"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </LegalPageLayout>
  );
}
