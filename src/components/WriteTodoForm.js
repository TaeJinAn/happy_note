import { TextField } from "@mui/material";

export default function WriteTodoForm() {
  return (
    <>
      <div className="flex flex-1 gap-5 flex-col p-16">
        <TextField type="datetime-local" label="언제 해야 되나요?" focused />
        <TextField
          type="text"
          label="무엇을 해야 하나요?"
          multiline
          className="flex flex-1"
          slotProps={{
            input: { className: "flex-1 flex-col" },
            htmlInput: { className: "flex-1" },
          }}
        />
      </div>
    </>
  );
}
