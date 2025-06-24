<template>
    <div>
        <RouterLink to="/">
            <h2 class="text-center mt-10 mb-20 text-red-900 text-3xl font-bold">
                Voltar
            </h2>
        </RouterLink>
    </div>
    <div
        class="place-items-center m-auto sm:w-95 md:w-105 lg:w-205 bg-white/20 hover:bg-white/23 shadow-md rounded-lg p-5"
    >
        <img
            class="w-full h-full object-cover shadow-2xl rounded-lg"
            :src="`https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`"
            :alt="movies.title"
        />
        <h2 class="pt-4 text-2xl font-semibold mb-2">{{ movies.title }}</h2>
        <p class="text-lg font-semibold mb-2">
            Release: {{ movies.release_date }}
        </p>
        <p class="pb-4 mb-2 text-center">{{ movies.overview }}</p>
        <p v-if="providers.length > 0" class="text-lg font-bold">
            Você pode assistir em:
        </p>
        <p v-else="providers.length === 0">Não disponível para assistir (stramings).</p>
        <div v-for="provider in providers" class="text-center">
            <p>
                <img
                    :src="`https://image.tmdb.org/t/p/original/${provider.logo_path}`"
                    alt=""
                    class="m-auto p-5"
                />
                {{ provider.provider_name }}
            </p>
        </div>
    </div>

    <h2 class="text-center mt-20 mb-20 text-red-900 text-3xl font-bold">
        Recomendados:
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
const route = useRoute();

const movies = ref([]);
const similars = ref([]);
const providers = ref([]);
const movieCache = ref({});
const similarsCache = ref({});
const providersCache = ref({});

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_API_MOVIE_KEY,
    },
};

const loadMovieDetails = async () => {
    const id = route.params.id;
    if (movieCache.value[id]) {
        movies.value = movieCache.value[id];
        return;
    }
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`,
            options
        );
        movies.value = res.data;
        movieCache.value[id] = res.data;
    } catch (err) {
        console.log(err);
    }
};

const getSimilars = async () => {
    const id = route.params.id;
    if (similarsCache.value[id]) {
        similars.value = similarsCache.value[id];
        return;
    }
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
            options
        );
        similars.value = res.data.results;
        similarsCache.value[id] = res.data.results;
    } catch (err) {
        console.log(err);
    }
};

const getWatchProviders = async () => {
    const id = route.params.id;
    if (providersCache.value[id]) {
        providers.value = providersCache.value[id];
        return;
    }
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
            options
        );
        providers.value = res.data.results.BR.flatrate || [];
        providersCache.value[id] = providers.value;
    } catch (err) {
        console.log(err);
    }
};

onMounted(() => {
    loadMovieDetails();
    getWatchProviders();
    getSimilars();
});

watch(
    () => route.params.id,
    () => {
        loadMovieDetails();
        getWatchProviders();
        getSimilars();
        window.scrollTo(0, 0);
    }
);
</script>
