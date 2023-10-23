import app from './app.js'

//Run Server
app.listen(app.get('port'), ()=>{
    console.log('Ejecutando servidor en puerto', app.get('port') );
});


