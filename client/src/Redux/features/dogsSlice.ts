import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
   GET_ALL_DOGS_URL,
   FULLFILLED,
   PENDING,
   REJECTED,
   GET_DOG_SEARCH,
} from "../../utils/constants";
import { RootState } from "../store";
import { sortAtoZ, sortHeavier, sortLighter, sortZtoA } from "../../utils/sorters";

export interface Dog {
   id: string;
   name: string;
   height: string;
   weight: string;
   life_span: string;
   averageWeight: string;
   averageHeight: string;
   image: string;
   temperaments: string[];
}

interface DogsState {
   dogs: Dog[];
   dog?: Dog;
   filters: {
      weight: {
         lighter: boolean,
         heavier: boolean
      },
      temperament: boolean,
      breed: {
         atoZ: boolean,
         ztoA: boolean
      }
   }
   status: string;
   error: string;
}

const initialState: DogsState = {
   dogs: [],
   filters: {
      weight: {
         lighter: false,
         heavier: false
      },
      temperament: false,
      breed: {
         atoZ: false,
         ztoA: false
      }
   },
   status: "idle",
   error: "",
};

const fetchAllDogs = createAsyncThunk("dogs/fetchAllDogs", async () => {
   try {
      const data = (await axios.get(GET_ALL_DOGS_URL)).data;
      return data;
   } catch (error) {
      throw new Error("Something went wrong");
   }
});

const fetchDogByName = createAsyncThunk("dogs/fetchDogByName", async (name:string) => {
   try {
      const data = (await axios.get(GET_DOG_SEARCH + name)).data;
      return data;
   } catch (error) {
      throw new Error("Something went wrong")
   }
})

const dogsSlice = createSlice({
    name: "dogs",
    initialState,
    reducers: {


      sortFromAtoZ: (state) => {
         state.dogs = sortAtoZ(state.dogs);
      },
      sortFromZtoA: (state) => {
         state.dogs = sortZtoA(state.dogs);
      },
      sortFromLighter: (state) => {
         state.dogs = sortLighter(state.dogs);
      },
      sortFromHeavier: (state) => {
         state.dogs = sortHeavier(state.dogs);
      },
      sortByTemperament: (state, action) => {
         state.filters.temperament = true;
         const dogs = state.dogs;
         const temperamentsArray = action.payload;
         const filteredDogs = dogs.filter((dog) => {
               return temperamentsArray.every((temp:string) => dog.temperaments.includes(temp))
         })
         console.log(filteredDogs);
         console.log(temperamentsArray);
         
         state.dogs = filteredDogs;
         
      }
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchAllDogs.pending, (state) => {
           state.status = PENDING;
            state.dogs = sortAtoZ(state.dogs);
            state.filters.breed.atoZ = false;
            state.filters.breed.ztoA = false;
            state.filters.weight.heavier = false;
            state.filters.weight.lighter = false;
            state.error = "";
        })
        .addCase(fetchAllDogs.fulfilled, (state, action) => {
            state.dogs = action.payload;
            state.status = FULLFILLED;
        })
        .addCase(fetchAllDogs.rejected, (state) => {
            state.error = "Error";
            state.status = REJECTED;
         })
         .addCase(fetchDogByName.pending, (state) => {
            state.status = PENDING;
         })
         .addCase(fetchDogByName.fulfilled,(state, action) => {
            state.dogs = action.payload;
            state.status = FULLFILLED;
            state.error = ""
         })
         .addCase(fetchDogByName.rejected, (state) => {
            state.status = REJECTED;
            state.error = "something went wrong"
            state.dogs = [];

         })
   },
});

export default dogsSlice.reducer;
export { fetchAllDogs, fetchDogByName };
export const {sortFromAtoZ, sortFromHeavier, sortFromLighter, sortFromZtoA, sortByTemperament} = dogsSlice.actions;
export const selectAllDogs = (state: RootState) => state.dogs.dogs;
export const selectStatus = (state: RootState) => state.dogs.status;
export const selectDog = (state: RootState) => state.dogs.dog;
export const selectError = (state: RootState) => state.dogs.error;
export const selectFilters = (state: RootState) => state.dogs.filters;
