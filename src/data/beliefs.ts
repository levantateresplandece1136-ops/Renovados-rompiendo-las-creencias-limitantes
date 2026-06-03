/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Belief } from '../types';

export const beliefsDb: Belief[] = [
  // ==================== 1. IDENTIDAD (10 creencias) ====================
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `ID-${i + 1}`,
    name: [
      "Valgo por lo que hago",
      "Mi identidad depende de la aprobación ajena",
      "Si cometo errores pierdo mi valor para Dios",
      "Mi pasado define irremediablemente quién soy",
      "Solo brillo si soy el centro de atención",
      "Ser débil significa que Dios me ha abandonado",
      "Mi valor está ligado a mi aspecto exterior",
      "Necesito un título profesional para ser alguien",
      "Si no tengo éxito visible, mi vida es inútil",
      "Soy el resultado de lo que mis padres dijeron de mí"
    ][i],
    category: "identidad" as const,
    fearRoot: "Insignificancia y abandono",
    mainEmotion: "Inseguridad",
    cognitiveDistortion: "Razonamiento emocional",
    lie: [
      "Dios solo me ama cuando hago todo bien.",
      "Si la gente me desaprueba, entonces no valgo nada.",
      "Mis fallas cancelan mi adopción como hijo de Dios.",
      "Las etiquetas de mi pasado son mi verdadera identidad.",
      "Tengo que llamar la atención para ser amado.",
      "La debilidad aleja el favor y la unción de Dios.",
      "Mi cuerpo y belleza física determinan mi dignidad.",
      "Sin estatus social, soy invisible y de poco valor.",
      "Mi productividad determina el amor del Padre.",
      "Las palabras de rechazo de mi infancia definen mi destino."
    ][i],
    truth: [
      "Soy amado con amor eterno, no por mis obras sino por su gracia.",
      "Mi valor fue sellado en la cruz; no dependo de aplausos humanos.",
      "Soy justificado por la fe y nada me separará del amor de Cristo.",
      "Soy una nueva criatura; las cosas viejas pasaron, son hechas nuevas.",
      "Fuimos creados para la gloria de Dios, hallando plenitud en su presencia.",
      "Su poder se perfecciona en mi debilidad; la gracia me sostiene.",
      "Soy hechura suya, creado en Cristo Jesús para buenas obras.",
      "Mi ciudadanía está en los cielos; tengo herencia incorruptible.",
      "Mi vida está escondida con Cristo en Dios; tengo propósito eterno.",
      "A los que creen, Dios les da el derecho de ser llamados hijos de Dios."
    ][i],
    verses: [
      { reference: "Efesios 2:8-9", text: "Porque por gracia sois salvos por medio de la fe..." },
      { reference: "Gálatas 1:10", text: "¿Busco ahora el favor de los hombres, o el de Dios?" }
    ],
    activities: [
      "Escribe 10 verdades de tu identidad en Cristo en un espejo.",
      "Medita 15 minutos en Romanos 8 prescindiendo de tus listas de tareas pendientes."
    ]
  })),

  // ==================== 2. TEMOR (10 creencias) ====================
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `TE-${i + 1}`,
    name: [
      "El desastre acecha a la vuelta de la esquina",
      "Si confío en alguien saldré lastimado",
      "El futuro es un lugar incierto y peligroso",
      "Dios me castigará si doy un paso en falso",
      "No podré soportar el dolor si algo malo pasa",
      "El enemigo tiene más poder sobre mí que Dios",
      "La enfermedad destruirá mi vida tarde o temprano",
      "Si pierdo mi empleo, estaré arruinado por siempre",
      "Los cambios repentinos solo traen ruina",
      "La muerte de mis seres queridos me destruirá"
    ][i],
    category: "temor" as const,
    fearRoot: "Falta de protección y muerte",
    mainEmotion: "Miedo paralizante",
    cognitiveDistortion: "Catastrofismo",
    lie: [
      "La tragedia es inevitable en mi vida diaria.",
      "Nadie es digno de confianza, ni siquiera Dios.",
      "El futuro está lleno de amenazas sin provisión.",
      "Dios vigila mis tropiezos para hacerme pagar.",
      "Mis recursos internos y espirituales se quebrarán.",
      "El mal tiene influencia ilimitada sobre los hijos de Dios.",
      "Mi salud física está a merced del azar y la desgracia.",
      "Mi seguridad depende enteramente de la economía mundial.",
      "Dios no está en medio de las transiciones.",
      "La pérdida me dejará vacío y sin esperanza alguna."
    ][i],
    truth: [
      "El amor perfecto echa fuera el temor. Estoy seguro bajo sus alas.",
      "Dios es mi refugio y fortaleza, mi pronto auxilio en las tribulaciones.",
      "Sé en quién he creído, y estoy seguro de que guardará mi depósito.",
      "Él no nos ha dado espíritu de cobardía, sino de poder, amor y dominio propio.",
      "Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?",
      "Mayor es el que está en mí que el que está en el mundo.",
      "Él sana tus dolencias y rescata del hoyo tu vida.",
      "Mi Dios suplirá todo lo que os falte conforme a sus riquezas en gloria.",
      "Él hace que todas las cosas cooperen para el bien de sus hijos.",
      "Aunque ande en valle de sombra de muerte, no temeré mal alguno."
    ][i],
    verses: [
      { reference: "2 Timoteo 1:7", text: "Porque no nos ha dado Dios espíritu de cobardía..." },
      { reference: "Salmos 27:1", text: "Jehová es mi luz y mi salvación; ¿de quién temeré?" }
    ],
    activities: [
      "Escribe tu peor temor y ríndelo en oración decretando la soberanía divina.",
      "Haz un ayuno de noticias angustiantes durante las próximas 48 horas."
    ]
  })),

  // ==================== 3. RECHAZO (10 creencias) ====================
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `RE-${i + 1}`,
    name: [
      "No encajo en ningún grupo",
      "La gente me juzga y me critica en secreto",
      "Debo complacer a todos para ser aceptado",
      "Mis amigos me dejarán cuando conozcan mis fallas",
      "Fui diseñado para estar solo toda la vida",
      "Nadie valora genuinamente mis aportes",
      "Es mejor aislarse que arriesgarse a ser herido",
      "Nací siendo una decepción para mi familia",
      "La gente solo se acerca a mí por interés",
      "La iglesia me juzgará si muestro mi vulnerabilidad"
    ][i],
    category: "rechazo" as const,
    fearRoot: "Exclusión y soledad",
    mainEmotion: "Inadaptación",
    cognitiveDistortion: "Lectura de mente",
    lie: [
      "Hay algo defectuoso en mí que aleja a los demás.",
      "Todos están pendientes de mis debilidades para juzgarme.",
      "Mi única seguridad es decir siempre 'sí' a todo.",
      "La intimidad es peligrosa porque expone mis heridas.",
      "La soledad amarga es mi destino inevitable.",
      "Mis palabras y talentos son insignificantes para la comunidad.",
      "Poner muros altos es el único método seguro de protección.",
      "Mi valor familiar está condicionado a cumplir sus expectativas.",
      "Nadie me ama de forma desinteresada.",
      "Si muestro un dolor espiritual, seré condenado de inmediato."
    ][i],
    truth: [
      "Aunque mi padre y mi madre me dejasen, con todo Jehová me recogerá.",
      "Aceptaos los unos a los unos como Cristo nos aceptó para gloria de Dios.",
      "Bástame tu gracia; mi aprobación viene directamente del Trono Celestial.",
      "En el amor no hay temor; la comunión sincera sana las heridas.",
      "Dios hace habitar en familia a los desamparados.",
      "Vosotros sois el cuerpo de Cristo, y miembros cada uno en particular.",
      "La verdad nos hace libres; la vulnerabilidad convoca el poder sanador.",
      "Antes que te formases en el vientre te conocí y te santifiqué.",
      "Un amigo ama en todo tiempo, y es como un hermano en el día de angustia.",
      "No hay condenación para los que están en Cristo Jesús."
    ][i],
    verses: [
      { reference: "Salmos 27:10", text: "Aunque mi padre y mi madre me dejasen..." },
      { reference: "Romanos 8:1", text: "Ahora, pues, ninguna condenación hay para los que están en Cristo..." }
    ],
    activities: [
      "Escribe una carta de perdón a alguien que te excluyó en tu juventud.",
      "Inicia una conversación honesta con un hermano en la fe confiando en el amor mutuo."
    ]
  })),

  // ==================== 4. ESCASEZ (10 creencias) ====================
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `ES-${i + 1}`,
    name: [
      "Nunca hay suficiente dinero para estar tranquilo",
      "El dinero pervierte el corazón espiritual",
      "Si comparto lo que tengo, me quedaré sin nada",
      "La pobreza es una señal de humildad ante Dios",
      "El éxito financiero es esquivo para mí",
      "Debo acumular riquezas a toda costa para el futuro",
      "El progreso económico es solo para los deshonestos",
      "Mis talentos no valen lo suficiente para cobrar bien",
      "Dios se olvida de mis necesidades financieras",
      "Vivir con deudas es mi única alternativa real"
    ][i],
    category: "escasez" as const,
    fearRoot: "Hambruna, desamparo y ruina",
    mainEmotion: "Codicia o tacañería por pánico",
    cognitiveDistortion: "Abstracción selectiva",
    lie: [
      "Mis provisiones se agotarán de un momento a otro.",
      "La prosperidad material es inherentemente pecaminosa.",
      "Dar diezmo y ofrenda reduce mi estabilidad material.",
      "Dios prefiere que viva en miseria para mantenerme humilde.",
      "Hay una maldición indestructible sobre mi economía.",
      "La acumulación es mi único salvavidas real.",
      "No se puede prosperar honestamente en este sistema.",
      "Es codicia pretender remuneración justa por mi esfuerzo.",
      "Dios no se preocupa por mi sustento material diario.",
      "Tengo que depender del crédito humano porque la fe no provee."
    ][i],
    truth: [
      "Mi Dios es el dueño del oro y la plata. Él provee con sobreabundancia.",
      "El Señor nos da el poder para hacer las riquezas para confirmar su pacto.",
      "El alma generosa será prosperada; el que sacie, también será saciado.",
      "Él exalta al humilde y le concede provisión para toda buena obra.",
      "Cristo se hizo pobre para que nosotros fuésemos enriquecidos.",
      "No os afanéis por el día de mañana; vuestro Padre celestial sabe lo que necesitáis.",
      "La bendición de Jehová es la que enriquece, y no añade tristeza con ella.",
      "Digno es el obrero de su salario; valora lo que Dios colocó en ti.",
      "Jehová es mi pastor; nada me faltará.",
      "No debáis a nadie nada, sino el amaros unos a otros."
    ][i],
    verses: [
      { reference: "Filipenses 4:19", text: "Mi Dios, pues, suplirá todo lo que os falte..." },
      { reference: "Salmos 23:1", text: "Jehová es mi pastor; nada me faltará." }
    ],
    activities: [
      "Ofrenda algo valioso hoy de forma anónima para romper el espíritu de avaricia.",
      "Anota 15 bendiciones materiales y espirituales que ya posees y agradece por ellas."
    ]
  })),

  // ==================== 5. COMPARACION (10 creencias) ====================
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `CO-${i + 1}`,
    name: [
      "Todos progresan más rápido que yo",
      "Las redes de otros muestran una vida perfecta",
      "Si me alegro por el triunfo ajeno, pierdo el mío",
      "Mi llamado espiritual es inferior al de otros",
      "Llegué demasiado tarde para destacar",
      "Dios tiene favoritos y yo no soy uno de ellos",
      "Tengo menos talentos que el promedio de personas",
      "Mis oraciones son menos poderosas que las ajenas",
      "Siento que Dios bendice más a los impíos",
      "Si no tengo una relación como la de otros, fracasé"
    ][i],
    category: "comparacion" as const,
    fearRoot: "Inferioridad y envidia",
    mainEmotion: "Insatisfacción crónica",
    cognitiveDistortion: "Filtro mental",
    lie: [
      "La velocidad de otros indica que estoy estancado.",
      "La fachada digital de mis conocidos es su realidad absoluta.",
      "El éxito del prójimo disminuye mis posibilidades.",
      "Hay ministerios que tienen mayor valor intrínseco.",
      "Las mejores oportunidades ya fueron repartidas.",
      "Dios distribuye su favor de manera arbitraria.",
      "Fui creado con fallas graves en mis capacidades.",
      "La unción depende de las dotes de oratoria o carisma.",
      "La injusticia define la distribución de las bendiciones.",
      "Mi plenitud amorosa depende de calcar modelos externos."
    ][i],
    truth: [
      "Él perfeccionará su obra en mí al ritmo específico de su gracia.",
      "No nos comparamos con otros; cada uno rinda cuentas de su propia labor.",
      "Gocémonos con los que se gozan y lloremos con los que lloran.",
      "Hay diversidad de dones, pero el Espíritu es el mismo.",
      "Las misericordias del Señor se renuevan cada mañana; hay tiempo para ti.",
      "Dios no hace acepción de personas; su amor y gracia cubren a todos.",
      "Soy creación maravillosa; tengo un diseño divino singular y perfecto.",
      "La oración eficaz del justo puede mucho, sin importar su estridencia.",
      "La paz de Dios sobrepasa todo entendimiento, por encima de riquezas pasajeras.",
      "El Señor es por mí; Él ordenará mis pasos sentimentales y familiares."
    ][i],
    verses: [
      { reference: "Gálatas 6:4", text: "Así que, cada uno someta a prueba su propia obra..." },
      { reference: "1 Corintios 12:12", text: "Porque así como el cuerpo es uno, y tiene muchos miembros..." }
    ],
    activities: [
      "Haz un ayuno de redes sociales (Instagram/Facebook) por 3 días completos.",
      "Felicita sinceramente a un colega o amigo por su reciente logro."
    ]
  })),

  // ==================== 6. PERFECCIONISMO (10 creencias) ====================
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `PE-${i + 1}`,
    name: [
      "Cualquier cosa menor que excelente no sirve",
      "No puedo dormir si la tarea tiene un cabo suelto",
      "Los errores son imperdonables y demuestran inutilidad",
      "Si delego algo, lo arruinarán",
      "Debo disimular toda flaqueza o duda",
      "La santidad es no equivocarse nunca",
      "Dios me ama más cuando soy productivo y pulcro",
      "Si fallo una vez, todo mi esfuerzo anterior se borra",
      "Expresar cansancio es señal de pereza espiritual",
      "Mis estándares rígidos son virtudes necesarias"
    ][i],
    category: "perfeccionismo" as const,
    fearRoot: "Juicio, rechazo y descontrol",
    mainEmotion: "Frustración y rigidez",
    cognitiveDistortion: "Pensamiento de todo o nada",
    lie: [
      "Mi valor se destruye si el producto final tiene un error.",
      "La paz mental está subordinada al control absoluto de la tarea.",
      "Equivocarse es un pecado imperdonable en mí.",
      "Nadie más posee el amor o dedicación para cumplir la tarea.",
      "La vulnerabilidad daña mi testimonio como líder.",
      "La perfección humana es alcanzable bajo mis propias fuerzas.",
      "La gracia divina depende de mi nivel de perfección diaria.",
      "Un desliz anula una vida devota.",
      "Descansar deshonra el llamado y muestra debilidad pecaminosa.",
      "Mi rigidez es simplemente amor a la excelencia bíblica."
    ][i],
    truth: [
      "El Señor completará lo que a mí me falta; su amor es paciente.",
      "Por nada estéis afanosos; depositad vuestras cargas en sus manos.",
      "Siete veces cae el justo y vuelve a levantarse. Redención total.",
      "Edifica el cuerpo capacitando a otros; la humildad sabe delegar.",
      "Mi poder se perfecciona en tu debilidad, dice el Señor.",
      "Sed santos, porque yo soy santo; santidad es consagración, no ausencia de humanidad.",
      "No por obras de justicia que nosotros hubiéramos hecho, sino por su misericordia.",
      "Él conoce nuestra condición; se acuerda de que somos polvo.",
      "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
      "El fruto del Espíritu es amor, gozo, paz, paciencia y benignidad."
    ][i],
    verses: [
      { reference: "Romanos 3:23-24", text: "Por cuanto todos pecaron, y están destituidos..." },
      { reference: "Filipenses 1:6", text: "Estando persuadido de esto, que el que comenzó..." }
    ],
    activities: [
      "Deja una tarea no esencial al 90% de su perfección y descansa temprano.",
      "Realiza una declaración diaria sintiendo orgullo de tus avances modestos."
    ]
  })),

  // ==================== 7. CONTROL (10 creencias) ====================
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `CN-${i + 1}`,
    name: [
      "Si no planifico cada detalle, reinará el caos",
      "Soy el único responsable de la felicidad de mi familia",
      "Si suelto el timón, la barca se hundirá",
      "La fe implica que yo actúe primero y ore después",
      "Las personas son incapaces de tomar buenas decisiones",
      "Debo cambiar el carácter de mi cónyuge a la fuerza",
      "Pedir ayuda es un síntoma de fracaso rotundo",
      "Si no gano la discusión, pierdo el respeto",
      "Dios obra a través de mis agendas estrictas",
      "La incertidumbre es mi enemiga mortal"
    ][i],
    category: "control" as const,
    fearRoot: "Vulnerabilidad y catástrofe",
    mainEmotion: "Estrés crónico",
    cognitiveDistortion: "Falacia de control",
    lie: [
      "El universo se colapsará si relajo mis expectativas.",
      "Tengo el control sobre las emociones e historias ajenas.",
      "La soberanía de Dios depende de mi intervención constante.",
      "La oración es complementaria; mi esfuerzo físico es lo primordial.",
      "La desconfianza es prudencia necesaria para vivir.",
      "Tengo la unción para reformar la personalidad de los míos.",
      "La autarquía es la máxima expresión de la madurez divina.",
      "La sumisión a la perspectiva ajena debilita mi autoridad.",
      "Mis planes milimétricos atan la soberanía divina.",
      "La falta de visibilidad del futuro equivale a la ausencia de Dios."
    ][i],
    truth: [
      "Jehová peleará por vosotros, y vosotros estaréis tranquilos.",
      "Cada cual llevará su propia carga; confía a los tuyos al cuidado del Padre.",
      "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.",
      "Buscad primeramente el reino de Dios y su justicia, y las demás cosas vendrán.",
      "El Espíritu Santo convence de pecado, justicia y juicio, no mis regaños.",
      "Él da aliento y sabiduría a los humildes de corazón.",
      "La soga de tres hilos no se rompe fácilmente; la comunidad nos sostiene.",
      "La blanda respuesta quita la ira; mas la palabra áspera hace subir el furor.",
      "El corazón del hombre propone su camino; mas Jehová endereza sus pasos.",
      "No os afanéis por el mañana; confiad en el Dios eterno que ya está allí."
    ][i],
    verses: [
      { reference: "Proverbios 3:5-6", text: "Fíate de Jehová de todo tu corazón..." },
      { reference: "Éxodo 14:14", text: "Jehová peleará por vosotros, y vosotros estaréis tranquilos." }
    ],
    activities: [
      "Pasa todo un día sin corregir las decisiones menores de quienes te rodean.",
      "Dedica 20 minutos a entregar simbólicamente tus agendas en un altar mental."
    ]
  })),

  // ==================== 8. ANSIEDAD (10 creencias) ====================
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `AN-${i + 1}`,
    name: [
      "Siento que algo malo ocurrirá hoy mismo",
      "Mi mente no puede dejar de procesar peligros",
      "El insomnio es mi cruz de cada noche",
      "Si dejo de preocuparme, bajaré la guardia",
      "Mi cuerpo está enfermo debido a los nervios",
      "La ansiedad es parte indisoluble de mi personalidad",
      "El mundo actual es hostil y destructivo para mí",
      "La paz es solo una ilusión temporal",
      "No tengo fuerzas para afrontar el día siguiente",
      "Dios guarda silencio ante mi desesperación"
    ][i],
    category: "ansiedad" as const,
    fearRoot: "Pérdida de estabilidad y dolor",
    mainEmotion: "Angustia constante",
    cognitiveDistortion: "Razonamiento emocional",
    lie: [
      "El presentimiento de peligro es una profecía segura.",
      "Pensar obsessivamente me previene de sufrir sorpresas.",
      "El desvelo es mi única forma de vigilar mis problemas.",
      "Estar en paz es negligencia peligrosa ante la vida.",
      "Mi salud física está dañada de forma irreversible por la mente.",
      "La preocupación define mi herencia familiar y destino físico.",
      "Satanás controla el entorno impidiéndome respirar.",
      "La tempestad es el estado natural; la calma es un error.",
      "Mi provisión de fuerzas espirituales está agotada irrevocablemente.",
      "La aparente quietud del Altísimo demuestra su desinterés por mí."
    ][i],
    truth: [
      "La paz os dejo, mi paz os doy; no como el mundo la da. No se turbe vuestro corazón.",
      "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.",
      "En paz me acostaré, y asimismo dormiré; porque solo tú, Jehová, me haces vivir confiado.",
      "Por nada estéis afanosos, sino sean conocidas vuestras peticiones ante Dios.",
      "El corazón alegre constituye buen remedio; mas el espíritu triste seca los huesos.",
      "Tenemos la mente de Cristo; sus pensamientos de paz gobiernan mi ser.",
      "El ángel de Jehová acampa alrededor de los que le temen, y los defiende.",
      "El Señor es mi pastor y confortará mi alma por sendas de justicia.",
      "Él da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas.",
      "Claman los justos, y Jehová oye, y los libra de todas sus angustias."
    ][i],
    verses: [
      { reference: "Filipenses 4:6-7", text: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones..." },
      { reference: "1 Pedro 5:7", text: "Echando toda vuestra ansiedad sobre él..." }
    ],
    activities: [
      "Realiza 10 respiraciones rítmicas inspirando la verdad de Dios y expirando tus afanes.",
      "Escribe una lista de 5 crisis pasadas de las cuales Dios te rescató milagrosamente."
    ]
  })),

  // ==================== 9. CULPA (10 creencias) ====================
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `CU-${i + 1}`,
    name: [
      "No merezco que me pasen cosas buenas",
      "La ira de Dios está encendida contra mí por mi pasado",
      "Mis errores dañaron a otros irremediablemente",
      "Debo autocastigarme para purgar mis pecados",
      "Las bendiciones materiales me hacen sentir un hipócrita",
      "He cometido el pecado imperdonable",
      "La vergüenza es la justa condena para mis caídas",
      "Dios me perdonó pero aún me tiene en la lista negra",
      "Mis fracasos arruinaron el plan perfecto de Dios para mí",
      "La felicidad de otros es mi castigo viviente"
    ][i],
    category: "culpa" as const,
    fearRoot: "Condenación, juicio y exclusión divina",
    mainEmotion: "Remordimiento amargo",
    cognitiveDistortion: "Personalización",
    lie: [
      "Tengo que pagar una penitencia emocional para ser digno.",
      "La sangre de Cristo exige mi sufrimiento personal para completarse.",
      "Mis tropiezos arruinaron la vida ajena despojándolos de la gracia.",
      "Castigar mis pensamientos agrada la justicia divina.",
      "Estar alegre u holgado deshonra el arrepentimiento.",
      "Mi ofensa superó los límites sacrificados en el Calvario.",
      "Lamer mis heridas de culpa demuestra piedad espiritual.",
      "Dios guarda memoria activa de las culpas ya confesadas.",
      "Soberanía divina es frágil ante mis malas determinaciones.",
      "El bienestar ajeno es una bofetada irónica dirigida por el Padre."
    ][i],
    truth: [
      "Al que no conoció pecado, por nosotros lo hizo pecado, para justicia de Dios.",
      "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados.",
      "Él sana a los quebrantados de corazón, restaurando las hendiduras familiares.",
      "No hay condenación para los que están en Cristo. Fuimos absueltos por completo.",
      "El reino de Dios no es comida ni bebida, sino justicia, paz y gozo en el Espíritu.",
      "¿Qué Dios como tú, que perdona la maldad y olvida el pecado de su pueblo?",
      "Él arrojará en lo profundo del mar todos nuestros pecados.",
      "Cuanto está lejos el oriente del occidente, hizo alejar de nosotros nuestras rebeliones.",
      "Él restaura los años que devoró la langosta. Sus planes no se frustran.",
      "Jehová es misericordioso y clemente; lento para la ira, y grande en misericordia."
    ][i],
    verses: [
      { reference: "Romanos 8:31", text: "¿Qué, pues, diremos a esto? Si Dios es por nosotros..." },
      { reference: "1 Juan 1:9", text: "Si confesamos nuestros pecados, él es fiel y justo..." }
    ],
    activities: [
      "Escribe tus antiguos pecados en un papel, tíralo a la basura cantando de alegría.",
      "Medita en el Salmo 103 declarando en voz alta la absolución total de tu alma."
    ]
  })),

  // ==================== 10. VERGUENZA (10 creencias) ====================
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `VE-${i + 1}`,
    name: [
      "Si me miran fijamente, descubrirán mi inmundicia",
      "Siento asco o desprecio de mi propia historia física",
      "Deseo ocultarme del mundo y de la mirada de Dios",
      "Mis heridas sexuales me volvieron basura inútil",
      "No tengo derecho a levantar las manos en adoración",
      "La deshonra de mi apellido es mi cruz ineludible",
      "Me avergüenzo de mi nivel social, educativo o de mi hogar",
      "Si alguien me alaba, siento ganas de vomitar por impostor",
      "Soy de segunda clase comparado con los creyentes puros",
      "Mi timidez severa es la coraza de mi propia humillación"
    ][i],
    category: "verguenza" as const,
    fearRoot: "Deshonra pública, desnudez y desprecio",
    mainEmotion: "Inadaptación radical y asco de sí mismo",
    cognitiveDistortion: "Etiquetado",
    lie: [
      "El desprecio público es el veredicto real sobre mí.",
      "Mi templo físico es indigno y sucio de forma permanente.",
      "Dios experimenta rechazo estético cuando me contempla.",
      "La herida de abuso o error sensual borró mi valor espiritual.",
      "Mis manos limpias dependen de mi propia perfección moral reciente.",
      "La maldición de mis ancestros gobierna mi rostro público.",
      "La pobreza o el linaje humilde anulan mis derechos espirituales.",
      "Cualquier reconocimiento humano es una farsa peligrosa.",
      "Existe un sistema de castas divinas en la mesa del Señor.",
      "Tengo que pasar desapercibido porque mi existencia es un error."
    ][i],
    truth: [
      "Los que miraron a él fueron alumbrados, y sus rostros no fueron avergonzados.",
      "¿No sabéis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros?",
      "Mirad con qué amor nos ha amado el Padre, para que seamos llamados hijos de Dios.",
      "Él corona de favores y misericordias tu cabeza, vistiéndote de lino fino.",
      "Acerquémonos, pues, confiadamente al trono de la gracia para alcanzar misericordia.",
      "En lugar de vuestra doble confusión, heredaréis el doble en vuestra tierra.",
      "Él levanta del polvo al pobre, y del muladar al menesteroso para hacerle sentar con príncipes.",
      "Al que gloria se gloríe en el Señor; Él nos capacita enteramente.",
      "No hay judío ni griego; todos somos uno en Cristo Jesús.",
      "Tú eres mi gloria, y el que levanta mi cabeza. Reivindicado total."
    ][i],
    verses: [
      { reference: "Salmos 34:5", text: "Los que miraron a él fueron alumbrados, y sus rostros..." },
      { reference: "Isaías 61:7", text: "En lugar de vuestra doble confusión, y de vuestra deshonra..." }
    ],
    activities: [
      "Levanta las manos hoy solo en el cuarto adorando a Dios por diseñarte así.",
      "Anota tres cosas de las cuales te avergüenzas y contrárestalas con Isaías 61:7."
    ]
  }))
];
