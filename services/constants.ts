import { Gift } from '../models/Gift.ts';

type PartialGift = Omit<Gift, 'id' | 'createdAt' | 'qtyQuotas'> & {qtyQuotas?: number};

const lst: PartialGift[] = [
    {
        name: 'Jogo de panelas antiaderentes',
        description: 'Para cozinhar sem drama e evitar queimados.',
        price: 500,
        image: '/gifts/jogo-de-panelas-antiaderentes.JPG',
    },
    {
        name: 'Potes herméticos',
        description: 'Para manter tudo fresquinho e bem organizado.',
        price: 100,
        image: '/gifts/potes-hermeticos.JPG',
    },
    {
        name: 'Formas para bolo',
        description: 'Para as tardes de bolo caseiro e novas receitas.',
        price: 80,
        image: '/gifts/formas-para-bolo.JPG',
    },
    {
        name: 'Máquina de café expresso',
        description: 'Casal que bebe café junto, fica acordado junto!',
        price: 333.33,
        image: '/gifts/maquina-de-cafe-expresso.JPG',
        qtyQuotas: 3,
    },
    {
        name: 'Assinatura de streaming',
        description: 'Para as maratonas a dois no sofá.',
        price: 80,
        image: '/gifts/assinatura-de-streaming.JPG',
    },
    {
        name: 'Conjunto de facas profissionais',
        description: 'Porque cortar com uma faca boa faz diferença!',
        price: 300,
        image: '/gifts/conjunto-de-facas-profissionais.JPG',
    },
    {
        name: 'Aspirador de pó',
        description: 'Melhor que terapia de casal para quem detesta limpar a casa.',
        price: 350,
        image: '/gifts/aspirador-de-po.JPG',
        qtyQuotas: 2,
    },
    {
        name: 'Panela de arroz elétrica',
        description: 'Prática e eficiente para fazer arroz perfeito sempre.',
        price: 250,
        image: '/gifts/panela-de-arroz-eletrica.JPG',
    },
    {
        name: 'Kit de churrasco',
        description: 'Para os encontros de domingo com a família.',
        price: 180,
        image: '/gifts/kit-de-churrasco.JPG',
    },
    {
        name: 'Jogo de lençol',
        description: 'Porque uma boa noite de sono é importante.',
        price: 250,
        image: '/gifts/jogo-de-lencol.JPG',
    },
    {
        name: 'Jogo de xícaras de chá',
        description: 'Para compartilhar um chá da tarde juntos.',
        price: 100,
        image: '/gifts/jogo-de-xicaras-de-cha.JPG',
    },
    {
        name: 'Aparelho para fondue',
        description: 'Para criar aquele clima romântico ou para as noites frias.',
        price: 200,
        image: '/gifts/aparelho-para-fondue.JPG',
    },
    {
        name: 'Pegador de massas',
        description: 'Ideal para servir macarrão e massas com praticidade.',
        price: 30,
        image: '/gifts/pegador-de-massas.JPG',
    },
    {
        name: 'Cortador de pizza',
        description: 'Pizza caseira, noites de cinema e diversão garantida.',
        price: 40,
        image: '/gifts/cortador-de-pizza.JPG',
    },
    {
        name: 'Faca de pão',
        description: 'Para cortar pães fresquinhos sem amassar.',
        price: 80,
        image: '/gifts/faca-de-pao.JPG',
    },
    {
        name: 'Espagueteira',
        description: 'Perfeita para cozinhar massas com praticidade.',
        price: 250,
        image: '/gifts/espagueteira.JPG',
    },
    {
        name: 'Porta-guardanapos',
        description: 'Para dar um toque especial na mesa posta.',
        price: 50,
        image: '/gifts/porta-guardanapos.JPG',
    },
    {
        name: 'Camisas combinando de casal',
        description: 'Para fotos de lua de mel.',
        price: 100,
        image: '/gifts/camisas-combinando-de-casal.JPG',
    },
    {
        name: 'Caderno de desculpas para o marido',
        description: 'Humor saudável para se resolver.',
        price: 35,
        image: '/gifts/caderno-de-desculpas-para-o-marido.JPG',
    },
    {
        name: 'Mixer',
        description: 'Facilita a preparação de sopas, molhos e vitaminas.',
        price: 200,
        image: '/gifts/mixer.JPG',
    },
    {
        name: 'Geladeira',
        description: 'Essencial para conservar tudo fresquinho na casa nova.',
        price: 400,
        image: '/gifts/geladeira.JPG',
        qtyQuotas: 10,
    },
    {
        name: 'TV',
        description: 'Para acompanhar séries e filmes juntos no conforto do lar.',
        price: 300,
        image: '/gifts/tv.JPG',
        qtyQuotas: 10,
    },
    {
        name: 'Jogo de tapetes para banheiro',
        description: 'Conforto e estilo para o banheiro.',
        price: 100,
        image: '/gifts/jogo-de-tapetes-para-banheiro.JPG',
    },
    {
        name: 'Sanduicheira',
        description: 'Para preparar lanches rápidos e deliciosos.',
        price: 150,
        image: '/gifts/sanduicheira.JPG',
    },
    {
        name: 'Batedor de alho',
        description: 'Economiza tempo e deixa os temperos prontos rapidamente.',
        price: 35,
        image: '/gifts/batedor-de-alho.JPG',
    },
    {
        name: 'Forno',
        description: 'Para as receitas que vão do forno à mesa.',
        price: 3000,
        image: '/gifts/forno.JPG',
        qtyQuotas: 3,
    },
    {
        name: 'Sofá',
        description: 'Para os momentos de descanso e relaxamento a dois.',
        price: 350,
        image: '/gifts/sofa.JPG',
        qtyQuotas: 10,
    },
    {
        name: 'Fogão',
        description: 'O centro das criações culinárias na nova casa.',
        price: 320,
        image: '/gifts/fogao.JPG',
        qtyQuotas: 10,
    },
    {
        name: 'Colheres de pau',
        description: 'Práticas e delicadas para cozinhar sem danificar panelas.',
        price: 30,
        image: '/gifts/colheres-de-pau.JPG',
    },
    {
        name: 'Ralador',
        description: 'Essencial para queijos, legumes e muito mais.',
        price: 40,
        image: '/gifts/ralador.JPG',
    },
    {
        name: 'Mergulho com as baleias',
        description: 'Uma aventura única e inesquecível para a lua de mel!',
        price: 250,
        image: '/gifts/mergulho-com-as-baleias.JPG',
        qtyQuotas: 4,
    },
    {
        name: 'Jantar na lua de mel',
        description: 'Uma experiência especial para o casal celebrar.',
        price: 400,
        image: '/gifts/jantar-na-lua-de-mel.JPG',
    },
    {
        name: 'Ajuda nos 14 meses de aluguel',
        description: 'Uma grande contribuição para o novo lar do casal!',
        price: 150,
        image: '/gifts/ajuda-nos-14-meses-de-aluguel.JPG',
        qtyQuotas: 10,
    },
    {
        name: 'Dólares para a lua de mel',
        description: 'Para garantir que o casal aproveite cada momento especial.',
        price: 100,
        image: '/gifts/dolares-para-a-lua-de-mel.JPG',
        qtyQuotas: 300,
    },
    {
        name: 'Ser o parente preferido',
        description: 'Um presente simbólico e bem-humorado.',
        price: 1500,
        image: '/gifts/ser-o-parente-preferido.JPG',
    },
    {
        name: 'Ser o amigo preferido',
        description: 'Para mostrar quem é o amigo mais generoso!',
        price: 500,
        image: '/gifts/ser-o-amigo-preferido.JPG',
    },
    {
        name: 'Intervenção divina',
        description: 'Porque às vezes é bom ter uma ajudinha extra.',
        price: 2000,
        image: '/gifts/intervencao-divina.JPG',
    },
];

