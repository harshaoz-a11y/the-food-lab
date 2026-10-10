/**
 * Protein 11 Personas data.
 * All persona content is draft copy marked draft: true.
 * No medical claims, no mentions of breastfeeding, no mentions of muscle gain.
 */

export interface TimeBlock {
  start: string;
  end: string;
  label: string;
  type: 'focus' | 'transit' | 'break' | 'activity' | 'routine';
}

export interface PersonaDayMarker {
  time: string;
  hourFraction: number; // 7.0 to 21.0 for positioning along 7 AM–9 PM
  label: string;
  context: string;
}

export interface PersonaProfile {
  id: string;
  chipLabel: string;
  title: string;
  subtitle: string;
  draft: true;
  whatDayNeeds: string;
  barMarker: PersonaDayMarker;
  timeBlocks: TimeBlock[];
  matchingPartnershipIds: string[];
}

export const PERSONAS: PersonaProfile[] = [
  {
    id: '14-hour-days',
    chipLabel: '14-hour days',
    title: '14-Hour Days',
    subtitle: 'Desk stretches, back-to-back reviews, and evening commutes',
    draft: true,
    whatDayNeeds:
      'Steady, non-crashing fuel that carries you through the late-afternoon lull without a heavy digestive slowdown or an awkward sugar spike while you are leading reviews.',
    barMarker: {
      time: '4:00 PM',
      hourFraction: 16.0,
      label: 'The 4 PM gap',
      context: 'Between late afternoon reviews and the evening push',
    },
    timeBlocks: [
      { start: '7:00 AM', end: '8:30 AM', label: 'Commute & coffee', type: 'transit' },
      { start: '8:30 AM', end: '12:30 PM', label: 'Deep work & morning meetings', type: 'focus' },
      { start: '12:30 PM', end: '1:30 PM', label: 'Light lunch', type: 'break' },
      { start: '1:30 PM', end: '4:00 PM', label: 'Back-to-back presentations', type: 'focus' },
      { start: '4:00 PM', end: '4:30 PM', label: 'Protein 11 pause', type: 'break' },
      { start: '4:30 PM', end: '7:30 PM', label: 'Closing sprints & wrap-up', type: 'focus' },
      { start: '7:30 PM', end: '9:00 PM', label: 'Evening commute & unwinding', type: 'transit' },
    ],
    matchingPartnershipIds: ['fast-slow', 'fibre-layers', 'dairy-plant'],
  },
  {
    id: 'shift-work-er',
    chipLabel: 'Shift work / ER',
    title: 'Shift Work / ER',
    subtitle: 'Fast clinical handovers, variable pacing, and eating on your feet',
    draft: true,
    whatDayNeeds:
      'A dense, quiet bite you can unwrap in under two minutes with clean hands, that sits gently in the stomach while you are on your feet through emergency intake.',
    barMarker: {
      time: '11:30 AM',
      hourFraction: 11.5,
      label: 'Pocket turnaround',
      context: 'A 5-minute breather before the midday clinical rush',
    },
    timeBlocks: [
      { start: '7:00 AM', end: '8:00 AM', label: 'Morning handover & ward notes', type: 'routine' },
      { start: '8:00 AM', end: '11:30 AM', label: 'Continuous patient triage', type: 'focus' },
      { start: '11:30 AM', end: '12:00 PM', label: 'Protein 11 pocket bite', type: 'break' },
      { start: '12:00 PM', end: '4:00 PM', label: 'Acute care & clinical rounds', type: 'focus' },
      { start: '4:00 PM', end: '5:00 PM', label: 'Chart updates & brief rest', type: 'break' },
      { start: '5:00 PM', end: '8:00 PM', label: 'Evening shift peak triage', type: 'focus' },
      { start: '8:00 PM', end: '9:00 PM', label: 'Night shift briefing', type: 'routine' },
    ],
    matchingPartnershipIds: ['binder', 'fast-slow', 'salt-monk'],
  },
  {
    id: 'on-the-move',
    chipLabel: 'Always on the move',
    title: 'Always on the Move',
    subtitle: 'Transit days, security lines, site walkthroughs, and unpredictable delays',
    draft: true,
    whatDayNeeds:
      'A resilient bar that survives hours inside a bag without crumbling into dust or melting in heat, giving clean satiety when airport or roadside options are sparse.',
    barMarker: {
      time: '12:30 PM',
      hourFraction: 12.5,
      label: 'Transit connection',
      context: 'Between terminal gates or site transfers',
    },
    timeBlocks: [
      { start: '7:00 AM', end: '9:00 AM', label: 'Transit & baggage drop', type: 'transit' },
      { start: '9:00 AM', end: '12:30 PM', label: 'On-site inspections & calls', type: 'focus' },
      { start: '12:30 PM', end: '1:15 PM', label: 'Protein 11 on the move', type: 'break' },
      { start: '1:15 PM', end: '4:30 PM', label: 'Field walkthroughs & transfers', type: 'transit' },
      { start: '4:30 PM', end: '6:30 PM', label: 'Remote coordination', type: 'focus' },
      { start: '6:30 PM', end: '9:00 PM', label: 'Arrival, check-in & rest', type: 'routine' },
    ],
    matchingPartnershipIds: ['two-nuts', 'fibre-fruit', 'fruit-two-forms'],
  },
  {
    id: 'training-days',
    chipLabel: 'Training days',
    title: 'Training Days',
    subtitle: 'Early sessions, active daytime schedule, and sustained physical output',
    draft: true,
    whatDayNeeds:
      'Clean whole-food protein pairing without isolate chalkiness or syrupy coatings, bringing balanced sustenance alongside wholesome fats and natural sweetness.',
    barMarker: {
      time: '8:45 AM',
      hourFraction: 8.75,
      label: 'Post-movement rhythm',
      context: 'After early morning training before sitting down for work',
    },
    timeBlocks: [
      { start: '7:00 AM', end: '8:30 AM', label: 'Morning movement session', type: 'activity' },
      { start: '8:30 AM', end: '9:15 AM', label: 'Protein 11 & morning brew', type: 'break' },
      { start: '9:15 AM', end: '1:00 PM', label: 'High-focus work block', type: 'focus' },
      { start: '1:00 PM', end: '2:00 PM', label: 'Warm midday meal', type: 'break' },
      { start: '2:00 PM', end: '5:30 PM', label: 'Afternoon meetings & tasks', type: 'focus' },
      { start: '5:30 PM', end: '7:00 PM', label: 'Outdoor walk & mobility', type: 'activity' },
      { start: '7:00 PM', end: '9:00 PM', label: 'Restorative evening', type: 'routine' },
    ],
    matchingPartnershipIds: ['dairy-plant', 'fast-slow', 'cocoa-orange'],
  },
  {
    id: 'new-moms',
    chipLabel: 'New moms',
    title: 'New Moms',
    subtitle: 'Fragmented hours, one-handed eating, and continuous daily care',
    draft: true,
    whatDayNeeds:
      'Wholesome nutrient density requiring zero prep and zero cleanup, easily eaten with one hand while holding a little one when standard sit-down meals get pushed back.',
    barMarker: {
      time: '10:15 AM',
      hourFraction: 10.25,
      label: 'One-handed morning bite',
      context: 'When breakfast was interrupted and lunchtime is hours away',
    },
    timeBlocks: [
      { start: '7:00 AM', end: '9:00 AM', label: 'Early wake-up & nursery care', type: 'routine' },
      { start: '9:00 AM', end: '10:00 AM', label: 'Morning fresh-air stroll', type: 'activity' },
      { start: '10:00 AM', end: '10:45 AM', label: 'Protein 11 one-handed snack', type: 'break' },
      { start: '10:45 AM', end: '1:30 PM', label: 'Naptime cadence & household', type: 'routine' },
      { start: '1:30 PM', end: '2:30 PM', label: 'Quiet rest & hydration', type: 'break' },
      { start: '2:30 PM', end: '6:00 PM', label: 'Play, feeding & family flow', type: 'routine' },
      { start: '6:00 PM', end: '9:00 PM', label: 'Bedtime rhythm & wind-down', type: 'routine' },
    ],
    matchingPartnershipIds: ['binder', 'fibre-layers', 'fruit-two-forms'],
  },
];
