export default function ProductSamplePage(): JSX.Element {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Calacatta Sample</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-4">
          {[
            "https://images.pexels.com/photos/1030915/pexels-photo-1030915.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
            "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
          ].map((src, i) => (
            <img key={i} src={src} alt="Sample" className="w-full rounded-md object-cover" />
          ))}
        </div>
        <div>
          <div className="prose max-w-none">
            <p>
              A timeless white base with subtle grey veining. Engineered quartz for kitchens and baths that demand durability and elegance.
            </p>
            <ul>
              <li>Finish: Polished</li>
              <li>Thickness: 20mm / 30mm</li>
              <li>Applications: Countertops, Backsplashes, Walls</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}


