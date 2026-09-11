import { FormEvent, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  Coffee,
  FlaskConical,
  ForkKnife,
  Menu,
  Moon,
  NotebookPen,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EggExperiment } from "@/components/food-lab/EggExperiment";
import { InteractionMap } from "@/components/food-lab/InteractionMap";
import { maestroAssets } from "@/lib/maestro-assets";

const navigation = [
  { label: "The question", href: "#question" },
  { label: "A demonstration", href: "#demonstration" },
  { label: "Real life", href: "#real-life" },
  { label: "Protein 11", href: "#protein-11" },
];

const fieldStudies = [
  {
    time: "07:42 / weekday",
    icon: Coffee,
    title: "The morning moved first",
    copy: "Breakfast did not fail. A late alarm, a school run and the first meeting rearranged it.",
    note: "timing × appetite",
  },
  {
    time: "13:18 / desk",
    icon: BriefcaseBusiness,
    title: "Lunch met the laptop",
    copy: "The meal was sensible. The context made it quick, distracted and strangely forgettable.",
    note: "attention × pace",
  },
  {
    time: "21:36 / home",
    icon: Moon,
    title: "The day arrived hungry",
    copy: "Dinner carried every missed pause from the hours before it. Willpower was not the only actor.",
    note: "fatigue × combination",
  },
];

const notes = [
  { id: "019", title: "Healthy.", copy: "What do we actually mean when we call a food healthy?", status: "question kept open" },
  { id: "031", title: "Food behaves.", copy: "Same food. Different context. Different outcome. Worth watching.", status: "observation" },
  { id: "036", title: "Protein.", copy: "Quantity gets counted. Timing and digestion still have a vote.", status: "still testing" },
  { id: "041", title: "Enjoyment.", copy: "Could enjoyment be part of consistency rather than its opposite?", status: "unresolved" },
];

function Brand() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="The Food Lab home">
      <img src={maestroAssets.foodLabMark} alt="" className="h-11 w-11 object-contain mix-blend-multiply" />
      <span className="flex flex-col leading-none">
        <strong className="font-serif text-lg font-normal tracking-[-0.02em] text-ink">The Food Lab</strong>
        <small className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/55">Observe · question · test</small>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-[#eee7d8]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Brand />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-ink/65 transition-colors hover:text-primary">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#your-experiment" className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-[#f8f2e5] transition-transform hover:-translate-y-0.5 lg:flex">
          Bring us a question <ArrowRight className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-ink/15 bg-[#f5edde] px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-ink/10 py-3 text-sm text-ink">
              {item.label}<ArrowRight className="h-4 w-4 text-primary" />
            </a>
          ))}
          <a href="#your-experiment" onClick={() => setOpen(false)} className="mt-4 flex items-center justify-between rounded-full bg-ink px-5 py-3 text-sm text-[#f8f2e5]">
            Bring us a question <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      )}
    </header>
  );
}

function HeroArtefact() {
  return (
    <figure className="hero-artefact" aria-label="Annotated breakfast scene showing the interactions around one meal">
      <div className="hero-plate" />
      <div className="hero-object hero-coffee"><Coffee aria-hidden="true" /></div>
      <div className="hero-object hero-clock"><Clock3 aria-hidden="true" /></div>
      <div className="hero-object hero-fork"><ForkKnife aria-hidden="true" /></div>
      <div className="hero-thread thread-one" />
      <div className="hero-thread thread-two" />
      <div className="hero-thread thread-three" />
      <div className="press-note hero-note hero-note-one handwritten text-primary">late meeting → ate faster</div>
      <div className="press-note hero-note hero-note-two handwritten text-primary">same breakfast tomorrow?</div>
      <figcaption className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] text-ink/50">
        Field setup 001 / an ordinary breakfast
      </figcaption>
    </figure>
  );
}

