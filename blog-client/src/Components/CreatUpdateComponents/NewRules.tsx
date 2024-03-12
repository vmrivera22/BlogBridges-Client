import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import {
  AlertDialogCancel,
  AlertDialogAction,
} from "@/Components/ui/alert-dialog";
import { buttonVariants } from "@/Components/ui/button";
import { Textarea } from "../ui/textarea";

import "../../css/NewRules.css";
import { useForm, useFieldArray } from "react-hook-form";
import { useGetRules } from "@/utils/reactquery/Queries";
import { useContext } from "react";
import TokenContext from "@/TokenContext";
import { useEditRulesMutation } from "@/utils/reactquery/Mutations";

interface rule {
  ruleText: string;
}

const text = {
  title: "Update Rules",
  description: "Update exiting rules.",
};

interface Props {
  roomId?: number;
}

// Component to add rules to a room. react hook form used to easily create dynamic input.
const NewRules = ({ roomId }: Props) => {
  const getRulesQuery = useGetRules(Number(roomId));

  let rules = [] as rule[];
  if (getRulesQuery.data) {
    rules = getRulesQuery.data?.map((rule) => {
      return { ruleText: rule.ruleText };
    });
  }

  // Set up the form - set rules that were already created into form.
  const { register, control, getValues } = useForm({
    defaultValues: {
      rules: rules,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "rules",
    control,
    rules: {
      required: "Please add text to a rule.",
    },
  });

  // Form fields displayed.
  const RuleForm = fields.map((field, index) => {
    const htmlFor = `Rule${index}`;
    return (
      <section className="mb-[20px]" key={field.id}>
        <div className="rule--label">
          <label htmlFor={htmlFor}>
            <span>{`Rule ${index + 1}`}</span>
          </label>
          <button className="delete--btn" onClick={() => remove(index)}>
            Delete
          </button>
        </div>
        <Textarea id={htmlFor} {...register(`rules.${index}.ruleText`)} />
      </section>
    );
  });

  const { token } = useContext(TokenContext);

  // Mutation to update rules
  const updateRulesMutation = useEditRulesMutation(Number(roomId));

  // Function called to update rules.
  const handleUpdate = () => {
    const newRules = getValues("rules");
    const newRulesString = newRules?.map((r) => r.ruleText as string);
    updateRulesMutation.mutate({
      input: { ruleText: newRulesString, roomId: roomId },
      token: token,
    });
  };
  return (
    <Card className="w-[100%] max-h-[600px] overflow-auto">
      <CardHeader>
        <CardTitle>{text.title}</CardTitle>
        <CardDescription>{text.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>{RuleForm}</form>
        <button
          className="add--rule"
          onClick={() => {
            append({ ruleText: "" });
          }}
        >
          Add
        </button>
      </CardContent>
      <CardFooter className="flex justify-between">
        <AlertDialogCancel className={buttonVariants()}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={handleUpdate}
          className={buttonVariants({ variant: "secondary" })}
        >
          Update
        </AlertDialogAction>
      </CardFooter>
    </Card>
  );
};

export default NewRules;
