import HeroSection from "@/components/hero";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, statsData } from "@/data/landing";

export default function Home() {
  return (
    <div className="mt-30">
      <HeroSection/>

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((statsData, index) =>(
              <div key={index} className="text-center">
                <div className="text-4xl font-serif  text-blue-600 mb-2">
                  {statsData.value}</div>
                <div className="text-gray-600">{statsData.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div>
          <h2>Smarter Tools for Smarter Money</h2>
          <div>
            {featuresData.map((feature, index) => (
            <Card key={index}>
              <CardContent>
                {feature.icon}
                <h3>{feature.title}</h3>
                <h3>{feature.description}</h3>
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      </section>
    </div>

  );
}
