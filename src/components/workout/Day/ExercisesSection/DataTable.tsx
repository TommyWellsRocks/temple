"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { toTitleCase } from "~/utils/helpers";
import {
  handleAddExercise,
  handleDeleteExercise,
} from "~/server/actions/workout/DayActions";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import { useMyExercises } from "~/hooks/workout/useExercises";
import { AddButtonOverlay } from "../../AddButtonOverlay";
import { UserExerciseForm } from "../../forms/UserExerciseForm/UserExerciseForm";

import type { Exercises } from "~/server/types";

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const dayExercisesIds = useProgram((state) =>
    state.day?.dayExercises.map((ex) => ex.exerciseId),
  )!;
  const programDay = useProgram((state) => state.day);
  const exercises = useMyExercises();
  if (!dayExercisesIds || !programDay || !exercises) return;

  const columns: ColumnDef<Exercises[0]>[] = [
    {
      id: "select",
      cell: ({ row }) => (
        <Checkbox
          checked={dayExercisesIds.includes(row.original.id)}
          onCheckedChange={(isChecked) => {
            row.toggleSelected(!!isChecked);

            if (isChecked) {
              handleAddExercise(
                programDay.userId,
                programDay.programId,
                programDay.groupId,
                programDay.id,
                row.original.id,
              );
            } else {
              handleDeleteExercise(
                programDay.userId,
                programDay.programId,
                programDay.dayExercises.find(
                  (ex) => ex.info.id === row.original.id,
                )!.id,
              );
            }
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "name",
      accessorFn: (row) => (row.notes[0]?.name ? row.notes[0].name : row.name),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Exercise Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>
          {toTitleCase(
            row.original.notes &&
              row.original.notes.length === 1 &&
              row.original.notes[0]!.name !== null &&
              row.original.notes[0]!.name !== ""
              ? row.original.notes[0]!.name
              : row.original.name,
          )}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: exercises,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Exercises..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <div className="flex flex-col gap-y-2">
                    <span>Are we missing your exercise?</span>
                    <span>Well 💩</span>
                    <span>Create it!</span>
                    <AddButtonOverlay
                      title="Custom Exercise"
                      description="Create Your Own Exercise."
                      formComponent={<UserExerciseForm />}
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
