<template>
  <q-layout view="hHh lpR fFf">
    <a class="skip-link" href="#contenido">Ir al contenido</a>
    <q-header>
      <q-toolbar class="app-toolbar">
        <q-toolbar-title>ConectaMayor</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <main id="contenido" tabindex="-1">
        <router-view />
      </main>
    </q-page-container>
  </q-layout>
</template>
