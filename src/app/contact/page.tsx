import Button from "@/components/Button";

export default function ContactPage(): JSX.Element {
  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Contact Us</h1>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" type="text" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" type="email" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" rows={5} required />
        </div>
        <Button type="submit" variant="solid">Send</Button>
      </form>
    </main>
  );
}


