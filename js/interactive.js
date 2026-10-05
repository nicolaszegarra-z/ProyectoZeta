(() => {
  'use strict';

  const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));
  const shuffle = arr => {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  /* =========================================================
     MISIÓN ZETA
     Todas las soluciones y conceptos proceden de contenidos
     ya explicados en Telecomunicaciones, Materiales y Concepción.
     ========================================================= */
  const missionRoot = document.querySelector('[data-mission-root]');
  if (missionRoot) {
    const stages = [
      {
        domain: 'Ciencia de materiales',
        title: 'Primera decisión: la masa estructural amenaza la misión.',
        scenario: 'El vehículo necesita ser rígido, pero cada kilogramo añadido penaliza el sistema. ¿Qué enfoque refleja mejor la evolución explicada en la ruta de materiales?',
        choices: [
          {text:'Usar aleaciones ligeras y arquitectura tipo panel sándwich donde sea apropiado.', delta:{energy:8,data:0,integrity:10,autonomy:0}, quality:3, feedback:'Buena decisión. La web explica que aleaciones ligeras y estructuras tipo honeycomb/panel sándwich permiten mejorar la relación entre masa y rigidez sin depender de un material único “perfecto”.'},
          {text:'Aumentar el espesor de acero en toda la nave para resolver cualquier problema de resistencia.', delta:{energy:-15,data:0,integrity:4,autonomy:0}, quality:0, feedback:'La resistencia aumenta, pero la masa también. El recorrido de materiales insiste en que la masa es una variable crítica y que la solución espacial suele buscar resistencia específica, no simplemente más material.'},
          {text:'Construir toda la estructura con baldosas cerámicas del Shuttle.', delta:{energy:-6,data:0,integrity:-12,autonomy:0}, quality:0, feedback:'Las baldosas de sílice fueron diseñadas principalmente para aislamiento térmico y son frágiles. La página las presenta como parte de un sistema de protección térmica, no como material estructural universal.'}
        ]
      },
      {
        domain: 'Ciencia de materiales',
        title: 'Entrada atmosférica: el calor se convierte en el enemigo principal.',
        scenario: 'La cápsula debe atravesar una fase de calentamiento intenso durante una entrada única. ¿Qué principio del recorrido histórico resulta más adecuado?',
        choices: [
          {text:'Usar una protección ablativa que se degrade de forma controlada.', delta:{energy:0,data:0,integrity:14,autonomy:0}, quality:3, feedback:'Correcto. Mercury y Apollo muestran la lógica de la ablación: el material puede proteger precisamente porque se transforma y sacrifica parte de sí mismo de manera controlada.'},
          {text:'Confiar únicamente en aluminio estructural sin protección térmica adicional.', delta:{energy:0,data:0,integrity:-20,autonomy:0}, quality:0, feedback:'El aluminio estructural no sustituye a un sistema de protección térmica. La página separa claramente la función estructural de la función de protección durante la reentrada.'},
          {text:'Usar Nitinol como escudo térmico principal.', delta:{energy:-2,data:0,integrity:-10,autonomy:2}, quality:1, feedback:'El Nitinol se explica por su memoria de forma y su capacidad como actuador. Esa propiedad no lo convierte en el sistema térmico principal adecuado para una entrada atmosférica.'}
        ]
      },
      {
        domain: 'Telecomunicaciones',
        title: 'La nave se aleja y la señal llega cada vez más débil.',
        scenario: 'Ya no basta con transmitir: hay que recuperar bits útiles desde una distancia mucho mayor. ¿Qué estrategia sigue la evolución mostrada por Voyager y la Deep Space Network?',
        choices: [
          {text:'Mejorar antenas, receptores, codificación y combinar estaciones cuando sea necesario.', delta:{energy:4,data:14,integrity:0,autonomy:0}, quality:3, feedback:'Correcto. La historia de Voyager muestra que una misión puede ganar capacidad mejorando la infraestructura terrestre, la codificación y el uso combinado de antenas.'},
          {text:'Resolverlo únicamente aumentando sin límite la potencia de la nave.', delta:{energy:-18,data:3,integrity:0,autonomy:0}, quality:0, feedback:'La página muestra que la solución no fue simplemente “gritar más fuerte”. Energía, antenas, receptores, códigos y redes terrestres forman parte de la solución.'},
          {text:'Esperar a que la nave vuelva a acercarse a la Tierra.', delta:{energy:0,data:-18,integrity:0,autonomy:-4}, quality:0, feedback:'Las misiones de espacio profundo no dependen de regresar para entregar ciencia. El proyecto explica redes y técnicas diseñadas precisamente para mantener el enlace a grandes distancias.'}
        ]
      },
      {
        domain: 'Telecomunicaciones',
        title: 'El rover tiene poca energía y no siempre conviene hablar directamente con la Tierra.',
        scenario: 'La arquitectura marciana descrita en la web ofrece una solución conocida. ¿Qué eliges?',
        choices: [
          {text:'Usar un orbitador como relé entre el rover y la Tierra.', delta:{energy:9,data:12,integrity:0,autonomy:2}, quality:3, feedback:'Correcto. La ruta explica cómo Marte se convirtió en una red: rovers y orbitadores permiten rutas alternativas y enlaces de relé.'},
          {text:'Exigir siempre un enlace directo del rover con una antena terrestre.', delta:{energy:-12,data:-8,integrity:0,autonomy:-2}, quality:0, feedback:'La propia evolución de la red marciana muestra por qué el relé orbital puede ser preferible: crea otra ruta y reduce la dependencia de un único enlace directo.'},
          {text:'Eliminar el almacenamiento a bordo para obligar a transmitir todo inmediatamente.', delta:{energy:-8,data:-16,integrity:0,autonomy:-6}, quality:0, feedback:'La web muestra repetidamente la importancia de almacenar datos cuando el contacto no está disponible. Quitar esa capacidad hace la misión menos robusta.'}
        ]
      },
      {
        domain: 'Telecomunicaciones',
        title: 'Durante varias horas no existe una ruta continua hacia la Tierra.',
        scenario: 'La desconexión ya no debe tratarse como una falla excepcional. ¿Qué arquitectura encaja mejor con lo explicado sobre DTN?',
        choices: [
          {text:'Guardar, transportar y reenviar los datos cuando vuelva a existir una ruta.', delta:{energy:5,data:14,integrity:0,autonomy:7}, quality:3, feedback:'Correcto. DTN se presenta como una arquitectura donde la desconexión es normal: los datos pueden almacenarse y reenviarse cuando aparece una ruta útil.'},
          {text:'Descartar todo dato que no pueda transmitirse inmediatamente.', delta:{energy:2,data:-20,integrity:0,autonomy:-5}, quality:0, feedback:'Eso contradice la idea central de DTN. El proyecto explica que el almacenamiento permite conservar información aunque el enlace no sea continuo.'},
          {text:'Considerar la misión perdida en cuanto desaparezca la conexión.', delta:{energy:0,data:-12,integrity:-4,autonomy:-14}, quality:0, feedback:'Las redes espaciales se diseñan precisamente para interrupciones, ventanas de contacto y demoras. La ausencia temporal de conexión no implica perder la misión.'}
        ]
      },
      {
        domain: 'Telecomunicaciones',
        title: 'Los instrumentos producen más datos de los que la ruta habitual puede devolver cómodamente.',
        scenario: 'Cámaras y sensores mejores aumentan la presión sobre el enlace. ¿Qué decisión sigue la dirección tecnológica descrita en la web?',
        choices: [
          {text:'Combinar almacenamiento, priorización de datos y enlaces de mayor capacidad, incluida comunicación óptica cuando sea viable.', delta:{energy:3,data:16,integrity:0,autonomy:4}, quality:3, feedback:'Correcto. La página presenta una evolución híbrida: radio para robustez, enlaces ópticos para mayor capacidad, almacenamiento y procesamiento para administrar el flujo de datos.'},
          {text:'Enviar siempre todos los datos sin priorizar ni almacenar nada.', delta:{energy:-12,data:-10,integrity:0,autonomy:-5}, quality:0, feedback:'Los observatorios y misiones modernas dependen de memoria, contactos programados, compresión, pipelines y priorización. La transmisión no ocurre como un flujo ilimitado y continuo.'},
          {text:'Reemplazar toda comunicación por fotografía química.', delta:{energy:-4,data:-18,integrity:0,autonomy:-3}, quality:0, feedback:'La fotografía química pertenece a etapas históricas anteriores y no resuelve el problema moderno de transportar grandes volúmenes de datos digitales.'}
        ]
      },
      {
        domain: 'Autonomía y telecomunicaciones',
        title: 'El retraso impide que la Tierra decida cada pequeño paso a tiempo.',
        scenario: 'La misión necesita reaccionar localmente ante situaciones urgentes sin abandonar los objetivos humanos. ¿Qué arquitectura eliges?',
        choices: [
          {text:'Dar autonomía local para decisiones urgentes dentro de objetivos y límites definidos desde la Tierra.', delta:{energy:4,data:4,integrity:6,autonomy:18}, quality:3, feedback:'Correcto. El recorrido final de telecomunicaciones explica que, cuando el retardo crece, los sistemas deben observar y resolver ciertas decisiones localmente dentro de objetivos establecidos.'},
          {text:'Esperar siempre una orden terrestre antes de cualquier acción.', delta:{energy:-6,data:-5,integrity:-8,autonomy:-20}, quality:0, feedback:'La página muestra que el retardo vuelve inviable esperar una conversación completa para cada decisión urgente. Esa es precisamente la razón de aumentar la autonomía local.'},
          {text:'Permitir que la nave cambie por sí sola los objetivos científicos sin límites.', delta:{energy:0,data:2,integrity:-4,autonomy:6}, quality:1, feedback:'La autonomía descrita en la web no significa ausencia de límites. Las personas fijan objetivos y restricciones; el sistema resuelve lo que no puede esperar.'}
        ]
      },
      {
        domain: 'Pensamiento crítico',
        title: 'Llegan resultados inesperados. La misión encuentra una señal que no encaja bien con el modelo previo.',
        scenario: 'Ahora el problema no es técnico, sino intelectual. ¿Qué decisión representa mejor la lógica del recorrido de pensamiento crítico?',
        choices: [
          {text:'Comparar explicaciones, revisar incertidumbres y cambiar el modelo si la evidencia lo exige.', delta:{energy:0,data:6,integrity:4,autonomy:8}, quality:3, feedback:'Correcto. La conclusión del recorrido insiste en medir, comparar, reconocer incertidumbre y corregir los modelos cuando la evidencia ya no los sostiene.'},
          {text:'Descartar el dato porque contradice la explicación que ya teníamos.', delta:{energy:0,data:-15,integrity:0,autonomy:-8}, quality:0, feedback:'Eso invierte la lección central del recorrido. Una anomalía o nueva evidencia puede obligar a revisar un modelo, no a protegerlo automáticamente.'},
          {text:'Convertir una sola observación en una conclusión definitiva sobre todo el fenómeno.', delta:{energy:0,data:-8,integrity:0,autonomy:-6}, quality:0, feedback:'La web distingue entre una observación que apoya una idea y una observación que demuestra de forma exclusiva una explicación. El pensamiento crítico exige más cautela.'}
        ]
      }
    ];

    const els = {
      start: missionRoot.querySelector('[data-mission-start]'),
      stage: missionRoot.querySelector('[data-mission-stage]'),
      result: missionRoot.querySelector('[data-mission-result]'),
      startBtn: missionRoot.querySelector('[data-start-mission]'),
      restartBtn: missionRoot.querySelector('[data-restart-mission]'),
      title: missionRoot.querySelector('[data-mission-title]'),
      scenario: missionRoot.querySelector('[data-mission-scenario]'),
      choices: missionRoot.querySelector('[data-mission-choices]'),
      feedback: missionRoot.querySelector('[data-mission-feedback]'),
      next: missionRoot.querySelector('[data-mission-next]'),
      domain: missionRoot.querySelector('[data-mission-domain]'),
      stepLabel: missionRoot.querySelector('[data-mission-step-label]'),
      progressLabel: missionRoot.querySelector('[data-mission-progress-label]'),
      progress: missionRoot.querySelector('[data-mission-progress]'),
      log: document.querySelector('[data-mission-log]'),
      resultTitle: missionRoot.querySelector('[data-mission-result-title]'),
      resultCopy: missionRoot.querySelector('[data-mission-result-copy]'),
      resultScore: missionRoot.querySelector('[data-mission-score]')
    };
    const statNames = ['energy','data','integrity','autonomy'];
    let state, step, decisions;

    const setHidden = (el, hidden) => { if (el) el.hidden = hidden; };
    const updateStats = () => {
      statNames.forEach(k => {
        const value = clamp(state[k]);
        state[k] = value;
        const valEl = missionRoot.querySelector(`[data-stat-value="${k}"]`);
        const barEl = missionRoot.querySelector(`[data-stat-bar="${k}"]`);
        if (valEl) valEl.textContent = Math.round(value);
        if (barEl) barEl.style.width = `${value}%`;
      });
    };
    const resetMission = () => {
      state = {energy:70,data:70,integrity:70,autonomy:70};
      step = 0;
      decisions = [];
      updateStats();
      els.progress.style.width = '0%';
      els.progressLabel.textContent = `0 / ${stages.length}`;
      if (els.log) els.log.innerHTML = '<p class="mission-log-empty-v083">Todavía no hay decisiones registradas.</p>';
      setHidden(els.start,false); setHidden(els.stage,true); setHidden(els.result,true);
    };
    const addLog = (stage, choice) => {
      if (!els.log) return;
      if (els.log.querySelector('.mission-log-empty-v083')) els.log.innerHTML = '';
      const item = document.createElement('article');
      item.className = 'mission-log-item-v083';
      item.innerHTML = `<span>${String(decisions.length).padStart(2,'0')} · ${stage.domain}</span><h4>${stage.title}</h4><p><b>Decisión:</b> ${choice.text}</p><p>${choice.feedback}</p>`;
      els.log.appendChild(item);
    };
    const renderStage = () => {
      const stage = stages[step];
      setHidden(els.start,true); setHidden(els.stage,false); setHidden(els.result,true);
      els.stepLabel.textContent = `DECISIÓN ${step + 1} / ${stages.length}`;
      els.domain.textContent = stage.domain;
      els.title.textContent = stage.title;
      els.scenario.textContent = stage.scenario;
      els.choices.innerHTML = '';
      els.feedback.innerHTML = '';
      setHidden(els.feedback,true);
      setHidden(els.next,true);
      els.progress.style.width = `${(step / stages.length) * 100}%`;
      els.progressLabel.textContent = `${step} / ${stages.length}`;

      // : las alternativas cambian de posición en cada decisión.
      shuffle(stage.choices).forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerHTML = `<span>${String.fromCharCode(65 + idx)}</span><b>${choice.text}</b>`;
        btn.addEventListener('click', () => selectChoice(stage, choice, btn));
        els.choices.appendChild(btn);
      });
    };
    const selectChoice = (stage, choice, btn) => {
      els.choices.querySelectorAll('button').forEach(b => b.disabled = true);
      btn.classList.add(choice.quality === 3 ? 'best' : choice.quality === 1 ? 'partial' : 'risky');
      Object.entries(choice.delta).forEach(([k,v]) => state[k] = clamp(state[k] + v));
      decisions.push({stage,choice});
      updateStats();
      addLog(stage,choice);
      els.feedback.className = `mission-feedback-v083 ${choice.quality === 3 ? 'is-good' : choice.quality === 1 ? 'is-mid' : 'is-risky'}`;
      els.feedback.innerHTML = `<strong>${choice.quality === 3 ? 'Decisión sólida' : choice.quality === 1 ? 'Decisión posible, pero incompleta' : 'Decisión de alto riesgo'}</strong><p>${choice.feedback}</p>`;
      setHidden(els.feedback,false);
      els.progress.style.width = `${((step + 1) / stages.length) * 100}%`;
      els.progressLabel.textContent = `${step + 1} / ${stages.length}`;
      setHidden(els.next,false);
      els.next.textContent = step === stages.length - 1 ? 'Ver informe final →' : 'Siguiente decisión →';
    };
    const finishMission = () => {
      setHidden(els.stage,true); setHidden(els.result,false);
      const avg = Math.round(statNames.reduce((sum,k) => sum + state[k], 0) / statNames.length);
      els.resultScore.textContent = `${avg}%`;
      if (avg >= 82) {
        els.resultTitle.textContent = 'Misión científicamente viable.';
        els.resultCopy.textContent = 'Construiste un sistema equilibrado: protegiste la nave, preservaste los datos, evitaste depender de un único enlace y permitiste autonomía local sin abandonar los objetivos científicos.';
      } else if (avg >= 65) {
        els.resultTitle.textContent = 'La misión puede continuar, pero tiene puntos débiles.';
        els.resultCopy.textContent = 'Varias decisiones funcionan, aunque el sistema quedó desequilibrado. Revisa el registro: en exploración espacial una solución local puede crear un problema nuevo en otra parte de la misión.';
      } else {
        els.resultTitle.textContent = 'La arquitectura necesita un rediseño.';
        els.resultCopy.textContent = 'La misión acumuló demasiados compromisos. El recorrido de la página muestra precisamente por qué materiales, comunicaciones, autonomía y análisis de evidencia deben diseñarse como un sistema conectado.';
      }
    };
    els.startBtn?.addEventListener('click', () => { resetMission(); renderStage(); });
    els.restartBtn?.addEventListener('click', () => { resetMission(); renderStage(); });
    els.next?.addEventListener('click', () => {
      if (step >= stages.length - 1) finishMission();
      else { step += 1; renderStage(); }
    });
    resetMission();
  }

  /* =========================================================
     QUIZ ZETA — 1000 preguntas / 100 por partida
     ========================================================= */
  const quizRoot = document.querySelector('[data-quiz-root]');
  if (quizRoot) {
    const bank = Array.isArray(window.ZETA_QUIZ_BANK) ? window.ZETA_QUIZ_BANK : [];
    const q = sel => quizRoot.querySelector(sel);
    const els = {
      welcome:q('[data-quiz-welcome]'), game:q('[data-quiz-game]'), results:q('[data-quiz-results]'),
      start:q('[data-start-quiz]'), restart:q('[data-restart-quiz]'), bankCount:q('[data-bank-count]'),
      number:q('[data-quiz-number]'), category:q('[data-quiz-category]'), correct:q('[data-quiz-correct]'), wrong:q('[data-quiz-wrong]'), score:q('[data-quiz-score]'),
      progress:q('[data-quiz-progress]'), sourceLabel:q('[data-quiz-source-label]'), question:q('[data-quiz-question]'), options:q('[data-quiz-options]'),
      explanation:q('[data-quiz-explanation]'), expIcon:q('[data-quiz-explanation-icon]'), expTitle:q('[data-quiz-explanation-title]'), expText:q('[data-quiz-explanation-text]'), sourceLink:q('[data-quiz-source-link]'),
      next:q('[data-quiz-next]'), resultTitle:q('[data-quiz-result-title]'), resultScore:q('[data-quiz-result-score]'), resultCopy:q('[data-quiz-result-copy]'), breakdown:q('[data-quiz-breakdown]')
    };
    if (els.bankCount) els.bankCount.textContent = bank.length || '1000';
    let round = [], index = 0, stats, answered = false;

    const chooseRound = () => {
      const cats = ['Telecomunicaciones','Ciencia de materiales','Pensamiento crítico'];
      const counts = [34,33,33];
      let selected = [];
      cats.forEach((cat,i) => {
        const subset = shuffle(bank.filter(item => item.category === cat)).slice(0, counts[i]);
        selected.push(...subset);
      });
      return shuffle(selected);
    };
    const resetStats = () => {
      stats = {
        correct:0, wrong:0,
        byCategory:{
          'Telecomunicaciones':{correct:0,total:0},
          'Ciencia de materiales':{correct:0,total:0},
          'Pensamiento crítico':{correct:0,total:0}
        }
      };
    };
    const setView = view => {
      els.welcome.hidden = view !== 'welcome';
      els.game.hidden = view !== 'game';
      els.results.hidden = view !== 'results';
    };
    const beginQuiz = () => {
      if (bank.length < 100) return;
      round = chooseRound();
      index = 0; answered = false; resetStats();
      setView('game'); renderQuestion();
    };
    const renderQuestion = () => {
      answered = false;
      const item = round[index];
      els.number.textContent = `PREGUNTA ${index + 1} / ${round.length}`;
      els.category.textContent = item.category;
      els.category.dataset.category = item.category;
      els.correct.textContent = stats.correct;
      els.wrong.textContent = stats.wrong;
      els.score.textContent = stats.correct;
      els.progress.style.width = `${(index / round.length) * 100}%`;
      els.sourceLabel.textContent = `${item.source.period} · ${item.source.title}`;
      els.question.textContent = item.question;
      els.options.innerHTML = '';
      els.explanation.hidden = true;
      els.next.hidden = true;
      item.options.forEach((opt,i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerHTML = `<span>${String.fromCharCode(65+i)}</span><b>${opt.text}</b>`;
        btn.addEventListener('click', () => answerQuestion(i, btn));
        els.options.appendChild(btn);
      });
    };
    const answerQuestion = (choiceIndex, btn) => {
      if (answered) return;
      answered = true;
      const item = round[index];
      const ok = choiceIndex === item.answer;
      stats.byCategory[item.category].total += 1;
      if (ok) { stats.correct += 1; stats.byCategory[item.category].correct += 1; }
      else stats.wrong += 1;

      const buttons = [...els.options.querySelectorAll('button')];
      buttons.forEach((b,i) => {
        b.disabled = true;
        if (i === item.answer) b.classList.add('correct');
        if (i === choiceIndex && !ok) b.classList.add('wrong');
      });
      const chosen = item.options[choiceIndex];
      const correctText = item.options[item.answer].text;
      els.explanation.className = `quiz-explanation-v083 ${ok ? 'is-correct' : 'is-wrong'}`;
      els.expIcon.textContent = ok ? '✓' : '×';
      els.expTitle.textContent = ok ? 'Correcto' : 'No es la opción correcta';
      els.expText.textContent = ok ? chosen.feedback : `${chosen.feedback} Respuesta correcta: ${correctText}`;
      const stage = String(item.source.stage).padStart(2,'0');
      els.sourceLink.href = `${item.source.page}#etapa-${stage}`;
      els.explanation.hidden = false;
      els.correct.textContent = stats.correct;
      els.wrong.textContent = stats.wrong;
      els.score.textContent = stats.correct;
      els.progress.style.width = `${((index + 1) / round.length) * 100}%`;
      els.next.hidden = false;
      els.next.textContent = index === round.length - 1 ? 'Ver resultado →' : 'Siguiente pregunta →';
    };
    const finishQuiz = () => {
      setView('results');
      const pct = stats.correct;
      els.resultScore.textContent = pct;
      if (pct >= 90) {
        els.resultTitle.textContent = 'Dominio excepcional del proyecto.';
        els.resultCopy.textContent = 'Reconociste relaciones, etapas, conceptos y evidencias de los tres recorridos con muy pocos errores.';
      } else if (pct >= 75) {
        els.resultTitle.textContent = 'Muy buen dominio del contenido.';
        els.resultCopy.textContent = 'La base mezcla preguntas de cronología, conceptos, relaciones y afirmaciones concretas. Tu resultado muestra una comprensión sólida del proyecto.';
      } else if (pct >= 60) {
        els.resultTitle.textContent = 'Buen punto de partida.';
        els.resultCopy.textContent = 'Hay una comprensión general clara, pero algunas etapas y conexiones todavía pueden reforzarse consultando los recorridos completos.';
      } else {
        els.resultTitle.textContent = 'El proyecto todavía tiene mucho por explorar.';
        els.resultCopy.textContent = 'Usa las explicaciones y los enlaces a cada etapa para revisar los puntos que más se repitieron entre tus errores. Una nueva partida elegirá otras 100 preguntas.';
      }
      els.breakdown.innerHTML = '';
      Object.entries(stats.byCategory).forEach(([cat,s]) => {
        const pctCat = s.total ? Math.round((s.correct / s.total) * 100) : 0;
        const row = document.createElement('div');
        row.innerHTML = `<span>${cat}</span><b>${s.correct} / ${s.total}</b><div><i style="width:${pctCat}%"></i></div>`;
        els.breakdown.appendChild(row);
      });
    };
    els.start?.addEventListener('click', beginQuiz);
    els.restart?.addEventListener('click', beginQuiz);
    els.next?.addEventListener('click', () => {
      if (!answered) return;
      if (index >= round.length - 1) finishQuiz();
      else { index += 1; renderQuestion(); }
    });
    setView('welcome');
  }
})();
