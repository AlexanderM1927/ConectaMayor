import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { tutorials, questions, scenarios } from '../src/content/learning.js'

const webdriver = process.env.WEBDRIVER_URL || 'http://127.0.0.1:4444'
const base = process.env.APP_URL || 'http://127.0.0.1'
const evidence = process.env.EVIDENCE_DIR || '.qa'
await fs.mkdir(evidence, { recursive: true })
let session
const results = []

async function request(method, endpoint, data) {
  const response = await fetch(`${webdriver}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(data === undefined ? {} : { body: JSON.stringify(data) })
  })
  const result = await response.json()
  if (!response.ok || result.value?.error) throw new Error(JSON.stringify(result.value))
  return result.value
}
const command = (method, endpoint, data) => request(method, `/session/${session}${endpoint}`, data)
const js = (script, ...args) => command('POST', '/execute/sync', { script, args })
const asyncJs = (script, ...args) => command('POST', '/execute/async', { script, args })
const cdp = (cmd, params = {}) => command('POST', '/goog/cdp/execute', { cmd, params })

async function waitFor(script, message = script) {
  const deadline = Date.now() + 20000
  while (Date.now() < deadline) {
    if (await js(`return !!(${script})`)) return
    await new Promise((resolve) => setTimeout(resolve, 120))
  }
  throw new Error(`Timeout: ${message}`)
}
async function visit(route = '/') {
  await command('POST', '/url', { url: `${base}/#${route}` })
  await waitFor(
    'document.querySelector("main h1") && document.querySelector("main h1").textContent.length > 0',
    route
  )
}
async function click(selector) {
  const element = await js(
    'const element = document.querySelector(arguments[0]); if (element) element.scrollIntoView({block:"center"}); return element;',
    selector
  )
  assert.ok(element, `No existe ${selector}`)
  await command('POST', `/element/${element['element-6066-11e4-a52e-4f735466cecf']}/click`, {})
}
async function button(label) {
  let element
  const deadline = Date.now() + 10000
  while (Date.now() < deadline) {
    element = await js(
      'const element = [...document.querySelectorAll("button,a.q-btn")].find(el => el.textContent.toLocaleLowerCase().includes(arguments[0].toLocaleLowerCase()) && el.getBoundingClientRect().height > 0 && !el.disabled && el.getAttribute("aria-disabled") !== "true"); if(element) element.scrollIntoView({block:"center"}); return element;',
      label
    )
    if (element) break
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  assert.ok(element, `No existe el botón habilitado ${label}`)
  await command('POST', `/element/${element['element-6066-11e4-a52e-4f735466cecf']}/click`, {})
}
async function choose(index) {
  await click(`.choice-option:nth-of-type(${index + 1})`)
}
async function settled() {
  await waitFor('!document.querySelector(".q-btn--loading")')
}
async function shot(name) {
  await js('document.activeElement?.blur(); window.scrollTo(0,0)')
  const screenshot = await command('GET', '/screenshot')
  await fs.writeFile(path.join(evidence, `${name}.png`), Buffer.from(screenshot, 'base64'))
}
async function viewport(width, height = 844) {
  await cdp('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 700
  })
}
async function readStore(name) {
  return asyncJs(
    'const name = arguments[0], done = arguments[arguments.length - 1]; const request = indexedDB.open("conectamayor"); request.onerror = () => done({error: "open"}); request.onsuccess = () => { const db = request.result; const tx = db.transaction(name); const read = tx.objectStore(name).getAll(); read.onsuccess = () => { done(read.result); db.close(); }; read.onerror = () => { done({error:"read"}); db.close(); }; };',
    name
  )
}
function passed(name) {
  results.push(name)
  console.log(`PASS ${name}`)
}

try {
  const created = await request('POST', '/session', {
    capabilities: {
      alwaysMatch: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: [
            '--headless=new',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--window-size=1440,1100'
          ]
        },
        'goog:loggingPrefs': { browser: 'ALL' }
      }
    }
  })
  session = created.sessionId
  await command('POST', '/timeouts', { script: 30000, pageLoad: 30000 })
  await viewport(1440, 1100)
  await visit()
  await waitFor(
    'document.querySelector(".hero-image img").complete && document.querySelector(".hero-image img").naturalWidth > 0'
  )
  await shot('inicio-escritorio')
  assert.equal(await js('return document.documentElement.lang'), 'es')
  passed('Inicio, ilustración local e idioma')

  await viewport(390)
  await shot('inicio-movil')
  await visit('/aprende')
  assert.equal(await js('return document.querySelectorAll(".course-card").length'), 4)
  await shot('tutoriales-movil')
  await visit('/aprende/mensajes')
  await button('Comenzar tutorial')
  await settled()
  await choose(0)
  const firstRadio = await js('return document.querySelector(".choice-option input")')
  await command('POST', `/element/${firstRadio['element-6066-11e4-a52e-4f735466cecf']}/value`, {
    text: '\uE015'
  })
  await waitFor('document.querySelectorAll(".choice-option input")[1].checked')
  await button('Comprobar mi respuesta')
  await waitFor('document.querySelector(".feedback-review")')
  await button('Intentar otra vez')
  await choose(0)
  await button('Comprobar mi respuesta')
  await waitFor('document.querySelector(".feedback-success")')
  await settled()
  await button('Siguiente paso')
  await settled()
  await command('POST', '/refresh', {})
  await waitFor('document.querySelector("#step-title")?.textContent.includes("Prepara")')
  await shot('tutorial-paso-movil')
  for (let stepIndex = 1; stepIndex < tutorials[0].steps.length; stepIndex += 1) {
    await choose(tutorials[0].steps[stepIndex].correct)
    await button('Comprobar mi respuesta')
    await waitFor('document.querySelector(".feedback-success")')
    await settled()
    await button(stepIndex === 3 ? 'Terminar tutorial' : 'Siguiente paso')
    await settled()
  }
  await waitFor('document.querySelector("#tutorial-complete")')
  const tutorialProgress = (await readStore('progress')).find(
    (item) => item.id === 'tutorial:mensajes'
  )
  assert.equal(tutorialProgress.completed, true)
  assert.equal(tutorialProgress.completedSteps.length, 4)
  passed('Tutorial completo, selección con teclado, error, reintento y reanudación con IndexedDB')

  await visit('/enganos/banco')
  assert.equal(await js('return document.querySelectorAll(".message-preview a").length'), 0)
  await button('Mostrar las señales')
  await waitFor('document.querySelectorAll(".signal-list li").length === 3')
  await button('Ya revisé este ejemplo')
  await settled()
  assert.equal(
    (await readStore('progress')).find((item) => item.id === 'fraud:banco').completed,
    true
  )
  await shot('prevencion-movil')
  passed('Señales de fraude, enlace inerte y ejemplo revisado persistido')

  await visit('/practica/banco')
  await choose(0)
  await button('Comprobar mi decisión')
  await waitFor('document.querySelector(".feedback-review")')
  await settled()
  await button('Volver a intentarlo')
  await choose(1)
  await button('Comprobar mi decisión')
  await waitFor('document.querySelector(".feedback-success")')
  await settled()
  await shot('simulador-respuesta-movil')
  const simulations = (await readStore('attempts')).filter((item) => item.kind === 'simulation')
  assert.equal(simulations.length, 2)
  assert.equal(simulations.filter((item) => item.correct).length, 1)
  passed('Simulación, retroalimentación y registro de ambos intentos')

  await visit('/evaluacion')
  await button('Comenzar evaluación')
  await settled()
  for (let index = 0; index < questions.length; index += 1) {
    await choose(index === 0 ? 1 : questions[index].correct)
    await button('Comprobar respuesta')
    await waitFor('document.querySelector(".feedback-panel")')
    await settled()
    await button(index === questions.length - 1 ? 'Ver mi resultado' : 'Siguiente pregunta')
    await settled()
  }
  await waitFor('document.querySelector("#assessment-result")')
  assert.ok(
    (await js('return document.querySelector(".result-number").textContent')).trim().startsWith('5')
  )
  const assessment = (await readStore('progress')).find((item) => item.id === 'assessment:basic')
  assert.equal(assessment.completed, true)
  assert.equal(assessment.score, 5)
  await command('POST', '/refresh', {})
  await waitFor('document.querySelector("#assessment-result")')
  await shot('evaluacion-resultado-movil')
  passed('Evaluación de seis preguntas, resultado y recuperación tras recarga')

  await visit('/progreso')
  await shot('progreso-movil')
  assert.equal(await js('return document.querySelectorAll(".achievement-card.unlocked").length'), 2)
  passed('Resumen de progreso e insignias derivados de actividades reales')

  await visit('/ayuda')
  await button('Muy grande')
  await settled()
  await command('POST', '/refresh', {})
  await waitFor('document.documentElement.dataset.textSize === "extra"')
  await click('.setting-row .q-toggle')
  await waitFor('document.documentElement.classList.contains("high-contrast")')
  await click('.setting-row + .setting-row .q-toggle')
  await settled()
  await command('POST', '/refresh', {})
  await waitFor('document.documentElement.classList.contains("reduce-motion")')
  await viewport(320)
  for (const route of ['/', '/aprende', '/practica', '/evaluacion', '/progreso', '/ayuda']) {
    await visit(route)
    const overflow = await js('return document.documentElement.scrollWidth - window.innerWidth')
    assert.ok(overflow <= 1, `Desbordamiento horizontal ${route}: ${overflow}px`)
  }
  await click('.mobile-menu')
  await waitFor('document.querySelector(".q-drawer")?.getBoundingClientRect().left >= 0')
  assert.equal(await js('return document.querySelectorAll(".q-drawer a.q-item").length'), 7)
  await click('.drawer-heading button')
  await waitFor('document.querySelector(".q-drawer")?.getBoundingClientRect().right <= 1')
  await shot('ayuda-texto-ampliado-320')
  await button('Normal')
  await settled()
  await click('.setting-row .q-toggle')
  await settled()
  await viewport(390)
  passed('Tamaño de texto persistido, contraste y reflujo a 320px')

  await button('Borrar mis datos')
  await waitFor('document.querySelector(".q-dialog")')
  await button('Conservar mis datos')
  assert.ok((await readStore('attempts')).length > 0)
  await button('Borrar mis datos')
  await waitFor('document.querySelector(".q-dialog")')
  await button('Sí, borrar los datos')
  await waitFor('document.querySelector(".welcome-hero")')
  assert.equal((await readStore('attempts')).length, 0)
  assert.equal((await readStore('progress')).length, 0)
  assert.equal((await readStore('preferences')).length, 0)
  assert.equal((await readStore('metadata')).length, 0)
  await button('Cerrar')
  passed('Borrado local: cancelar conserva datos; confirmar elimina todos los almacenes de uso')

  await visit('/aprende/correo')
  await js(
    'window.__originalPut = IDBObjectStore.prototype.put; IDBObjectStore.prototype.put = function () { throw new DOMException("Prueba de cuota", "QuotaExceededError") }'
  )
  await button('Comenzar tutorial')
  await waitFor('document.querySelector(".notice-warning")')
  assert.equal((await readStore('progress')).length, 0)
  await js('IDBObjectStore.prototype.put = window.__originalPut')
  await button('Reintentar guardado')
  await waitFor('!document.querySelector(".notice-warning")')
  assert.equal(
    (await readStore('progress')).find((item) => item.id === 'tutorial:correo').currentStep,
    0
  )
  passed('Fallo de almacenamiento visible, conservación en memoria y reintento de guardado')

  await waitFor('navigator.serviceWorker.controller !== null')
  await cdp('Network.enable')
  await cdp('Network.emulateNetworkConditions', {
    offline: true,
    latency: 0,
    downloadThroughput: 0,
    uploadThroughput: 0
  })
  await command('POST', '/refresh', {})
  await waitFor('document.querySelector("#step-title")')
  await waitFor('document.body.textContent.includes("Estás sin conexión")')
  await choose(tutorials[1].steps[0].correct)
  await button('Comprobar mi respuesta')
  await waitFor('document.querySelector(".feedback-success")')
  await settled()
  await shot('tutorial-sin-conexion')
  assert.equal(
    (await readStore('progress')).find((item) => item.id === 'tutorial:correo').completedSteps
      .length,
    1
  )
  await cdp('Network.emulateNetworkConditions', {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1
  })
  passed('Reapertura de la PWA sin red, módulo interactivo y persistencia offline')

  await visit('/aprende/no-existe')
  assert.ok(await js('return document.querySelector("h1").textContent.includes("No encontramos")'))
  await button('Volver al inicio')
  await waitFor('document.querySelector(".welcome-hero")')
  passed('Recuperación de rutas no válidas')

  for (const tutorial of tutorials.slice(1)) {
    await visit(`/aprende/${tutorial.id}`)
    if (await js('return !!document.querySelector(".lesson-intro")')) {
      await button('Comenzar tutorial')
      await settled()
    }
    for (let stepIndex = 0; stepIndex < tutorial.steps.length; stepIndex += 1) {
      if (!(await js('return !!document.querySelector(".feedback-success")'))) {
        await choose(tutorial.steps[stepIndex].correct)
        await button('Comprobar mi respuesta')
        await waitFor('document.querySelector(".feedback-success")')
        await settled()
      }
      await button(stepIndex === 3 ? 'Terminar tutorial' : 'Siguiente paso')
      await settled()
    }
    await waitFor('document.querySelector("#tutorial-complete")')
  }
  passed('Recorridos completos de correo, videollamada y redes sociales')

  for (const scenario of scenarios) {
    await visit(`/practica/${scenario.id}`)
    await choose(scenario.correct)
    await button('Comprobar mi decisión')
    await waitFor('document.querySelector(".feedback-success")')
    await settled()
  }
  assert.equal(
    (await readStore('attempts')).filter(
      (attempt) => attempt.kind === 'simulation' && attempt.correct
    ).length,
    6
  )
  passed('Las seis situaciones del simulador se resuelven y se guardan')

  await viewport(320)
  for (const route of [
    '/',
    '/aprende',
    '/aprende/correo',
    '/practica/banco',
    '/progreso',
    '/ayuda'
  ]) {
    await visit(route)
    await js('document.documentElement.style.fontSize = "40px"')
    const overflow = await js('return document.documentElement.scrollWidth - window.innerWidth')
    assert.ok(overflow <= 1, `Desbordamiento con texto al 200 % en ${route}: ${overflow}px`)
  }
  await shot('texto-200-por-ciento-320')
  await js('document.documentElement.style.fontSize = ""')
  await viewport(390)
  passed('Reflujo de seis vistas con tamaño de texto al 200 % en 320px')

  if (process.env.AXE_PATH) {
    const source = await fs.readFile(process.env.AXE_PATH, 'utf8')
    const audits = []
    for (const route of [
      '/',
      '/aprende',
      '/aprende/correo',
      '/enganos',
      '/enganos/banco',
      '/practica/banco',
      '/evaluacion',
      '/progreso',
      '/ayuda'
    ]) {
      await visit(route)
      await js(source)
      const audit = await asyncJs(
        'const done = arguments[arguments.length - 1]; axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } }).then(result => done({violations: result.violations, passes: result.passes.length})).catch(error => done({error:String(error)}));'
      )
      audits.push({ route, ...audit })
      await shot(`vista-${route === '/' ? 'inicio' : route.slice(1).replaceAll('/', '-')}`)
    }
    await fs.writeFile(path.join(evidence, 'accessibility.json'), JSON.stringify(audits, null, 2))
    const violations = audits.flatMap((audit) =>
      (audit.violations || []).map((item) => `${audit.route}: ${item.id}`)
    )
    assert.deepEqual(violations, [], `Accesibilidad: ${violations.join(', ')}`)
    passed('Auditoría automática de accesibilidad en nueve vistas')
  }

  const logs = await command('POST', '/se/log', { type: 'browser' })
  const unexpected = logs.filter(
    (log) =>
      log.level === 'SEVERE' &&
      !/favicon|net::ERR_INTERNET_DISCONNECTED|archivo-inexistente/.test(log.message)
  )
  await fs.writeFile(path.join(evidence, 'browser-console.json'), JSON.stringify(logs, null, 2))
  assert.deepEqual(unexpected, [], 'Errores inesperados en consola')
  await fs.writeFile(
    path.join(evidence, 'results.json'),
    JSON.stringify(
      { date: new Date().toISOString(), browser: created.capabilities.browserVersion, results },
      null,
      2
    )
  )
  console.log(`${results.length} comprobaciones completas. Evidencias: ${evidence}`)
} catch (error) {
  if (session) {
    await shot('fallo').catch(() => {})
    console.error(
      await js(
        'return {url:location.href,title:document.title,text:document.body.innerText.slice(-5000)}'
      ).catch(() => 'Sin DOM')
    )
  }
  console.error(error)
  process.exitCode = 1
} finally {
  if (session) await command('DELETE', '').catch(() => {})
}
