#!/usr/bin/env bash
# precondition: ./dist ya tiene el build actual
set -e

manifest="src/modules/portfolio/constants/evolutionVersions.json"
redirects_tmp="$(mktemp)"

node -e "require('./${manifest}').forEach(v => console.log(v.tag + ' ' + v.major))" |
  while read -r tag major; do
    echo "== Building archived ${tag} as v${major} =="
    worktree="/tmp/wt-v${major}"
    git worktree add "${worktree}" "${tag}"
    (cd "${worktree}" && npm ci && npx vite build --base="/v${major}/")
    mkdir -p "dist/v${major}"
    cp -r "${worktree}/dist/." "dist/v${major}/"
    echo "/v${major}/*  /v${major}/index.html  200" >>"${redirects_tmp}"
    git worktree remove "${worktree}" --force
  done

if [ -s "${redirects_tmp}" ]; then
  cat "${redirects_tmp}" dist/_redirects >dist/_redirects.new
  mv dist/_redirects.new dist/_redirects
fi
