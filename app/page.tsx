import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
      <div className="min-h-screen bg-background">
        {/* Герой секція */}
        <section className="relative h-[50vh] overflow-hidden">
          <Image
              src="https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Дизайнерська студія Art Space"
              layout="fill"
              objectFit="cover"
              className="brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
              Створення цифрових вражень
            </h1>
          </div>
        </section>

        {/* Секція "Про нас" */}
        <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Про нашу студію</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                Заснована у 2010 році, наша дизайнерська студія є лідером у світі цифрових інновацій.
                Ми віримо у силу дизайну, що трансформує бізнес та покращує взаємодію користувачів.
              </p>
              <p className="text-lg mb-4">
                Наша команда захоплених дизайнерів та розробників спільно втілює ідеї в життя,
                створюючи вражаючі вебсайти, додатки та цифрові продукти, які залишають тривалий слід.
              </p>
            </div>
            <div className="relative h-64 md:h-full">
              <Image
                  src="https://images.pexels.com/photos/2956376/pexels-photo-2956376.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Наш творчий простір"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Секція "Наша команда" */}
        <section className="py-16 px-4 md:px-8 bg-muted">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Знайомтесь з нашою командою</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Алекс Джонсон", role: "Креативний директор", image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800" },
                { name: "Сем Лі", role: "Провідний дизайнер", image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=800" },
                { name: "Джордан Тейлор", role: "Спеціаліст з UX", image: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=800" },
              ].map((member) => (
                  <Card key={member.name}>
                    <CardContent className="p-4">
                      <Image
                          src={member.image}
                          alt={member.name}
                          width={300}
                          height={300}
                          objectFit="contain"
                          className="rounded-full mb-4"
                      />
                      <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                      <p className="text-muted-foreground text-center">{member.role}</p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Секція "Наші цінності" */}
        <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Наші цінності</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Інновації", description: "Ми розширюємо межі можливого та приймаємо нові технології." },
              { title: "Співпраця", description: "Ми віримо, що великі ідеї народжуються у різноманітності поглядів." },
              { title: "Орієнтація на користувача", description: "Користувачі — у центрі всього, що ми створюємо." },
            ].map((value) => (
                <Card key={value.title}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
            ))}
          </div>
        </section>

        {/* Заклик до дії */}
        <section className="py-16 px-4 md:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Готові почати свій проєкт?</h2>
            <p className="text-lg mb-8">Давайте створимо щось дивовижне разом.</p>
            <Button asChild size="lg">
              <Link href="  ">Зв’язатися з нами</Link>
            </Button>
          </div>
        </section>
      </div>
  )
}
