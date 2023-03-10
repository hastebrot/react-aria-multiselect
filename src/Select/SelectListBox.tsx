import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox";
import clsx from "clsx";
import * as React from "react";

import type { MultiSelectState } from "./useMultiSelectState";
import type { AriaListBoxOptions } from "@react-aria/listbox";
import type { Node } from "@react-types/shared";

interface ListBoxProps<T> extends AriaListBoxOptions<T> {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: MultiSelectState<T>;
}

type SectionProps<T> = {
  section: Node<T>;
  state: MultiSelectState<T>;
};

type OptionProps<T> = {
  item: Node<T>;
  state: MultiSelectState<T>;
};

const Option = <T,>({ item, state }: OptionProps<T>) => {
  const ref = React.useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      className={clsx("select__option", {
        "select__option--disabled": isDisabled,
        "select__option--focused": isFocused,
        "select__option--selected": isSelected,
      })}
    >
      {state.selectionMode === "multiple" && (
        <input
          type="checkbox"
          disabled={isDisabled}
          checked={isSelected}
          readOnly
        />
      )}
      {typeof item.rendered === "string" ? (
        <span className="truncate block">{item.rendered}</span>
      ) : (
        item.rendered
      )}
    </li>
  );
};

const Section = <T,>({ section, state }: SectionProps<T>) => {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  return (
    <>
      <li {...itemProps} className="select__section">
        {section.rendered && (
          <span {...headingProps} className="select__section-heading">
            {section.rendered}
          </span>
        )}
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
};

export const SelectListBox = <T,>(props: ListBoxProps<T>) => {
  const ref = React.useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;

  const { listBoxProps } = useListBox(
    {
      ...props,
      // When Select is clearable, do not clear the selection once ESC key is pressed, see https://github.com/adobe/react-spectrum/blob/main/packages/@react-aria/selection/src/useSelectableCollection.ts#L226
      disallowEmptySelection: true,
    },
    state,
    listBoxRef
  );

  return (
    <ul {...listBoxProps} className="select__listbox" ref={listBoxRef}>
      {[...state.collection].map((item) =>
        item.type === "section" ? (
          <Section key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        )
      )}
    </ul>
  );
};
