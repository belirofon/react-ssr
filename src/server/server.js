import express from 'express';
import ReactDOM from 'react-dom/server'
import { indexTemplate } from './index.template';
import { Header } from '../Header';


const app = express();

app.use('/static', express.static('./public/client'));

app.get('/', (req, res) => {
    res.send(
        indexTemplate(ReactDOM.renderToString(Header())),
    );
});

app.get('/auth', (req, res) => {

    res.send(
        indexTemplate(ReactDOM.renderToString(Header())),
    );
});

app.listen(3000, () => {
    console.log('Server has been started on http://localhost:3000');
});