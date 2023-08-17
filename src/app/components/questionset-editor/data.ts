export const observationEditorConfig = {
  context: {
    programId: 'f72ad8b0-36df-11ec-a56f-4b503455085f',
    contributionOrgId: '',
    user: {
      id: '5a587cc1-e018-4859-a0a8-e842650b9d64',
      fullName: 'Vaibahv Bhuva',
      firstName: 'Vaibhav',
      lastName: 'Bhuva',
      orgIds: ['01309282781705830427']
    },
    // identifier: 'do_113395089840529408131', // 'do_1132393548335759361558', // do_11330102570702438417
    identifier: 'do_2138220235204444161749',  // 'do_1133610108714352641210', // Observation

    authToken: ' ',
    sid: 'iYO2K6dOSdA0rwq7NeT1TDzS-dbqduvV',
    did: '7e85b4967aebd6704ba1f604f20056b6',
    uid: 'bf020396-0d7b-436f-ae9f-869c6780fc45',
    channel: '01309282781705830427',
    pdata: {
      id: 'dev.dock.portal',
      ver: '2.8.0',
      pid: 'creation-portal'
    },
    contextRollup: {
      l1: '01307938306521497658',
    },
    tags: ['01307938306521497658'],
    cdata: [
      {
        id: '01307938306521497658',
        type: 'sourcing_organization',
      },
      {
        type: 'project',
        id: 'ec5cc850-3f71-11eb-aae1-fb99d9fb6737',
      },
      {
        type: 'linked_collection',
        id: 'do_113140468925825024117'
      }
    ],
    timeDiff: 5,
    objectRollup: {
      l1: 'do_113140468925825024117',
      l2: 'do_113140468926914560125'
    },
    host: 'https://dock.sunbirded.org',
    defaultLicense: 'CC BY 4.0',
    endpoint: '/data/v3/telemetry',
    env: 'questionset_editor',
    framework: 'ekstep_ncert_k-12',
    cloudStorageUrls: ['https://s3.ap-south-1.amazonaws.com/ekstep-public-qa/', 'https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/',
                      'https://sunbirddev.blob.core.windows.net/sunbird-content-dev/'],
    subject: ['English'],
    topic: [],
    additionalCategories: [
      {
        value: 'Classroom Teaching Video',
        label: 'Classroom Teaching Video'
      },
      {
        value: 'Concept Map',
        label: 'Concept Map'
      },
      {
        value: 'Curiosity Question Set',
        label: 'Curiosity Question Set'
      },
      {
        value: 'Textbook',
        label: 'Textbook'
      },
      {
        value: 'Experiential Resource',
        label: 'Experiential Resource'
      },
      {
        value: 'Explanation Video',
        label: 'Explanation Video'
      },
      {
        value: 'Focus Spot',
        label: 'Focus Spot'
      },
      {
        value: 'Learning Outcome Definition',
        label: 'Learning Outcome Definition'
      },
      {
        value: 'Marking Scheme Rubric',
        label: 'Marking Scheme Rubric'
      },
      {
        value: 'Pedagogy Flow',
        label: 'Pedagogy Flow'
      },
      {
        value: 'Lesson Plan',
        label: 'Lesson Plan'
      },
      {
        value: 'Previous Board Exam Papers',
        label: 'Previous Board Exam Papers'
      },
      {
        value: 'TV Lesson',
        label: 'TV Lesson'
      }
    ],
    labels: {
      save_collection_btn_label: 'Save as Draft',
    }
  },
  config: {
    mode: 'edit', // edit / review / read / sourcingReview // orgReview
    editableFields: {
      //sourcingreview: ['instructions'],
      orgreview: ['name', 'instructions', 'learningOutcome'],
      review: ['name', 'description'],
    },
    maxDepth: 4,
    objectType: 'QuestionSet',
    // primaryCategory: 'Observation',
    primaryCategory: 'Observation',
    isRoot: true,
    iconClass: 'fa fa-book',
    showAddCollaborator: false,
    enableBulkUpload: true,
    publicStorageAccount: 'https://dockstorage.blob.core.windows.net/',
    children: {
      Question: [
        'Multiple Choice Question',
        'Slider',
        'Text',
        'Date'
      ]
    },
    hierarchy: {
      level1: {
        name: 'Section',
        type: 'Unit',
        mimeType: 'application/vnd.sunbird.questionset',
        primaryCategory: 'Observation',
        iconClass: 'fa fa-folder-o',
        children: {
          Question: [
            'Multiple Choice Question',
            'Slider',
            'Text',
            'Date'
          ]
        }
      },
      level2: {
        name: 'Sub Section',
        type: 'Unit',
        mimeType: 'application/vnd.sunbird.questionset',
        primaryCategory: 'Observation',
        iconClass: 'fa fa-folder-o',
        children: {
          Question: [
            'Multiple Choice Question',
            'Slider',
            'Text',
            'Date'
          ]
        }
      },
      level3: {
        name: 'Sub Section',
        type: 'Unit',
        mimeType: 'application/vnd.sunbird.questionset',
        primaryCategory: 'Observation',
        iconClass: 'fa fa-folder-o',
        children: {
          Question: [
            'Multiple Choice Question',
            'Slider',
            'Text',
            'Date'
          ]
        }
      }
    },
    contentPolicyUrl: '/term-of-use.html',
    assetProxyUrl: '/assets/public/',
    commonFrameworkLicenseUrl: 'https://creativecommons.org/licenses/'
  }
};