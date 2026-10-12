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
  /** which little scene illustrates this part of the day (see Chapter3YourDay) */
  scene: string;
  /** two- or three-word caption under the scene */
  caption: string;
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
      'Steady fuel for the 4 PM slump. No crash, no heaviness.',
    barMarker: {
      time: '4:00 PM',
      hourFraction: 16.0,
      label: 'The 4 PM gap',
      context: 'Between late afternoon reviews and the evening push',
    },
    timeBlocks: [
      { start: '7:00 AM', end: '8:30 AM', label: 'Commute & coffee', type: 'transit', scene: 'commute-coffee', caption: 'Commute + coffee' },
      { start: '8:30 AM', end: '12:30 PM', label: 'Deep work & morning meetings', type: 'focus', scene: 'deep-work', caption: 'Deep work' },
      { start: '12:30 PM', end: '1:30 PM', label: 'Light lunch', type: 'break', scene: 'light-lunch', caption: 'Light lunch' },
      { start: '1:30 PM', end: '4:00 PM', label: 'Back-to-back presentations', type: 'focus', scene: 'presentations', caption: 'Presentations' },
      { start: '4:00 PM', end: '4:30 PM', label: 'Protein 11 pause', type: 'break', scene: 'bar', caption: 'Protein 11' },
      { start: '4:30 PM', end: '7:30 PM', label: 'Closing sprints & wrap-up', type: 'focus', scene: 'wrap-up', caption: 'Wrap-up' },
      { start: '7:30 PM', end: '9:00 PM', label: 'Evening commute & unwinding', type: 'transit', scene: 'evening-commute', caption: 'Home time' },
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
      'Two minutes, clean hands, sits easy while you stay on your feet.',
    barMarker: {
      time: '11:30 AM',
      hourFraction: 11.5,
      label: 'Pocket turnaround',
      context: 'A 5-minute breather before the midday clinical rush',
    },
    timeBlocks: [
      { start: '7:00 AM', end: '8:00 AM', label: 'Morning handover & ward notes', type: 'routine', scene: 'handover', caption: 'Handover' },
      { start: '8:00 AM', end: '11:30 AM', label: 'Continuous patient triage', type: 'focus', scene: 'triage', caption: 'Triage' },
      { start: '11:30 AM', end: '12:00 PM', label: 'Protein 11 pocket bite', type: 'break', scene: 'bar', caption: 'Protein 11' },
      { start: '12:00 PM', end: '4:00 PM', label: 'Acute care & clinical rounds', type: 'focus', scene: 'rounds', caption: 'Rounds' },
      { start: '4:00 PM', end: '5:00 PM', label: 'Chart updates & brief rest', type: 'break', scene: 'charting', caption: 'Charts + rest' },
      { start: '5:00 PM', end: '8:00 PM', label: 'Evening shift peak triage', type: 'focus', scene: 'peak-triage', caption: 'Peak hours' },
      { start: '8:00 PM', end: '9:00 PM', label: 'Night shift briefing', type: 'routine', scene: 'night-briefing', caption: 'Night briefing' },
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
      'Survives a bag all day. Fills you when nothing else is around.',
    barMarker: {
      time: '12:30 PM',
      hourFraction: 12.5,
      label: 'Transit connection',
      context: 'Between terminal gates or site transfers',
    },
    timeBlocks: [
      { start: '7:00 AM', end: '9:00 AM', label: 'Transit & baggage drop', type: 'transit', scene: 'flight', caption: 'Flight' },
      { start: '9:00 AM', end: '12:30 PM', label: 'On-site inspections & calls', type: 'focus', scene: 'site-visit', caption: 'Site visit' },
      { start: '12:30 PM', end: '1:15 PM', label: 'Protein 11 on the move', type: 'break', scene: 'bar', caption: 'Protein 11' },
      { start: '1:15 PM', end: '4:30 PM', label: 'Field walkthroughs & transfers', type: 'transit', scene: 'walkthrough', caption: 'Walkthroughs' },
      { start: '4:30 PM', end: '6:30 PM', label: 'Remote coordination', type: 'focus', scene: 'remote', caption: 'Calls' },
      { start: '6:30 PM', end: '9:00 PM', label: 'Arrival, check-in & rest', type: 'routine', scene: 'check-in', caption: 'Check-in' },
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
      'Real-food protein after a session. No chalk, no syrup.',
    barMarker: {
      time: '8:45 AM',
      hourFraction: 8.75,
      label: 'Post-movement rhythm',
      context: 'After early morning training before sitting down for work',
    },
    timeBlocks: [
      { start: '7:00 AM', end: '8:30 AM', label: 'Morning movement session', type: 'activity', scene: 'workout', caption: 'Workout' },
      { start: '8:30 AM', end: '9:15 AM', label: 'Protein 11 & morning brew', type: 'break', scene: 'bar', caption: 'Protein 11' },
      { start: '9:15 AM', end: '1:00 PM', label: 'High-focus work block', type: 'focus', scene: 'focus', caption: 'Focus work' },
      { start: '1:00 PM', end: '2:00 PM', label: 'Warm midday meal', type: 'break', scene: 'warm-meal', caption: 'Warm meal' },
      { start: '2:00 PM', end: '5:30 PM', label: 'Afternoon meetings & tasks', type: 'focus', scene: 'meetings', caption: 'Meetings' },
      { start: '5:30 PM', end: '7:00 PM', label: 'Outdoor walk & mobility', type: 'activity', scene: 'walk', caption: 'Walk' },
      { start: '7:00 PM', end: '9:00 PM', label: 'Restorative evening', type: 'routine', scene: 'evening', caption: 'Wind down' },
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
      'One hand, zero prep. Carries you to a late lunch.',
    barMarker: {
      time: '10:15 AM',
      hourFraction: 10.25,
      label: 'One-handed morning bite',
      context: 'When breakfast was interrupted and lunchtime is hours away',
    },
    timeBlocks: [
      { start: '7:00 AM', end: '9:00 AM', label: 'Early wake-up & nursery care', type: 'routine', scene: 'baby-morning', caption: 'Baby’s morning' },
      { start: '9:00 AM', end: '10:00 AM', label: 'Morning fresh-air stroll', type: 'activity', scene: 'stroll', caption: 'Fresh-air stroll' },
      { start: '10:00 AM', end: '10:45 AM', label: 'Protein 11 one-handed snack', type: 'break', scene: 'bar', caption: 'Protein 11' },
      { start: '10:45 AM', end: '1:30 PM', label: 'Naptime cadence & household', type: 'routine', scene: 'household', caption: 'Naps + chores' },
      { start: '1:30 PM', end: '2:30 PM', label: 'Quiet rest & hydration', type: 'break', scene: 'hydration', caption: 'Rest + water' },
      { start: '2:30 PM', end: '6:00 PM', label: 'Play, feeding & family flow', type: 'routine', scene: 'play', caption: 'Play + family' },
      { start: '6:00 PM', end: '9:00 PM', label: 'Bedtime rhythm & wind-down', type: 'routine', scene: 'bedtime', caption: 'Bedtime' },
    ],
    matchingPartnershipIds: ['binder', 'fibre-layers', 'fruit-two-forms'],
  },
];
