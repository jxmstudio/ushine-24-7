"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitEnquiry } from "@/actions/submit-enquiry";
import {
  enquirySchema,
  frequencyOptions,
  type EnquiryInput,
} from "@/lib/validations";
import { serviceOptions } from "@/data/services";
import { site } from "@/data/site";

export function QuoteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Timing check for bots — set after mount so render stays pure.
  const mountedAt = React.useRef<number | null>(null);
  React.useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const [pending, startTransition] = React.useTransition();

  const form = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      // Deep links from service and suburb pages pre-fill the form.
      suburb: searchParams.get("suburb") ?? "",
      service:
        (serviceOptions.find((o) => o.value === searchParams.get("service"))
          ?.value as EnquiryInput["service"]) ?? undefined,
      frequency: "unsure",
      message: "",
      company: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = form;

  function onSubmit(values: EnquiryInput) {
    startTransition(async () => {
      const result = await submitEnquiry({
        ...values,
        elapsed: mountedAt.current ? Date.now() - mountedAt.current : undefined,
      });

      if (result.ok) {
        router.push("/thank-you");
        return;
      }

      if (result.fieldErrors) {
        for (const [field, messages] of Object.entries(result.fieldErrors)) {
          if (messages?.[0]) {
            setError(field as keyof EnquiryInput, { message: messages[0] });
          }
        }
      }
      toast.error(result.error);
    });
  }

  return (
    <form onSubmit={(event) => handleSubmit(onSubmit)(event)} noValidate>
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">Your name *</FieldLabel>
            <Input
              id="name"
              autoComplete="name"
              placeholder="Jane Smith"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            <FieldError errors={errors.name ? [errors.name] : undefined} />
          </Field>

          <Field data-invalid={!!errors.phone}>
            <FieldLabel htmlFor="phone">Phone *</FieldLabel>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="0400 000 000"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
            <FieldError errors={errors.phone ? [errors.phone] : undefined} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            <FieldDescription>
              Optional — we will call if you would rather not give an email.
            </FieldDescription>
            <FieldError errors={errors.email ? [errors.email] : undefined} />
          </Field>

          <Field data-invalid={!!errors.suburb}>
            <FieldLabel htmlFor="suburb">Suburb *</FieldLabel>
            <Input
              id="suburb"
              autoComplete="address-level2"
              placeholder="Penrith"
              aria-invalid={!!errors.suburb}
              {...register("suburb")}
            />
            <FieldError errors={errors.suburb ? [errors.suburb] : undefined} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.service}>
            <FieldLabel htmlFor="service">What do you need? *</FieldLabel>
            <Controller
              control={control}
              name="service"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="service" aria-invalid={!!errors.service}>
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={errors.service ? [errors.service] : undefined} />
          </Field>

          <Field data-invalid={!!errors.frequency}>
            <FieldLabel htmlFor="frequency">How often?</FieldLabel>
            <Controller
              control={control}
              name="frequency"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Choose a frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="message">Anything else?</FieldLabel>
          <Textarea
            id="message"
            rows={4}
            placeholder="Number of bedrooms and bathrooms, when you need it done, parking or access notes…"
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          <FieldDescription>
            The more detail you give, the more accurate the quote.
          </FieldDescription>
          <FieldError errors={errors.message ? [errors.message] : undefined} />
        </Field>

        {/* Honeypot — hidden from people, irresistible to bots */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Button type="submit" size="xl" variant="brand" disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send /> Send my enquiry
              </>
            )}
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            We usually reply within the hour. In a rush?{" "}
            <a
              href={site.phoneHref}
              className="text-primary font-medium hover:underline"
            >
              Call {site.phone}
            </a>{" "}
            — we answer 24/7.
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}
