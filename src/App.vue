<template>
    <div id="app" class="bg-green-100 min-h-screen py-5 text-gray-900 font-pop">
        <div class="max-w-2xl px-5 mx-auto">
            <Navbar />
            <router-view />
        </div>
    </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
    components: {
        Navbar,
    },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

.font-pop {
    font-family: "Poppins", sans-serif;
}
</style>
