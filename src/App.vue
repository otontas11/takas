<template>
    <div id="app">

   
    <ion-app>
        <ion-router-outlet></ion-router-outlet>
    </ion-app>
</div>
</template>

<script lang="ts"
        setup
>
    import {IonApp, IonRouterOutlet,IonRefresher, IonRefresherContent} from '@ionic/vue';

</script>
<style>
    .example-content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>
