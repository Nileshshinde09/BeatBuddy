import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  albumState:false,
  albumData:[],
  artistState:false,
  artistData:[],

};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    Album:(state,action)=>{
      
      state.albumData=action.payload;
      
    },
    setAlbumTrue:state=>{
      state.albumState=true;
    },
    setAlbumFalse:state=>{
      state.albumState=false;
    },
    Artist:(state,action)=>{
        state.artistData=action.payload;
    },
    setArtistTrue:state=>{
      state.artistState=true;
    },
    setArtistFalse:state=>{
      state.artistState=false;
    }
  },
});

export const {
  Album,
  Artist,
  setAlbumFalse,
  setAlbumTrue,
  setArtistFalse,
  setArtistTrue
} = infoSlice.actions;

export default infoSlice.reducer;
