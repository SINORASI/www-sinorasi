<template>
<header class="z-100 bg-neutral-600/30 backdrop-blur-2xl border-b-1 border-b-neutral-400 fixed top-0 left-0 right-0">
    <div class="p-4 flex items-center justify-around gap-5">
        <div class="flex items-center justify-center gap-5">
            <img src="/images/logo.webp" width="80" alt="Logo SMKN 2 Singosari" />
            <div class="flex flex-col">
                <h2 class="text-2xl font-bold">STEMDASI</h2>
                <p>SMKN 2 Singosari</p>
            </div>
        </div>
        <div class="hidden md:flex gap-5">
            <div class="flex cursor-pointer gap-3 items-center justify-center">
                <p>Beranda</p>
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