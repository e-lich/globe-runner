import { Dialog, DialogTitle } from "@mui/material";

export default function EndFightDialog(props: any) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>FIght results</DialogTitle>
    </Dialog>
  );
}
