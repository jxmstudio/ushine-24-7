import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects the personal information you give us.`,
  alternates: { canonical: "/privacy" },
};

/**
 * DRAFT — plain-language policy covering what this site actually does.
 * The client should have it reviewed before launch, and update it if any
 * analytics, advertising or booking tools are added later.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        image="about"
        title="Privacy Policy"
        description={`How ${site.legalName} handles the information you give us.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy", href: "/privacy" },
        ]}
      />

      <Section>
        <div className="text-muted-foreground mx-auto flex max-w-3xl flex-col gap-6 leading-relaxed">
          <p className="text-sm">Last updated: {new Date().getFullYear()}</p>

          <h2 className="text-foreground text-xl font-semibold">
            What we collect
          </h2>
          <p>
            When you submit an enquiry or quote request, we collect your name,
            phone number, suburb, the service you are interested in and — if you
            choose to give it — your email address and any notes you add. If you
            call or email us, we keep a record of that contact so we can follow
            up on your job.
          </p>

          <h2 className="text-foreground text-xl font-semibold">
            How we use it
          </h2>
          <p>
            We use your details only to respond to your enquiry, provide a
            quote, arrange and carry out cleaning work, and invoice for it. We
            do not sell your information, and we do not send marketing you have
            not asked for.
          </p>

          <h2 className="text-foreground text-xl font-semibold">
            Who we share it with
          </h2>
          <p>
            Your details are shared with the cleaner assigned to your job, and
            with the service providers that run our website and email (for
            example, our hosting and email delivery providers). We may disclose
            information where the law requires it.
          </p>

          <h2 className="text-foreground text-xl font-semibold">
            How long we keep it
          </h2>
          <p>
            We keep enquiry and job records for as long as we need them to
            service your account and meet our tax and legal obligations, then
            delete them.
          </p>

          <h2 className="text-foreground text-xl font-semibold">
            Cookies and analytics
          </h2>
          <p>
            This website does not use advertising cookies. If we add analytics
            to understand how the site is used, that data is aggregated and is
            not used to identify you personally.
          </p>

          <h2 className="text-foreground text-xl font-semibold">
            Access, correction and complaints
          </h2>
          <p>
            You can ask us what personal information we hold about you, ask us
            to correct it, or ask us to delete it. Contact us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-primary font-medium hover:underline"
            >
              {site.email}
            </a>{" "}
            or {site.phone}. If you are not satisfied with how we handle a
            privacy complaint, you can contact the Office of the Australian
            Information Commissioner.
          </p>
        </div>
      </Section>
    </>
  );
}
