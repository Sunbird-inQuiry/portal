import { environment } from "../../../environments/environment";

const devContents = {
  mcq: [
    { id: 'do_2138622515299368961170', name: 'Short Text Question Set', category: 'vertical' },
    { id: 'do_2138622578918113281177', name: 'Long Text Question Set', category: 'vertical' },
    { id: 'do_213858696649670656138', name: 'Horizontal Layout QuestionSet', category: 'horizontal' },
    { id: 'do_2138621952034570241163', name: 'Grid layout QuestionSet', category: 'grid' },
    { id: 'do_2138624000374702081209', name: 'MCQ with solutions', category: 'solutions' }
  ],
  sa: [
    { id: 'do_2138623295549685761189', name: 'Subjective question set 1' },
    { id: 'do_2138623514862387201196', name: 'Subjective question set 2' }
  ]
}

const stagingContents = {
  mcq: [
    { id: 'do_213536668306825216155', name: 'MCQ Question Set 1', category: 'vertical' },
    { id: 'do_213536734487494656178', name: 'MCQ Question Set 2', category: 'vertical' },
    { id: 'do_213471560301830144119', name: 'Vivek Questionset', category: 'vertical' },
    { id: 'do_2135395279401615361226', name: 'Horizontal Layout Question Set 1', category: 'horizontal' },
    { id: 'do_2135395367682211841241', name: 'Grid Layout Question Set 1', category: 'grid' },
    { id: 'do_213484313936035840138', name: 'Vivek Test questionset', category: 'vertical' },
    { id: 'do_21337242850730803211', name: 'vivek-questionset-progress-bar', category: 'vertical' },
    { id: 'do_213521052524797952167', name: 'Talkback-question set', category: 'vertical' }
  ],
  sa: [
    { id: 'do_213536742733381632187', name: 'Subjective question set 1' },
    { id: 'do_213536749100793856196', name: 'Subjective question set 2' }
  ]
};

export const SampleContentList: any = environment.baseUrl.includes('staging') ? stagingContents : devContents;
