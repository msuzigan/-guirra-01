/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BarChart3, TrendingUp, Users, Target, LayoutGrid, Calendar, ChevronDown, Quote, Linkedin, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  width?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, direction = 'up', width = "w-auto" }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      className={width}
      initial={{ 
        opacity: 0, 
        y: directions[direction].y, 
        x: directions[direction].x,
        scale: direction === 'none' ? 0.95 : 1
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
    >
      {children}
    </motion.div>
  );
};

const timelineData = [
  {
    year: "2016",
    title: "Fundação da TFAA Serviços de Engenharia da Computação",
    subtext: [
      "O início aconteceu com o desenvolvimento de software sob medida para pequenas e médias empresas, utilizando tecnologias web e atuando desde o projeto até a execução.",
      "Para apoiar a implantação dos sistemas desenvolvidos, a operação avançou também para o gerenciamento de infraestrutura em nuvem e a disponibilização dos recursos computacionais envolvidos.",
      "Em paralelo, passou a realizar avaliação técnica de equipamentos eletrônicos obsoletos ou danificados, com elaboração de relatórios com responsabilidade técnica para descarte e comercialização como sucata, atendendo exigências de governança como a Sarbanes-Oxley."
    ]
  },
  {
    year: "2017",
    title: "Primeiros projetos",
    subtext: [
      "Gestão da força de vendas do Pastifício Selmi, com entrada de pedidos, integração com ERP, acompanhamento de metas e campanhas de premiação.",
      "Personalização em massa de documentos para a CyberDoc, com transformação de bases de dados em documentos personalizados para impressão.",
      "Plataforma para gerenciamento de vagas de estágio para a FIEC Indaiatuba, com gestão de convênios, publicação de vagas e agendamento de interesse pelos alunos.",
      "Primeiros relatórios de scrap para a Avaya."
    ]
  },
  {
    year: "2018",
    title: "Novos serviços",
    subtext: [
      "Desenvolvimento de plataforma de rastreabilidade de bovinos com RFID UHF para a Sinactus, incluindo software embarcado, transmissão Wi-Fi de longa distância e processamento em nuvem.",
      "Consultoria em gestão e alinhamento entre TI e negócio para definição de projetos prioritários na FM2S.",
      "Avanços nas ferramentas do Pastifício Selmi e da CyberDoc.",
      "Desenvolvimento da plataforma de gestão de atividades eTicket."
    ]
  },
  {
    year: "2019",
    title: "Evolução de soluções",
    subtext: [
      "Desenvolvimento de plataforma EAD para a FIEC Indaiatuba, incluindo a primeira customização de aplicativo.",
      "Primeiro cliente em nuvem da plataforma eTicket, com a Toyo Ink.",
      "Contrato de desenvolvimento de projetos para a área comercial da Cooperflora."
    ]
  },
  {
    year: "2020",
    title: "Pandemia e novos desafios",
    subtext: [
      "Desenvolvimento de plataforma de apoio à customização de rações de suínos para a De Heus.",
      "Desenvolvimento de plataforma de credenciamento médico para a Medfy.",
      "Continuidade e evolução dos projetos da Cooperflora, Selmi e FIEC."
    ]
  },
  {
    year: "2021",
    title: "Integração e dados",
    subtext: [
      "Extração de dados do sistema de COMEX da Victoria Logística e desenvolvimento de relatórios gerenciais da operação.",
      "Apoio à implantação da plataforma de credenciamento médico no primeiro hospital cliente da Medfy.",
      "Avanços contínuos nos projetos da Cooperflora, Selmi, FIEC e Medfy."
    ]
  },
  {
    year: "2022",
    title: "Consolidação",
    subtext: [
      "Consolidação dos serviços na base de clientes e amadurecimento da operação construída ao longo dos anos anteriores."
    ]
  },
  {
    year: "2023",
    title: "Primeiro projeto internacional",
    subtext: [
      "Kickoff do primeiro projeto internacional com a Agronómico Paraguay.",
      "Atuação em gestão comercial e rastreabilidade das amostras de solo."
    ]
  },
  {
    year: "2024",
    title: "Integração e análise de dados",
    subtext: [
      "Integração da plataforma da Agronómico com a ArcGIS para geoprocessamento.",
      "Projetos de análise de dados comerciais com modelos estatísticos para Cooperflora e Pastifício Selmi.",
      "Desenvolvimento de plataforma de gestão de documentos para a Destra."
    ]
  },
  {
    year: "2025",
    title: "IA e novos produtos",
    subtext: [
      "Aplicação de modelos de IA para análise de documentos na plataforma da Destra.",
      "Início do desenvolvimento de plataforma de apoio à customização de rações de aves para a De Heus.",
      "Ideação e desenvolvimento da Nortyn, plataforma voltada à gestão comercial de pequenas e médias empresas."
    ]
  }
];

