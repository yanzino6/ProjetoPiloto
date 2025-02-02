import fastify from "fastify";

const app = fastify()

app.get('/', async ()=>{
    return 'tchau'
})

app.listen({
    port:3000
}).then(()=>{console.log('ta rodando')})