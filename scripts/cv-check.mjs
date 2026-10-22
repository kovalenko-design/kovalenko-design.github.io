// Keeps public/cv.md (the CV for AI agents) in step with the CV PDF.
// The first line of cv.md records the sha256 of the PDF it was written from.
//
//   node scripts/cv-check.mjs          prints whether cv.md matches the PDF (exit 1 if not)
//   node scripts/cv-check.mjs --hook   for Claude Code hooks: silent when it matches, a note when not
//   node scripts/cv-check.mjs --stamp  records the current PDF's hash in cv.md (after cv.md is rewritten)
//
// vite.config.js runs the same check before every build, so an outdated cv.md cannot go live.
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
export const CV_PDF = 'Kovalenko_Product_Design_CV_en.pdf'
const PDF_PATH = join(ROOT, 'public', CV_PDF)
const MD_PATH = join(ROOT, 'public', 'cv.md')
const STAMP = /sha256: ([0-9a-f]{64})/

const pdfHash = () => createHash('sha256').update(readFileSync(PDF_PATH)).digest('hex')

export function checkCv() {
  if (!existsSync(PDF_PATH)) return { ok: false, message: `public/${CV_PDF} is missing.` }
  if (!existsSync(MD_PATH)) return { ok: false, message: 'public/cv.md is missing.' }
  const recorded = readFileSync(MD_PATH, 'utf8').match(STAMP)?.[1]
  if (recorded === pdfHash()) return { ok: true, message: 'cv.md matches the CV PDF.' }
  return {
    ok: false,
    message:
      `public/${CV_PDF} has changed since public/cv.md was written. ` +
      'Rewrite public/cv.md from the new PDF, then run `node scripts/cv-check.mjs --stamp`.',
  }
}

function stamp() {
  const md = readFileSync(MD_PATH, 'utf8')
  if (!STAMP.test(md)) throw new Error('public/cv.md has no "sha256: …" line to update.')
  writeFileSync(MD_PATH, md.replace(STAMP, `sha256: ${pdfHash()}`))
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = process.argv[2]
  if (arg === '--stamp') {
    stamp()
    console.log('Recorded the CV PDF hash in public/cv.md.')
  } else if (arg === '--hook') {
    const result = checkCv()
    if (!result.ok) {
      let event = 'UserPromptSubmit'
      try {
        event = JSON.parse(readFileSync(0, 'utf8')).hook_event_name || event
      } catch {
        // no hook input on stdin
      }
      const context =
        `${result.message} Read the new PDF, rewrite public/cv.md in the same structure ` +
        '(keep the first comment line), show Vadim the diff, and stamp it. ' +
        'The About page copy may need the same update; ask before changing it.'
      console.log(
        JSON.stringify({
          systemMessage: 'New CV PDF found: cv.md needs updating.',
          hookSpecificOutput: { hookEventName: event, additionalContext: context },
        })
      )
    }
  } else {
    const result = checkCv()
    console.log(result.message)
    process.exit(result.ok ? 0 : 1)
  }
}
