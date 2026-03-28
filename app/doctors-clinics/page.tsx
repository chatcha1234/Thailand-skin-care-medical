import { Card } from "@/components/ui/card";
import { doctors } from "@/lib/site-content";

export default function DoctorsClinicsPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-4xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Doctors & Clinics</p>
        <h1 className="text-4xl font-semibold text-slate-950">Trust-building profiles for international patients</h1>
        <p className="text-base leading-8 text-slate-600">
          International patients often decide based on credentials, language support, and confidence in the care journey.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {doctors.map((doctor) => (
          <Card key={doctor.name} className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-950">{doctor.name}</h2>
            <p className="text-sm font-medium text-brand-600">{doctor.specialty}</p>
            <p className="text-sm leading-7 text-slate-600">{doctor.trust}</p>
            <p className="text-sm text-slate-500">Languages: {doctor.languages}</p>
            <p className="text-sm text-slate-500">Clinic: {doctor.clinic}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
