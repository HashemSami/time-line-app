import { FC, useState, Fragment } from "react";
import { DynamicFormContainer, FormGroup, FormGroupRadio, FormActions, FormTitle } from "./DynamicForm.styles";

import { FormModel, RedioProps, SelectOrCheckboxProps } from "../../models";

interface DynamicFormProps {
  title: string;
  model: FormModel[];
  onSubmit: (model: any) => void;
  getOnChangeValues?: (values: any) => void;
}

// const isRadio =(form) => {
//   return form as
// }

const DynamicForm: FC<DynamicFormProps> = ({ title = "Dynamic Form", model, onSubmit, getOnChangeValues }) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string | number } | null>({});

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, key: string) => {
    // console.log(e.target.value);

    setFormValues(state => {
      return { ...state, [key]: value };
    });

    if (getOnChangeValues) {
      getOnChangeValues(formValues);
    }
  };

  const renderForm = () => {
    if (!formValues) {
      return;
    }
    const formUI = model.map(modelElement => {
      const { key, label, element, props } = modelElement;
      const { type = "text" } = props;
      const elementKey = key;
      const target = key;

      const stateValue = formValues[target];

      let input: JSX.Element | JSX.Element[] = <div></div>;

      switch (element) {
        case "input":
          input = <input key={key} {...props} value={stateValue} onChange={e => handleOnChange(e, key)} />;
          break;
        case "radio":
          input = (modelElement as RedioProps).options.map(({ key, label, name, value }) => {
            const checked = value === stateValue;
            return (
              <Fragment key={`fr${key}`}>
                <input key={key} {...props} type={element} checked={checked} name={name} value={stateValue} onChange={e => handleOnChange(e, name)} />
                <label key={`ll${key}`}>{label}</label>
              </Fragment>
            );
          });
          input = <FormGroupRadio>{input}</FormGroupRadio>;
          break;

        case "select":
          input = (modelElement as SelectOrCheckboxProps).options.map(({ key, label, value }) => {
            const checked = value === stateValue;

            return (
              <Fragment>
                <option {...props} key={key} value={value}>
                  {value}
                </option>
              </Fragment>
            );
          });
          input = (
            <select value={stateValue} onChange={e => handleOnChange(e, key)}>
              {input}
            </select>
          );
          break;

        case "checkbox":
          input = (modelElement as SelectOrCheckboxProps).options.map(({ key, label, value }) => {
            let checked = false;
            if (typeof stateValue == "string" && stateValue.length > 0) {
              checked = stateValue.indexOf(value) > -1 ? true : false;
            }
            return (
              <Fragment key={`cfr${key}`}>
                <input {...props} type={element} key={key} checked={checked} value={value} onChange={e => handleOnChange(e, elementKey)} />
                <label key={`ll${key}`}>{label}</label>
              </Fragment>
            );
          });

          input = <FormGroupRadio>{input}</FormGroupRadio>;
      }

      return (
        <FormGroup key={key}>
          <label key={`l${key}`} htmlFor={key}>
            {label}
          </label>
          {input}
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
