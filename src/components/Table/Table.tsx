import React, { useEffect, useState } from "react";
import style from "./table.module.scss";
import Modal from "../Modal/Modal";

import { useGetEntityListQuery } from "../../services/services";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setEntityList } from "../../features/entitySlice";

const Table = () => {
  const ADD = "ADD";
  const EDIT = "EDIT";
  const DELETE = "DELETE";

  let [type, setType] = useState("");
  let [openModal, setOpenModal] = useState(false);
  let [clickedElementId, setClickedElementId] = useState<string>();

  const { data, isLoading } = useGetEntityListQuery("entities");
  const entities = useAppSelector((state) => state.entities.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setEntityList(data));
  }, [data, dispatch]);

  const handleAddEntity = () => {
    setType(ADD);
    setOpenModal(true);
  };

  const handleEdit = (_id: string) => {
    setType(EDIT);
    setClickedElementId(_id);
    setOpenModal(true);
  };

  const handleDelete = (_id: string) => {
    setClickedElementId(_id);
    setType(DELETE);
    setOpenModal(true);
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <div className={style.container}>
          <div className={style.btnContainer}>
            <button onClick={handleAddEntity}>Add New Entity</button>
          </div>
          <table>
            <tr>
              <th>Name</th>
              <th>Coordinate</th>
              <th>Labels</th>
              <th>Customize</th>
            </tr>

            {!entities?.length ? (
              <p className={style.noEntity}>No entities yet</p>
            ) : (
              entities.map((ent: any) => {
                return (
                  <>
                    <tr>
                      <td>{ent.name}</td>
                      <td>
                        {ent.coordinates[0]},{ent.coordinates[1]}
                      </td>
                      <td>
                        {ent?.labels?.map((lab: string) => {
                          return (
                            <>
                              <span>{lab} </span>
                            </>
                          );
                        })}
                      </td>
                      <td>
                        <button
                          onClick={() => handleEdit(ent._id)}
                          className={style.editBtn}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ent._id)}
                          className={style.deleteBtn}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })
            )}
          </table>
        </div>
      )}
      {openModal && (
        <Modal
          type={type}
          id={clickedElementId}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default Table;
