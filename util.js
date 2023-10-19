const path = require('path');
const fs = require('fs');

function delDir(dest) {
    let paths = fs.readdirSync(dest);
    paths.forEach(function (p) {
        const target = path.join(dest, p);
        const st = fs.statSync(target);
        if (st.isFile()) {
            //console.log(`\rDelete File: ${target}`);
            fs.unlinkSync(target);
        }
        if (st.isDirectory()) {
            //console.log(`\rDelete Directory: ${target}`);
            delDir(target);
        }
    });
    paths = fs.readdirSync(dest);
    if (!paths.length) {
        fs.rmdirSync(dest);
    }
}

function copyDir(source, dest) {
    const paths = fs.readdirSync(source);
    paths.forEach(function (p) {
        const src = path.join(source, p);
        const target = path.join(dest, p);
        const st = fs.statSync(src);
        if (st.isFile()) {
            if (fs.existsSync(target)) {
                //console.log(`\rDelete File: ${target}`);
                fs.unlinkSync(target);
            }
            //console.log(`\rCopy File: ${target}`);
            // const readStream = fs.createReadStream(src);
            // const writeStream = fs.createWriteStream(target);
            // readStream.pipe(writeStream);
            const r = fs.readFileSync(src);
            const w = fs.writeFileSync(target, r);
        }
        if (st.isDirectory()) {
            if (fs.existsSync(target)) {
                //console.log(`\rDelete Directory: ${target}`);
                delDir(target);
            }
            //console.log(`\rCreate Directory: ${target}`);
            fs.mkdirSync(target);
            copyDir(src, target);
        }
    });
}

module.exports = {
    delDir,
    copyDir
}