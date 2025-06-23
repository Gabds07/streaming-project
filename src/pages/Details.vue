<template>
    <div>
        <RouterLink to="/">
            <h2 class="text-center mt-10 mb-20 text-red-900 text-3xl font-bold">
                Get back
            </h2>
        </RouterLink>
    </div>
    <div
        class="place-items-center m-auto w-105 bg-white/20 hover:bg-white/23 shadow-md rounded-lg"
    >
        <img
            class="w-full h-50 object-cover"
            :src="`https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`"
            :alt="movies.title"
        />
        <h2 class="pt-4 text-2xl font-semibold mb-2">{{ movies.title }}</h2>
        <p class="text-lg font-semibold mb-2">
            Release: {{ movies.release_date }}
        </p>
        <p class="pb-4 mb-2 text-center">{{ movies.overview }}</p>
    </div>
    <h2 class="text-center mt-20 mb-20 text-red-900 text-3xl font-bold">
        Similars
    </h2>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
        <div
            class="bg-white/20 shadow-md rounded-lg overflow-hidden"
            v-for="similar in similars"
        >
            <RouterLink :to="'/details/' + similar.id">
                <img
                    :src="`https://image.tmdb.org/t/p/w500/${similar.backdrop_path}`"
                    :alt="`${similar.title}`"
                    class="movie-image w-full h-50 object-cover hover:shadow-2xl"
                />
                <div class="p-4">
                    <h2 class="text-center text-lg font-semibold mb-2">
                        {{ similar.title }}
                    </h2>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const movies = ref([]);
const similars = ref([]);
const route = useRoute();

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_API_MOVIE_KEY,
    },
};

const loadMovieDetails = async () => {
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${route.params.id}`,
            options
        );
        movies.value = res.data;
    } catch (err) {
        console.log(err);
    }
};

const getSimilars = async () => {
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${route.params.id}/similar?language=en-US&page=1`,
            options
        );
        similars.value = res.data.results;
    } catch (err) {
        console.log(err);
    }
};

onMounted(() => {
    loadMovieDetails();
    getSimilars();
});

watch(
    () => route.params.id,
    () => {
        loadMovieDetails();
        getSimilars();
        window.scrollTo(0, 0);
    }
);
</script>
