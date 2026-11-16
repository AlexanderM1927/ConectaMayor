#!/bin/sh
set -eu

# El montaje del código oculta .quasar generado durante la construcción.
npm run postinstall
exec npm run dev
