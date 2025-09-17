<script lang="ts" setup>
    
</script>

<template>
    <header class="z-100 fixed top-0 left-0 right-0  bg-orange-600/30 backdrop-blur-2xl border-b-1 border-b-orange-400">
        <div class="p-4 flex justify-around items-center gap-5">
            <div class="flex justify-center items-center gap-5">
                <img src="/images/majorIcon/rpl.webp" width="60" alt="Logo Jurusan">
                <div class="flex flex-col">
                    <h2 class="text-2xl font-bold">RPL</h2>
                    <p>Rekayasa Perangkat Lunak</p>
                </div>
            </div>

            <div class="hidden md:flex gap-5">
                <div class="flex cursor-pointer gap-3 items-center justify-center">
                    <p>Pengenalan</p>
                    <Icon name="lucide:chevron-down" size="20" />
                </div>
                <div class="flex cursor-pointer gap-3 items-center justify-center">
                    <p>Lorem</p>
                    <Icon name="lucide:chevron-down" size="20" />
                </div>
                <div class="flex cursor-pointer gap-3 items-center justify-center">
                    <p>Lorem</p>
                    <Icon name="lucide:chevron-down" size="20" />
                </div>
                <div class="flex cursor-pointer gap-3 items-center justify-center">
                    <p>Lorem</p>
                    <Icon name="lucide:chevron-down" size="20" />
                </div>
            </div>

            <div>
                <button class="cursor-pointer">
                    <Icon name="lucide:align-justify" size="30" />
                </button>
            </div>
        </div>
    </header>
</template>