export const secondPartialGifts: PartialGift[] = [
    {
        name: 'Passeio de quadriciclo',
        description: 'Para momentos de aventura e diversão a dois na lua de mel',
        price: 300,
        image: 'gifts/passeio-de-quadriciclo.JPG',
    },
    {
        name: 'Lençóis',
        description: 'Para noites de descanso ainda mais confortáveis',
        price: 150,
        image: 'gifts/lencois.JPG',
    },
    {
        name: 'Travesseiros',
        description: 'Para sonhos tranquilos e um descanso perfeito no nosso novo lar',
        price: 130,
        image: 'gifts/travesseiros.JPG',
    },
    {
        name: 'Panela de pressão',
        description: 'Para preparar receitas deliciosas e compartilhar momentos especiais na cozinha',
        price: 160,
        image: 'gifts/panela-de-pressao.JPG',
    },
    {
        name: 'Soundbar',
        description: 'Para transformar nossa sala em um cinema e curtir cada trilha sonora juntos!',
        price: 350,
        image: 'gifts/soundbar.JPG',
    },
    {
        name: 'Passeio de balão',
        description: 'Contribua para um voo mágico sobre paisagens inesquecíveis na nossa lua de mel',
        price: 150,
        qtyQuotas: 10,
        image: 'gifts/passeio-de-balao.JPG',
    },
    {
        name: 'Conjunto de pratos',
        description: 'Para servir refeições e celebrar com estilo todos os nossos momentos felizes',
        price: 180,
        image: 'gifts/conjunto-de-pratos.JPG',
    }

]

export const thirdPartialGifts: PartialGift[] = [
    {
        name: 'teste de pagamento',
        description: 'teste de pagamento',
        price: 3,
        image: 'gifts/passeio-de-quadriciclo.JPG',
    }
]

export const thirdGifts: Gift[] = thirdPartialGifts.map((x, i) => ({
    id: crypto.randomUUID(),
    createdAt: new Date(),
    qtyQuotas: x.qtyQuotas || 1,
    ...x,
}));
