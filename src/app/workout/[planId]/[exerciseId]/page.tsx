export default function ExerciseIndividual(context: any | unknown) {
  const { exerciseId } = context.params;

  return <div className="flex flex-col">Exercise ID: {exerciseId}</div>;
}
