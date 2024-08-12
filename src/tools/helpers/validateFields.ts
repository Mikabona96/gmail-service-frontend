export type State = {
  errors?: {
    to?: string;
    subject?: string;
    snippet?: string;
  };
  message?: string | null;
  validatedData?: {
    to?: string;
    subject?: string;
    snippet?: string;
  };
};

export async function validateNewMessageFields(
  prevState: State | void,
  formData: FormData
) {
  //+ Validation via zod | yup
  const newMessageFormFieldsValidated = {
    to: formData.get("to"),
    subject: formData.get("subject"),
    snippet: formData.get("snippet"),
  };

  return { validatedData: newMessageFormFieldsValidated };
}