function FieldStudies() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {fieldStudies.map(({ time, icon: Icon, title, copy, note }) => (
        <article key={title} className="field-frame" data-time={time}>
          <div className="field-visual">
            <span className="field-orbit" />
            <Icon aria-hidden="true" />
          </div>
          <div className="field-copy">
            <h3 className="text-2xl font-normal text-[#f8f2e5]">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed">{copy}</p>
            <span className="mt-3 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#d68b7f]">{note}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function ConsultationForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent("A question for The Food Lab");
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\n\nWhat I am trying to change:\n${data.get("goal")}\n\nWhat keeps getting in the way:\n${data.get("friction")}\n\nAn ordinary day:\n${data.get("day")}`,
    );
    setSent(true);
    window.location.href = `mailto:harsha@thefoodlab.in?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#f8f2e5]/55">Your name</span>
        <input className="form-line" name="name" required placeholder="What should we call you?" />
      </label>
      <label className="block">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#f8f2e5]/55">What are you trying to change?</span>
        <input className="form-line" name="goal" required placeholder="Weight, energy, digestion, consistency…" />
      </label>
      <label className="block">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#f8f2e5]/55">What keeps getting in the way?</span>
        <input className="form-line" name="friction" required placeholder="Time, appetite, taste, routine…" />
      </label>
      <label className="block">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#f8f2e5]/55">An ordinary day</span>
        <textarea className="form-line min-h-24 resize-y" name="day" required placeholder="No perfect food diary needed. Just walk us through it." />
      </label>
      <Button type="submit" className="h-auto rounded-full bg-[#f8f2e5] px-6 py-3.5 text-sm font-medium text-ink shadow-[4px_5px_0_rgba(0,0,0,.12)] hover:bg-[#e8ddc7]">
        Send the field note <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-[#f8f2e5]/50" aria-live="polite">
        {sent ? "Your email app should now have the note ready to send." : "We read the interaction before suggesting a solution."}
      </p>
    </form>
  );
}

const Index = () => {
  return (
    <div id="top" className="min-h-screen overflow-hidden bg-paper text-ink">
      <Header />

      <main>
        <section id="question" className="px-4 pb-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
          <div className="paper-sheet mx-auto max-w-[1400px] px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-24">
            <div className="grid items-center gap-8 lg:grid-cols-[1.03fr_.97fr] lg:gap-12">
              <div className="relative z-10 lg:pl-3">
                <span className="lab-label">Observation 001</span>
                <h1 className="mt-7 max-w-[790px] font-serif text-[clamp(3.6rem,8.2vw,8.5rem)] font-normal leading-[0.82] tracking-[-0.065em] text-ink">
                  Could <span className="red-underline">interactions</span> matter more than ingredients?
                </h1>
                <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:max-w-2xl">
                  <p className="max-w-lg font-serif text-xl leading-snug text-ink/75 sm:text-2xl">
                    Most of us keep changing the list. We study what happens around it.
                  </p>
                  <a href="#demonstration" className="group flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                    Show me <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                  </a>
                </div>
                <aside className="press-note mt-12 max-w-sm rotate-[-1deg] p-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/50">Working note / not a verdict</span>
                  <p className="handwritten mt-2 text-xl leading-tight text-primary">The food did not arrive alone. The day came with it.</p>
                </aside>
              </div>
              <HeroArtefact />
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8" aria-labelledby="map-heading">
          <div className="mx-auto grid max-w-[1400px] gap-10 border-x border-b border-ink/15 bg-[#e4dac5] px-6 py-16 sm:px-12 lg:grid-cols-[.84fr_1.16fr] lg:px-20 lg:py-24">
            <div className="self-center">
              <span className="lab-label">The working hypothesis</span>
              <h2 id="map-heading" className="mt-6 max-w-xl font-serif text-5xl font-normal leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                An ingredient is only the beginning of the story.
              </h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-ink/65">
                Preparation, timing, combination, digestion and the shape of a day all get a turn.
              </p>
            </div>
            <InteractionMap />
          </div>
        </section>

        <section id="demonstration" className="px-4 sm:px-6 lg:px-8">
          <div className="paper-sheet mx-auto max-w-[1400px] px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
            <div className="mb-12 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="lab-label">Observation 002 / change one condition</span>
                <h2 className="mt-6 max-w-4xl font-serif text-5xl font-normal leading-[0.92] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                  Same egg. Different <span className="red-underline">interaction.</span>
                </h2>
              </div>
              <p className="handwritten max-w-xs rotate-[-2deg] text-xl leading-tight text-primary lg:text-right">Try the preparation switch. Watch what changes.</p>
            </div>
            <EggExperiment />
          </div>
        </section>

        <section id="real-life" className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px] bg-charcoal px-6 py-16 text-[#f8f2e5] sm:px-12 lg:px-20 lg:py-24">
            <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_.65fr] lg:items-end">
              <div>
                <span className="lab-label !text-[#f8f2e5]/55">Field sheet 003 / real life</span>
                <h2 className="mt-6 max-w-3xl font-serif text-5xl font-normal leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">What did the day do to the food?</h2>
              </div>
              <p className="max-w-lg text-lg leading-relaxed text-[#f8f2e5]/65">
                Not failure. Not virtue. Just interactions worth noticing before another rule is added.
              </p>
            </div>
            <FieldStudies />
            <aside className="press-note mt-10 max-w-lg rotate-[1deg] p-5 text-ink">
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/50">Margin note</span>
              <p className="handwritten mt-2 text-xl leading-tight text-primary">Maybe consistency is designed with a life, not imposed on one.</p>
            </aside>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8" aria-labelledby="lens-heading">
          <div className="paper-sheet mx-auto max-w-[1400px] px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
              <div className="relative">
                <div className="rounded-[1.25rem] border border-ink/15 bg-[#e5dac3] p-5 shadow-[7px_8px_0_rgba(65,50,28,.06)] sm:p-8">
                  <div className="grid aspect-[4/3] place-items-center rounded-[1rem] border border-dashed border-ink/25 bg-[#f4ecdc] p-6">
                    <UtensilsCrossed className="h-16 w-16 stroke-[1] text-primary" />
                    <div className="grid w-full grid-cols-3 gap-2 text-center font-mono text-[8px] uppercase tracking-[0.1em] text-ink/55">
                      <span>what?</span><span>when?</span><span>with what?</span>
                      <span>how made?</span><span>for whom?</span><span>what day?</span>
                    </div>
                  </div>
                </div>
                <span className="absolute -bottom-5 right-5 handwritten text-xl text-primary">question the whole event →</span>
              </div>
              <div>
                <span className="lab-label">The Food Lab lens</span>
                <h2 id="lens-heading" className="mt-6 max-w-2xl font-serif text-5xl font-normal leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">We look between the ingredients.</h2>
                <div className="mt-9 grid gap-x-8 sm:grid-cols-2">
                  {[
                    ["Preparation", "changes what becomes available."],
                    ["Timing", "changes what is useful now."],
                    ["Combination", "changes each ingredient’s job."],
                    ["Digestion", "changes what the body receives."],
                    ["Real life", "changes what can happen again."],
                  ].map(([title, copy]) => (
                    <div key={title} className="border-t border-dashed border-ink/25 py-5">
                      <strong className="font-serif text-xl font-normal">{title}</strong>
                      <p className="mt-1 text-sm leading-relaxed text-ink/60">{copy}</p>
                    </div>
                  ))}
                </div>
                <p className="handwritten mt-7 text-xl text-primary">Which interaction have we assumed does not matter?</p>
              </div>
            </div>
          </div>
        </section>

        <section id="protein-11" className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px] border-x border-ink/15 bg-[#dfd4be] px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
              <figure className="evidence-photo rotate-[-1deg]">
                <span className="tape tape-left" />
                <img src={maestroAssets.protein11} alt="Protein 11 bar cut open to show its ingredients" className="min-h-[340px] w-full object-cover sm:min-h-[480px]" />
                <figcaption>Specimen 011 / first practical experiment</figcaption>
              </figure>
              <div>
                <span className="lab-label">An experiment that became food</span>
                <h2 className="mt-6 max-w-2xl font-serif text-5xl font-normal leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Protein was never meant to work alone.</h2>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/68">
                  Protein 11 came out of the lens: eleven ingredients, each with a job, arranged to work as a meal rather than a macro.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/15 bg-ink/15 sm:grid-cols-4">
                  {[
                    ["Whey + casein", "fast × slow"],
                    ["Oats + psyllium", "structure × fibre"],
                    ["Nuts + seeds", "texture × fats"],
                    ["Raisins + monk fruit", "taste × balance"],
                  ].map(([title, note]) => (
                    <div key={title} className="bg-[#eee5d2] p-4">
                      <strong className="font-serif text-base font-normal">{title}</strong>
                      <span className="mt-2 block font-mono text-[8px] uppercase tracking-[0.12em] text-ink/50">{note}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href="mailto:harsha@thefoodlab.in?subject=Protein%2011%20experiment" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm text-[#f8f2e5] transition-transform hover:-translate-y-0.5">
                    Ask about Protein 11 <ArrowRight className="h-4 w-4" />
                  </a>
                  <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-ink/50">Not the philosophy. One result of it.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8" aria-labelledby="notes-heading">
          <div className="paper-sheet mx-auto max-w-[1400px] px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
            <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="lab-label">Lab notes / work in progress</span>
                <h2 id="notes-heading" className="mt-6 font-serif text-5xl font-normal leading-none tracking-[-0.04em] sm:text-6xl">Sharp observations. No sermons.</h2>
              </div>
              <NotebookPen className="h-12 w-12 stroke-[1] text-primary" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {notes.map((note, index) => (
                <article key={note.id} className={`note-card rounded-[1.25rem] p-6 ${index % 2 ? "rotate-[0.5deg]" : "rotate-[-0.5deg]"}`}>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/45">Note {note.id}</span>
                  <h3 className="mt-5 text-3xl font-normal">{note.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/65">{note.copy}</p>
                  <span className="handwritten absolute bottom-5 left-6 text-primary">{note.status} →</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="your-experiment" className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-[1400px] bg-charcoal px-6 py-16 text-[#f8f2e5] sm:px-12 lg:px-20 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
              <div>
                <span className="lab-label !text-[#f8f2e5]/55">Your experiment</span>
                <h2 className="mt-6 max-w-2xl font-serif text-5xl font-normal leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Bring us the part that never quite works.</h2>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-[#f8f2e5]/65">
                  Tell us what you have tried and where real life keeps entering the picture. We begin with questions, not a perfect plan.
                </p>
                <div className="mt-10 flex items-center gap-4 text-[#d68b7f]">
                  <FlaskConical className="h-8 w-8 stroke-[1.2]" />
                  <span className="handwritten max-w-xs text-xl leading-tight">No judgement. No gold stars for an ideal food diary.</span>
                </div>
              </div>
              <ConsultationForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/15 bg-[#e4dac5] px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-[1320px] gap-8 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <Brand />
          <p className="font-serif text-xl italic text-ink/75 sm:text-center">We observe. We question. Then we build.</p>
          <div className="font-mono text-[9px] uppercase leading-loose tracking-[0.12em] text-ink/50 sm:text-right">Bengaluru<br />harsha@thefoodlab.in</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
