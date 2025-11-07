import FadeIn from "@/components/animations/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Aura Surfaces",
  description: "Get in touch with Aura Surfaces. Have questions about our premium quartz surfaces? We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <FadeIn>
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-100 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-zinc-300 max-w-xl mx-auto">
            Have a question or want to learn more about our premium quartz surfaces? We'd love to hear from you.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <form className="bg-white rounded-2xl border border-zinc-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-900 mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 transition-all duration-200 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-0"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-900 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 transition-all duration-200 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-0"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-zinc-900 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 resize-none transition-all duration-200 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-0"
              placeholder="Tell us about your project or question..."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto rounded-lg bg-zinc-900 px-8 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 active:scale-[0.98]"
            >
              Send Message
            </button>
          </div>
        </form>
      </FadeIn>
    </main>
  );
}