export default function App() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.84, // Increased speed by 5% (now 15% reduction vs default)
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative font-sans text-[#312783] bg-white overflow-x-hidden tracking-[-0.015em] font-light">
      {/* Hero Wrapper FIXED in background */}
      <div className="fixed top-0 left-0 right-0 w-full h-[100dvh] pb-40 flex flex-col z-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: "url('/hero-bg.png?v=2')",
            backgroundPosition: "center 80%"
          }}
        ></div>

        {/* Header */}
        <header className="relative z-10 w-full px-6 pt-10 pb-6 md:px-16 md:pt-12 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo-aguirra.png?v=1" alt="Águirra Tech" className="h-8 md:h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-[#8a8d91]">
            <a href="#" className="hover:text-[#312783] transition-colors">A Empresa</a>
            <a href="#" className="hover:text-[#312783] transition-colors">Soluções</a>
            <a href="#" className="hover:text-[#312783] transition-colors">Nossa Trajetória</a>
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center">
            <div className="relative group inline-block">
              <div className="absolute left-1 right-1 top-2 bottom-[-0.1rem] bg-gradient-to-r from-[#009a93] to-[#312783] rounded-full blur-md opacity-0 group-hover:opacity-60 transition-all duration-300"></div>
              <a href="#" className="relative inline-block px-6 py-2 rounded-full bg-gradient-to-r from-[#009a93] to-[#312783] text-white font-bold group-hover:-translate-y-0.5 transition-all duration-300 shadow-sm text-sm">
                Falar com especialista
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="relative z-10 flex flex-col items-center justify-start pt-16 md:pt-32 lg:pt-40 px-4 text-center">
          <h1 className="text-6xl md:text-[6rem] font-title font-light bg-gradient-to-r from-[#009a93] to-[#312783] bg-clip-text text-transparent tracking-[-0.04em] leading-[1.05] mb-8 max-w-5xl">
            Tecnologia que <br className="hidden md:block"/> aponta resultados.
          </h1>
          
          <p className="text-[#8a8d91] text-lg md:text-xl font-light max-w-[680px] mb-12 leading-[1.45]">
            A Águirra Tech transforma complexidade em direção, conectando engenharia, método e experiência para gerar decisões melhores e resultados sustentáveis.
          </p>
          
          <div className="relative group inline-block">
            <div className="absolute left-2 right-2 top-4 bottom-[-0.25rem] bg-gradient-to-r from-[#009a93] to-[#312783] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-300"></div>
            <a href="#" className="relative inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#009a93] to-[#312783] text-white font-bold group-hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
              Falar com especialista
            </a>
          </div>
        </main>
      </div>

      {/* Spacer to push content down below the fixed hero */}
      <div className="relative w-full h-[100dvh] z-0 pointer-events-none"></div>

      {/* Second Section - Purpose Card */}
      <section className="relative z-20 w-full -mt-20 md:-mt-32 lg:-mt-48">
        <div className="bg-white rounded-[4rem] md:rounded-[6rem] lg:rounded-[8rem] shadow-[0_15px_60px_rgba(0,0,0,0.1)] px-8 pt-36 pb-36 md:px-16 md:pt-48 md:pb-48 lg:pt-56 lg:pb-56 w-full relative z-20">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-24 lg:gap-32">
            
            {/* First Block - Purpose */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              {/* Left Column - Title */}
              <div className="lg:col-span-5">
                <FadeIn>
                  <h2 className="text-5xl md:text-6xl lg:text-[4.8rem] font-title font-light tracking-[-0.04em] bg-gradient-to-br from-[#009a93] to-[#312783] bg-clip-text text-transparent leading-[1.05]">
                    Tecnologia <br className="hidden lg:block" />
                    com propósito <br className="hidden lg:block" />
                    claro.
                  </h2>
                </FadeIn>
              </div>
              
              {/* Right Column - Text */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-[#8a8d91] font-light text-lg md:text-xl leading-[1.45]">
                <FadeIn delay={0.1}>
                  <p>A Águirra Tech é uma empresa de tecnologia construída a partir da prática, da engenharia e da leitura profunda da realidade de cada operação.</p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p>Nosso trabalho não começa na ferramenta. Começa no entendimento. Entendimento do contexto, das limitações, da cultura e, principalmente, do que de fato precisa ser resolvido.</p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p>É a partir dessa base que estruturamos soluções capazes de organizar processos, apoiar decisões e sustentar resultados ao longo do tempo.</p>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <p>A tecnologia, para nós, não ocupa o centro. Ela entra como meio. O valor está na forma como é aplicada, na clareza com que é adotada e no impacto real que produz na rotina das empresas.</p>
                </FadeIn>
                <FadeIn delay={0.5}>
                  <p>Por isso, evitamos excessos, reduzimos ruídos e desenvolvemos caminhos que façam sentido para quem opera, decide e precisa evoluir com consistência.</p>
                </FadeIn>
                <FadeIn delay={0.6}>
                  <p>Mais do que entregar sistemas, a Águirra Tech ajuda a transformar complexidade em direção.</p>
                </FadeIn>
              </div>
            </div>

            {/* Minimalist Separator */}
            <div className="w-full h-px bg-gray-200"></div>

            {/* Second Block - Reality */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              {/* Left Column - Title */}
              <div className="lg:col-span-5">
                <FadeIn>
                  <h2 className="text-5xl md:text-6xl lg:text-[4.8rem] font-title font-light tracking-[-0.04em] bg-gradient-to-br from-[#009a93] to-[#312783] bg-clip-text text-transparent leading-[1.05]">
                    Construção <br className="hidden lg:block" />
                    orientada <br className="hidden lg:block" />
                    por realidade.
                  </h2>
                </FadeIn>
              </div>
              
              {/* Right Column - Text */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-[#8a8d91] font-light text-lg md:text-xl leading-[1.45]">
                <FadeIn delay={0.1}>
                  <p>Ao longo da sua trajetória, a Águirra Tech atuou em projetos de software sob medida, infraestrutura em nuvem, integração de dados, rastreabilidade, plataformas operacionais, análise documental e aplicações voltadas à gestão comercial.</p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p>Essa vivência consolidou uma forma própria de pensar tecnologia: com método, responsabilidade e foco no que realmente gera valor.</p>
                </FadeIn>
              </div>
            </div>

            {/* Minimalist Separator */}
            <div className="w-full h-px bg-gray-200"></div>

            {/* Third Block - Execution */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              {/* Left Column - Title */}
              <div className="lg:col-span-5">
                <FadeIn>
                  <h2 className="text-5xl md:text-6xl lg:text-[4.8rem] font-title font-light tracking-[-0.04em] bg-gradient-to-br from-[#009a93] to-[#312783] bg-clip-text text-transparent leading-[1.05]">
                    Resultado <br className="hidden lg:block" />
                    não nasce da <br className="hidden lg:block" />
                    tecnologia por <br className="hidden lg:block" />
                    si só.
                  </h2>
                </FadeIn>
              </div>
              
              {/* Right Column - Text */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-[#8a8d91] font-light text-lg md:text-xl leading-[1.45]">
                <FadeIn delay={0.1}>
                  <p><span className="font-semibold text-gray-700">Ele nasce da forma como ela é aplicada.</span></p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p>Na Águirra Tech, cada solução é construída para ser compreensível, utilizável e alinhada ao contexto real do negócio.</p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p>Mais do que desenvolver sistemas, estruturamos caminhos para que dados, processos e operação trabalhem na mesma direção.</p>
                </FadeIn>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Third Section - New Area */}
      <section className="relative z-10 w-full min-h-[800px] bg-[#312783] text-white pt-56 md:pt-80 lg:pt-[24rem] pb-20 md:pb-32 -mt-36 md:-mt-48 lg:-mt-56 px-4 md:px-8 overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col items-center">
          <FadeIn>
            <span className="block text-sm md:text-base text-center font-extralight uppercase tracking-[0.5em] pl-[0.5em] mb-8 md:mb-10 text-[#009a93]">
              Produtos
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-5xl md:text-6xl lg:text-[4.8rem] text-center font-title font-light tracking-[-0.04em] leading-[1.05] mb-16 md:mb-24">
              Conheça a Nortyn<span className="text-[#009a93]">.</span>
            </h2>
          </FadeIn>
          
          {/* Three Text Blocks Container */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-10 lg:gap-16 justify-center items-start text-left w-full max-w-6xl font-extralight text-[1.15rem] md:text-[1.3rem] lg:text-[1.4rem] leading-[1.35] tracking-[-0.01em]">
            
            {/* Block 1 */}
            <FadeIn delay={0.2} direction="right" width="flex-1">
              <p>
                A Nortyn nasce da experiência<br />
                prática da Águirra Tech em<br />
                projetos reais.
              </p>
            </FadeIn>
            
            {/* Block 2 */}
            <FadeIn delay={0.3} direction="right" width="flex-1">
              <p>
                É uma plataforma desenvolvida<br />
                para organizar a operação comercial<br />
                de pequenas e médias empresas,<br />
                trazendo mais clareza, controle e<br />
                direcionamento para decisões mais<br />
                assertivas.
              </p>
            </FadeIn>
            
            {/* Block 3 */}
            <FadeIn delay={0.4} direction="right" width="flex-1">
              <p>
                Sem complexidade desnecessária.<br />
                Sem excesso de ferramenta.<br />
                Apenas o que realmente contribui<br />
                para uma gestão comercial mais<br />
                consistente.
              </p>
            </FadeIn>

          </div>

          <FadeIn delay={0.5} direction="none">
            <div className="mt-16 md:mt-24 text-center">
              <a href="#" className="relative inline-block px-8 py-3 rounded-full border border-white/40 text-white font-bold hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300">
                Conheça a plataforma
              </a>
            </div>
          </FadeIn>

          <div className="relative w-full mt-24 md:mt-32 lg:mt-40 -translate-y-[10%]">
            {/* Horizon Arc / Planet glow effect (Moved to sit directly behind dashboard) */}
            <div 
              className="absolute left-1/2 top-[20%] md:top-[30%] lg:top-[40%] w-[300vw] md:w-[200vw] lg:w-[150vw] h-[1000px] md:h-[1500px] lg:h-[2000px] -translate-x-1/2 rounded-[100%] bg-[#312783] z-0 pointer-events-none"
              style={{
                boxShadow: '0 -60px 250px 40px rgba(0, 154, 147, 0.5), 0 -20px 80px 10px rgba(0, 154, 147, 0.4)'
              }}
            ></div>

            {/* Simulated Dashboard Mockup */}
            <div className="relative z-20 w-full max-w-[1240px] mx-auto bg-[#f8f9fc] rounded-[32px] md:rounded-[40px] shadow-[0_30px_100px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex text-[#312783]">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-[80px] lg:w-[240px] bg-white border-r border-gray-200 py-8 px-4 lg:px-6">
              <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 rounded-xl bg-[#312783] flex items-center justify-center shrink-0">
                  <div className="w-4 h-4 rounded-full bg-[#009a93]"></div>
                </div>
                <span className="font-bold text-xl hidden lg:block tracking-tight text-[#312783]">Nortyn</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="p-3 bg-gray-100 rounded-lg flex items-center gap-3 text-[#312783] font-medium cursor-pointer">
                  <LayoutGrid size={20} className="shrink-0" />
                  <span className="hidden lg:block select-none">Visão Geral</span>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded-lg flex items-center gap-3 text-gray-500 font-medium cursor-pointer transition-colors">
                  <BarChart3 size={20} className="shrink-0" />
                  <span className="hidden lg:block select-none">Vendas (D-1)</span>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded-lg flex items-center gap-3 text-gray-500 font-medium cursor-pointer transition-colors">
                  <Target size={20} className="shrink-0" />
                  <span className="hidden lg:block select-none">Metas &amp; Previsão</span>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded-lg flex items-center gap-3 text-gray-500 font-medium cursor-pointer transition-colors">
                  <Users size={20} className="shrink-0" />
                  <span className="hidden lg:block select-none">Equipe</span>
                </div>
              </div>
            </div>

            {/* Main Dashboard Area */}
            <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col text-left">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-[#312783]">Olá, Tiago!</h3>
                  <p className="text-gray-500 font-medium mt-1">Aqui está o resumo da sua operação em D-1.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm cursor-pointer">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-sm font-medium text-[#312783]">Últimos 30 dias</span>
                  <ChevronDown size={16} className="text-gray-400 ml-1" />
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { t: "Faturamento Atual", v: "R$ 482k", c: "+12.5%", color: "text-[#009a93]", bgc: "bg-[#009a93]/10" },
                  { t: "Previsão de Fechamento", v: "R$ 1.2M", c: "🎯 No ritmo da meta", color: "text-blue-600", bgc: "bg-blue-600/10" },
                  { t: "Previsibilidade", v: "Alta", c: "Confiabilidade: 84%", color: "text-purple-600", bgc: "bg-purple-600/10" },
                  { t: "Ofensor Principal", v: "Conversão", c: "Região Sul 📉", color: "text-orange-500", bgc: "bg-orange-500/10" }
                ].map((m, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                    <span className="text-[0.65rem] md:text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">{m.t}</span>
                    <span className="text-2xl lg:text-3xl font-bold tracking-tight mb-1 text-[#312783]">{m.v}</span>
                    <div className={`mt-2 py-1 px-2 rounded-md inline-block self-start ${m.bgc}`}>
                      <span className={`text-[0.7rem] font-bold ${m.color}`}>{m.c}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart Section */}
              <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col min-h-[300px]">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="font-bold tracking-tight text-lg text-[#312783]">Evolução de Vendas D-1</h4>
                    <p className="text-sm font-medium text-gray-400">Comparativo Rota Meta vs Realizado</p>
                  </div>
                  <div className="flex gap-4 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#009a93]"></div>
                      <span className="text-xs text-gray-600 font-bold">Realizado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                      <span className="text-xs text-gray-500 font-medium">Meta Otimizada</span>
                    </div>
                  </div>
                </div>
                
                {/* CSS Bar Chart */}
                <div className="flex-1 flex items-end justify-between gap-2 lg:gap-6 mt-auto px-2">
                  {[20, 35, 45, 80, 55, 90, 70, 85].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-2 group cursor-pointer w-full max-w-[40px]">
                      <div className="relative w-full flex justify-center items-end h-[140px] md:h-[180px]">
                        {/* Tooltip Hover */}
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-[#312783] text-white text-[0.65rem] font-bold py-1 px-2 rounded transition-opacity whitespace-nowrap z-10 pointer-events-none">
                          R$ {val * 5}k
                        </div>
                        {/* Meta Background Bar */}
                        <div className="absolute top-0 bottom-0 w-full bg-gray-100 rounded-t-md transition-all"></div>
                        {/* Realizado Foreground Bar */}
                        <div 
                          className="absolute bottom-0 w-full bg-[#312783] rounded-t-md group-hover:bg-[#009a93] transition-colors duration-300" 
                          style={{ height: `${val}%` }}
                        ></div>
                      </div>
                      <div className="text-center mt-2 text-[0.65rem] md:text-xs font-bold text-gray-400 group-hover:text-gray-800 transition-colors">
                        S{i+1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Fourth Section - Trajetória */}
      <section className="relative z-20 w-full bg-[#f4f5f8] py-24 md:py-32 lg:py-40 px-4 md:px-8 text-center text-[#312783]">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center">
          <span className="block text-sm md:text-base font-extralight uppercase tracking-[0.5em] pl-[0.5em] mb-6 md:mb-8 text-[#009a93]">
            Trajetória
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-title font-light tracking-[-0.04em] leading-[1.1] mb-8 md:mb-12">
            Uma construção guiada por prática, evolução e experiência aplicada<span className="text-[#009a93]">.</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl font-extralight leading-[1.4] text-[#8a8d91] max-w-[850px]">
            A história da Águirra Tech é marcada por ciclos de desenvolvimento, consolidação técnica e avanço contínuo em diferentes frentes de negócio.
          </p>
        </div>

        {/* Timeline Area */}
        <div className="flex flex-col gap-10 md:gap-14 w-full max-w-[1000px] mx-auto relative mt-20 md:mt-32" ref={timelineRef}>
          {/* Vertical Line */}
          <div className="absolute left-[36px] md:left-[160px] top-4 bottom-0 w-[2px] bg-[#312783]/10">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="w-full h-full bg-[#009a93]"
            />
          </div>

          {timelineData.map((item, index) => (
            <div key={item.year} className="flex flex-col md:flex-row w-full relative group">
              
              {/* Year (Desktop: left aligned, Mobile: moved inside content bounds) */}
              <FadeIn direction="right" delay={0.1} width="hidden md:flex w-[160px] flex-shrink-0 justify-end pr-12 pt-[18px]">
                <span className="font-bold text-2xl text-[#312783]/40 transition-colors group-hover:text-[#009a93]">{item.year}</span>
              </FadeIn>

              {/* Node / Icon */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                className="absolute left-[36px] md:left-[160px] top-6 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f4f5f8] border-[3px] border-white shadow-sm flex items-center justify-center z-10 transition-colors group-hover:bg-[#009a93] group-hover:border-[#009a93]"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#312783]/30 group-hover:bg-white transition-colors"></div>
              </motion.div>

              {/* Content Card */}
              <FadeIn direction="left" delay={0.2} width="flex-1 pl-[80px] md:pl-12 relative text-left">
                {/* Mobile Year */}
                <div className="md:hidden block mb-3 mt-1">
                  <span className="font-bold text-xl text-[#009a93]">{item.year}</span>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 relative hover:shadow-md transition-shadow group-hover:border-[#009a93]/20">
                  {/* Triangle pointing to line (visible on desktop) */}
                  <div className="hidden md:block absolute top-[22px] -left-3 w-6 h-6 bg-white border-l border-b border-gray-100 transform rotate-45 rounded-sm transition-colors group-hover:border-[#009a93]/20"></div>
                  
                  <h3 className="font-bold text-xl md:text-[1.4rem] text-[#312783] mb-4 tracking-[-0.01em]">{item.title}</h3>
                  <div className="space-y-4">
                    {item.subtext.map((paragraph, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        {item.year !== '2016' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#009a93] mt-[0.6rem] shrink-0"></div>
                        )}
                        <p className="text-[#312783]/60 font-medium leading-[1.6] text-[0.95rem] md:text-base">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

            </div>
          ))}
        </div>
      </section>

      {/* Fifth Section - Depoimentos */}
      <section className="relative z-20 w-full bg-[#f4f5f8] pt-24 pb-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 px-4 md:px-8 text-center text-[#312783]">
        <div className="max-w-[1240px] mx-auto flex flex-col items-center">
          <FadeIn>
            <span className="block text-sm md:text-base font-extralight uppercase tracking-[0.5em] pl-[0.5em] mb-6 md:mb-8 text-[#009a93]">
              Depoimentos
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-title font-light tracking-[-0.04em] leading-[1.1] mb-8">
              Quem constrói com a Águirra Tech<span className="text-[#009a93]">.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl font-extralight leading-[1.4] text-[#8a8d91] max-w-[800px] mb-16 md:mb-24">
              Empresas de diferentes segmentos confiaram na Águirra Tech para estruturar operações, desenvolver soluções e gerar resultados consistentes.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              {
                text: "“A Águirra trouxe clareza para algo que antes era totalmente operacional. Hoje temos mais direção e mais controle.”",
                author: "Diretor de Operações",
                company: "Setor Logístico",
                avatar: "https://i.pravatar.cc/150?u=1"
              },
              {
                text: "“O diferencial está na forma como entendem o negócio antes de propor qualquer solução.”",
                author: "Gerente Comercial",
                company: "Indústria de Alimentos",
                avatar: "https://i.pravatar.cc/150?u=2"
              },
              {
                text: "“Não é só tecnologia. É organização, método e resultado aplicados à realidade da operação.”",
                author: "CEO",
                company: "Tecnologia & Serviços",
                avatar: "https://i.pravatar.cc/150?u=3"
              }
            ].map((d, i) => (
              <FadeIn key={i} delay={0.1 * i} direction="none">
                <div className="bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col text-left hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="mb-8">
                    <div className="w-12 h-12 rounded-full bg-[#f4f5f8] flex items-center justify-center mb-6">
                      <Quote size={20} fill="#009a93" strokeWidth={0} />
                    </div>
                    <p className="text-[#8a8d91] font-medium leading-[1.6] text-lg italic">
                      {d.text}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-8 border-t border-gray-50 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden grayscale bg-gray-100">
                      <img src={d.avatar} alt={d.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#312783] text-sm">{d.author}</h4>
                      <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{d.company}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Sixth Section - Contato Banner */}
      <section className="relative z-20 w-full bg-[#f4f5f8] pt-20 pb-24 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40 px-4 md:px-8">
        <div className="max-w-[1240px] mx-auto">
          <FadeIn direction="none">
            <div className="relative w-full rounded-[40px] overflow-hidden bg-[#f4f5f8]" style={{ 
              backgroundImage: `
                radial-gradient(circle at 100% 100%, rgba(49, 39, 131, 0.2) 0%, transparent 60%),
                radial-gradient(circle at 0% 100%, rgba(49, 39, 131, 0.2) 0%, transparent 60%),
                linear-gradient(to bottom, transparent 50%, rgba(49, 39, 131, 0.08) 100%)
              `
            }}>
              {/* Background Texture/Pattern like reference */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#312783 1px, transparent 1px)', size: '24px 24px' }}></div>
              
              <div className="relative z-10 py-24 md:py-32 px-6 flex flex-col items-center text-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-[24px] shadow-xl flex items-center justify-center mb-10 border border-gray-100 translate-y-[-20%]"
                >
                  <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-[#009a93]"></div>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-title font-light tracking-[-0.04em] leading-[1.1] mb-8 text-[#312783]">
                  Vamos direto ao ponto<span className="text-[#009a93]">.</span>
                </h2>
                
                <p className="text-lg md:text-xl font-extralight leading-[1.4] text-[#312783]/70 max-w-[600px] mb-12">
                  Se existe um problema real, existe uma forma mais clara de resolver.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative group inline-block">
                    <div className="absolute left-2 right-2 top-4 bottom-[-0.25rem] bg-gradient-to-r from-[#009a93] to-[#312783] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-300"></div>
                    <a href="#" className="relative inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#009a93] to-[#312783] text-white font-bold group-hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
                      Falar com especialista
                    </a>
                  </div>
                </div>

                {/* Decorative bottom glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-[#312783] to-transparent opacity-10 blur-3xl -z-10"></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-30 w-full bg-[#f4f5f8] pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20 text-left">
            {/* Logo and Info Column */}
            <div className="lg:col-span-12 xl:col-span-5">
              <img src="/logo-aguirra.png" alt="Aguirra Tech" className="h-10 mb-8" />
              
              <div className="space-y-4 text-[#312783]/70 font-medium">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#312783] shrink-0 mt-0.5" />
                  <span className="text-sm">Av. João Erbolato, 364 Campinas - SP</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#312783] shrink-0" />
                  <span className="text-sm">contato@aguirra.tech</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#312783] shrink-0" />
                  <span className="text-sm">+55 (19) 3212-0000</span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-[#312783] mb-6">Produtos</h4>
                <ul className="space-y-4 text-sm text-[#312783]/60 font-medium">
                  <li><a href="#" className="hover:text-[#009a93] transition-colors">Nortyn</a></li>
                  <li><a href="#" className="hover:text-[#009a93] transition-colors">Software sob Medida</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#312783] mb-6">Empresa</h4>
                <ul className="space-y-4 text-sm text-[#312783]/60 font-medium">
                  <li><a href="#" className="hover:text-[#009a93] transition-colors">Trajetória</a></li>
                  <li><a href="#" className="hover:text-[#009a93] transition-colors">Depoimentos</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#312783] mb-6">Legal</h4>
                <ul className="space-y-4 text-sm text-[#312783]/60 font-medium">
                  <li><a href="#" className="hover:text-[#009a93] transition-colors">Privacidade</a></li>
                  <li><a href="#" className="hover:text-[#009a93] transition-colors">Termos</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social Icons and Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-gray-200/50 gap-8">
            <div className="flex gap-4">
              <motion.a whileHover={{ y: -4 }} href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#312783] hover:bg-[#312783] hover:text-white transition-all duration-300 shadow-sm">
                <Linkedin size={18} />
              </motion.a>
              <motion.a whileHover={{ y: -4 }} href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#312783] hover:bg-[#312783] hover:text-white transition-all duration-300 shadow-sm">
                <Instagram size={18} />
              </motion.a>
              <motion.a whileHover={{ y: -4 }} href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#312783] hover:bg-[#312783] hover:text-white transition-all duration-300 shadow-sm">
                <Facebook size={18} />
              </motion.a>
            </div>
            
            <p className="text-sm text-[#312783]/40 font-medium">
              © {new Date().getFullYear()} Aguirra Tech. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
