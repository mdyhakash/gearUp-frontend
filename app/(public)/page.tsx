import Link from "next/link";
import { ArrowRight, ShieldCheck, Tent, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GearGrid } from "@/components/gear/gear-grid";
import { mockGear } from "@/lib/data";

const steps = [
  {
    icon: Tent,
    title: "Find your gear",
    desc: "Search tents, bikes, kayaks and more from local providers.",
  },
  {
    icon: Wallet,
    title: "Book & pay securely",
    desc: "Pick your rental dates and pay safely through Stripe or SSLCommerz.",
  },
  {
    icon: ShieldCheck,
    title: "Pick up & return",
    desc: "Track your order status and leave a review once you're done.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Rent sports & outdoor gear instantly
            </h1>
            <p className="mt-4 max-w-lg text-primary-foreground/75">
              Tents, bikes, kayaks, snowboards — from vetted local providers,
              booked in minutes and ready when you are.
            </p>

            <div className="mt-8 flex max-w-md flex-col gap-2 rounded-xl bg-card p-2 sm:flex-row">
              <Input
                placeholder="Search for gear (e.g. kayak, tent...)"
                className="border-0 text-foreground shadow-none focus-visible:ring-0"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Search
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 font-mono text-sm text-primary-foreground/70">
              <span>
                <b className="text-primary-foreground">1,200+</b> gear items
              </span>
              <span>
                <b className="text-primary-foreground">300+</b> providers
              </span>
              <span>
                <b className="text-primary-foreground">4.8★</b> avg. rating
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          How it works
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary">
                <step.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-mono text-xs font-semibold text-accent">
                STEP {i + 1}
              </p>
              <h3 className="mt-1 font-display font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured gear */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Featured Gear
          </h2>
          <Link
            href="/gear"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <GearGrid items={mockGear} />
      </section>

      {/* Provider CTA */}
      <section className="bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Have gear sitting idle?
            </h2>
            <p className="mt-1 text-muted-foreground">
              List it on GearUp and start earning from rentals.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Become a Provider
          </Button>
        </div>
      </section>
    </div>
  );
}
