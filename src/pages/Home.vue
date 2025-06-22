<template>
    <h1 class="mt-5 text-3xl font-bold mb-6 text-center text-red-900">
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
            <RouterLink to="/details">
                <img
                    :src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`"
                    :alt="movie.title"
                    class="movie-image w-full h-50 object-cover hover:shadow-2xl"
                />
            </RouterLink>
            <div class="p-4">
                <h2 class="text-center text-lg font-semibold mb-2">
                    {{ movie.title }}
                </h2>
            </div>
        </div>
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
    } catch (err) {
        console.log(err);
    }
};

onMounted(loadMovieList);
</script>

<style>
.movie-image {
    height: 200px;
    transition: height 0.5s;
}

.movie-image:hover {
    height: 205px;
}
</style>
