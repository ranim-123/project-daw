import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    var lol = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    return res.render("pages/index", {mascots: lol});
});

app.get('/men', (req, res) => {
    return res.render('pages/men');
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});