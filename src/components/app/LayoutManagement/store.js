import axios from "axios"

export default {
    namespaced: true,
    state:{
        movies:[],
        moviesValue: '',
        theatres:[],
        theatresValue:'',
        halls:[],
        hallsValue:'',
        timeValue:"",
        priceValue:30
    },
    mutations: {
        setMovies(state,data){
            state.movies = data.rows;
        },
        setTheatres(state,data){
            state.theatres = data;
        },
        sethalls(state,data){
            state.hallsValue=data[0].videohallName;
            state.halls = data;
        }

    },
    actions: {
        async getMovies(context) {
            const  {data}  = await axios.get(`/movieManage`);
            context.commit("setMovies",data)
        },
        async getTheatres(context) {
            const  {data}  = await axios.get(`/theatreManage`);
            context.commit("setTheatres",data)
        },
        async gethalls(context,theatreId) {
            const  {data}  = await axios.get(`/showManage/shows?theatreId=${theatreId}&isRepeat=${true}`);
            context.commit("sethalls",data)
        }
    }
}