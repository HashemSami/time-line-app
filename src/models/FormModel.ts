import { HTMLAttributes, AllHTMLAttributes, DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps {
  element: "input";
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  options: {};
}

export interface RedioProps {
  element: "radio";
  props: any;
  options: { key: string; label: string; name: string; value: string }[];
}

interface SelectOrCheckboxProps {
  element: "select" | "checkbox";
  props: any;
  options: { key: string; label: string; value: string }[];
}

interface FormModelKey {
  key: string;
  label: string;
}

export type FormModel = FormModelKey & (InputProps | RedioProps | SelectOrCheckboxProps);
// DetailedHTMLProps<AllHTMLAttributes<f>, f>
