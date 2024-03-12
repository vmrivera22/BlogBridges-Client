interface Props {
  input: {
    ruleText?: string[];
    roomId?: number;
  };
  token: string;
}

const UpdateRules = async ({ input, token }: Props) => {
  await fetch("https://blogbridges.azurewebsites.net/api/Rules", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ruleText: input?.ruleText,
      roomId: input?.roomId,
    }),
  });
};

export default UpdateRules;
