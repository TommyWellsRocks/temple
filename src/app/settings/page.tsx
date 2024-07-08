import { ModeToggle } from "./_components/Theme";

export default function Settings() {
  return (
    <div>
      <nav className="flex justify-between">
        <h1>Settings</h1>
        <ModeToggle />
      </nav>
    </div>
  );
}
