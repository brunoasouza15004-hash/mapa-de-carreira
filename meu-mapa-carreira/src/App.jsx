import './App.css';
import { useState, useEffect } from 'react';
import foto from './assets/images/foto.jpeg';
import curriculo from "./Curriculo-Bruno-Aureliano-de-Souza.pdf";

function Header() {
  return (
    <header className='header'>
      <img src={foto} alt='Minha foto' className='header-foto' />
      <div className='info'>
        <h1>Bruno Souza</h1>
        <p className='cargo'>Fullstack - Java - MySQl - Spring boot - JavaScript - React - HTMl - CSS </p>
        <a href="mailto:brunoasouza15004@gmail.com" className='email'>
          brunoasouza15004@gmail.com
        </a>
      </div>
      <div className='links'>
        <a href='https://www.linkedin.com/in/bruno-asouza/' target='_blank' rel='noreferrer'>Linkedin</a>
        <a href='https://github.com/brunoasouza15004-hash' target='_blank' rel='noreferrer'>Github</a>
      </div>
    </header>
  )
}

function SobreMim() {
  return (
    <section className='sobre'>
      <h2>Prazer em conhecer</h2>
      <p>
        Futuro desenvolvedor Back-End em formação pelo Instituto PROA, com foco em construir sistemas eficientes e escaláveis. Possuo experiência prática no desenvolvimento de aplicações completas, utilizando Java, Spring Boot e MySQL, além de criar interfaces dinâmicas com ReactJS. Sou entusiasta da cultura de colaboração e acredito que os melhores softwares nascem de discussões em equipe e troca de conhecimento.
      </p>
      <a href={curriculo}
         download={'Curriculo-Bruno-Aureliano-de-Souza.pdf'}
         className='btn-cv' target='_blank' rel='noreferrer'>
         Baixar meu CV
    </a>
    </section>
  )
}

