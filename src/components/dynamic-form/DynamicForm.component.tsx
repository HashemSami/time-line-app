import { FC, useState } from "react";
import { DynamicFormContainer, FormGroup, FormGroupRadio, FormActions, FormTitle } from "./DynamicForm.styles";

import { FormModel } from "../../models";

interface DynamicFormProps {
  title: string;
  model: FormModel[];
  onSubmit: (model: any) => void;
  getOnChangeValues?: (values: any) => void;
}

const DynamicForm: FC<DynamicFormProps> = ({ title = "Dynamic Form", model, onSubmit, getOnChangeValues }) => {
  const [formValues, setFormValues] = useState<{}>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    // console.log(e.target.value);

    setFormValues(state => {
      return { ...state, [key]: e.target.value };
    });

    if (getOnChangeValues) {
      getOnChangeValues(formValues);
    }
  };
  const renderForm = () => {
    const formUI = model.map(({ key, label, props }) => {
      const { type = "text" } = props;
      return (
        <FormGroup key={key}>
          <label key={`l${key}`} htmlFor={key}>
            {label}
          </label>
          <input key={`i${key}`} {...props} type={type} onChange={e => handleOnChange(e, key)} />
        </FormGroup>
      );
    });
    return formUI;
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formValues);
    // if(onSubmit) onSubmit()
  };
  return (
    <div>
      <FormTitle>{title}</FormTitle>
      <DynamicFormContainer
        onSubmit={e => {
          onFormSubmit(e);
        }}
      >
        {renderForm()}
        <FormActions>
          <button type="submit">Submit</button>
        </FormActions>
      </DynamicFormContainer>
    </div>
  );
};

export default DynamicForm;
