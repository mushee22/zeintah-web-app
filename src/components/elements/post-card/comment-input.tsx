import { Button } from "@/components/ui/button";
import React from "react";

export default function CommentInput({
  value,
  onInput,
  onSubmit,
  onSubmitLoading,
//   onCancel,
  mode,
}: {
  value: string;
  onInput: (value: string) => void;
  onSubmit: VoidFunction;
  onSubmitLoading: boolean;
  onCancel: VoidFunction;
  mode: "create" | "edit";
}) {
  return (
    <div className="mb-4 flex flex-col gap-x-2 border p-2 rounded-xl">
      <textarea
        placeholder="Add a comment"
        className="w-full h-6  border-0 outline-0 text-sm overflow-hidden resize-none"
        style={{ height: "24px" }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          onInput(target.value);
          target.style.height = target.value
            ? target.scrollHeight + "px"
            : "24px";
        }}
        value={value}
      />
      {value.length > 0 && (
        <Button
          disabled={onSubmitLoading}
          className="h-8 rounded-full self-end"
          onClick={() => onSubmit?.()}
        >
          {mode === "create" ? "Comment" : "Update"}
        </Button>
      )}
    </div>
  );
}
