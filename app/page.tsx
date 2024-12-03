import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Design Studio Art Space"
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

      {/* About Us Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">About Our Studio</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-4">
              Founded in 2010, our design studio has been at the forefront of digital innovation.
              We believe in the power of design to transform businesses and enhance user experiences.
            </p>
            <p className="text-lg mb-4">
              Our team of passionate designers and developers work collaboratively to bring ideas to life,
              creating stunning websites, apps, and digital products that leave a lasting impression.
            </p>
          </div>
          <div className="relative h-64 md:h-full">
            <Image
              src="https://images.pexels.com/photos/2956376/pexels-photo-2956376.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our Creative Space"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Creative Director", image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { name: "Sam Lee", role: "Lead Designer", image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { name: "Jordan Taylor", role: "UX Specialist", image: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=800" },
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

      {/* Values Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Innovation", description: "We push boundaries and embrace new technologies." },
            { title: "Collaboration", description: "We believe great ideas come from diverse perspectives." },
            { title: "User-Centric", description: "We put users at the heart of everything we create." },
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

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg mb-8">Let's create something amazing together.</p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

