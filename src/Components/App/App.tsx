import { useDispatch, useSelector } from "react-redux/es/exports";
import { saveAs } from "file-saver";
import React, { useEffect } from "react";
import { Tree } from "../Tree/Tree";
import { setTree, setFileName } from "../../Redux/treeSlice";
import { ConfigurationWindow } from "../ConfigurationWindow/ConfigurationWindow";
import { setSelectedItem } from "../../Redux/selectedItem";
import styles from "./App.module.scss";

interface ITreeState {
  treeSlice: {
    tree: Object;
    fileName: string;
  };
}

interface ISelectedItemState {
  selectedItem: {
    fileName: string;
  };
}

const getState = (state: ITreeState) => state.treeSlice;
const getCurrentFileName = (state: ISelectedItemState) =>
  state.selectedItem.fileName;

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const { tree, fileName } = useSelector(getState);
  const currentFileName = useSelector(getCurrentFileName);

  let resFile = fileName
    ? new File(
        [JSON.stringify(tree)],
        `${fileName.replace(/\.json/, "")}Modified`,
        { type: "application/json; charset=utf-8" }
      )
    : null;

  const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: Blob;
    if (e.target.files) {
      file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setTree(reader.result));
        dispatch(setFileName(e.target.files[0].name));
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    if (currentFileName !== fileName) {
      dispatch(
        setSelectedItem({
          company: "",
          mark: "",
          mainCharachteristics: [],
          options: [],
        })
      );
    }
  }, [fileName, dispatch, currentFileName]);

  const saveFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    saveAs(resFile);
  };

  return (
    <div className={styles.app}>
      <form className={styles.form}>
        <label className={styles.label}>
          Загрузить файл{" "}
          <input
            type="file"
            accept="application/json"
            onChange={getFile}
          ></input>{" "}
        </label>
        <button onClick={saveFile} className={styles["form-btn"]}>
          Получить файл
        </button>
      </form>
      {tree ? (
        <div className={styles["main-content-container"]}>
          <Tree />
          <ConfigurationWindow />
        </div>
      ) : null}
    </div>
  );
};
