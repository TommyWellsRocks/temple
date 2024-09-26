export function SectionHeader({ title, id }: { title: string, id?: string }) {
  return <span id={id} className="text-2xl font-bold">{title}</span>;
}