function Etapa({ titulo, status, descricao, softSkills, techs }) {
  const [aberta, setAberta] = useState(status === 'atual');
  return (
    <div className='etapa-wrapper'>
      <div className='timeline-dot' />
      <div className={`etapa ${status}`}>
        <div className='etapa-header' onClick={() => setAberta(!aberta)}>
          <h3>{titulo}</h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className='indicador'>
              {status === 'atual' ? 'Você está aqui' : status === 'proximo' ? 'Próximo passo' : 'Objetivo'}
            </span>
            <span className="seta">{aberta ? "▲" : "▼"}</span>
          </div>
        </div>
        {aberta && (
          <div className='etapa-corpo'>
            <p className='etapa-desc'>{descricao}</p>
            <p className='etapa-sub'>Soft skills essenciais:</p>
            <ul className='etapa-lista'>
              {softSkills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <p className='etapa-sub'>Roadmap de aprendizado</p>
            <div className='etapa-tags'>
              {techs.map((t, i) => <span key={i} className='tech-tag'>{t}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MapaCarreira() {
  return (
    <section className='mapa'>
      <h2>Mapa de Carreira</h2>
      <div className='timeline'>
        <Etapa
          titulo="Desenvolvedor Júnior"
          status="atual"
          descricao="Fase de consolidar as bases e entregar features com qualidade"
          softSkills={[
            'Pensamento Analítico e Atenção aos Detalhes',
            'Comunicação Assertiva',
            'Curiosidade Investigativa',
            'Ética e Senso de Responsabilidade',
            'Resolução de Problemas'
          ]}
          techs={['SQL', 'Modelagem Relacional', 'DBeaver', 'Node.js', 'ORMs', 'Git / GitHub', 'Docker', 'NoSQL']}
        />
        <Etapa
          titulo="Desenvolvedor Pleno"
          status="proximo"
          descricao="Autonomia total em features, Liderar tecnicamente e revisar código"
          softSkills={[
            'Pensamento Sistêmico',
            'Autonomia com Responsabilidade',
            'Capacidade de Mentoria e Revisão',
            'Gestão de Crises e Calma sob Pressão',
            'Negociação e Defesa de Boas Práticas',
          ]}
          techs={['Explain Plan', 'Indexação Avançada', 'Docker & Docker Compose', 'Cloud Basics', 'Redis', 'Python / Shell Script', 'Linux / Bash', 'CI/CD']}
        />
        <Etapa
          titulo="Desenvolvedor Sênior"
          status="futuro"
          descricao="Refêrencia técnica do time, Definir padrões e mentorar"
          softSkills={[
            'Visão Estratégica e de Negócio',
            'Liderança Técnica e Mentoria',
            'Gestão de Stakeholders e Diplomacia',
            'Pragmatismo e Gestão de Débito Técnico',
            'Antecipação de Riscos',
          ]}
          techs={['Cloud Avançado', 'Terraform / Ansible', 'Apache Kafka', 'Apache Airflow', 'Vector Databases', 'Kubernetes', 'Governance & Security', 'Snowflake / Data Lakehouse', 'NewSQL']}
        />
      </div>
    </section>
  )
}

function SkillBar({ nome, porcentagem }) {
  return (
    <div className='skill'>
      <div className='skill-topo'>
        <span className='skill-nome'>{nome}</span>
        <span className='skill-pct'>{porcentagem}%</span>
      </div>
      <div className='skill-barra-bg'>
        <div className='skill-barra' style={{ width: `${porcentagem}%` }} />
      </div>
    </div>
  )
}

function Skills() {
  const [linguagens, setLinguagens] = useState({});
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarLinguagens() {
      try {
        const resposta = await fetch(
          'https://api.github.com/users/brunoasouza15004-hash/repos'
        );
        const repos = await resposta.json();

        const contagem = {};
        repos.forEach(repo => {
          if (repo.language) {
            contagem[repo.language] = (contagem[repo.language] || 0) + 1;
          }
        });

        setLinguagens(contagem);
      } catch (erro) {
        console.error('Erro ao buscar GitHub:', erro);
      } finally {
        setCarregando(false);
      }
    }

    buscarLinguagens();
  }, []);

  const total = Object.values(linguagens).reduce((a, b) => a + b, 0);
  const calcularPct = (qtd) => Math.round((qtd / total) * 100);

  const conhecimentos = [
    { nome: 'Java', porcentagem: 70 },
    { nome: 'MySQL', porcentagem: 70 },
    { nome: 'Spring Boot', porcentagem: 70 },
    { nome: 'JavaScript', porcentagem: 80 },
    { nome: 'HTML/CSS', porcentagem: 70 },
    { nome: 'React', porcentagem: 80 },
  ];

  return (
    <section className="skills">
      <h2>Skills</h2>

      <p className="skill-grupo-titulo">Conhecimentos</p>
      {conhecimentos.map((s, i) => (
        <SkillBar key={i} nome={s.nome} porcentagem={s.porcentagem} />
      ))}

      {carregando ? (
        <p style={{ fontSize: '13px', color: '#888', marginTop: '1rem' }}>
          Carregando dados do GitHub...
        </p>
      ) : (
        <>
          <p className="skill-grupo-titulo" style={{ marginTop: '1.25rem' }}>
            Do GitHub
          </p>
         
        </>
      )}
    </section>
  );
}

function App() {
  // --- ADAPTAÇÃO VLIBRAS ---
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    };
    document.body.appendChild(script);
  }, []);
  // -------------------------

  return (
    <div className='pagina'>
      {/* --- DIVS OBRIGATÓRIAS VLIBRAS --- */}
      <div vw="true" className="enabled">
        <div vw-access-button="true" className="active"></div>
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
      {/* --------------------------------- */}

      <div className='folha'>
        <Header />
        <div className='folha-corpo'>
          <SobreMim />
          <div className='conteudo-principal'>
            <MapaCarreira />
            <Skills />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;