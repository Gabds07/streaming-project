<template>
    <div>
        <RouterLink to="/">
            <h2 class="text-center mt-10 mb-20 text-red-900 text-2xl font-bold">
                Get back
            </h2>
        </RouterLink>
    </div>
    <div
        class="place-items-center w-105 ml-90 block bg-white/20 hover:bg-white/23 shadow-md rounded-lg"
    >
        <img
            class="object-cover"
            :src="`https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`"
            :alt="movies.title"
        />
        <h2 class="pt-4 text-2xl font-semibold mb-2">{{ movies.title }}</h2>
        <p class="text-lg font-semibold mb-2">
            Release: {{ movies.release_date }}
        </p>
        <p class="pb-4 mb-2 text-center">{{ movies.overview }}</p>
    </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const movies = ref([]);

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_API_MOVIE_KEY,
    },
};

const ID = window.location.pathname;

const loadMovieDetails = async () => {
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${ID.slice(9)}`,
            options
        );
        movies.value = res.data;
    } catch (err) {
        console.log(err);
    }
};

onMounted(loadMovieDetails);
</script>
