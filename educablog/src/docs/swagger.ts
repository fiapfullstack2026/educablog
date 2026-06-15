export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Blog API',
        version: '1.0.0',
        description: 'API de blogging dinâmico para professores da rede pública — FIAP PosTech FSDT Fase 02',
    },
    servers: [
        { url: 'http://localhost:3000', description: 'Desenvolvimento' },
    ],
    tags: [
        { name: 'Posts', description: 'Gerenciamento de postagens' },
    ],
    components: {
        schemas: {
            Post: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '665a1b2c3d4e5f6a7b8c9d0e' },
                    title: { type: 'string', example: 'Introdução à Física Quântica' },
                    category: { type: 'array', items: { $ref: '#/components/schemas/Category' } },
                    content: { type: 'string', example: 'Nesta aula vamos explorar...' },
                    professor: { type: 'string', example: 'Prof. Maria Silva' },  // era author
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                },
            },
            PostInput: {
                type: 'object',
                required: ['title', 'category', 'content', 'professor'],
                properties: {
                    title: { type: 'string', maxLength: 200, example: 'Introdução à Física Quântica' },
                    category: {
                        type: 'array',
                        items: { type: 'string' },
                        minItems: 1,
                        example: ['665a1b2c3d4e5f6a7b8c9d01'],
                        description: 'Array de IDs de categorias',
                    },
                    content: { type: 'string', example: 'Nesta aula vamos explorar...' },
                    professor: { type: 'string', example: 'Prof. Maria Silva' },
                },
            },
            PostUpdate: {
                type: 'object',
                properties: {
                    title: { type: 'string', maxLength: 200 },
                    category: { type: 'array', items: { type: 'string' }, minItems: 1 },
                    content: { type: 'string' },
                    professor: { type: 'string' },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: false },
                    message: { type: 'string', example: 'Post não encontrado' },
                },
            },
            SuccessMessage: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Post removido com sucesso' },
                },
            },
        },
    },
    paths: {
        '/posts': {
            get: {
                tags: ['Posts'],
                summary: 'Lista todos os posts',
                responses: {
                    200: {
                        description: 'Lista retornada com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        count: { type: 'integer', example: 2 },
                                        data: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ['Posts'],
                summary: 'Cria um novo post',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/PostInput' },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Post criado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: { $ref: '#/components/schemas/Post' },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Dados inválidos',
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
                    },
                },
            },
        },
        '/posts/search': {
            get: {
                tags: ['Posts'],
                summary: 'Busca posts por palavra-chave',
                parameters: [
                    {
                        in: 'query',
                        name: 'q',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Termo buscado no título e conteúdo',
                        example: 'física',
                    },
                ],
                responses: {
                    200: {
                        description: 'Resultados da busca',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        count: { type: 'integer', example: 1 },
                                        data: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Parâmetro "q" ausente',
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
                    },
                },
            },
        },
        '/posts/{id}': {
            get: {
                tags: ['Posts'],
                summary: 'Retorna um post pelo ID',
                parameters: [
                    { in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'ID do post' },
                ],
                responses: {
                    200: {
                        description: 'Post encontrado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: { $ref: '#/components/schemas/Post' },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: 'Post não encontrado',
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
                    },
                },
            },
            put: {
                tags: ['Posts'],
                summary: 'Atualiza um post existente',
                parameters: [
                    { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/PostUpdate' },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Post atualizado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        data: { $ref: '#/components/schemas/Post' },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Dados inválidos',
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
                    },
                    404: {
                        description: 'Post não encontrado',
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
                    },
                },
            },
            delete: {
                tags: ['Posts'],
                summary: 'Remove um post',
                parameters: [
                    { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
                ],
                responses: {
                    200: {
                        description: 'Post removido com sucesso',
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } },
                    },
                    404: {
                        description: 'Post não encontrado',
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
                    },
                },
            },
        },
    },
}