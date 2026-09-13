import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, TodoNote } from "@/components/marketing/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles personal data on this website, including the early access waitlist.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="13 September 2026"
      intro={
        <p>
          This policy explains what happens to personal data on this website. It covers the website
          only — the FNDRS app has its own policy, shown in the app.
        </p>
      }
    >
      <TodoNote>
        controller identity, hosting provider, processor list and the supervisory authority. This
        draft reflects what the site actually does technically, but it is not legal advice and must
        be reviewed by a qualified lawyer before launch.
      </TodoNote>

      <h2>1. Controller</h2>
      <p>
        The controller responsible for data processing on this website is: TODO — name and address of
        the controller, matching the details in the{" "}
        <Link href="/imprint">imprint</Link>. TODO — contact address for privacy enquiries, and a data
        protection officer if one has been appointed.
      </p>

      <h2>2. What we collect, and why</h2>

      <h3>2.1 Server logs</h3>
      <p>
        When you open a page, your browser necessarily transmits technical information to the hosting
        infrastructure — IP address, request time, the page requested, referrer, user agent. This is
        required to deliver the site and to keep it secure and stable. Legal basis: Art. 6 (1) (f)
        GDPR (legitimate interest in operating a secure website). TODO — name the hosting provider
        and state the log retention period.
      </p>

      <h3>2.2 Early access waitlist</h3>
      <p>
        If you request early access, we process the data you enter in the form:
      </p>
      <ul>
        <li>
          <strong>Email address</strong> — required, so we can tell you when a spot opens.
        </li>
        <li>
          <strong>Name, role, what you are building, what you are looking for</strong> — optional,
          used to place you in a suitable access batch.
        </li>
        <li>
          <strong>Technical context</strong> — the referring page and browser language, stored with
          the entry.
        </li>
      </ul>
      <p>
        Legal basis: Art. 6 (1) (a) GDPR (consent, given by submitting the form) and Art. 6 (1) (b)
        GDPR (steps taken at your request prior to entering into a contract). Providing the optional
        fields is entirely voluntary and refusing them has no consequence for your place on the list.
      </p>
      <p>
        Waitlist entries are stored until FNDRS Society launches publicly and your request has been
        handled, or until you ask us to remove them — whichever comes first. TODO — confirm the
        storage provider and its region.
      </p>

      <h3>2.3 Cookies</h3>
      <p>
        This website sets no cookies of its own and uses no tracking cookies. Nothing is stored in
        your browser for advertising or profiling purposes.
      </p>

      <h3>2.4 Analytics</h3>
      <p>
        Analytics is optional and disabled unless explicitly configured by the operator. TODO — if
        analytics is switched on before launch, name the provider here, state whether it is
        cookieless, give the legal basis, and add a consent banner if the chosen provider requires
        one.
      </p>

      <h2>3. Fonts and third-party content</h2>
      <p>
        Fonts are served from this website&rsquo;s own domain. No font, script or asset is loaded
        from a third-party CDN, so no data is transmitted to third parties simply by opening a page.
      </p>

      <h2>4. Recipients and transfers</h2>
      <p>
        Personal data is shared only with processors acting on our instructions under a data
        processing agreement: the hosting provider and the waitlist storage provider. TODO — list
        each processor, its role and its location, and note any transfer outside the EEA together
        with the safeguard relied on (for example EU standard contractual clauses).
      </p>

      <h2>5. Your rights</h2>
      <p>Under the GDPR you have the right to:</p>
      <ul>
        <li>access the personal data we hold about you (Art. 15)</li>
        <li>have inaccurate data corrected (Art. 16)</li>
        <li>have your data erased (Art. 17)</li>
        <li>restrict processing (Art. 18)</li>
        <li>receive your data in a portable format (Art. 20)</li>
        <li>object to processing based on legitimate interest (Art. 21)</li>
        <li>withdraw consent at any time, without affecting processing already carried out (Art. 7 (3))</li>
      </ul>
      <p>
        To exercise any of these, contact us using the details in the{" "}
        <Link href="/imprint">imprint</Link>. To leave the waitlist, a single email is enough — we
        delete the entry and confirm.
      </p>

      <h2>6. Complaints</h2>
      <p>
        You also have the right to lodge a complaint with a data protection supervisory authority.
        TODO — name the competent supervisory authority for the controller&rsquo;s location.
      </p>

      <h2>7. Changes to this policy</h2>
      <p>
        We update this policy when the site changes or the legal position requires it. The date at
        the top always reflects the current version.
      </p>
    </LegalPage>
  );
}
