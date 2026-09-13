import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, TodoNote } from "@/components/marketing/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply to the ${siteConfig.name} website and the early access waitlist.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="13 September 2026"
      intro={
        <p>
          These terms govern your use of this website and the early access waitlist. Separate terms
          apply inside the FNDRS app and are presented when you create an account.
        </p>
      }
    >
      <TodoNote>
        the contracting entity, governing law and place of jurisdiction, and the terms that will
        apply to paid plans. This draft is a starting point, not legal advice — have it reviewed
        before launch.
      </TodoNote>

      <h2>1. Who these terms are with</h2>
      <p>
        This website is operated by TODO — legal entity, as stated in the{" "}
        <Link href="/imprint">imprint</Link> (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the site
        you agree to these terms. If you do not agree, please do not use the site.
      </p>

      <h2>2. What this website is</h2>
      <p>
        This site presents FNDRS Society and lets you request early access to the product. It is
        informational. Nothing on it is a binding offer, a guarantee of access, or a commitment to
        deliver a specific feature by a specific date.
      </p>

      <h2>3. Early access</h2>
      <ul>
        <li>You must be at least 16 years old to request access.</li>
        <li>You must give an email address you control, and information that is accurate.</li>
        <li>
          Joining the waitlist does not entitle you to access. Spots are released at our discretion,
          in batches.
        </li>
        <li>You can ask to be removed from the list at any time, and we will remove you.</li>
      </ul>

      <h2>4. Beta software</h2>
      <p>
        FNDRS Society is in private beta. Beta software is provided as-is: features may change or be
        removed, availability is not guaranteed, and data created during the beta may be reset if a
        technical change requires it. We will avoid that where we reasonably can, and give notice
        where it matters.
      </p>

      <h2>5. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>submit false information, or sign up on behalf of someone without their permission</li>
        <li>attempt to disrupt, overload, probe or gain unauthorised access to the site</li>
        <li>scrape or systematically extract content from the site by automated means</li>
        <li>use the site for anything unlawful, or in a way that infringes someone else&rsquo;s rights</li>
      </ul>

      <h2>6. Intellectual property</h2>
      <p>
        The FNDRS Society name, logo, product screenshots, copy and design are ours or licensed to
        us, and are protected by intellectual property law. You may not reproduce or reuse them
        without written permission. Fair use for reporting and commentary is unaffected.
      </p>

      <h2>7. Pricing</h2>
      <p>
        Early access is free. Paid plans, including FNDRS Pro, will be published with their prices
        and separate terms before they go live. Nothing is charged without your explicit agreement.
        TODO — link the paid-plan terms once they exist.
      </p>

      <h2>8. Availability and changes</h2>
      <p>
        We may change, suspend or discontinue any part of this website at any time. We may also
        update these terms; the current version is always the one published here, with its date at
        the top. Continued use after a change means you accept the updated terms.
      </p>

      <h2>9. Liability</h2>
      <p>
        We are liable without limitation for damages caused intentionally or through gross
        negligence, for injury to life, body or health, and where mandatory statutory liability
        applies. For slight negligence we are liable only for breach of an essential contractual
        obligation, and then only up to the foreseeable damage typical for this type of contract.
        Any further liability is excluded. TODO — confirm this clause against the chosen governing
        law.
      </p>

      <h2>10. Governing law</h2>
      <p>
        TODO — state the governing law and the place of jurisdiction. Mandatory consumer protection
        rules of your country of residence remain unaffected.
      </p>

      <h2>11. Severability</h2>
      <p>
        If any provision of these terms is or becomes invalid, the remaining provisions stay in
        force.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms: use the contact details in the{" "}
        <Link href="/imprint">imprint</Link>.
      </p>
    </LegalPage>
  );
}
