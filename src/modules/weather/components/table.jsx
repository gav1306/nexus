"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import ghostAnimation from "@/assets/animations/ghost.json";
import { LottieAnimation } from "@/components/ui/lottie-animation";

export function WeatherListDataTable({
  columns,
  data,
  isLoading,
  isError,
  emptyMessage = "No data found",
}) {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="w-[calc(100vw-32px)] lg:w-auto overflow-scroll rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={columns.length} className="h-[53px]">
                  <Skeleton className="w-full h-full" />
                </TableCell>
              </TableRow>
            ))}
          {isError && (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Something went wrong
              </TableCell>
            </TableRow>
          )}
          {!isLoading &&
            !isError &&
            !!table.getRowModel().rows?.length &&
            table.getRowModel().rows.map((row, index) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          {!isLoading && !isError && table.getRowModel().rows?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-[300px] text-center"
              >
                <div className="grid place-items-center place-content-center">
                  <LottieAnimation
                    className="w-[200px]"
                    animationData={ghostAnimation}
                  />
                  <span className="text-xl font-thin">{emptyMessage}</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
