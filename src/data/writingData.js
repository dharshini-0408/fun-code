/** Writing prompts with tips and sample paragraphs. */

export const WRITING_PROMPTS = [
  {
    id: 'about-me',
    title: 'About me',
    level: 'Beginner',
    prompt: 'Write 3–5 sentences about yourself: name, age or grade, hobbies, and one favourite thing.',
    tips: ['Use “I am / I like / I enjoy”.', 'End each sentence with a full stop.', 'Capitalise “I”.'],
    sample:
      'My name is Sam. I am in grade six. I like reading and chess. My favourite subject is English.',
  },
  {
    id: 'my-day',
    title: 'My day',
    level: 'Elementary',
    prompt: 'Describe your morning routine in order. Use present simple.',
    tips: ['Use time words: first, then, after that, finally.', 'He/she/it + verb-s.'],
    sample:
      'I wake up at seven. First I brush my teeth, then I eat breakfast. After that I pack my bag and go to school.',
  },
  {
    id: 'friendship',
    title: 'A good friend',
    level: 'Elementary',
    prompt: 'Write a short paragraph about what makes a good friend.',
    tips: ['Give 2–3 reasons.', 'Add one example.'],
    sample:
      'A good friend listens and helps. My friend Maya shares books with me when I forget mine. I trust her because she is kind.',
  },
  {
    id: 'opinion-story',
    title: 'Book or film opinion',
    level: 'Intermediate',
    prompt: 'Give your opinion of a book or film. Include title, what it is about, and why you liked or disliked it.',
    tips: ['Start with your opinion.', 'Support it with because…', 'End with a recommendation.'],
    sample:
      'I enjoyed “The Secret Garden” because the characters grow and change. The setting feels peaceful. I would recommend it to anyone who likes gentle adventures.',
  },
  {
    id: 'email',
    title: 'Polite email',
    level: 'Intermediate',
    prompt: 'Write a short email to a teacher asking for help with homework. Include greeting, request, and closing.',
    tips: ['Use Dear… / Dear Mr or Ms…', 'Be polite: could you / please.', 'Close with Best regards or Thank you.'],
    sample:
      'Dear Ms Patel,\n\nCould you please help me with yesterday’s homework? I do not understand question three.\n\nThank you,\nAlex',
  },
  {
    id: 'argue',
    title: 'Short argument',
    level: 'Upper',
    prompt: 'Should students have less homework? Write a short paragraph with one clear opinion and two reasons.',
    tips: ['State your view in sentence one.', 'Use however / also / for example.', 'Keep a calm tone.'],
    sample:
      'Students should have less homework because evenings are needed for rest and family time. Also, shorter tasks can still practise skills without causing stress. For example, one focused worksheet is better than three rushed ones.',
  },
]

export function writingSelfCheck(text) {
  const t = String(text).trim()
  const checks = []
  checks.push({
    id: 'length',
    ok: t.split(/\s+/).filter(Boolean).length >= 12,
    label: 'At least ~12 words',
  })
  checks.push({
    id: 'cap',
    ok: /^[A-Z“"]/.test(t),
    label: 'Starts with a capital letter',
  })
  checks.push({
    id: 'end',
    ok: /[.!?]"?$/.test(t),
    label: 'Ends with . ! or ?',
  })
  checks.push({
    id: 'i',
    ok: !/\bi\b/.test(t) || /\bI\b/.test(t),
    label: 'Uses capital “I”',
  })
  const passed = checks.filter((c) => c.ok).length
  return { checks, passed, total: checks.length }
}
