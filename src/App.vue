<template>
    <h1 class="m-10 text-3xl font-bold mb-6 text-center text-red-900">
        Popular 🎬
    </h1>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
        <div
            v-for="movie in movies"
            :key="movie.id"
            class="bg-white/20 shadow-md rounded-lg overflow-hidden"
        >
            <img
                :src="`${movieImages}`"
                :alt="movie.title"
                class="w-full h-72 object-cover"
            />
            <div class="p-4">
                <h2 class="text-lg font-semibold mb-2">{{ movie.title }}</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const movies = ref([]);
const movieImages = ref([]);

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: import.meta.env.API_MOVIE_KEY,
    },
};

const loadMovieList = async () => {
    try {
        const res = await axios.get(
            "https://api.themoviedb.org/3/movie/popular",
            options
        );
        movies.value = res.data.results;

        let movie = [];
        for (movie in movies) {
            return movie.id;
        }

        const resImg = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie}/images`,
            options
        );
        movieImages.value = resImg.data;
    } catch (err) {
        console.log(err);
    }
};

onMounted(loadMovieList);
</script>
