import {
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogContent,
} from "@/Components/ui/alert-dialog";

import "../css/AlertTrigger.css";

interface Props {
  trigger: any;
  content: any;
  type: string;
  state?: any;
  stateFunc?: any;
}

// Component that triggers an alert dialog -- code is repeated several times thorughout the projects
const AlertTrigger = ({ trigger, content, type, state, stateFunc }: Props) => {
  // Classes for the trigger buttons deppending on where this component is being called.
  // Three types - drop down, comment, or button
  const dropDownDiv =
    "cursor-pointer flex items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-black";
  const buttonDiv = "alert--trig--btn--container trig--bg";

  const divStyle =
    type == "button"
      ? buttonDiv
      : type == "dropDown"
      ? dropDownDiv
      : type == "comment"
      ? "trig--bg max-w-[850px] ml-auto mr-auto"
      : "";

  const buttonTrigger = "alert--trig--btn";
  const dropDownTrigger = "w-full";
  const triggerStyle =
    type == "button" || type == "comment" ? buttonTrigger : dropDownTrigger;

  return (
    <>
      {state ? (
        <AlertDialog open={state} onOpenChange={stateFunc}>
          <div className={divStyle}>
            <AlertDialogTrigger className={triggerStyle} asChild>
              {trigger}
            </AlertDialogTrigger>
          </div>
          <AlertDialogContent>{content}</AlertDialogContent>
        </AlertDialog>
      ) : (
        <AlertDialog>
          <div className={divStyle}>
            <AlertDialogTrigger className={triggerStyle} asChild>
              {trigger}
            </AlertDialogTrigger>
          </div>
          <AlertDialogContent>{content}</AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default AlertTrigger;
