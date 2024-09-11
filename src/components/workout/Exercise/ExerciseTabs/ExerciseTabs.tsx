import { Tabs, TabsList } from "~/components/ui/tabs";
import { NotesTab, NotesTabContent } from "./NotesTab";
import { InfoTab, InfoTabContent } from "./InfoTab";
import { MusclesTab, MusclesTabContent } from "./MusclesTab";
import { HistoryTab, HistoryTabContent } from "./HistoryTab";

export function ExerciseTabs() {
  return (
    <section>
      <Tabs defaultValue="notes">
        <div className="flex justify-center">
          <TabsList>
            <NotesTab />
            <InfoTab />
            <MusclesTab />
            <HistoryTab />
          </TabsList>
        </div>

        <NotesTabContent />
        <InfoTabContent />
        <MusclesTabContent />
        <HistoryTabContent />
      </Tabs>
    </section>
  );
}
