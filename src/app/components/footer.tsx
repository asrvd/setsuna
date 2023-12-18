export default function Footer() {
  return (
    <div className="p-2 px-4 border-t bg-orange-100 border-stone-900 w-full flex justify-between gap-3 flex-col lg:flex-row items-center sticky bottom-0 max-h-max h-auto">
      <p className="text-sm text-orange-700">
        Made with {`<3`} by{" "}
        <a
          href="https://github.com/asrvd"
          className="text-sm text-orange-900 font-bold"
        >
          ashish
        </a>{" "}
        for the{" "}
        <a href="https://" className="text-sm text-orange-900 font-bold">
          Supabase LWX Hackathon
        </a>
      </p>
      <a
        href="https://github.com/asrvd/setsuna"
        className="text-sm text-orange-900 font-bold"
      >
        Source code
      </a>
    </div>
  );
}
