import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MainCharachteristics } from "../MainCharachteristics/MainCharachteristics";
import { AdditionalOptions } from "../AdditionalOptions/AdditionalOptions";
import { ISelectedItemState } from "../MainCharachteristics/MainCharachteristics";
import styles from "./ConfigurationWindow.module.scss";

const getSelectedItem = (state: ISelectedItemState) => state.selectedItem;

export const ConfigurationWindow: React.FC = () => {
  const [optionsWindow, setOptionsWindow] = useState(false);

  const { mainCharachteristics, options } = useSelector(getSelectedItem);

  return !mainCharachteristics || !options ? (
    <div>
      Невалидный json. Json должен иметь вид: <br />
      {"{"}компания: <br />
      {"{"}марка: <br />
      {"{"}основыне характеристики: {"{"}характеристика: название{"}"},
      дополнительные атрибуты: {"{"}характеристика: название{"}"}
      {"}"}
      {"}"}
      {"}"}
    </div>
  ) : (
    <div className={styles["configuration-window"]}>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={() => setOptionsWindow(false)}>
          Основные характеристики
        </button>
        <button className={styles.btn} onClick={() => setOptionsWindow(true)}>
          Опциональные характеристики
        </button>
      </div>
      <div className="main-charachteristics-container">
        <ul>
          {optionsWindow
            ? Object.entries(options).map((val) => {
                return (
                  <li key={val[0]}>
                    <AdditionalOptions {...val} />
                  </li>
                );
              })
            : Object.entries(mainCharachteristics).map((val) => {
                return (
                  <li key={val[0]}>
                    {val[0] === "RAM" ||
                    val[0] === "data storage" ||
                    val[0] === "price" ? (
                      <MainCharachteristics {...val} />
                    ) : (
                      <>
                        <span className={styles.span}>
                          {val[0]}: {val[1] as string}
                        </span>
                      </>
                    )}
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
};
