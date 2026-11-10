$scripts = @(
    @{
        id = "scene1"
        text = "El universo observable tiene más de noventa mil millones de años luz de diámetro y al menos dos billones de galaxias. En nuestra Vía Láctea hay más de cien mil millones de estrellas, y casi todas tienen planetas en su órbita. Muchas son miles de millones de años más viejas que nuestro Sol. La vida tuvo tiempo de sobra para nacer, evolucionar y colonizar las estrellas. Entonces... ¿dónde están todos?"
    },
    @{
        id = "scene2"
        text = "En 1964, el astrofísico Nikolái Kardashev propuso clasificar las civilizaciones por su energía. Tipo 1: domina la energía de su planeta. Tipo 2: construye una Esfera de Dyson alrededor de su estrella. Tipo 3: controla la energía de toda una galaxia. Si una civilización Tipo 3 existiera, su radiación infrarroja brillaría por todo el cielo. Pero al mirar con nuestros telescopios... solo vemos un silencio absoluto."
    },
    @{
        id = "scene3"
        text = "La primera gran explicación es el Gran Filtro: una barrera evolutiva casi imposible de superar. ¿Está el filtro detrás de nosotros? Quizás el salto de la materia inerte a la primera célula viva es un milagro irrepetible en el cosmos. O peor aún... ¿está el filtro por delante? Quizás toda civilización inteligente descubre la tecnología nuclear, la inteligencia artificial o el colapso climático y se extingue antes de conquistar el espacio."
    },
    @{
        id = "scene4"
        text = "La segunda teoría es aterradora: la hipótesis del Bosque Oscuro. El universo no está vacío; está lleno de civilizaciones inteligentes que se esconden en la oscuridad. En un cosmos donde la supervivencia es la máxima prioridad y las intenciones del vecino son un enigma, la opción más lógica para cualquier especie avanzada es no revelar jamás su posición, o disparar primero antes de ser aniquilada."
    },
    @{
        id = "scene5"
        text = "Una tercera posibilidad es que las civilizaciones avanzadas no viajan en naves, sino hacia adentro. Construyen computadoras cuánticas del tamaño de lunas y viven en universos digitales perfectos, sin necesidad de explorar el espacio físico. O tal vez la Tierra es una reserva natural cósmica, un zoológico protegido donde nos observan en silencio esperando a que alcancemos la madurez tecnológica."
    },
    @{
        id = "scene6"
        text = "Si el Gran Silencio persiste, hay una conclusión que cambia todo: tal vez somos los primeros. La Tierra no es un rincón insignificante, sino la cuna de la conciencia en el cosmos. Si estamos solos, el significado de todo el universo depende de nosotros. Depende de nosotros proteger este pequeño punto azul y encender la luz de la vida por toda la galaxia."
    }
)

Set-Location D:\Profile\RemotionVideo
$env:Path = "$env:Path;C:\Users\LamHD\AppData\Local\com.tinycorn.wavely\engine"

foreach ($s in $scripts) {
    $wav = "fermi-paradox/audio/$($s.id).wav"
    $vtt = "fermi-paradox/audio/$($s.id).vtt"
    Write-Output "=== Generating TTS for $($s.id) ==="
    npx hyperframes tts $s.text -v ef_dora -l es -o $wav
    Write-Output "=== Transcribing $($s.id) ==="
    npx hyperframes transcribe $wav -l es --to vtt -o $vtt
}
Write-Output "=== ALL AUDIO AND CAPTIONS GENERATED ==="
