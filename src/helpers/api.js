const BASEAPI = 'http://localhost:3000/api';

const apiFetchPost = async (endpoint, body) => {
    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();
    if(json.notallowed) {
        window.localtion.href = '/';
        return;
    }
    return json;
}

const apiFetchPut = async (endpoint, body) => {
    const res = await fetch(BASEAPI+endpoint, {
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();
    if(json.notallowed) {
        window.localtion.href = `/client/${body.id}`;
        return;
    }
    return json;
}
const apiFetchDelete = async (endpoint, body) => {
    const res = await fetch(BASEAPI+endpoint, {
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();
    if(json.notallowed) {
        window.localtion.href = `/client/${body.id}`;
        return;
    }
    return json;
}

export default {
    getClients : async () => {
        const res = await fetch(BASEAPI+'/clients');
        const json = await res.json();
        return json;
    },
    addClient:async (nome, tipo_pessoa, cpf_cnpj, cep, endereco) => {
        const json = await apiFetchPost(
            '/client',
            {
                nome,
                tipo_pessoa,
                cpf_cnpj,
                cep,
                endereco
            }
        );
        return json;
    },
    editClient:async (id, nome, tipo_pessoa, cpf_cnpj, cep, endereco) => {
        const json = await apiFetchPut(
            `/client/${id}`,
            {
                id,
                nome,
                tipo_pessoa,
                cpf_cnpj,
                cep,
                endereco
            }
        );
        return json;
    },
    deleteClient:async (id) => {
        const json = await apiFetchDelete(
            `/client/${id}`,
            {id}
        );
        return json;
    },
    
    
};