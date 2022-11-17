import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedItem } from "../../Redux/selectedItem";
import styles from "./Tree.module.scss";

interface ITree {
  treeSlice: {
    tree: Object;
    fileName: string;
  };
}

interface IObj {
  0: string;
  1: {
    mainCharachteristics?: {
      [key: string]: string;
    };
    options?: {
      [key: string]: boolean;
    };
    fileName?: string;
  };
}

const getTree = (state: ITree) => state.treeSlice;

export const Tree: React.FC = () => {
  const dispatch = useDispatch();

  const { tree, fileName } = useSelector(getTree);
  const trees = tree ? Object.entries(tree) : [];

  return (
    <div className={styles.tree}>
      <ul>
        {trees.map((value) => {
          const { 0: company, 1: mark } = value;
          return (
            <li key={company}>
              {company}
              <ul>
                {typeof mark === "object" && mark !== null
                  ? Object.entries(mark).map((val: IObj) => {
                      const { 0: mainCharachteristics, 1: options } = val;
                      const set = typeof options !== "object" ? {} : options;
                      return (
                        <li
                          key={mainCharachteristics}
                          className={styles["tree-mark"]}
                          onClick={() => {
                            dispatch(
                              setSelectedItem({
                                company: company,
                                mark: mainCharachteristics,
                                mainCharachteristics:
                                  options.mainCharachteristics,
                                options: set.options,
                                fileName: fileName,
                              })
                            );
                          }}
                        >
                          {mainCharachteristics}
                        </li>
                      );
                    })
                  : (mark as string)}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
