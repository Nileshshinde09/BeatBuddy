import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trendinglistState: false,
  trendinglistData: [],
  recommendationlistState: false,
  recommendationlistData: false,
  homelistState: false,
  homelistData: [],
  searchState: false,
  searchData: "",
  loading:false,
  loadingerror:false,
  navlocation:'',
  headerToggle:false
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    trendinglist: (state, action) => {
      state.trendinglistState = true;
      state.trendinglistData = action.payload;
    },
    setRecommendationFalse:(state)=>{
      state.recommendationlistState = false;
    },
    recommendationlist: (state, action) => {
      state.recommendationlistState = true;
      state.recommendationlistData = action.payload;
    },
    homelist: (state, action) => {
      state.homelistState = true;
      state.homelistData = action.payload;
    },
    search: (state, action) => {
      state.searchState = true;  // Set searchState to true instead of toggling
      state.searchData = action.payload;
    },
    loading:(state,action)=>{
      state.loading=!state.loading
    },
    loadingerror:(state,action)=>{
      state.loadingerror=!state.loadingerror
    },
    navlocation:(state,action)=>{
      state.navlocation=action.payload
    },
    headerToggle:(state,action)=>{
      state.headerToggle=!state.headerToggle
    },
  },
});

export const {
  trendinglist,
  recommendationlist,
  homelist,
  search,
  loading,
  loadingerror,
  navlocation,
  headerToggle,
  setRecommendationFalse
} = cardSlice.actions;

export default cardSlice.reducer;
