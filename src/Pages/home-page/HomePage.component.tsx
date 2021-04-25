import { FC } from "react";
import { HomePageContainer, Item } from "./HomePage.styles";

import TimeLineViewer from "../../components/time-line/time-line-viewer/TimeLineViewer.component";
import DynamicForm from "../../components/dynamic-form/DynamicForm.component";

const HomePage: FC = () => {
  const onSubmit = (model: any) => {
    console.log(model);
  };

  const han = (e: any) => {
    console.log(e);
  };
  return (
    <HomePageContainer>
      <Item>
        <DynamicForm
          title="Registeration"
          model={[
            { key: "name", label: "Name", element: "input", props: { required: true } },
            { key: "age", label: "Age", element: "input", props: { type: "number" } },
            { key: "rating", label: "Rating", element: "input", props: { type: "number", min: 0, max: 5 } },
            { key: "qualification", label: "Qualification", element: "input", props: {} },
            {
              key: "gender",
              label: "Gender",
              element: "radio",
              options: [
                { key: "male", label: "Male", name: "gender", value: "male" },
                { key: "female", label: "Female", name: "gender", value: "female" },
              ],
              props: {},
            },
            {
              key: "city",
              label: "city",
              element: "select",
              options: [
                { key: "jeddah", label: "Jeddah", value: "jeddah" },
                { key: "khobar", label: "Khobar", value: "khobar" },
                { key: "abha", label: "Abha", value: "abha" },
              ],
              props: {},
            },
            {
              key: "skills",
              label: "Skills",
              element: "checkbox",
              options: [
                { key: "react", label: "React", value: "react" },
                { key: "angular", label: "Angular", value: "angular" },
                { key: "vue", label: "Vue", value: "vue" },
              ],
              props: {},
            },
          ]}
          onSubmit={model => {
            onSubmit(model);
          }}
          getOnChangeValues={values => han(values)}
        />
      </Item>
      <Item>
        <TimeLineViewer />
      </Item>
      {/* <Item>item2</Item>
      <Item>item3</Item>
      <Item>item4</Item>
      <Item>item5</Item>
      <Item>item6</Item>
      <Item>item7</Item>
      <Item>item8</Item>
      <Item>item9</Item>
      <Item>item10</Item>
      <Item>item11</Item>
      <Item>item12</Item>
      <Item>item12</Item>
      <Item>item12</Item> */}
    </HomePageContainer>
  );
};

export default HomePage;
