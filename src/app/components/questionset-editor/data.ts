export const questionSetEditorConfig = {
  context: {
    user: {
      id: '5a587cc1-e018-4859-a0a8-e842650b9d64',
      fullName: 'N11',
      firstName: 'N11',
      lastName: '',
      orgIds: ['01309282781705830427']
    },
    identifier: '',
    authToken: ' ',
    sid: 'iYO2K6dOSdA0rwq7NeT1TDzS-dbqduvV',
    did: '7e85b4967aebd6704ba1f604f20056b6',
    uid: 'bf020396-0d7b-436f-ae9f-869c6780fc45',
    channel: '01309282781705830427',
    pdata: {
      id: 'dev.inquiry.portal',
      ver: '1.0.0',
      pid: 'sunbird-inquiry-portal'
    },
    contextRollup: {
      l1: '01309282781705830427',
    },
    tags: ['01309282781705830427'],
    timeDiff: 5,
    host: 'https://dev.inquiry.sunbird.org/',
    defaultLicense: 'CC BY 4.0',
    endpoint: '/data/v3/telemetry',
    env: 'questionset_editor',
    framework: 'ekstep_ncert_k-12',
    cloudStorageUrls: [
        'https://sunbirdstagingpublic.blob.core.windows.net/sunbird-content-staging/',
        'https://sunbirddevbbpublic.blob.core.windows.net/sunbird-content-staging/',
        'https://obj.devbb.sunbird.org/sunbird-content-staging/',
        'https://sunbirddevbbpublic.blob.core.windows.net/sunbird-content-staging'
    ],
    cloudStorage: {
      provider: 'azure',
      presigned_headers: {
        'x-ms-blob-type': 'BlockBlob'
      }
    },
    additionalCategories: [],
    labels: {
      save_collection_btn_label: 'Save as Draft',
    },
    correctionComments: false,
    sourcingResourceStatus: true,
  },
  config: {
    mode: 'edit', // edit / review / read / sourcingReview // orgReview
    enableQuestionCreation: true,
    editableFields: {
      sourcingreview: ['instructions'],
      orgreview: ['name', 'instructions', 'learningOutcome'],
      review: ['name', 'description'],
    },
    maxDepth: 4,
    objectType: 'QuestionSet',
    primaryCategory: 'Practice Question Set',
    isRoot: true,
    iconClass: 'fa fa-book',
    showAddCollaborator: false,
    enableBulkUpload: false,
    publicStorageAccount: 'https://dockstorage.blob.core.windows.net/',
    hideSubmitForReviewBtn: false,
    children: {
      Question: [
        'Multiple Choice Question',
        'Subjective Question'
      ]
    },
    addFromLibrary: false,
    hierarchy: {
      level1: {
        name: 'Section',
        type: 'Unit',
        mimeType: 'application/vnd.sunbird.questionset',
        primaryCategory: 'Practice Question Set',
        iconClass: 'fa fa-folder-o',
        children: {},
        addFromLibrary: true
      },
      level2: {
        name: 'Sub Section',
        type: 'Unit',
        mimeType: 'application/vnd.sunbird.questionset',
        primaryCategory: 'Practice Question Set',
        iconClass: 'fa fa-folder-o',
        children: {
          Question: [
            'Multiple Choice Question',
            'Subjective Question'
          ]
        },
        addFromLibrary: true
      },
      level3: {
        name: 'Sub Section',
        type: 'Unit',
        mimeType: 'application/vnd.sunbird.questionset',
        primaryCategory: 'Practice Question Set',
        iconClass: 'fa fa-folder-o',
        children: {
          Question: [
            'Subjective Question'
          ]
        }
      }
    },
    contentPolicyUrl: '/term-of-use.html',
    assetProxyUrl: '/assets/public/',
    commonFrameworkLicenseUrl: 'https://creativecommons.org/licenses/'
  }
};
