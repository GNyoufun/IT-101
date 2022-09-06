import {
  AddNewRecordButton,
  LogoutButton,
  SubmitButton,
  UpdateButton,
} from "../components";

export default function Dashboard() {
  return (
    <div>
      <AddNewRecordButton />
      <LogoutButton />
      <SubmitButton />
      <UpdateButton />
    </div>
  );
}
