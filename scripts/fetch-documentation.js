// Replaces content/documentation.md with the axis-api README hosted on GitHub.
//
// Runs before `npm run dev`, `build` and `generate` (npm pre* hooks), so the
// documentation page always ships the latest README, Netlify builds included.
// Never fails the build: if GitHub can't be reached, the committed copy is
// kept and a warning is printed.
//
// AXIS_API_README_REF picks another branch, tag or commit (default: main).
// SKIP_DOCUMENTATION_FETCH=1 keeps the local file as is (offline work, or
// previewing README edits before pushing them).

const fs = require('fs');
const path = require('path');
const https = require('https');

const REF = process.env.AXIS_API_README_REF || 'main';
const URL = `https://raw.githubusercontent.com/gobelins-axis/axis-api/${REF}/README.md`;
const OUTPUT = path.join(__dirname, '../content/documentation.md');
const TIMEOUT_MS = 10000;

function download(url) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            if (response.statusCode !== 200) {
                response.resume();
                reject(new Error(`HTTP ${response.statusCode}`));
                return;
            }

            let body = '';
            response.setEncoding('utf8');
            response.on('data', (chunk) => { body += chunk; });
            response.on('end', () => resolve(body));
        });

        request.setTimeout(TIMEOUT_MS, () => request.destroy(new Error('timeout')));
        request.on('error', reject);
    });
}

async function main() {
    if (process.env.SKIP_DOCUMENTATION_FETCH) {
        console.log('📝 Documentation: fetch skipped, using content/documentation.md as is');
        return;
    }

    try {
        const markdown = await download(URL);

        // The page builds its sidebar from these, refuse anything that isn't the README.
        if (!/^# /m.test(markdown) || !/^## table of contents\s*$/im.test(markdown)) {
            throw new Error('unexpected content (no title or table of contents)');
        }

        const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf8') : '';
        if (current === markdown) {
            console.log(`📝 Documentation: up to date with axis-api@${REF}`);
            return;
        }

        fs.writeFileSync(OUTPUT, markdown);
        console.log(`📝 Documentation: updated from axis-api@${REF}`);
    } catch (error) {
        console.warn(`⚠️  Documentation: could not fetch ${URL} (${error.message}), keeping the committed copy`);
    }
}

main();
