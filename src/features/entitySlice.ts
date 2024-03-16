import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface EntityState {
  list: Array<any>;
}

const initialState: EntityState = {
  list: [],
};

export const entitySlice = createSlice({
  name: "entity",
  initialState,
  reducers: {
    setEntityList: (state, action: PayloadAction<Array<object>>) => {
      // Replace entire list with new data (immutable update)
      state.list = action.payload;
    },
    addEntityList: (state, action: PayloadAction<object>) => {
      // Append a single entity to the list (immutable update)
      state.list = [...state.list, action.payload];
    },
    removeEntity(state, action: PayloadAction<string>) {
      return {
        ...state,
        list: state.list.filter((el) => el._id !== action.payload),
      };
    },
    editEntity(state, action: PayloadAction<any>) {
      return {
        ...state,
        list: state.list.map((item) =>
          item._id === action.payload.id
            ? {
                ...item,
                name: action.payload.entity.name,
                coordinates: action.payload.entity.coordinates,
                labels: action.payload.entity.labels,
              }
            : item
        ),
      };
    },
  },
});

export const { setEntityList, addEntityList, removeEntity, editEntity } =
  entitySlice.actions;

export default entitySlice.reducer;
