export function SectionDescription({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-white border-opacity-45 bg-white bg-opacity-20 px-3 text-sm text-white opacity-45">
      {text}
    </span>
  );
}
