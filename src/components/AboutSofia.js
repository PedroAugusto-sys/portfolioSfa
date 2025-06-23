import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AboutSofia.css';

const AboutSofia = ({ isLanternMode }) => {
  const aboutRef = useRef();
  const curtainRef = useRef();

  useEffect(() => {
    if (curtainRef.current) {
      gsap.to(curtainRef.current, {
        height: 0,
        duration: 1.2,
        delay: 0.5,
        ease: 'power2.inOut',
      });
    }
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, delay: 1, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <section className={`about-sofia-section ${isLanternMode ? 'lantern-mode' : ''}`}>
      <div className="about-curtain" ref={curtainRef}></div>
      <div className="about-sofia" ref={aboutRef}>
        <div className="about-photo-frame">
          {/* Foto real de Sofia */}
          <img src={require('../assets/images/sofia-perfil.png')} alt="Sofia Peixoto Barbosa" className="about-photo" />
        </div>
        <div className="about-text">
          <h2>Arquivo Pessoal: Sofia Peixoto Barbosa</h2>
          <p className="about-narrative">
            <span className="about-label">CONFIDENCIAL</span><br/>
            Nome: <b>Sofia Peixoto Barbosa</b><br/>
            Profissão: Artista Visual & Investigadora de Mistérios<br/>
            <br/>
            Biografia: <br/>
            "Meu nome é Sofia Peixoto Barbosa, ou só Sofia. Nasci no nono dia de setembro de 2002, ou seja, (09/09/2002), é a senha do meu wi-fi. Sou Brasileira e Carioca, atualmente sigo cursando o ensino superior em escultura na UFRJ.Desde cedo a arte e tudo que era ligado a ela me interessou, mas eu não comecei achando que o que eu fazia era arte. Levou um tempo até que eu realmente acreditasse que eu estava nesse caminho. O que eu mais gosto, e o que mais me chama atenção é o fato de o fazer artístico não ser exato, a experimentação é como um mistério a ser desvendado e eu vejo muito isso em minhas obras, sejam esculturas ou ilustrações elas não surgiram imediatamente, foi como se fossem casos a serem desvendados e eu fosse a detetive a cargo desse feito. E então, quando se está lá batendo a cabeça e quase desistindo que eles surgem, as ideias, as respostas e a pesquisa que você tanto fez tem um fruto finalmente. E bem, é isso que eu quero mostrar em minhas obras, elas não são perfeitas, mas cada uma tem um toque de mistério e todos parecem possíveis suspeitos a serem desvendados."
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSofia; 