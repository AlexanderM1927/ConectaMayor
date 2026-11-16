export default [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { title: 'Inicio' } },
      {
        path: 'aprende',
        component: () => import('pages/TutorialsPage.vue'),
        meta: { title: 'Tutoriales digitales' }
      },
      {
        path: 'aprende/:id',
        component: () => import('pages/TutorialPage.vue'),
        meta: { title: 'Aprende paso a paso' }
      },
      {
        path: 'enganos',
        component: () => import('pages/FraudsPage.vue'),
        meta: { title: 'Prevención de fraudes' }
      },
      {
        path: 'enganos/:id',
        component: () => import('pages/FraudPage.vue'),
        meta: { title: 'Reconoce las señales' }
      },
      {
        path: 'practica',
        component: () => import('pages/PracticePage.vue'),
        meta: { title: 'Simulador de riesgos' }
      },
      {
        path: 'practica/:id',
        component: () => import('pages/SimulationPage.vue'),
        meta: { title: 'Practica con seguridad' }
      },
      {
        path: 'evaluacion',
        component: () => import('pages/AssessmentPage.vue'),
        meta: { title: 'Evaluación' }
      },
      {
        path: 'progreso',
        component: () => import('pages/ProgressPage.vue'),
        meta: { title: 'Mi progreso' }
      },
      {
        path: 'ayuda',
        component: () => import('pages/HelpPage.vue'),
        meta: { title: 'Ayuda y ajustes' }
      },
      { path: ':pathMatch(.*)*', component: () => import('pages/NotFoundPage.vue') }
    ]
  }
]
