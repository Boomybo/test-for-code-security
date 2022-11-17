import React from "react";
import { Switch } from "antd";
import { mutateTree } from "../../Redux/selectedItem";
import { mutateAllTree } from "../../Redux/treeSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AdditionalOptions.module.scss";

import {
  ISelectedItemState,
  IProp,
} from "../MainCharachteristics/MainCharachteristics";

const getState = (state: ISelectedItemState) => state.selectedItem;

export const AdditionalOptions: React.FC<IProp> = ({ 0: key, 1: value }) => {
  const dispatch = useDispatch();
  const { company, mark } = useSelector(getState);

  const onChange = () => {
    dispatch(
      mutateTree({ direction: "options", charachteristic: key, value: !value })
    );
    dispatch(
      mutateAllTree({
        company,
        mark,
        direction: "options",
        charachteristic: key,
        value: !value,
      })
    );
  };

  return (
    <>
      <span className={styles.span}>{key as string}</span>
      <Switch checked={value as boolean} onChange={onChange} />
    </>
  );
};
