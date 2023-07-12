import app from './app';

const port = app.get('port') || 3000;

app.listen(port, () => {
    console.log(`Feathers server listening on port ${port}`);
});
