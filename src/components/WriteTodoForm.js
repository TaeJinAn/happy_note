import { faMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField } from "@mui/material";

export default function WriteTodoForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.regDate.value.length == 0) {
      alert("언제 해야 하는지 알려 주세요.");
    }
    if (form.content.value.length == 0) {
      alert("무엇을 해야 하는지 알려 주세요.");
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-1 gap-5 flex-col p-16">
        <TextField
          type="datetime-local"
          label="언제 해야 되나요?"
          focused
          name="regDate"
        />
        <TextField
          name="content"
          type="text"
          label="무엇을 해야 하나요?"
          multiline
          className="flex flex-1"
          slotProps={{
            input: { className: "flex-1 flex-col" },
            htmlInput: { className: "flex-1" },
          }}
        />
        <Button type="submit" variant="contained">
          {/* <i class="fa-solid fa-marker"></i> */}
          <FontAwesomeIcon icon={faMarker} className="mr-2" />
          <span>할일추가</span>
        </Button>
      </form>
    </>
  );
}
