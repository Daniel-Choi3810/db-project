"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

export default function DeleteButton({ jobID }: { jobID: string }) {
  const router = useRouter();
  const handleDelete = async (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    try {
      await fetch(`/api/job/${jobID}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button variant="secondary" className="px-4 py-2" onClick={handleDelete}>
      {" "}
      Delete{" "}
    </Button>
  );
}
