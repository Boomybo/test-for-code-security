import React from "react";
import { InputNumber, Slider } from "antd";
import { mutateTree } from "../../Redux/selectedItem";
import { mutateAllTree } from "../../Redux/treeSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MainCharachteristics.module.scss";

export interface ISelectedItemState {
  selectedItem: {
    mainCharachteristics: Array<String> | Object;
    options: Array<String> | object;
    company?: string;
    mark?: string;
  };
}

export interface IProp {
  [key: number]: string | number | unknown;
}

const getState = (state: ISelectedItemState) => state.selectedItem;

export const MainCharachteristics: React.FC<IProp> = ({ 0: key, 1: value }) => {
  const dispatch = useDispatch();

  const { company, mark } = useSelector(getState);

  const onChange = (newValue: number) => {
    dispatch(
      mutateTree({
        direction: "mainCharachteristics",
        charachteristic: key,
        value: newValue,
      })
    );
    dispatch(
      mutateAllTree({
        company,
        mark,
        direction: "mainCharachteristics",
        charachteristic: key,
        value: newValue,
      })
    );
  };

  let step = key === "price" ? 1 : key === "RAM" ? 8 : 128,
    maxSize = key === "price" ? 1000000 : key === "RAM" ? 128 : 4096;

  return (
    <>
      <span className={styles.span}>{key as string}</span>
      <>
        <InputNumber
          style={{ margin: "0 16px" }}
          value={value as number}
          onChange={onChange}
          min={0}
          max={maxSize}
        />
        <span className={styles.span}>{key === "price" ? "RUB" : "GB"}</span>
        <div className={styles.slider}>
          <Slider
            min={0}
            max={maxSize}
            onChange={onChange}
            step={step}
            value={value as number}
          />
        </div>
      </>
    </>
  );
};
