import "./styles.css";
import "./select.css";

import { Select } from "./Select/Select";

const options = [
  {
    id: "1",
    name: "Apple",
  },
  {
    id: "2",
    name: "Banana",
  },
  {
    id: "3",
    name: "Orange",
  },
  {
    id: "4",
    name: "Blueberry",
  },
  {
    id: "5",
    name: "Kiwi",
  },
];

export default function App() {
  const onChange = (keys: any) => console.log(Array.from(keys));

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
          height: "100vh",
          maxWidth: "70%",
          margin: "0 auto",
        }}
      >
        <p>Example of Spectrum hooks adjustments to support multi select.</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            alignContent: "center",
            gap: "2px",
          }}
        >
          <Select
            label="Single"
            selectionMode="single"
            options={options}
            defaultSelectedKeys={["3"]}
            disabledKeys={["4"]}
            onSelectionChange={onChange}
            isClearable
          ></Select>
          <Select
            label="Multi"
            selectionMode="multiple"
            options={options}
            defaultSelectedKeys={["3"]}
            disabledKeys={["4"]}
            onSelectionChange={onChange}
            isSelectableAll
            isClearable
          ></Select>
        </div>
      </div>
    </div>
  );
}
