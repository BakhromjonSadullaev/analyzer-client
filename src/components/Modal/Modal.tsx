import React, { useEffect, useState } from "react";
import style from "./modal.module.scss";
import { v4 as uuidv4 } from "uuid";

import {
  useAddEntityMutation,
  useDeleteEntityMutation,
  useEditEntityMutation,
} from "../../services/services";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addEntityList,
  editEntity,
  removeEntity,
} from "../../features/entitySlice";

interface ModalProps {
  type: string;
  id: any;
  closeModal: () => void;
}

const Modal = ({ type, id, closeModal }: ModalProps) => {
  const ADD = "ADD";
  const EDIT = "EDIT";
  const DELETE = "DELETE";

  let [entityName, setEntityName] = useState("");
  let [coordinate1, setCoordinate1] = useState("");
  let [coordinate2, setCoordinate2] = useState("");
  let [required, setRequired] = useState(false);
  let [labels, setLabels] = useState("");
  let [editingEntity, setEditingEntity] = useState<object | any>();

  const [addEntity] = useAddEntityMutation();
  const [deleteEntity] = useDeleteEntityMutation();
  const [updateEntity] = useEditEntityMutation();

  const entitiesDB = useAppSelector((state) => state.entities.list);
  const dispatch = useAppDispatch();

  console.log(entityName, coordinate1, coordinate2, labels);

  const handleClose = () => {
    closeModal();
  };
  console.log(entitiesDB[0], "passing id is", id);
  useEffect(() => {
    if (type === EDIT) {
      let editingElement = entitiesDB.find((el) => el._id === id);
      setEditingEntity(editingElement);
      setEntityName(editingElement?.name);
      setCoordinate1(editingElement?.coordinates[0]);
      setCoordinate2(editingElement?.coordinates[1]);
      setLabels(editingElement?.labels?.join(""));
    }
  }, [id, entitiesDB]);

  const handleAdd = () => {
    if (entityName && coordinate1 && coordinate2) {
      let formatedLabels = labels?.split(/[\s,]+/);
      let newEnt = {
        id: uuidv4(),
        name: entityName,
        coordinates: [coordinate1, coordinate2],
        labels: formatedLabels,
      };
      dispatch(addEntityList(newEnt));
      addEntity(newEnt);
      setEntityName("");
      closeModal();
    }

    setRequired(true);
  };

  const handleEdit = () => {
    let formatedLabels = labels.split(/[\s,]+/);
    let editedEntity = {
      name: entityName,
      coordinates: [coordinate1, coordinate2],
      labels: formatedLabels,
    };
    updateEntity({ _id: editingEntity._id, data: editedEntity });
    dispatch(editEntity({ id: editingEntity._id, entity: editedEntity }));

    handleClose();
  };
  const handleDelete = () => {
    deleteEntity(id);
    dispatch(removeEntity(id));
    handleClose();
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.modal}>
          <div className={style.header}>
            <h1>
              {type === ADD
                ? "Add New Entity"
                : type === EDIT
                ? "Edit Entity"
                : type === DELETE
                ? "Delete Entity"
                : "Ooops something went wrong!"}
            </h1>
          </div>
          <main className={style.content}>
            {type === ADD || type === EDIT ? (
              <form>
                <input
                  value={entityName}
                  type="text"
                  placeholder="Entity Name*"
                  onChange={(e) => setEntityName(e.target.value)}
                />
                <input
                  value={coordinate1}
                  type="number"
                  placeholder="Coordinate 1*"
                  onChange={(e) => setCoordinate1(e.target.value)}
                />
                <input
                  value={coordinate2}
                  type="number"
                  placeholder="Coordinate 2*"
                  onChange={(e) => setCoordinate2(e.target.value)}
                />
                <textarea
                  value={labels}
                  name=""
                  id=""
                  placeholder="Labels"
                  onChange={(e) => setLabels(e.target.value)}
                ></textarea>
              </form>
            ) : (
              <h1>Are you sure to delete Entity ?</h1>
            )}
          </main>
          <div className={style.modalFooter}>
            {required && <p>Please fill all fields !</p>}
            <div>
              <button
                onClick={
                  type === ADD
                    ? handleAdd
                    : type === EDIT
                    ? handleEdit
                    : type === DELETE
                    ? handleDelete
                    : () => alert("Something Wrong !")
                }
              >
                {type === ADD ? "Add" : type === EDIT ? "Edit" : "Delete"}
              </button>
              <button onClick={handleClose}>
                {type === DELETE ? "Cancel" : "Close"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
