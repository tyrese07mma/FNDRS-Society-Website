import type { Metadata } from "next";
import { LegalPage, TodoNote } from "@/components/marketing/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Imprint",
  description: `Legal disclosure and provider identification for ${siteConfig.name}.`,
  alternates: { canonical: "/imprint" },
  robots: { index: false, follow: true },
};

export default function ImprintPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Imprint"
      lastUpdated="13 September 2026"
      intro={
        <p>
          Provider identification in accordance with &sect;&nbsp;5 DDG (formerly &sect;&nbsp;5 TMG) and
          &sect;&nbsp;18 (2) MStV.
        </p>
      }
    >
      <TodoNote>
        every field on this page. Imprint details are a legal requirement in Germany and must not be
        guessed — fill in the operator&rsquo;s real name, address, contact details and, where
        applicable, register and VAT information before this site goes live.
      </TodoNote>

      <h2>Provider</h2>
      <dl>
        <dt>Operator</dt>
        <dd>TODO — legal name of the person or company operating this site</dd>
        <dt>Address</dt>
        <dd>TODO — street, postal code, city, country (a P.O. box is not sufficient)</dd>
        <dt>Represented by</dt>
        <dd>TODO — managing director(s), if the operator is a company</dd>
      </dl>

      <h2>Contact</h2>
      <dl>
        <dt>Email</dt>
        <dd>TODO — a monitored email address</dd>
        <dt>Phone</dt>
        <dd>TODO — required for direct electronic contact under &sect;&nbsp;5 DDG</dd>
      </dl>

      <h2>Register and tax details</h2>
      <dl>
        <dt>Register court</dt>
        <dd>TODO — if entered in a commercial or similar register</dd>
        <dt>Register number</dt>
        <dd>TODO</dd>
        <dt>VAT ID</dt>
        <dd>TODO — VAT identification number under &sect;&nbsp;27a UStG, if issued</dd>
      </dl>

      <h2>Responsible for editorial content</h2>
      <p>
        In accordance with &sect;&nbsp;18 (2) MStV: TODO — name and full address of the person
        responsible.
      </p>

      <h2>EU online dispute resolution</h2>
      <p>
        The European Commission provides a platform for online dispute resolution at{" "}
        <a href="https://ec.europa.eu/consumers/odr" rel="noreferrer noopener" target="_blank">
          ec.europa.eu/consumers/odr
        </a>
        . TODO — state whether the operator is willing or obliged to participate in dispute
        resolution proceedings before a consumer arbitration board.
      </p>

      <h2>Liability for links</h2>
      <p>
        This site contains links to external websites over whose content we have no control. We
        accept no liability for that content. The respective provider or operator of the linked pages
        is always responsible for their content. Linked pages were checked for legal violations at
        the time of linking; no unlawful content was apparent. Ongoing monitoring without concrete
        evidence of an infringement is not reasonable, and any such link will be removed promptly if
        a violation becomes known.
      </p>

      <h2>Copyright</h2>
      <p>
        The content and works on these pages are protected by copyright. Reproduction, adaptation,
        distribution or any form of exploitation beyond the limits of copyright law requires written
        consent. Downloads and copies of this site are permitted for private, non-commercial use.
      </p>
    </LegalPage>
  );
}
